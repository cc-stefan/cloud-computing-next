import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchWeather from "@/js/components/SearchWeather";

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
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => deleteLocation(location._id)}
                          >
                            Delete
                          </Button>
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
