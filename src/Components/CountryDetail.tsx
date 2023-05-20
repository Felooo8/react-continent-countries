import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import React from 'react';

import type { CountryDetails } from "../Screens/Home";
interface Props {
  country: CountryDetails;
  expanded: string | boolean;
  toggleAccordion: (expanded: string) => void;
}

export default function CountryDetail(props: Props) {
  const { country } = props;

  const handleExpand = () => {
    props.toggleAccordion(props.country.name.common);};

  
  const renderField = (label: string, value: string | string[]) => {
    if (Array.isArray(value) && value.length === 0) {
      return (
        <div style={fieldRowStyle}>
          <strong>{label}:</strong> No information found!
        </div>
      );
    }

    if (Array.isArray(value)) {
      value = value.join(", ");
    }

    return (
      <div style={fieldRowStyle}>
        <strong>{label}:</strong> {value || "No information found!"}
      </div>
    );
  };


  return (<Accordion elevation={3} style={{padding: "16px"}}  expanded={props.expanded === props.country.name.common} onChange={()=>handleExpand()}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{country.name.common}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="country-info">
              {renderField("Official name", country.name.official)}
              {renderField("Capital", country.capital.join(", "))}
              {renderField("Population", country.population.toLocaleString())}
              {renderField("Subregion", country.subregion)}
              {renderField("Currencies", Object.keys(country.currencies))}
              {renderField("Languages", Object.values(country.languages))}
          </div>
          </AccordionDetails>
        </Accordion>)
}
const fieldRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "8px",
};
