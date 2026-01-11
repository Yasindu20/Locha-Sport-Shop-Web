import { Link } from "react-router-dom";
import "../../css/admin/productsList.css";
import { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://localhost:5000/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching Products: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete products
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("http://localhost:5000/api/products/${id}", {
        method: "DELETE",
        headers: {
          Authorizations: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setProducts(products.filter((p) => p._id !== id));
        setDeleteConfirm(null);
      }
    } catch (error) {
      console.error("Error Deleting products: ", error);
    }
  };

  // Toggle featured status
  const toggleFeatured = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        "http://localhost:5000/api/products/${id}/featured",
        {
          method: "PATCH",
          Authorizations: {
            header: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setProducts(products.map((p) => (p._id === id ? data.products : p)));
      }
    } catch (error) {
      console.error("Error toggle featured: ", error);
    }
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      filterCategory === "all" || product.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  // Get Unique Categories
  const categories = ["all", ...new Set(products.map((p) => p.category))];

  return (
    <div className="admin-products-list">
      {/* Page Header */}
      <div className="products-header">
        <div>
          <h1>Products Management</h1>
          <p>Manage your product catalog</p>
        </div>
        <Link to="/adin/products/add" className="btn-primary">
          <i className="fi fi-sr-add"></i>
          Add New Product
        </Link>
      </div>

      {/* Filters */}
      <div className="products-filters">
        <div className="search-box">
          <i className="fi fi-sr-search"></i>
          <input
            type="text"
            placeholder="Search Products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          className="filter-select"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "cat" ? "All Categories" : cat}
            </option>
          ))}
        </select>
        <div className="results-count">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </div>

      {/* Products Table */}
      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading products...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="empty-state">
          <i className="fi fi-sr-box"></i>
          <h3>No products found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="products-table-container">
          <table className="products-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product._id}>
                  {/* Product Info */}
                  <td className="product-cell">
                    <div className="product-info">
                      <div className="product-image">
                        <img
                          src={`http://localhost:5000${product.image}`}
                          alt={product.name}
                        />
                      </div>
                      <div className="product-details">
                        <h4>{product.name}</h4>
                        <p>{product.brand}</p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td>
                    <span className="badge badge-category">
                      {product.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="price-cell">${product.price.toFixed(2)}</td>

                  {/* Stock */}
                  <td>
                    <span
                      className={`stock-badge ${
                        product.stock === 0
                          ? "out-of-stock"
                          : product.stock < 10
                          ? "low-stock"
                          : "in-stock"
                      }`}
                    >
                      {product.stock === 0
                        ? "Out of Stock"
                        : product.stock < 10
                        ? `Low (${product.stock})`
                        : `${product.stock} units`}
                    </span>
                  </td>

                  {/* Featured Status */}
                  <td>
                    <button
                      className={`btn-featured ${
                        product.isFeatured ? "active" : ""
                      }`}
                      onClick={() => toggleFeatured(product._id)}
                      title={
                        product.isFeatured
                          ? "Remove from featured"
                          : "Mark as featured"
                      }
                    >
                      <i className="fi fi-sr-star"></i>
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="actions-cell">
                    <div className="action-buttons">
                      <Link
                        to={`/admin/products/edit/${product._id}`}
                        className="btn-action btn-edit"
                        title="Edit"
                      >
                        <i className="fi fi-sr-edit"></i>
                      </Link>
                      <button
                        className="btn-action btn-delete"
                        onClick={() => setDeleteConfirm(product._id)}
                        title="Delete"
                      >
                        <i className="fi fi-sr-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Confirm Delete</h3>
              <button
                className="modal-close"
                onClick={() => setDeleteConfirm(null)}
              >
                <i className="fi fi-br-cross"></i>
              </button>
            </div>
            <div className="modal-body">
              <p>
                Are you sure you want to delete this product? This action cannot
                be undone.
              </p>
            </div>
            <div className="modal-footer">
              <button
                className="btn-secondary"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button
                className="btn-danger"
                onClick={() => handleDelete(deleteConfirm)}
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
