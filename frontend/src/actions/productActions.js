import axios from "axios";

import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,
  NEW_REVIEW_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/productConstants";

// Get all products
export const getProducts =
  (keyword = "", currentPage = 1, price, category, rating) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });
      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&rating[gte]=${rating}`;
      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&rating[gte]=${rating}`;
      }
      const data = await axios.get(link);
      dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data.data });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        error: error.response.data.message,
      });
    }
  };

// Get product details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_REQUEST });

    const data = await axios.get(`/api/v1/product/${id}`);
    dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data.data.product });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL_FAIL,
      error: error.response.data.message,
    });
  }
};

// New product review
export const newProductReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = await axios.put("/api/v1/review", reviewData, config);

    dispatch({ type: NEW_REVIEW_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      error: error.response.data.message,
    });
  }
};

//Clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
