const express = require("express");
const app = express();
app.use(express.json());

let phonebook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/phonebook", (request, response) => {
  response.json(phonebook);
});

app.get("/info", (request, response) => {
  const date = new Date();
  const phonebookQuantity = phonebook.length;
  response.send(`<p>Phonebook has info for ${phonebookQuantity} people</p>
  <p>${date}</p>`);
});

app.get("/api/phonebook/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = phonebook.find((person) => person.id === id);
  if (!person) {
    return response.status(404).end();
  } else {
    return response.json(person);
  }
});

app.delete("/api/phonebook/:id", (request, response) => {
  const id = Number(request.params.id);

  const person = phonebook.find((person) => person.id === id);
  if (person) {
    phonebook.filter((person) => person.id !== id);
    response.status(204).end();
  } else {
    response.status(404).end();
  }
});

const checkDuplicateName = (name) => {
  const lowerName = name.toLowerCase();
  const names = phonebook.map((person) => person.name.toLowerCase());
  console.log(names);
  return names.find((name) => name === lowerName);
};

const checkDuplicateNumber = (number) => {
  console.log(typeof number);
  const numbers = phonebook.map((person) => person.number);
  console.log(numbers);
  return numbers.find((num) => num === number);
};

app.post("/api/phonebook", (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  if (checkDuplicateName(body.name)) {
    return response.status(400).json({
      error: `${body.name} is already present in the phonebook.`,
    });
  }

  // if (checkDuplicateNumber(body.number)) {
  //   return response.status(400).json({
  //     error: `${body.name} is already present in the phonebook.`,
  //   });
  // }
  const person = {
    id: Math.random() * 100,
    name: body.name,
    number: body.number,
  };

  phonebook = phonebook.concat(person);
  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
