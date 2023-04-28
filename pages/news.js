import { useRouter } from "next/router";
import { Container } from "@mui/material";
import CityNews from "@/js/components/CityNews";

const NewsPage = () => {
  const router = useRouter();
  const { city } = router.query;

  return (
    <Container sx={{ marginBottom: "40px;", marginTop: "40px;" }}>
      {city && <CityNews city={city} />}
    </Container>
  );
};

export default NewsPage;
