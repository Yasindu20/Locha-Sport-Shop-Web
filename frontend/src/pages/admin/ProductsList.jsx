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
      console.error("Error fetching products: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setProducts(products.filter((p) => p._id !== id));
        setDeleteConfirm(null);
      }
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  // Toggle featured status
  const toggleFeatured = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `http://localhost:5000/api/products/${id}/featured`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setProducts(products.map((p) => (p._id === id ? data.product : p)));
      }
    } catch (error) {
      console.error("Error toggling featured: ", error);
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

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  return (
    <div className="admin-products-list">
      {/* Page Header */}
      <div className="admin-products-list-header">
        <div>
          <h1>Products Management</h1>
          <p>Manage your product catalog</p>
        </div>
        <Link to="/admin/products/add" className="admin-products-list-btn-primary">
          <i className="fi fi-sr-add"></i>
          Add New Product
        </Link>
      </div>

      {/* Filters */}
      <div className="admin-products-list-filters">
        <div className="admin-products-list-search-box">
          <i className="fi fi-sr-search"></i>
          <input
            type="text"
            placeholder="Search Products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          className="admin-products-list-filter-select"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "all" ? "All Categories" : cat}
            </option>
          ))}
        </select>
        <div className="admin-products-list-results-count">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </div>

      {/* Products Table */}
      {loading ? (
        <div className="admin-products-list-empty-state">
          <div className="spinner"></div>
          <p>Loading products...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="admin-products-list-empty-state">
          <i className="fi fi-sr-box"></i>
          <h3>No products found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="admin-products-list-table-container">
          <table className="admin-products-list-table">
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
                  <td className="admin-products-list-product-cell">
                    <div className="admin-products-list-product-info">
                      <div className="admin-products-list-product-image">
                        <img
                          src={`http://localhost:5000${product.image}`}
                          alt={product.name}
                        />
                      </div>
                      <div className="admin-products-list-product-details">
                        <h4>{product.name}</h4>
                        <p>{product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="admin-products-list-badge admin-products-list-badge-category">
                      {product.category}
                    </span>
                  </td>
                  <td className="admin-products-list-price-cell">
                    ${product.price.toFixed(2)}
                  </td>
                  <td>
                    <span
                      className={`admin-products-list-stock-badge ${
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
                  <td>
                    <button
                      className={`admin-products-list-btn-featured ${
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
                  <td className="admin-products-list-actions-cell">
                    <div className="admin-products-list-action-buttons">
                      <Link
                        to={`/admin/products/edit/${product._id}`}
                        className="admin-products-list-btn-action admin-products-list-btn-edit"
                        title="Edit"
                      >
                        <i className="fi fi-sr-edit"></i>
                      </Link>
                      <button
                        className="admin-products-list-btn-action admin-products-list-btn-delete"
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
        <div className="admin-products-list-modal-overlay">
          <div className="admin-products-list-modal-content">
            <div className="admin-products-list-modal-header">
              <h3>Confirm Delete</h3>
              <button
                className="admin-products-list-modal-close"
                onClick={() => setDeleteConfirm(null)}
              >
                <i className="fi fi-br-cross"></i>
              </button>
            </div>
            <div className="admin-products-list-modal-body">
              <p>
                Are you sure you want to delete this product? This action cannot
                be undone.
              </p>
            </div>
            <div className="admin-products-list-modal-footer">
              <button
                className="admin-products-list-btn-secondary"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button
                className="admin-products-list-btn-danger"
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
