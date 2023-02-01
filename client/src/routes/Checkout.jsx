// Libraries
import { useState, useEffect } from "react";
import { useLoaderData, Form, redirect } from "react-router-dom";
import axios from "axios";

// MUI Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { useCart } from "../contexts/cart";

export async function checkoutAction({ request }) {
  let formData = await request.formData();
  const checkout = Object.fromEntries(formData);

  let result = await axios.post(`http://localhost:3011/checkout/create`, {
    checkout_items: JSON.parse(checkout.checkout_items),
    summary: JSON.parse(checkout.summary),
  });
  return redirect("/checkout-history");
}

let PHPPrice = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
});

function Checkout() {
  const { cartList } = useCart();
  const summary = useLoaderData();

  return (
    <Container>
      <Typography variant="h1" textAlign="center" pb="20px">
        Checkout
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Total Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartList.map((cart) => (
                <TableRow key={cart._id}>
                  <TableCell>
                    <Typography fontWeight="bold">
                      {cart.product.name}
                    </Typography>
                  </TableCell>
                  <TableCell>{PHPPrice.format(cart.price)}</TableCell>
                  <TableCell>{cart.quantity} pieces</TableCell>
                  <TableCell>
                    {PHPPrice.format(cart.total_price)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell align="right">
                  <Typography fontWeight="bold">TOTAL</Typography>
                </TableCell>
                <TableCell>{summary.total_products} products</TableCell>
                <TableCell>{summary.total_quantity} pieces</TableCell>
                <TableCell>
                  {PHPPrice.format(summary.total_price)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          component={Form}
          method="post"
          width="100%"
          sx={{ display: "flex", justifyContent: "end" }}
        >
          <input
            type="hidden"
            name="checkout_items"
            defaultValue={JSON.stringify(cartList)}
          />
          <input
            type="hidden"
            name="summary"
            defaultValue={JSON.stringify(summary)}
          />

          <Button
            type="submit"
            sx={{
              width: {
                xs: "100%",
                sm: "30%",
                md: "20%",
              },
              m: "10px 0",
              alignSelf: "end",
            }}
            variant="contained"
          >
            Check Out
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Checkout;
