import React, { useState } from "react";
import axios from "axios";
import "./addproduct.css";

function AddProduct() {

  // TOAST STATES
  const [showToast, setShowToast] = useState(false);

  const [toastMessage, setToastMessage] = useState("");

  const [toastType, setToastType] = useState("success");

  const [formData, setFormData] = useState({
    title: "",
    Description: "",
    About_item: "",
    quantity: "",
    price: "",
    category: ""
  });

  const [file, setFile] = useState(null);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  // SHOW TOAST FUNCTION

  function showBootstrapToast(message, type = "success") {

    setToastMessage(message);

    setToastType(type);

    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      const data = new FormData();

      data.append("title", formData.title);
      data.append("Description", formData.Description);
      data.append("About_item", formData.About_item);
      data.append("quantity", formData.quantity);
      data.append("price", formData.price);
      data.append("category", formData.category);

      // IMAGE CHECK
      if (!file) {

        showBootstrapToast(
          "Please select an image",
          "warning"
        );

        return;
      }

      data.append("file", file);

      const res = await axios.post(
        "https://sandeep-ecom28db.duckdns.org/api/admin/add-item",
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      console.log(res.data);

      // SUCCESS TOAST
      showBootstrapToast(
        res.data.message || "Product Added Successfully",
        "success"
      );

      // CLEAR FORM
      setFormData({
        title: "",
        Description: "",
        About_item: "",
        quantity: "",
        price: "",
        category: ""
      });

      setFile(null);

    } catch (error) {

      console.log(error.response?.data || error.message);

      // ERROR TOAST
      showBootstrapToast(
        error.response?.data?.message || "Add Product Failed",
        "danger"
      );
    }
  }

  return (
    <>
     

      {/* TOAST */}

      {
        showToast && (
          <div
            className={`toast show align-items-center text-white bg-${toastType} border-0 custom-toast`}
            role="alert"
          >
            <div className="d-flex">

              <div className="toast-body">
                {toastMessage}
              </div>

              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                onClick={() => setShowToast(false)}
              ></button>

            </div>
          </div>
        )
      }

      <div className="add-page">

        <div className="add-card">

          <h1 className="add-title">
            Add Product
          </h1>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">

              <label className="form-label">
                Product Title
              </label>

              <input
                type="text"
                className="form-control"
                name="title"
                placeholder="Enter product title"
                value={formData.title}
                onChange={handleChange}
              />

            </div>

            <div className="mb-3">

              <label className="form-label">
                Description
              </label>

              <textarea
                className="form-control"
                rows="3"
                name="Description"
                placeholder="Enter product description"
                value={formData.Description}
                onChange={handleChange}
              ></textarea>

            </div>

            <div className="mb-3">

              <label className="form-label">
                About Product
              </label>

              <textarea
                className="form-control"
                rows="3"
                name="About_item"
                placeholder="Enter about product"
                value={formData.About_item}
                onChange={handleChange}
              ></textarea>

            </div>

            <div className="row">

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Quantity
                </label>

                <input
                  type="number"
                  className="form-control"
                  name="quantity"
                  placeholder="Enter quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                />

              </div>

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Price
                </label>

                <input
                  type="number"
                  className="form-control"
                  name="price"
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={handleChange}
                />

              </div>

            </div>

            <div className="mb-3">

              <label className="form-label">
                Category
              </label>

              <input
                type="text"
                className="form-control"
                name="category"
                placeholder="Enter category"
                value={formData.category}
                onChange={handleChange}
              />

            </div>

            <div className="mb-4">

              <label className="form-label">
                Upload Product Image
              </label>

              <input
                type="file"
                className="form-control"
                onChange={(e) => setFile(e.target.files[0])}
              />

            </div>

            <button
              type="submit"
              className="submit-btn"
            >
              Add Product
            </button>

          </form>

        </div>

      </div>
    </>
  );
}

export default AddProduct;