// Libraries
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";

const baseUrl = "http://localhost:3011";

export async function cartLoader() {
  let cartlist = await axios
    .get(`${baseUrl}/carts`)
    .then((result) => result.data);
  return cartlist;
}

export async function addAction({ request, params }) {
  let formData = await request.formData();
  const cart = Object.fromEntries(formData);
  let result = await axios
    .post(`${baseUrl}/cart/add/${params.product_id}`, {
      price: cart.price,
    })
    .then((new_cart) => new_cart.data);

  return result;
}
export async function removeAction({ request, params }) {
  let result = await axios
    .post(`${baseUrl}/cart/remove/${params.id}`)
    .then((result) => result.data);
  return result;
}

export async function updateQuantityAction({ request, params }) {
  let formData = await request.formData();
  const cart = Object.fromEntries(formData);

  let result = await axios
    .post(`${baseUrl}/cart/update-quantity/${params.id}`, {
      quantity: cart.quantity,
    })
    .then((new_cart) => new_cart.data);

  return result;
}

export async function summaryLoader({ request, params }) {
  let summary = await axios
    .get(`${baseUrl}/carts/summary`)
    .then((result) => result.data);

  return summary;
}
