import axios from "axios";
import {
  ADD_TO_CART,
  REMOVE_ITEM_CART,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";

// Add items top cart
export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.stock,
      quantity,
    },
  });

  // We need to load data using local storage from caritem on page reload
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Remove item from cart
export const removeItemFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_ITEM_CART,
    payload: id,
  });

  // We need to load data using local storage from caritem on page reload
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Save shipping info
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  // We need to load data using local storage from shippingInfo on page reload
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
