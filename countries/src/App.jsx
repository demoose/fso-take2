import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);

  const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

  // const getAllCountries = () => {
  //   axios.get(baseUrl).then((response) => {
  //     return response.data;
  //   });
  // };

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      setCountries(response.data);
    });
  }, []);

  useEffect(() => {
    const filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(value.toLowerCase())
    );
    setCountriesToShow(filteredCountries);
  }, [value]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const filter = (search) => {
    console.log(filteredCountries);
  };

  return (
    <>
      <div>
        find countries
        <input value={value} onChange={handleChange} />
        <ul>
          {countriesToShow.length > 10 ? (
            <p>Too many countries. Search for a longer string</p>
          ) : (
            countriesToShow.map((country) => {
              return <li key={country.cioc}>{country.name.common}</li>;
            })
          )}
          {countriesToShow.length == 1
            ? countriesToShow.map((country) => {
                return (
                  <div key={country.cioc}>
                    <h1>{country.name.common}</h1>
                    <p>Capital: {country.capital}</p>
                    <p>Population {country.population}</p>
                    <h4>Languages:</h4>
                    {Object.entries(country.languages).map(([key, value]) => {
                      return <li>{value}</li>;
                    })}
                    <img
                      width="100px"
                      height="100px"
                      src={country.flags.svg}
                      alt={country.flags.alt}
                    />
                  </div>
                );
              })
            : ""}
        </ul>
      </div>
    </>
  );
}

export default App;
