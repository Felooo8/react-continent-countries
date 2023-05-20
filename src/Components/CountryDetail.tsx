import React from "react";
import type {CountryDetails} from "../Screens/Home";

interface Props {
  country: CountryDetails;
}

export default function CountryDetail(props: Props) {
  return <div>{props.country.name.common}</div>;
}
