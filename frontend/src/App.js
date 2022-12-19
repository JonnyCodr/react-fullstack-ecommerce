import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import ProductListPage from "./pages/ProductListPage";
import ProductDetails from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/user/UserProfile";
import UserOrderPage from "./pages/user/UserOrderPage";
import UserCartDetails from "./pages/user/UserCartDetails";
import UserOrderDetails from "./pages/user/UserOrderDetails";
import ProtectedRoutesComponent from "./components/ProtectedRoutesComponent";
import AdminEditUser from "./pages/admin/AdminEditUser";
import AdminCreateProductPage from "./pages/admin/AdminCreateProductPage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AdminEditProduct from "./pages/admin/AdminEditProduct";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminOrderDetails from "./pages/admin/AdminOrderDetails";
import AdminChats from "./pages/admin/AdminChats";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import RoutesWithUserChatComponent from "./components/user/RoutesWithUserChatComponent";
import ScrollToTop from "./utils/ScrollToTop";
import AdminUsersPage from "./pages/admin/AdminUser";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route element={<RoutesWithUserChatComponent />}>
          <Route path="/" element={<Home />} />
          <Route path="/product-list" element={<ProductListPage />} />
          <Route path="/product-details" element={<ProductDetails />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element="Page Not Found 404" />
        </Route>

          <Route element={<ProtectedRoutesComponent admin={false} />}>
            <Route path="/user" element={<UserProfile />} />
            <Route path="/user/my-orders" element={<UserOrderPage />} />
            <Route path="/user/cart-details" element={<UserCartDetails />} />
            <Route path="/user/order-details" element={<UserOrderDetails />} />

        </Route>

        <Route element={<ProtectedRoutesComponent admin={true} />}>
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/edit-user" element={<AdminEditUser />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />
          <Route path="/admin/create-new-product" element={<AdminCreateProductPage />} />
          <Route path="/admin/edit-product" element={<AdminEditProduct />} />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
          <Route path="/admin/order-detail" element={<AdminOrderDetails />} />
          <Route path="/admin/chats" element={<AdminChats />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
