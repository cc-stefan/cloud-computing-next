import Head from "next/head";
import LocationsList from "@/js/components/LocationList";
import { Container, Grid, Typography } from "@mui/material";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Weather App</title>
      </Head>

      <main>
        <Container>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={5}
          >
            <Grid item>
              <Typography variant="h3">Weather App</Typography>
            </Grid>
            <Grid item>
              <LocationsList />
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
