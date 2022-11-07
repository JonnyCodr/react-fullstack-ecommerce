import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element="Page Not Found 404" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
