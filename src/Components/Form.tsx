import { Button, Input } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React from "react";

const continents = {
  AF: "Africa",
  AS: "Asia",
  EU: "Europe",
  NA: "North America",
  SA: "South America",
  OC: "Oceania",
  AN: "Antarctica",
};

interface Props {
  toggleSelectContinent: (continent: string) => void;
  selectedContinent: string;
  toggleSetNumberOfCountries: (numberOfCountries: number) => void;
  numberOfCountries: number;
  toggleFetch: () => void;
  buttonDisabled: boolean;
}

export default function Form(props: Props) {
  const handleChangeContinent = (event: SelectChangeEvent) => {
    props.toggleSelectContinent(event.target.value);
  };

  const handleChangeNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    props.toggleSetNumberOfCountries(newValue);
  };

  const handleFetch = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    props.toggleFetch();
  };

  return (
    <React.Fragment>
      <form
        onSubmit={handleFetch}
        style={{
          display: "grid",
          margin: "auto",
          maxWidth: "500px",
        }}
      >
        <label>Select a continent</label>
        <FormControl required sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Continent</InputLabel>
          <Select
            autoWidth
            value={props.selectedContinent}
            label="Continent *"
            onChange={handleChangeContinent}
          >
            <MenuItem value="">
              <em>Select Continent</em>
            </MenuItem>
            {Object.entries(continents).map(([code, name]) => (
              <MenuItem key={code} value={code}>
                {name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Required</FormHelperText>
        </FormControl>
        <label>Number of countries to display</label>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Number of countries</InputLabel>

          <Input
            value={props.numberOfCountries}
            size="small"
            onChange={handleChangeNumber}
            inputProps={{
              min: 2,
              max: 10,
              type: "number",
            }}
          />
        </FormControl>
        <Button
          disabled={props.buttonDisabled}
          variant="contained"
          type="submit"
        >
          Get countries!
        </Button>
      </form>
    </React.Fragment>
  );
}
