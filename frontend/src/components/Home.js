import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import MetaData from "./layout/MetaData";
import Loader from "../components/layout/Loader";
import Product from "../components/product/product";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "../App.css";
import { useParams } from "react-router-dom";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const Home = () => {
  const { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes",
    "Shoes",
    "Beauty",
    "Health",
    "Sports",
    "Outdoors",
    "Home",
  ];
  const [price, setPrice] = useState([1, 1000]);
  const alert = useAlert();
  const dispatch = useDispatch();
  const {
    loading,
    products,
    error,
    productCount,
    resultsPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.product);

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    dispatch(getProducts(keyword, currentPage, price, category, rating));
  }, [alert, dispatch, error, currentPage, keyword, price, category, rating]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let count = filteredProductsCount;

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Buy best products online"} />
          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {/* {keyword ? ( */}
              <Fragment>
                <div className="col-6 col-md-3 mt-5 mb-5">
                  <div className="PX-5">
                    <Range
                      marks={{
                        1: `$1`,
                        1000: `$1000`,
                      }}
                      min={1}
                      max={1000}
                      defaultValue={[1, 1000]}
                      value={price}
                      onChange={(price) => setPrice(price)}
                    />
                    <hr className="mt-5" />
                    <div className="mt-5">
                      <h4 className="mb-3">Categories</h4>
                      <ul className="pl-0">
                        {categories.map((category) => (
                          <li
                            key={category}
                            style={{ cursor: "pointer", listStyleType: "none" }}
                            onClick={() => {
                              setCategory(category);
                            }}
                          >
                            {category}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <hr className="mt-3" />
                    <div className="mt-5">
                      <h4 className="mb-3">Ratings</h4>
                      <ul className="pl-0">
                        {[5, 4, 3, 2, 1].map((star) => (
                          <li
                            key={star}
                            style={{ cursor: "pointer", listStyleType: "none" }}
                            onClick={() => {
                              setRating(star);
                            }}
                          >
                            <div className="rating-outer">
                              <div
                                className="rating-inner"
                                style={{ width: `${star * 20}%` }}
                              ></div>
                            </div>
                            {star}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-9">
                  <div className="row">
                    {products &&
                      products.map((product) => (
                        <Product key={product._id} product={product} />
                      ))}
                  </div>
                  {resultsPerPage < count && (
                    <div className="d-flex justify-content-center mt-5">
                      <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={resultsPerPage}
                        totalItemsCount={productCount}
                        onChange={setCurrentPageNo}
                        nextPageText={"Next"}
                        prevPageText={"Prev"}
                        firstPageText={"First"}
                        lastPageText={"Last"}
                        itemClass="page-item"
                        linkClass="page-link"
                      />
                    </div>
                  )}
                </div>
              </Fragment>
              {/* ) : ( */}
              {/* )} */}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
