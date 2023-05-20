import React, { useState } from "react";
import Form from "../Components/Form";

export default function Home() {
  const [selectedContinent, setSelectedContinent] = useState<string>("");
  const [numberOfCountries, setNumberOfCountries] = useState<number>(2);

  const toggleSelectContinent = (continent: string) => {
    setSelectedContinent(continent);
  };

  const toggleSetNumberOfCountries = (numberOfCountries: number) => {
    setNumberOfCountries(numberOfCountries);
  };

  const fetchCountries = () => {
    console.log(selectedContinent, numberOfCountries);
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
