import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const CityNewsCard = ({ article }) => {
  return (
    <Card>
      <CardActionArea href={article.url} target="_blank">
        <CardMedia
          component="img"
          height="180"
          image={article.urlToImage || "/placeholder-news.jpg"}
          alt={article.title}
        />
        <Box sx={{ height: 200 }}>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {article.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {article.description}
            </Typography>
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default CityNewsCard;
