// Libraries
import {
  Link,
  useNavigate,
  useFetcher,
  useSubmit,
} from "react-router-dom";

// MUI Components
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";

// MUI icons
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

import { useCart } from "../contexts/cart";

let PHPPrice = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
});

const CartItem = ({ _id, product, price, total_price, quantity }) => {
  const fetcher = useFetcher();
  const submit = useSubmit();
  const navigate = useNavigate();
  return (
    <>
      <ListItem
        sx={{
          justifyContent: "space-around",
          alignItems: "flex-start",
        }}
      >
        <Box>
          <img
            src={`http://localhost:${3011}/images/products/${
              product.img_name
            }`}
            alt="carrot"
            style={{
              width: "50px",
              height: "50px",
              background:
                "linear-gradient(223deg, #0093E9 8%, #80D0C7 100%)",

              borderRadius: "100%",
            }}
          />
        </Box>
        <Box display="flex" flexDirection="column" width="60%">
          <Typography fontWeight="bold">{product.name}</Typography>
          <Typography fontWeight="bold">
            {product.category.toUpperCase()}
          </Typography>
          <Divider />
          <Box display="flex" gap="2px">
            <Box textAlign="end" width={200}>
              <Typography>price:</Typography>
              <Typography sx={{ pt: "3px" }}>quantity:</Typography>
              <Typography>total price:</Typography>
            </Box>
            <Box
              component={fetcher.Form}
              method="post"
              action={`/cart/update-quantity/${_id}`}
            >
              <Typography>{PHPPrice.format(price)}</Typography>
              <TextField
                id="quantity"
                name="quantity"
                defaultValue={quantity}
                type="number"
                sx={{
                  "& .MuiInputBase-input": {
                    p: "2.5px 10px",
                  },
                }}
              />
              <Typography>{PHPPrice.format(total_price)}</Typography>
            </Box>
          </Box>
        </Box>
        <Box
          component={fetcher.Form}
          method="post"
          action={`/cart/remove/${_id}`}
        >
          <IconButton color="error" type="submit">
            <DeleteIcon />
          </IconButton>
        </Box>
      </ListItem>
      <Divider />
    </>
  );
};

function Cart({ anchorCart, handleCloseCart }) {
  const { cartList } = useCart();

  return (
    <Drawer anchor="right" open={anchorCart} onClose={handleCloseCart}>
      <Box sx={{ width: 340 }}>
        <List>
          <ListItem disablePadding>
            <Button onClick={handleCloseCart}>
              <CloseIcon />
            </Button>
            <Typography
              variant="h5"
              fontWeight="bold"
              m="11px 0 10px 42px"
              sx={{ flexGrow: 1 }}
            >
              Your Cart
            </Typography>
          </ListItem>
          <Divider />
          {/* Cart items */}
          {cartList.map((cart) => {
            return <CartItem key={cart._id} {...cart} />;
          })}
          <ListItem sx={{ justifyContent: "center" }}>
            {cartList.length ? (
              <Button
                variant="contained"
                sx={{ width: "80%", alignSelf: "center" }}
                onClick={handleCloseCart}
              >
                <Link to="/checkout" style={{ textDecoration: "none" }}>
                  <Typography
                    fontWeight="bold"
                    color="#f2f2f2"
                    padding="10px 0"
                  >
                    Buy All Now
                  </Typography>
                </Link>
              </Button>
            ) : (
              <Typography
                textAlign="center"
                variant="h4"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                No added to cart yet...
              </Typography>
            )}
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}

export default Cart;
