import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./adminproducts.css";

function AdminProducts() {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  async function getProducts() {
    try {

      const res = await axios.get(
        "https://sandeep-ecom28db.duckdns.org/api/admin/items",
        {
          withCredentials: true
        }
      );

      setProducts(res.data.products || res.data);

    } catch (error) {
      console.log(error.response?.data || error.message);
      navigate("/login");
    }
  }

  async function deleteProduct(id) {
    try {

      const res = await axios.delete(
        `https://sandeep-ecom28db.duckdns.org/api/admin/delete-item/${id}`,
        {
          withCredentials: true
        }
      );

      alert(res.data.message);

      getProducts();

    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      

      {/* CUSTOM STYLE */}
     

      <div className="products-page">

        <h1 className="page-title">
          Admin Products
        </h1>

        <div className="container">
          <div className="row g-4">

            {products.map((item) => (
              
              <div
                className="col-12 col-sm-6 col-lg-4"
                key={item.itemid}
              >
                <div className="product-card">

<img
  src={item.image}
  alt={item.itemname}
  className="product-img"
/>
                  <div className="product-body">

                    <h2 className="product-title">
                      {item.itemname}
                    </h2>

                    <p className="product-desc">
                      {item.item_desc}
                    </p>

                    <h3 className="product-price">
                      ₹{item.price}
                    </h3>

                    <div className="d-flex gap-2 mt-4 flex-wrap">

                      <Link
                        to={`/single/${item.itemid}`}
                        className="btn-custom view-btn"
                      >
                        View
                      </Link>

                      <Link
                        to={`/edit/${item.itemid}`}
                        className="btn-custom edit-btn"
                      >
                        Edit
                      </Link>

                      <button
                        className="btn-custom delete-btn"
                        onClick={() => deleteProduct(item.itemid)}
                      >
                        Delete
                      </button>

                    </div>

                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </>
  );
}

export default AdminProducts;