import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import theme from "./contexts/theme";

// Routes
import Root from "./routes/Root";
import Index from "./routes/Index";
import AllProducts, { allProductsLoader } from "./routes/AllProducts";
import Category from "./routes/Category";
import Product, { productLoader } from "./routes/Product";
import Profile from "./routes/Profile";
import CheckoutHistory, {
  checkoutHistoryLoader,
} from "./routes/CheckoutHistory";
import Checkout, { checkoutAction } from "./routes/Checkout";
import ErrorPage from "./routes/ErrorPage";
import { UserProvider } from "./contexts/user";
import {
  addAction,
  cartLoader,
  removeAction,
  summaryLoader,
  updateQuantityAction,
} from "./routes/cart";
import { CartProvider } from "./contexts/cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: cartLoader,
    errorElement: <>Error root page</>,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Index />,
          },
          {
            path: "/all-products",
            element: <AllProducts />,
            loader: allProductsLoader,
          },
          {
            path: "/category",
            element: <Category />,
            loader: allProductsLoader,
          },
          {
            path: "/product/:id",
            element: <Product />,
            loader: productLoader,
          },
          {
            path: "/account",
            element: <Profile />,
          },
          {
            path: "/cart",
            children: [
              {
                path: "add/:product_id",
                action: addAction,
              },
              {
                path: "remove/:id",
                action: removeAction,
              },
              {
                path: "update-quantity/:id",
                action: updateQuantityAction,
              },
            ],
          },
          {
            path: "/checkout-history",
            element: <CheckoutHistory />,
            loader: checkoutHistoryLoader,
          },
          {
            path: "/checkout",
            element: <Checkout />,
            loader: summaryLoader,
            action: checkoutAction,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <UserProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>
);
