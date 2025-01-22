import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Deals from '../Deals/Deals';
import Recommended from '../Recommended/Recommended';
import HotelInfo from '../HotelInfo/HotelInfo';
import { useCart } from '../Navbar/CartContext';

const RestaurantDetailsPage = () => {
  const { id } = useParams();  
  const location = useLocation();  
  const { imageUrl, priceTag, name, rating, time, cuisine, location: address, costForTwo } = location.state || {};
  const { cart, cartCount, addToCart, removeFromCart,decreaseFromCart } = useCart();
 

  return (
    <>
      <Navbar cartCount={cartCount} />
      <HotelInfo
        imageUrl={imageUrl}
        name={name}
        priceTag={priceTag}
        rating={rating}
        time={time}
        cuisine={cuisine}
        location={address}
        costForTwo={costForTwo}
      />
      <Deals />
      <Recommended
        onAddToCart={addToCart}
        onDecreaseFromCart={removeFromCart}
        onDecreaseItem={decreaseFromCart}
        cart={cart}
      />
    </>
  );
};

export default RestaurantDetailsPage;
