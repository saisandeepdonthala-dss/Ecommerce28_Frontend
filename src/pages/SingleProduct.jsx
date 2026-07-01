import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./singleproduct.css";

function SingleProduct() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  async function getSingleProduct() {
    try {

      const res = await axios.get(
        `https://sandeep-ecom28db.duckdns.org/api/admin/item/${id}`,
        {
          withCredentials: true
        }
      );

      setProduct(res.data.product);
console.log(res.data.product)
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  }

  useEffect(() => {
    getSingleProduct();
  }, []);

  if (!product) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>

     

      <div className="single-product-page">

        <div className="container">
          <div className="row justify-content-center">

            <div className="col-lg-10">

              <div className="product-card">

                <div className="row g-0">

                  {/* IMAGE */}
                  <div className="col-md-6">
                    <img
                      src={product.image}
                      alt={product.itemname}
                      className="product-image"
                    />
                  </div>

                  {/* DETAILS */}
                  <div className="col-md-6">
                    <div className="product-details">

                      <h1 className="product-title">
                        {product.itemname}
                      </h1>

                      <p className="product-desc">
                        {product.item_desc}
                      </p>

                      <div className="product-about">
                        {product.item_about}
                      </div>

                      <h2 className="product-price">
                        ₹{product.price}
                      </h2>

                      <div className="product-info">

                        <span className="info-badge">
                          Quantity: {product.quantity}
                        </span>

                        <span className="info-badge">
                          {product.category}
                        </span>

                      </div>

                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </>
  );
}

export default SingleProduct;