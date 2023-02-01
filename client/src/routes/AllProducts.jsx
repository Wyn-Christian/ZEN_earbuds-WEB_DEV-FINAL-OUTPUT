// Libraries
import axios from "axios";
import { useLoaderData } from "react-router-dom";

// MUI Component
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

// Custom Component
import CardProduct from "../components/CardProduct";

export async function allProductsLoader() {
  let products = await axios
    .get("http://localhost:3011/products")
    .then((result) => result.data);

  return products;
}

function AllProducts() {
  const products = useLoaderData();

  return (
    <Container>
      <Typography variant="h1" textAlign="center" mt={2}>
        All Products
      </Typography>
      <Grid
        container
        rowSpacing={3}
        columnSpacing={{ xs: 1, sm: 1, md: 3 }}
      >
        {products.map((item) => (
          <CardProduct key={item.id} {...item} />
        ))}
      </Grid>
    </Container>
  );
}

export default AllProducts;
