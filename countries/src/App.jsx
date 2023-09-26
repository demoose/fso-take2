import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);
  const [weather, setWeather] = useState(null);
  const apiURL = "http://api.openweathermap.org/data/2.5/weather?q=";

  const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      setCountries(response.data);
    });
  }, []);

  useEffect(() => {
    if (countriesToShow.length === 1) {
      const country = countriesToShow[0];
      axios
        .get(
          `${apiURL}${country.capital}&APPID=${
            import.meta.env.VITE_OPENWEATHER_KEY
          }&units=metric`
        )
        .then((response) => {
          setWeather([response.data]);
        });
    }
    console.log(weather);
  }, [countriesToShow]);

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

  const handleShow = (countryName) => {
    setCountriesToShow([countryName]);
  };

  return (
    <>
      <div>
        find countries
        <input value={value} onChange={handleChange} />
        <ul>
          {countriesToShow.length > 10 ? (
            <p>Too many countries. Search for a longer string</p>
          ) : countriesToShow.length == 1 ? (
            countriesToShow.map((country) => {
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
                  {weather?.length === 1 && (
                    <div>
                      <h3>We have weather data</h3>
                      <p>Temperature: {weather[0].main.temp} celcius</p>
                      <img
                        src={`https://openweathermap.org/img/wn/${weather[0].weather[0].icon}@2x.png`}
                      />
                      <p>
                        Wind: {weather[0].wind.speed} m/s at{" "}
                        {weather[0].wind.deg} Degrees
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            countriesToShow.map((country) => {
              return (
                <li key={country.cioc}>
                  {country.name.common}
                  <button onClick={() => handleShow(country)}>show</button>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </>
  );
}

export default App;
