// Libraries
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

// MUI Component
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

// Custom Component
import CardProduct from "../components/CardProduct";
function Category() {
  const products = useLoaderData();

  const [category, setCategory] = useState("earbuds");

  const handleCategory = (event, newCategory) => {
    if (newCategory !== null) {
      setCategory(newCategory);
    }
  };

  return (
    <Container>
      <Typography variant="h1" textAlign="center" mt={2}>
        Category
      </Typography>

      <ToggleButtonGroup
        value={category}
        exclusive
        onChange={handleCategory}
        sx={{
          display: "flex",
          justifyContent: "center",
          m: "20px",
        }}
        color="primary"
      >
        <ToggleButton value="earbuds">Earbuds</ToggleButton>
        <ToggleButton value="headphone">Headphone</ToggleButton>
        <ToggleButton value="speaker">Speaker</ToggleButton>
      </ToggleButtonGroup>

      <Grid
        container
        rowSpacing={3}
        columnSpacing={{ xs: 1, sm: 1, md: 3 }}
      >
        {products
          .filter((item) => item.category === category)
          .map((item) => (
            <CardProduct key={item.id} {...item} />
          ))}
      </Grid>
    </Container>
  );
}

export default Category;
