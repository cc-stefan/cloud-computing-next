import { useState } from "react";
import axios from "axios";
import { Button, Grid, TextField, Typography } from "@mui/material";

const SearchWeather = ({ onLocationAdded }) => {
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");

  const search = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!city) {
      setMessage("Please enter a location");
      return;
    }

    try {
      const weatherResponse = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${city}`
      );
      const weatherData = weatherResponse.data;

      if (weatherData) {
        const location = {
          name: weatherData.location.name,
          countryCode: weatherData.location.country,
          temperature: weatherData.current.temp_c,
          weather: weatherData.current.condition.text,
        };

        await axios.post("/api/records", location).then(setCity(""));
        onLocationAdded();
        setMessage(`Successfully added ${weatherData.location.name}`);
      }
    } catch (error) {
      setMessage("Failed to search location");
    }
  };

  return (
    <section>
      <Grid
        item
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={1}
      >
        <Grid item>
          <form onSubmit={search}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item>
                <TextField
                  fullWidth
                  size="small"
                  label="Location"
                  variant="outlined"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Grid>
              <Grid item>
                <Button type="submit" variant="contained">
                  Search
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item>
          <Typography variant="subtitle2">{message}</Typography>
        </Grid>
      </Grid>
    </section>
  );
};

export default SearchWeather;
