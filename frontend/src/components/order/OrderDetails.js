import React, { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader";
import { orderDetails, clearErrors } from "../../actions/orderActions";

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, order } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    dispatch(orderDetails(id));
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [alert, dispatch, error, id]);

  return (
    <Fragment>
      <MetaData title={"Order Details"} />
      <h1 className="my-5">Order Details</h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8 mt-5 order-details">
            <h1 className="my-5">{order._id}</h1>

            <h4 className="mb-4">Shipping Info</h4>
            <p>
              <b>Name:</b> {order?.user && order?.user.name}
            </p>
            <p>
              <b>Phone:</b> {order?.shippingInfo?.phoneNo}
            </p>
            <p className="mb-4">
              <b>Address:</b>
              {order?.shippingInfo?.address}
            </p>
            <p>
              <b>Amount:</b> ${order.totalPrice}
            </p>

            <hr />

            <h4 className="my-4">Payment</h4>
            {order?.paymentInfo && order?.paymentInfo.status === "succeeded" ? (
              <p className="greenColor">
                <b>Paid</b>
              </p>
            ) : (
              <p className="redColor">
                <b>Pending</b>
              </p>
            )}

            <h4 className="my-4">Order Status:</h4>
            {order.orderStatus === "Delivered" ? (
              <p className="greenColor">
                <b>{order.orderStatus}</b>
              </p>
            ) : (
              <p className="redColor">
                <b>{order.orderStatus}</b>
              </p>
            )}

            <h4 className="my-4">Order Items:</h4>

            <hr />
            <div className="cart-item my-1">
              {order &&
                order.orderItems?.map((item, key) => (
                  <div className="row my-5" key={key}>
                    <div className="col-4 col-lg-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        height="45"
                        width="65"
                      />
                    </div>
                    <div className="col-5 col-lg-5">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>
                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p>${item.price}</p>
                    </div>
                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                      <p>{item.quantity} Piece(s)</p>
                    </div>
                  </div>
                ))}
            </div>
            <hr />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default OrderDetails;
