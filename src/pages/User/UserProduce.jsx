import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./userproduce.css";

function UserProduce() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();
  const location = useLocation();

  const categories = [
  { label: "All",              value: "All" },
  { label: "Home Appliances",  value: "home_appliences" },
  { label: "Grocery",          value: "Grocery" },
  { label: "Fashion",          value: "Fashion" },
  { label: "Electronics",      value: "Electronics" },
  { label: "Sports",           value: "Sports" },
  { label: "Toys",             value: "toys" },
];

  async function fetchProducts() {
    try {
      const res = await axios.get(
        "https://sandeep-ecom28db.duckdns.org/api/products"
      );
      const data = res.data.products || res.data;
      setProducts(data);
      setFiltered(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
  const params = new URLSearchParams(location.search);
  const cat = params.get("category");
  const search = params.get("search");

  if (search) {
    const term = search.toLowerCase();
    setActiveCategory("All");
    setFiltered(
      products.filter(p =>
        p.itemname?.toLowerCase().includes(term) ||
        p.category?.toLowerCase().includes(term)
      )
    );
  } else if (cat) {
    setActiveCategory(cat);
    setFiltered(products.filter(p => p.category === cat));
  } else {
    setActiveCategory("All");
    setFiltered(products);
  }
}, [location.search, products]);

  function filterByCategory(val) {
    setActiveCategory(val);
    if (val === "All") {
      setFiltered(products);
    } else {
      setFiltered(products.filter(p => p.category === val));
    }
  }

  async function addToCart(itemid) {
    try {
      const res = await axios.post(
        "https://sandeep-ecom28db.duckdns.org/api/cart/add",
        { itemid, quantity: 1 },
        { withCredentials: true }
      );
      alert(res.data.message);
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to add item to cart"
      );
    }
  }

  if (loading) {
    return (
      <>

        <div className="up-loading">
          <div className="up-spinner"></div>
          <p>Loading products...</p>
        </div>
      </>
    );
  }

  return (
    <>

      <div className="up-page">

        <div className="up-hero">
          <h1>🛍️ Shop with ShopEase</h1>
          <p>Discover great products at amazing prices</p>
        </div>

       <div className="up-filter-bar">
  <div className="up-filter-container">
    {categories.map((cat) => (
      <button
        key={cat.value}
        className={`up-cat-btn ${
          activeCategory === cat.value ? "active" : ""
        }`}
        onClick={() => filterByCategory(cat.value)}
      >
        {cat.label}
      </button>
    ))}
  </div>
</div>

        <div className="up-content">
          <p className="up-results-count">
  {(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search");
    if (search) {
      return `Showing ${filtered.length} result${filtered.length !== 1 ? "s" : ""} for "${search}"`;
    }
    return `Showing ${filtered.length} product${filtered.length !== 1 ? "s" : ""}${
      activeCategory !== "All"
        ? ` in "${categories.find(c => c.value === activeCategory)?.label || activeCategory}"`
        : ""
    }`;
  })()}
</p>

          {filtered.length === 0 ? (
            <div className="up-empty">
              <div className="up-empty-icon">🔍</div>
              <h3>No products found</h3>
              <p>Try selecting a different category</p>
            </div>
          ) : (
            <div className="up-grid">
              {filtered.map((product) => (
                <div className="up-card" key={product.itemid}>

                  <div className="up-img-wrap">
                    <img
                      src={product.image}
                      alt={product.itemname}
                    />
                    {product.category && (
                      <span className="up-category-tag">
                        {product.category}
                      </span>
                    )}
                    <div className="up-img-overlay">
                      <p className="up-overlay-name">{product.itemname}</p>
                      <p className="up-overlay-price">₹{product.price}</p>
                      {product.category && (
                        <span className="up-overlay-cat">{product.category}</span>
                      )}
                    </div>
                  </div>

                  <div className="up-card-body">
                    <h5 className="up-item-name" title={product.itemname}>
                      {product.itemname}
                    </h5>

                    <p className="up-price">
                      ₹{product.price}
                      <span>incl. taxes</span>
                    </p>

                    <div className="up-btn-row">
                      <button
                        className="up-btn-cart"
                        onClick={() => addToCart(product.itemid)}
                      >
                        🛒 Cart
                      </button>
                      <button
                        className="up-btn-buy"
                        onClick={() =>
                          navigate("/payment", {
                            state: {
                              itemid: product.itemid,
                              quantity: 1
                            }
                          })
                        }
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </>
  );
}

export default UserProduce;