import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home';
import Products from '../pages/Products/Products';
import ProductDetails from '../pages/ProductDetails/ProductDetails';
import Categories from '../pages/Categories/Categories';
import CategoryProducts from '../pages/Categories/CategoryProducts';
import Cart from '../pages/Cart/Cart';
import About from '../pages/About/About';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import NotFound from '../pages/NotFound/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:slug" element={<CategoryProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
