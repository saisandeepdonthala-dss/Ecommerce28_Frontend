import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

function Home() {
  return (
    <>
      {/* BOOTSTRAP 5 */}
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />

     
      {/* CAROUSEL */}

      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
          ></button>

          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
          ></button>

          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
          ></button>
        </div>

        <div className="carousel-inner">

          <div className="carousel-item active">
            <img
              src="https://www.analogshift.com/cdn/shop/articles/EVERY_ADVENTURE_NEEDS_A_GREAT_FIELD_WATCH-1.jpg?v=1709065635&width=3000"
              className="d-block w-100 hero-img"
              alt="shopping"
            />

            <div className="carousel-caption d-none d-md-block">
              <h1>Welcome To ShopEase</h1>
              <p>Your favorite online shopping destination</p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="https://images.stockcake.com/public/6/e/5/6e5b6bac-2726-4c69-b0e3-d6e4ee2e9de1/vibrant-shirt-collection-stockcake.jpg"
              className="d-block w-100 hero-img"
              alt="fashion"
            />

            <div className="carousel-caption d-none d-md-block">
              <h1>Latest Fashion</h1>
              <p>Explore trending collections and styles</p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FkZ2V0fGVufDB8fDB8fHww"
              className="d-block w-100 hero-img"
              alt="electronics"
            />

            <div className="carousel-caption d-none d-md-block">
              <h1>Best Electronics</h1>
              <p>Top gadgets at affordable prices</p>
            </div>
          </div>

        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* ABOUT SECTION */}

      <section className="about-section">
        <div className="container">
          <div className="row align-items-center">

            <div className="col-lg-6 mb-4">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                className="img-fluid rounded"
                alt="about"
              />
            </div>

            <div className="col-lg-6">
              <h1 className="about-title">About ShopEase</h1>

              <p className="about-text">
                ShopEase is a modern eCommerce platform designed to make
                online shopping fast, secure, and enjoyable. We provide
                high-quality products, best prices, and excellent customer
                service.
              </p>

              <p className="about-text">
                From fashion to electronics, discover thousands of products
                with seamless shopping experience and fast delivery.
              </p>
            </div>

          </div>

          {/* FEATURES */}

          <div className="row mt-5 g-4">

            <div className="col-md-4">
              <div className="card feature-card p-4 text-center">
                <h3> 🚚 Fast Delivery</h3>
                <p>Quick and reliable shipping across the country.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card feature-card p-4 text-center">
                <h3> 🔒Secure Payment</h3>
                <p>100% safe and secure payment methods with Trust.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card feature-card p-4 text-center">
                <h3> 🎧 24/7 Support</h3>
                <p>Dedicated customer support anytime you need.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="footer-section">
                <h5>ShopEase</h5>
                <p className="footer-desc">
                  Best online shopping platform for fashion, electronics,
                  accessories, and more.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="footer-section">
                <h5>Quick Links</h5>
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/products">Products</Link></li>
                  <li><Link to="/cart">Cart</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                </ul>
              </div>
            </div>

            <div className="col-md-4">
              <div className="footer-section">
                <h5>Contact</h5>
                <div className="contact-pills">
                  <p>Email: support@shopease.com</p>
                  <p>Phone: +91 9810231998</p>
                  <p>Location: India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="footer-bottom">
        <div className="container">
          <div className="copyright">
            © 2026 ShopEase. All Rights Reserved .
          </div>
        </div>
      </div>

    
     </>
  );
}

export default Home;