import React, { useState } from "react";
import Form from "../Components/Form";
import { fetchCountriesByContinent } from "../API/api";

interface Name {
  common: string;
}

interface Country {
  name: Name;
  continent: string;
}

interface CountryDetails {
  name?: Name;
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

  const fetchCountries = async () => {
    setLoading(true);
    try {
      const fetchedCountries = await fetchCountriesByContinent(
        selectedContinent
      );
      setCountries(fetchedCountries);
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
