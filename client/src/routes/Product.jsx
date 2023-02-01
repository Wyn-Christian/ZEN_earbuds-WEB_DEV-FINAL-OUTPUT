// Libraries
import axios from "axios";
import { useLoaderData } from "react-router-dom";

// MUI Component
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

let PHPPrice = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
});

export async function productLoader({ params }) {
  let product = await axios
    .get("http://localhost:3011/product/" + params.id)
    .then((result) => result.data);
  console.log({ product });
  return product;
}

function Product() {
  const product = useLoaderData();
  return (
    <Container>
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          pt: "10vh",
        }}
      >
        <Typography variant="h2" sx={{ pb: "20px" }}>
          {product.name.toUpperCase()}
        </Typography>
        <Grid container width="100%">
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            sx={{
              display: "flex",
              justifyContent: {
                xs: "center",
                sm: "end",
              },
              padding: "10px 20px",
              width: {
                xs: "100%",
                sm: "41%",
                md: "16.67%",
              },
            }}
          >
            <Paper
              sx={{
                p: 0,
                m: 0,
                width: "80%",
                height: "auto",
                backgroundImage:
                  "linear-gradient(223deg, #0093E9 8%, #80D0C7 100%)",
                borderRadius: "20px",
              }}
              elevation={5}
            >
              <img
                src={`http://localhost:${3011}${product.img_url}`}
                alt="product"
                style={{
                  width: "100%",
                }}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={6} sx={{ p: "20px" }}>
            <Typography variant="h4">{product.subtitle}</Typography>
            <Typography variant="h6">
              {product.category.toUpperCase()}
            </Typography>
            <Typography variant="body1" sx={{ pb: "20px" }}>
              {product.description}
            </Typography>
            <Typography variant="h5">
              Price: {PHPPrice.format(product.price)}
            </Typography>
            <FormControl
              variant="standard"
              sx={{
                m: 1,
                minWidth: 120,
                width: "100%",
                textAlign: "center",
              }}
            >
              <Button
                sx={{
                  mt: "20px",
                  color: "#fff",
                  fontWeight: "bold",
                  alignSelf: {
                    xs: "flex-start",
                  },
                  width: "50%",
                }}
                variant="contained"
              >
                Add to cart
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Product;
