export const fetchCountriesByContinent = async (continent: string) => {
  try {
    const response = await fetch("https://countries.trevorblades.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query($selectedContinent: String!) {
            countries(filter: { continent: { eq: $selectedContinent } }) {
              code
              name
            }
          }
        `,
        variables: {
          selectedContinent: continent,
        },
      }),
    });

    const { data } = await response.json();
    if (response.ok) {
      return data.countries;
    } else {
      throw new Error("Failed to fetch countries");
    }
  } catch (error) {
    throw new Error("An error occurred while fetching countries");
  }
};
