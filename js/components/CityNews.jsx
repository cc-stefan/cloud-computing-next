import { useEffect, useState } from "react";
import axios from "axios";
import { Grid, IconButton, Stack, Typography } from "@mui/material";
import CityNewsCard from "@/js/components/CityNewsCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";

const CityNews = ({ city }) => {
  const router = useRouter();
  const [news, setNews] = useState([]);

  useEffect(() => {
    if (city) {
      const fetchNews = async () => {
        try {
          const response = await axios.get(
            `https://newsapi.org/v2/everything?q=${city}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
          );
          setNews(response.data.articles);
        } catch (error) {
          console.error("Failed to fetch news:", error);
        }
      };

      fetchNews();
    }
  }, [city]);

  const goBack = () => {
    router.push("/");
  };

  return city ? (
    <Grid container spacing={1}>
      <Grid item>
        <Stack direction="row" spacing={1}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            onClick={goBack}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" component="h1" gutterBottom>
            News for {city}
          </Typography>
        </Stack>
      </Grid>
      <Grid item container spacing={3}>
        {news.length > 0 ? (
          news.map((article) => (
            <Grid item xs={12} sm={6} md={4} key={article.url}>
              <CityNewsCard article={article} />
            </Grid>
          ))
        ) : (
          <Grid item>
            <Typography variant="h4" component="h1">
              Unfortunately, this city has no news.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Grid>
  ) : (
    <Typography variant="h4" component="h1">
      Please provide a city to fetch news.
    </Typography>
  );
};

export default CityNews;
