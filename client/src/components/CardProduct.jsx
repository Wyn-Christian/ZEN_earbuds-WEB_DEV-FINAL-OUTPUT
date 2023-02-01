// Libraries
import { useNavigate, useFetcher, Form } from "react-router-dom";

// MUI Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

let PHPPrice = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
});

function CardProduct({
  id,
  name,
  category,
  price,
  description,
  subtitle,
  img_url,
}) {
  const navigate = useNavigate();
  const fetcher = useFetcher();

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          display: {
            xs: "flex",
            sm: "block",
          },
          // flexDirection: "column",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            height: {
              xs: 250,
              sm: 300,
              md: 350,
            },
            backgroundColor: "#0093E9",
            backgroundImage:
              "linear-gradient(223deg, #0093E9 8%, #80D0C7 100%)",

            width: {
              xs: 200,
              sm: "100%",
            },
          }}
          image={`http://localhost:3011${img_url}`}
          alt="sample"
        />
        <Divider sx={{ height: "100%" }} />
        <CardContent
          sx={{
            p: {
              xs: "10px 0 0 20px",
              sm: "10px 0 0 0",
            },
            "&:last-child": { pb: "0" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Typography variant="h5" fontWeight="bold">
              {name}
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              {PHPPrice.format(price)}
            </Typography>
            <Typography variant="body1" sx={{ m: "0 0 10px 10px" }}>
              {subtitle}
            </Typography>
            <Divider sx={{ width: "100%" }} />
            <Box
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              width="100%"
              height="100%"
              p={{ xs: 0, sm: "20px 0" }}
            >
              <Button
                sx={{
                  height: "30px",
                  p: "20px",
                  fontSize: {
                    xs: "12px",
                    sm: "15px",
                  },
                }}
                variant="contained"
                onClick={() => navigate(`/product/${id}`)}
              >
                See more
              </Button>
              <fetcher.Form method="post" action={`/cart/add/${id}`}>
                <input type="hidden" name="price" defaultValue={price} />
                <Button
                  type="submit"
                  sx={{
                    height: "30px",
                    p: "20px",
                    fontSize: {
                      xs: "12px",
                      sm: "15px",
                    },
                  }}
                  variant="contained"
                >
                  Add to Cart
                </Button>
              </fetcher.Form>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default CardProduct;
