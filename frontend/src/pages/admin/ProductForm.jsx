import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../css/admin/productForm.css";

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    price: "",
    description: "",
    category: "Football",
    stock: "",
    colors: "",
    sizes: "",
    rating: "0",
    isFeatured: false,
    badge: "new",
    brand: "",
    sku: "",
  });

  useEffect(() => {
    if (isEditMode) fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/products/${id}`);
      const data = await res.json();
      setFormData({
        name: data.name || "",
        type: data.type || "",
        price: data.price || "",
        description: data.description || "",
        category: data.category || "Football",
        stock: data.stock || "",
        colors: data.colors?.join(", ") || "",
        sizes: data.sizes?.join(", ") || "",
        rating: data.rating || "0",
        isFeatured: data.isFeatured || false,
        badge: data.badge || "new",
        brand: data.brand || "",
        sku: data.sku || "",
      });
      if (data.image) setImagePreview(`http://localhost:5000${data.image}`);
    } catch (err) {
      console.error(err);
      setError("Failed to load product data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("adminToken");
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "colors" || key === "sizes") {
          const array = formData[key].split(",").map((i) => i.trim()).filter(Boolean);
          data.append(key, JSON.stringify(array));
        } else {
          data.append(key, formData[key]);
        }
      });

      const imageInput = document.querySelector('input[name="image"]');
      if (imageInput?.files[0]) data.append("image", imageInput.files[0]);

      const url = isEditMode
        ? `http://localhost:5000/api/admin/products/${id}`
        : "http://localhost:5000/api/admin/products";

      const res = await fetch(url, {
        method: isEditMode ? "PUT" : "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to save product");

      navigate("/admin/products");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-product-form">
      {/* Header */}
      <div className="admin-product-form-header">
        <button
          className="admin-product-form-btn-back"
          onClick={() => navigate("/admin/products")}
        >
          <i className="fi fi-sr-angle-left"></i> Back to Products
        </button>
        <h1>{isEditMode ? "Edit Product" : "Add New Product"}</h1>
      </div>

      {/* Error */}
      {error && (
        <div className="admin-product-form-error">
          <i className="fi fi-sr-exclamation-circle"></i>
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="admin-product-form-form">
        <div className="admin-product-form-grid">
          {/* Left */}
          <div className="admin-product-form-section">
            <h3>Product Information</h3>
            <div className="admin-product-form-group">
              <label htmlFor="name">
                Product Name <span className="admin-product-form-required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Pro Football Boot"
                required
              />
            </div>

            <div className="admin-product-form-row">
              <div className="admin-product-form-group">
                <label htmlFor="type">
                  Product Type <span className="admin-product-form-required">*</span>
                </label>
                <input
                  type="text"
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  placeholder="e.g., Cleats, Ball, Racket"
                  required
                />
              </div>

              <div className="admin-product-form-group">
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="e.g., Nike, Adidas"
                />
              </div>
            </div>

            <div className="admin-product-form-group">
              <label htmlFor="description">
                Description <span className="admin-product-form-required">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                rows="4"
                required
              />
            </div>

            <div className="admin-product-form-row">
              <div className="admin-product-form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="Football">Football</option>
                  <option value="Basketball">Basketball</option>
                  <option value="Tennis">Tennis</option>
                  <option value="Running">Running</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Swimming">Swimming</option>
                </select>
              </div>

              <div className="admin-product-form-group">
                <label htmlFor="badge">Badge</label>
                <select
                  id="badge"
                  name="badge"
                  value={formData.badge}
                  onChange={handleChange}
                >
                  <option value="new">New</option>
                  <option value="sale">Sale</option>
                  <option value="bestselling">Best Selling</option>
                  <option value="limited">Limited Edition</option>
                </select>
              </div>
            </div>

            <div className="admin-product-form-row">
              <div className="admin-product-form-group">
                <label htmlFor="price">Price ($) *</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              <div className="admin-product-form-group">
                <label htmlFor="stock">Stock Quantity *</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>

              <div className="admin-product-form-group">
                <label htmlFor="rating">Rating (0-5)</label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  step="0.1"
                  min="0"
                  max="5"
                />
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="admin-product-form-section">
            <h3>Additional Details</h3>

            <div className="admin-product-form-group">
              <label htmlFor="sku">SKU *</label>
              <input
                type="text"
                id="sku"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                placeholder="e.g., FB-001-BLK"
                required
              />
              <small>Unique product identifier</small>
            </div>

            <div className="admin-product-form-group">
              <label htmlFor="colors">Available Colors</label>
              <input
                type="text"
                id="colors"
                name="colors"
                value={formData.colors}
                onChange={handleChange}
                placeholder="Black, White, Red"
              />
              <small>Separate colors with commas</small>
            </div>

            <div className="admin-product-form-group">
              <label htmlFor="sizes">Available Sizes</label>
              <input
                type="text"
                id="sizes"
                name="sizes"
                value={formData.sizes}
                onChange={handleChange}
                placeholder="S, M, L, XL"
              />
              <small>Separate sizes with commas</small>
            </div>

            <label className="admin-product-form-checkbox">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
              />
              <span>Mark as Featured Product</span>
            </label>

            <div className="admin-product-form-group">
              <label htmlFor="image">Product Image</label>
              <div className="admin-product-form-image-upload">
                {imagePreview ? (
                  <div className="admin-product-form-image-preview">
                    <img src={imagePreview} alt="Preview" />
                    <button
                      type="button"
                      className="admin-product-form-btn-remove-image"
                      onClick={() => {
                        setImagePreview(null);
                        document.querySelector('input[name="image"]').value = "";
                      }}
                    >
                      <i className="fi fi-sr-cross"></i>
                    </button>
                  </div>
                ) : (
                  <label className="admin-product-form-upload-placeholder" htmlFor="image">
                    <i className="fi fi-sr-cloud-upload"></i>
                    <span>Click to upload image</span>
                    <small>JPG, PNG, GIF (Max 5MB)</small>
                  </label>
                )}
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  hidden
                />
              </div>
            </div>
          </div>
        </div>

        <div className="admin-product-form-actions">
          <button
            type="button"
            className="admin-product-form-btn-secondary"
            onClick={() => navigate("/admin/products")}
            disabled={loading}
          >
            Cancel
          </button>
          <button type="submit" className="admin-product-form-btn-primary" disabled={loading}>
            {loading ? (
              <>
                <span className="admin-product-form-spinner"></span>
                {isEditMode ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>
                <i className="fi fi-sr-check"></i>
                {isEditMode ? "Update Product" : "Create Product"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
