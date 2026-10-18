
import { useState } from "react";
import "./App.css";

function App() {
  // Store product form values
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [quantity, setQuantity] = useState("");

  // Store all added products
  const [products, setProducts] = useState([]);

  // Store validation or success messages
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form
    if (!productName.trim() || !price || !quantity) {
      setMessage("Please fill in all fields.");
      setMessageType("error");
      return;
    }

    if (!Number.isFinite(Number(price)) || Number(price) <= 0) {
      setMessage("Price must be greater than zero.");
      setMessageType("error");
      return;
    }

    if (
      !Number.isInteger(Number(quantity)) ||
      Number(quantity) < 1
    ) {
      setMessage("Quantity must be a whole number of at least 1.");
      setMessageType("error");
      return;
    }

    // Create a new product object
    const newProduct = {
      id: Date.now(),
      productName: productName.trim(),
      price: Number(price),
      category: category,
      quantity: Number(quantity),
    };

    // Add the new product to the list
    setProducts((previousProducts) => [
      ...previousProducts,
      newProduct,
    ]);

    // Clear the form
    setProductName("");
    setPrice("");
    setCategory("Electronics");
    setQuantity("");

    setMessage("Product added successfully!");
    setMessageType("success");
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Product Management System</h1>
        <p>Create and manage your products easily.</p>
      </header>

      <main className="container">
        {/* Product form */}
        <section className="card">
          <h2>Add New Product</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="productName">
                Product Name
              </label>
              <input
                id="productName"
                type="text"
                placeholder="Enter product name"
                value={productName}
                onChange={(e) =>
                  setProductName(e.target.value)
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price (₹)</label>
              <input
                id="price"
                type="number"
                placeholder="Enter product price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="0.01"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
              >
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Books">Books</option>
                <option value="Furniture">Furniture</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Quantity</label>
              <input
                id="quantity"
                type="number"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) =>
                  setQuantity(e.target.value)
                }
                min="1"
                step="1"
                required
              />
            </div>

            <button type="submit" className="add-btn">
              + Add Product
            </button>
          </form>

          {message && (
            <p
              className={`message ${messageType}`}
              role="status"
            >
              {message}
            </p>
          )}
        </section>

        {/* Product list */}
        <section className="card">
          <h2>Product List</h2>

          {products.length === 0 ? (
            <p className="empty">
              No products available. Add your first product!
            </p>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Product Name</th>
                    <th>Price (₹)</th>
                    <th>Category</th>
                    <th>Quantity</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product, index) => (
                    <tr key={product.id}>
                      <td>{index + 1}</td>
                      <td>{product.productName}</td>
                      <td>
                        {product.price.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                      <td>{product.category}</td>
                      <td>{product.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <p className="total">
            Total Products: {products.length}
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
