import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./orderdetails.css";

function OrderDetails() {
  const { orderid } = useParams();

  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchOrder();
  }, []);

  async function fetchOrder() {
    try {
      const res = await axios.get(
        `https://sandeep-ecom28db.duckdns.org/api/orders/${orderid}`,
        {
          withCredentials: true,
        }
      );

      setOrder(res.data.order);
      setItems(res.data.items);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="order-details-page">

      <h2 className="fw-bold mb-4">Order Details</h2>

      {order && (
        <div className="card order-card">

          <h4 className="order-id">
            Order ID: #{order.orderid}
          </h4>

          <div className="order-info">

            <div className="info-box">
              <span>Total Amount</span>
              <h5>₹{order.grand_total}</h5>
            </div>

            <div className="info-box">
              <span>Payment Status</span>
              <h5 className="status-paid">Paid</h5>
            </div>

          </div>

        </div>
      )}

      <h4 className="mb-4">Ordered Items</h4>

      <div className="row">

        {items.map((item, index) => (
          <div
            className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
            key={index}
          >
            <div className="card product-card">

              <img
                src={
                  item?.item_image ||
                  item?.item?._image ||
                  "https://via.placeholder.com/300"
                }
                alt={item?.item_name || "Product"}
                className="product-img"
              />

              <div className="card-body">

                <h6
                  className="product-title"
                  title={item?.item_name}
                >
                  {item?.item_name}
                </h6>

                <p>
                  <strong>Quantity :</strong> {item?.item_quantity}
                </p>

                <p className="price">
                  ₹{item?.item_price || item?.subtotal || "N/A"}
                </p>

              </div>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default OrderDetails;