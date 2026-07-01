import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../store/Slices/ProductSlice";
import "./products.css";

function Products() {

  const { items, loading, error } = useSelector(
    (state) => state.Products
  );

  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  // FILTER PRODUCTS
  const filteredProducts = useMemo(() => {

    return items.filter((s) =>
      s.category.toLowerCase().includes(
        search.toLowerCase()
      )
    );

  }, [items, search]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if (error) {
    return <h2>{error}</h2>;
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <>
      {/* BOOTSTRAP 5 */}
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />

     
      <div className="products-page">

        <h1 className="page-title">
          Products
        </h1>

        {/* SEARCH */}

        <div className="search-box">
          <input
            type="text"
            placeholder="Search by category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control search-input"
          />
        </div>

        {/* PRODUCTS */}

        <div className="container">
          <div className="row g-4">

            {filteredProducts.map((v) => (

              <div
                key={v.itemid}
                className="col-12 col-sm-6 col-lg-3"
              >
                <div className="card product-card">

                  <img
                    src={v.image}
                    alt={v.itemname}
                    className="product-img"
                  />

                  <div className="card-body text-center">

                    <p className="category-text">
                      {v.category}
                    </p>

                    <p className="product-names">
                      {v.itemname}
                    </p>

                    <h4 className="product-price">
                      ₹{v.price}
                    </h4>

                    <p className="quantity">
                      Quantity: {v.quantity}
                    </p>

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

export default Products;