import { Alert, Fade, Slide, SlideProps, Snackbar } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import React, { SyntheticEvent, useEffect, useState } from "react";

import { fetchCountriesByContinent, fetchCountryDetails } from "../API/api";
import CountryDetail from "../Components/CountryDetail";
import Form from "../Components/Form";
import Skeleton from "../Components/Skeleton";

const PROGRESS_ANIMATION_TIME = 1000;

function SlideTransition(props: JSX.IntrinsicAttributes & SlideProps) {
  return <Slide {...props} direction="left" />;
}

interface Country {
  name: string;
  continent: string;
}

export type CountryDetails = {
  capital: string[];
  currencies: { [code: string]: { [key: string]: string } };
  languages: { [code: string]: string };
  name: {
    common: string;
    official: string;
    nativeName: { [code: string]: string };
  };
  population: number;
  subregion: string;
};

export default function Home() {
  const [selectedContinent, setSelectedContinent] = useState<string>("");
  const [numberOfCountries, setNumberOfCountries] = useState<number>(2);
  const [countries, setCountries] = useState<Country[]>([]);
  const [countryDetails, setCountryDetails] = useState<CountryDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loadingCountryDetails, setLoadingCountryDetails] = useState<boolean>(
    false
  );
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const timer = React.useRef<number>();
  const [expanded, setExpanded] = React.useState<string>("");

  const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);

  const toggleSelectContinent = (continent: string) => {
    setSelectedContinent(continent);
  };

  const toggleSetNumberOfCountries = (numberOfCountries: number) => {
    setNumberOfCountries(numberOfCountries);
  };
  const toggleAccordion = (panel: string) => {
    if (panel === expanded) {
      setExpanded("");
      return;
    }
    setExpanded(panel);
  };

  const fetchDetails = async () => {
    try {
      setRefreshing(true);
      setLoadingCountryDetails(true); // Set loading state for country details
      const countryDetailsPromises = countries.map((country) =>
        fetchCountryDetails(country.name).catch((error) => {
          console.error(`Error fetching details for ${country.name}:`, error);
          throw error;
        })
      );
      const countryDetailsResponse = (
        await Promise.all(countryDetailsPromises)
      ).flat();

      setCountryDetails(countryDetailsResponse);
      setError("");
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
        setError(err.message);
        setOpenSnackBar(true);
      } else {
        console.log("Unexpected error", err);
        setError("Unexpected error");
      }
    } finally {
      timer.current = window.setTimeout(() => {
        setRefreshing(false);
      }, PROGRESS_ANIMATION_TIME);
      setLoadingCountryDetails(false);
    }
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
        setOpenSnackBar(true);
      } else {
        console.log("Unexpected error", err);
        setError("Unexpected error");
      }
    }
  };

  const handleFetching = () => {
    setLoading(true);
    fetchCountries();
    setLoading(false);
  };

  useEffect(() => {
    if (countries.length > 0) {
      fetchDetails();
    }
  }, [countries]);

  const handleCloseSnackBar = (
    event: Event | SyntheticEvent<Element, Event>,
    reason: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  const handleCloseSnackBarAlert = (event: SyntheticEvent<Element, Event>) => {
    setOpenSnackBar(false);
  };

  return (
    <div
      style={{
        padding: "10px",
        maxWidth: "500px",
        margin: "auto",
      }}
    >
      <Snackbar
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        TransitionComponent={SlideTransition}
      >
        <Alert
          onClose={handleCloseSnackBarAlert}
          severity="error"
          sx={{ width: "100%" }}
          elevation={6}
          variant="filled"
        >
          {error}
        </Alert>
      </Snackbar>
      <h1>Discover Countries by Continent</h1>
      <Form
        selectedContinent={selectedContinent}
        toggleSelectContinent={toggleSelectContinent}
        numberOfCountries={numberOfCountries}
        toggleSetNumberOfCountries={toggleSetNumberOfCountries}
        toggleFetch={handleFetching}
        buttonDisabled={refreshing || selectedContinent === ""}
      />
      {(loading || loadingCountryDetails) && <Skeleton />}
      {countryDetails.length > 0 && !loading && !loadingCountryDetails ? (
        <div>
          <h2>Country Details</h2>
          {countryDetails.map((country, index) => (
            <CountryDetail
              key={index}
              country={country}
              toggleAccordion={toggleAccordion}
              expanded={expanded}
            />
          ))}
        </div>
      ) : null}
      <div
        style={{
          position: "fixed",
          left: "0",
          right: "0",
          bottom: "0",
          zIndex: "10",
        }}
      >
        <Fade in={refreshing} unmountOnExit>
          <LinearProgress sx={{ height: "8px" }} />
        </Fade>
      </div>
    </div>
  );
}
