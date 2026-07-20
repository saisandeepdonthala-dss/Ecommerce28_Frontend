// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./myorders.css"; // Import CSS file

// function MyOrders() {
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const navigate = useNavigate();

//     useEffect(() => {
//         fetchOrders();
//     }, []);

//     async function fetchOrders() {
//         try {
//             const res = await axios.get(
//                 "https://sandeep-ecom28db.duckdns.org/api/myorders",
//                 {
//                     withCredentials: true
//                 }
//             );

//             setOrders(res.data.orders || []);
//         } catch (error) {
//             console.log(error);
//         } finally {
//             setLoading(false);
//         }
//     }

//     return (
//         <div className="container mt-4">

//             <h2>My Orders</h2>

//             {loading ? (
//                 <p>Loading...</p>
//             ) : orders.length === 0 ? (
//                 <p>No orders found</p>
//             ) : (
//                 <div className="row">
//                     {orders.map((order) => (
//                         <div key={order.orderid} className="col-md-6 mb-3">

//                             <div className="card p-3 shadow-sm">

//                                 <h5>Order ID: {order.orderid}</h5>

//                                 <p>
//                                     Total: ₹
//                                     {order?.grand_total ||
//                                         order?.total ||
//                                         order?.amount ||
//                                         "N/A"}
//                                 </p>

//                                 <p>
//                                     Status: {order?.status || "Completed"}
//                                 </p>

//                               <div className="row">
//                                 <div className="col-3">
//                                   <button
//                                     className="btn btn-primary btn-sm mb-2"
//                                     onClick={() =>
//                                         navigate(`/order/${order.orderid}`)
//                                     }
//                                 >
//                                     View Details
//                                 </button>

                               

//                                 </div>
//                                 <div className="col-3">
//                                      <a
//                                     className="btn btn-success btn-sm"
//                                     href={`https://sandeep-ecom28db.duckdns.org/api/invoice/${order.orderid}`}
//                                     target="_blank"
//                                     rel="noreferrer"
//                                 >
//                                     Download Invoice
//                                 </a>
//                                 </div>
//                               </div>
//                             </div>

//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }

// export default MyOrders;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./myorders.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const res = await axios.get(
        "https://sandeep-ecom28db.duckdns.org/api/myorders",
        {
          withCredentials: true,
        }
      );

      setOrders(res.data.orders || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="myorders-container">

      <h2 className="page-title">My Orders</h2>

      {loading ? (
        <h4 className="text-center mt-5">Loading...</h4>
      ) : orders.length === 0 ? (
        <h4 className="text-center mt-5">No Orders Found</h4>
      ) : (
        <div className="row g-4">

          {orders.map((order) => (
            <div
              key={order.orderid}
              className="col-lg-6 col-md-6 col-sm-12"
            >
              <div className="order-card">

                <div className="order-header">
                  <h4>Order #{order.orderid}</h4>

                  <span className="status">
                    {order?.status || "Completed"}
                  </span>
                </div>

                <div className="order-body">

                  <div className="order-item">
                    <span>Total Amount</span>
                    <strong>
                      ₹
                      {order?.grand_total ||
                        order?.total ||
                        order?.amount ||
                        "N/A"}
                    </strong>
                  </div>

                </div>

                <div className="order-buttons">

                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      navigate(`/order/${order.orderid}`)
                    }
                  >
                    View Details
                  </button>

                  <a
                    className="btn btn-success"
                    href={`https://sandeep-ecom28db.duckdns.org/api/invoice/${order.orderid}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Download Invoice
                  </a>

                </div>

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default MyOrders;