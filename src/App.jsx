import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RestaurantListPage from './restaurantSection/pages/RestaurantListPage';
import RestaurantDetailsPage from './restaurantSection/pages/RestaurantDetailsPage';
import SignUpForm from './components/SignupForm/SignupForm';
import ProfilePage from './components/ProfilePage/ProfilePage';
import LoginForm from './components/LoginForm/LoginForm';
import CartComponent from './restaurantSection/Navbar/CartComponent';
import { CartProvider } from './restaurantSection/Navbar/CartContext';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RestaurantListPage />} />
          <Route path="/restaurant/:id" element={<RestaurantDetailsPage />} />
          <Route path="/cart" element={<CartComponent />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
