import { Outlet, useLoaderData } from "react-router-dom";
import { useEffect } from "react";

// MUI Components
// Note: Due to some internal error of yarn, `CssBaseline` should be
// imported first before the `Box` module
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

// Custom components
import Navbar from "../components/Navbar";

// Contexts hook
import { useCart } from "../contexts/cart";

function Root() {
  const cartlist = useLoaderData();
  const { setCartList } = useCart();

  useEffect(() => {
    setCartList(cartlist);
  }, [cartlist]);

  return (
    <Box>
      <CssBaseline />
      <Navbar />
      <Box mb="10vh">
        <Outlet />
      </Box>
    </Box>
  );
}

export default Root;
