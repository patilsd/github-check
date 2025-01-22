import React, { useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { useNavigate } from "react-router-dom";
import mockData from "./mockData/restaurantListData.json";
import Navbar from "../Navbar/Navbar";
import SearchInput from "../SearchInput/SearchInput";

const restaurants = mockData?.data.cards
  .map((card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants)
  .filter((group) => group)
  .flat();

const RestaurantLists = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const restaurantData = restaurants?.map((restaurant) => ({
    imageUrl: `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${restaurant?.info?.cloudinaryImageId}`,
    priceTag: restaurant?.info?.aggregatedDiscountInfoV3?.header || "",
    name: restaurant?.info?.name,
    rating: restaurant?.info?.avgRating,
    time: `${restaurant?.info?.sla?.deliveryTime || 0}-45 mins`,
    cuisine: restaurant?.info?.cuisines?.join(", "),
    location: restaurant?.info?.locality || "Unknown location",
    costForTwo: restaurant?.info?.costForTwo || "Price not available", 
  }));

  const filteredData = restaurantData?.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <SearchInput onChange={(value) => setQuery(value)} />
      <div
        className="max-w-7xl mx-auto px-4"
      >
        <div className="text-left">
          <h1 className="text-2xl text-center md:text-start md:text-3xl lg:text-3xl font-extrabold mt-10">
            Top restaurants
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-0 md:grid-cols-2 lg:grid-cols-3 md:grid-cols-1 mr-9 mt-8">
          {filteredData?.map((restaurant, index) => (
            <RestaurantCard key={index} {...restaurant} />
          ))}
          {filteredData?.length === 0 && (
            <p className="text-center text-gray-500 mt-4">
              No restaurants found.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default RestaurantLists;




// import React, { useState } from "react";
// import RestaurantCard from "./RestaurantCard";
// import { useNavigate } from "react-router-dom";
// import mockData from "./mockData/restaurantListData.json";
// import Navbar from "../Navbar/Navbar";
// import SearchInput from "../SearchInput/SearchInput";

// const restaurants = mockData?.data.cards
//   .map((card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants)
//   .filter((group) => group)
//   .flat();

// const RestaurantLists = () => {
//   const navigate = useNavigate();
//   const [query, setQuery] = useState("");

//   const restaurantData = restaurants?.map((restaurant) => ({
//     imageUrl: `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${restaurant?.info?.cloudinaryImageId}`,
//     priceTag: restaurant?.info?.aggregatedDiscountInfoV3?.header || "",
//     name: restaurant?.info?.name,
//     rating: restaurant?.info?.avgRating,
//     time: `${restaurant?.info?.sla?.deliveryTime || 0}-45 mins`,
//     cuisine: restaurant?.info?.cuisines?.join(", "),
//     location: restaurant?.info?.locality || "Unknown location",
//   }));

//   const filteredData = restaurantData?.filter((restaurant) =>
//     restaurant.name.toLowerCase().includes(query.toLowerCase())
//   );

//   return (
//     <>
//       <Navbar />
//       <SearchInput onChange={(value) => setQuery(value)} />
//       <div
//         className="max-w-7xl mx-auto px-4"
//         onClick={() => navigate("/restaurant/${restaurant.info.id}")}
//       >
//         <div className="text-left">
//           <h1 className="text-2xl text-center md:text-start md:text-3xl lg:text-3xl font-extrabold mt-10">
//             Top restaurants
//           </h1>
//         </div>

//         <div className="grid grid-cols-1 gap-0 md:grid-cols-2 lg:grid-cols-3 md:grid-cols-1 mr-9 mt-8">
//           {filteredData?.map((restaurant, index) => (
//             <RestaurantCard key={index} {...restaurant} />
//           ))}
//           {filteredData?.length === 0 && (
//             <p className="text-center text-gray-500 mt-4">
//               No restaurants found.
//             </p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default RestaurantLists;
