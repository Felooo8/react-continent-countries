import React from "react";
import type { CountryDetails } from "../Screens/Home";

interface Props {
  country: CountryDetails;
}

export default function CountryDetail(props: Props) {
  const { country } = props;

  const renderField = (label: string, value: string | string[]) => {
    if (Array.isArray(value) && value.length === 0) {
      return <p><strong>{label}:</strong> No information found!</p>;
    }

    return <p><strong>{label}:</strong> {value || "No information found!"}</p>;
  };

  return (
    <div className="country-card">
      <h3>{country.name.common}</h3>
      <div className="country-info">
        {renderField("Official name", country.name.official)}
        {renderField("Capital", country.capital.join(", "))}
        {renderField("Population", country.population.toLocaleString())}
        {renderField("Subregion", country.subregion)}
        {renderField("Currencies", Object.keys(country.currencies))}
        {renderField("Languages", Object.values(country.languages))}
      </div>
    </div>
  );
}
