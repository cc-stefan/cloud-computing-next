import { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchWeather from "@/js/components/SearchWeather";
import { useRouter } from "next/router";

const LocationsList = () => {
  const [locations, setLocations] = useState([]);

  const fetchLocations = async () => {
    try {
      const response = await axios.get("/api/records");
      if (Array.isArray(response.data.data)) {
        setLocations(response.data.data);
      } else {
        setLocations([]);
        console.error("Locations data is not an array");
      }
    } catch (error) {
      console.error("Failed to fetch locations:", error);
    }
  };

  const deleteLocation = async (id) => {
    try {
      await axios.delete(`/api/records?id=${id}`).then(fetchLocations);
    } catch (error) {
      console.error("Failed to delete location:", error);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const router = useRouter();

  const showNews = (city) => {
    router.push(`/news?city=${encodeURIComponent(city)}`);
  };

  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={3}
      >
        <Grid item>
          <SearchWeather onLocationAdded={fetchLocations} />
        </Grid>
        <Grid
          item
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={1}
        >
          <Grid
            item
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <Typography variant="h6">Locations history</Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={fetchLocations} color="primary">
                <RefreshIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Location</TableCell>
                    <TableCell>Weather</TableCell>
                    <TableCell>Temperature</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {locations.length > 0 ? (
                    locations.map((location) => (
                      <TableRow key={location._id}>
                        <TableCell>{`${location.name}, ${location.countryCode}`}</TableCell>
                        <TableCell>{location.weather}</TableCell>
                        <TableCell>{`${Math.round(
                          location.temperature
                        )}°C`}</TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1}>
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() =>
                                showNews(
                                  `${location.name}, ${location.countryCode}`
                                )
                              }
                            >
                              Show News
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => deleteLocation(location._id)}
                            >
                              Delete
                            </Button>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell>Locations history is empty!</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default LocationsList;
