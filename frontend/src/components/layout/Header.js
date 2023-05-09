import React, { Fragment } from "react";
import Search from "./Search";
import "../../App.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { logoutUser } from "../../actions/userActions";

const Header = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const handleLogout = async () => {
    dispatch(logoutUser());
    alert.success("Logged out successfully.");
  };

  return (
    <Fragment>
      {" "}
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to="/">
              <img
                src="https://source.unsplash.com/random/30x30?logo"
                alt="logo"
              />
            </Link>
          </div>
        </div>

        {/** We cannot pass history so we use route to pass it in component */}
        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Search />
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <Link to={"/cart"} style={{ textDecoration: "none" }}>
            <span id="cart" className="ml-3">
              Cart
            </span>
            <span className="ml-1" id="cart_count">
              {cartItems.length}
            </span>
          </Link>
          {user ? (
            <div className="ml-4 dropdown d-inline">
              <Link
                to={"/"}
                className="btn dropdown-toggle text-white mr-4"
                type="button"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className="rounded-circle"
                  />
                </figure>
                <span>{user && user.name}</span>
              </Link>
              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                {user && user.role === "admin" && (
                  <Link to={"/dashboard"} className="dropdown-text">
                    Dashboard
                  </Link>
                )}
                <Link to={"/orders/me"} className="dropdown-text">
                  Orders
                </Link>
                <Link to={"/me"} className="dropdown-text">
                  Profile
                </Link>
                <Link
                  to={"/"}
                  className="dropdown-text text-danger"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link to="/login" className="btn" id="login_btn">
                Login
              </Link>
            )
          )}
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
