import React, { useState } from "react";
import Form from "../Components/Form";
import { fetchCountriesByContinent } from "../API/api";

interface Country {
  name: string;
  continent: string;
}

interface CountryDetails {
  name?: string;
  capital?: string;
  population?: number;
  currency?: string;
  subregion?: string;
  languages?: string[];
}

export default function Home() {
  const [selectedContinent, setSelectedContinent] = useState<string>("");
  const [numberOfCountries, setNumberOfCountries] = useState<number>(2);
  const [countries, setCountries] = useState<Country[]>([]);
  const [countryDetails, setCountryDetails] = useState<CountryDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const toggleSelectContinent = (continent: string) => {
    setSelectedContinent(continent);
  };

  const toggleSetNumberOfCountries = (numberOfCountries: number) => {
    setNumberOfCountries(numberOfCountries);
  };

  const selectCountries = (fetchedCountries: Country[]): Country[] => {
    // Shuffle the fetchedCountries array randomly
    const shuffledCountries = fetchedCountries.sort(() => Math.random() - 0.5);

    // Select the specified number of random countries
    const randomCountries = shuffledCountries.slice(0, numberOfCountries);

    // Sort the random countries in alphabetical order by name
    const sortedCountries = randomCountries.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    return sortedCountries;
  };

  const fetchCountries = async () => {
    setLoading(true);
    try {
      const fetchedCountries = await fetchCountriesByContinent(
        selectedContinent
      );
      const selectedCountries = selectCountries(fetchedCountries);
      setCountries(selectedCountries);
      setError("");
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
        setError(err.message);
      } else {
        console.log("Unexpected error", err);
        setError("Unexpected error");
      }
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "10px" }}>
      <h1>Discover Countries by Continent</h1>
      <Form
        selectedContinent={selectedContinent}
        toggleSelectContinent={toggleSelectContinent}
        numberOfCountries={numberOfCountries}
        toggleSetNumberOfCountries={toggleSetNumberOfCountries}
        toggleFetch={fetchCountries}
      />
    </div>
  );
}
