// import React, { useEffect, useState } from "react";
// import { Button, message } from "antd";
// import { useNavigate } from "react-router-dom"; 
// import { useAuth } from "../../components/AuthContext/AuthContext"; 
// import SearchInput from "../SearchInput/SearchInput";

// const Recommended = ({ onAddToCart, onDecreaseItem, cart }) => {
//   const [items, setItems] = useState([]);
//   const [query, setQuery] = useState("");
//   const { isAuthenticated } = useAuth(); 
//   const navigate = useNavigate(); 

//   useEffect(() => {
//     fetch("/data.json")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         const groupedCards =
//   data?.data?.cards?.find((card) => card.groupedCard)?.groupedCard
//     ?.cardGroupMap?.REGULAR?.cards || [];

// const dishes = [];
// groupedCards.forEach((card) => {
//   const restaurantInfo = card?.card?.card?.info;
//   const itemCards = card?.card?.card?.itemCards || [];
//   itemCards.forEach((item) => {
//     const info = item?.card?.info;
//     if (info) {
//       dishes.push({
//         id: info.id,
//         name: info.name,
//         description: info.description || "No description available",
//         price: info.price / 100,
//         imageId:
//           info.imageId ||
//           "https://img.freepik.com/free-photo/whipped-cream-chocolate-berries-galore-gourmet-indulgence-generated-by-ai_188544-9812.jpg",
//         restaurantName: restaurantInfo?.name || "Unknown Restaurant",
//         restaurantId: restaurantInfo?.id || null, 
//         restaurantArea: restaurantInfo?.area || "Unknown Area", 
//       });
//     }
//   });
// });
//         const uniqueDishes = dishes.filter(
//           (dish, index, self) =>
//             index === self.findIndex((d) => d.id === dish.id)
//         );

//         setItems(uniqueDishes);
//       })
//       .catch((error) => console.error("Error fetching data:", error));

//   }, [isAuthenticated]);

//   const handleAddToCart = (item) => {
//     if (!isAuthenticated) {
//       console.warn("User is not authenticated. Redirecting to login.");
//       message.warning("Please log in to add items to the cart.");
//       navigate("/login", { state: { from: window.location.pathname } }); 
//       return;
//     }
//     console.log("Adding item to cart:", item);
//     onAddToCart(item);
//   };

//   const filteredItems = items.filter((item) =>
//     item.name.toLowerCase().includes(query.toLowerCase())
//   );

//   return (
//     <div className="max-w-4xl mx-auto">
//       <SearchInput
//         onChange={(value) => {
//           setQuery(value);
//         }}
//       />
//       <div className="grid grid-cols-1 gap-6">
//         <hr className="mt-12" />
//         <h1 className="font-extrabold text-xl mb-5 ml-2 md:text-start">Recommended</h1>
//         {filteredItems.length > 0 ? (
//           filteredItems.map((item) => (
//             <div className="mb-10 pb-10 m-2" key={item.id}>
//               <div className="flex justify-between w-full pb-6">
//                 <div className="w-3/4 space-y-2">
//                   <h2 className="text-lg font-extrabold text-gray-600">{item.name}</h2>
//                   <p className=" text-lg font-semibold">{`₹${item.price}`}</p>
//                   <p className="text=lg text-gray-600 mt-10">{item.description}</p>
//                 </div>
//                 <div className="relative">
//                   <img
//                     alt={item.name}
//                     src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item.imageId}`}
//                     className="h-48 w-60 rounded-3xl object-cover"
//                   />
//                   {cart[item.id] ? (
//                     <div className="absolute left-5 -bottom-4 w-2/3 p-3 flex justify-between items-center bg-white rounded-xl border border-gray-300">
//                       <Button
//                         onClick={() => onDecreaseItem(item.id)}
//                         className="font-extrabold text-green-700"
//                       >
//                         -
//                       </Button>
//                       <span className="text-xl font-bold">
//                         {cart[item.id].count}
//                       </span>
//                       <Button
//                         onClick={() => handleAddToCart(item)}
//                         className="font-extrabold text-green-700"
//                       >
//                         +
//                       </Button>
//                     </div>
//                   ) : (
//                     <Button
//                       onClick={() => handleAddToCart(item)}
//                       type="primary"
//                       className="absolute left-9 -bottom-4 w-2/3 p-5 text-xl font-extrabold text-green-700 bg-white rounded-xl border border-gray-300"
//                     >
//                       ADD
//                     </Button>
//                   )}
//                 </div>
//               </div>
//               <hr className="mt-4" />
//             </div>
//           ))
//         ) : (
//           <p>No recommended items found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Recommended;

import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/AuthContext/AuthContext";
import SearchInput from "../SearchInput/SearchInput";
import recommendedData from "./Recommended.json"; // Adjust the path as needed

const Recommended = ({ onAddToCart, onDecreaseItem, cart }) => {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const processData = () => {
      const dishes = recommendedData.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description || "No description available",
        price: item.price / 100,
        imageId:
          item.imageId ||
          "https://img.freepik.com/free-photo/whipped-cream-chocolate-berries-galore-gourmet-indulgence-generated-by-ai_188544-9812.jpg",
        category: item.category,
      }));

      // Remove duplicates and shuffle the array
      const uniqueDishes = dishes.filter(
        (dish, index, self) =>
          index === self.findIndex((d) => d.id === dish.id)
      );

      for (let i = uniqueDishes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [uniqueDishes[i], uniqueDishes[j]] = [uniqueDishes[j], uniqueDishes[i]];
      }

      setItems(uniqueDishes);
    };

    processData();
  }, []);

  const handleAddToCart = (item) => {
    if (!isAuthenticated) {
      console.warn("User is not authenticated. Redirecting to login.");
      message.warning("Please log in to add items to the cart.");
      navigate("/login", { state: { from: window.location.pathname } });
      return;
    }
    console.log("Adding item to cart:", item);
    onAddToCart(item);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto">
      <SearchInput
        onChange={(value) => {
          setQuery(value);
        }}
      />
      <div className="grid grid-cols-1 gap-6">
        <hr className="mt-12" />
        <h1 className="font-extrabold text-xl mb-5 ml-2 md:text-start">Recommended</h1>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div className="mb-10 pb-10 m-2" key={item.id}>
              <div className="flex justify-between w-full pb-6">
                <div className="w-3/4 space-y-2">
                  <h2 className="text-lg font-extrabold text-gray-600">{item.name}</h2>
                  <p className=" text-lg font-semibold">{`₹${item.price}`}</p>
                  <p className="text=lg text-gray-600 mt-10">{item.description}</p>
                </div>
                <div className="relative">
                  <img
                    alt={item.name}
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item.imageId}`}
                    className="h-48 w-60 rounded-3xl object-cover"
                  />
                  {cart[item.id] ? (
                    <div className="absolute left-5 -bottom-4 w-2/3 p-3 flex justify-between items-center bg-white rounded-xl border border-gray-300">
                      <Button
                        onClick={() => onDecreaseItem(item.id)}
                        className="font-extrabold text-green-700"
                      >
                        -
                      </Button>
                      <span className="text-xl font-bold">
                        {cart[item.id].count}
                      </span>
                      <Button
                        onClick={() => handleAddToCart(item)}
                        className="font-extrabold text-green-700"
                      >
                        +
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => handleAddToCart(item)}
                      type="primary"
                      className="absolute left-9 -bottom-4 w-2/3 p-5 text-xl font-extrabold text-green-700 bg-white rounded-xl border border-gray-300"
                    >
                      ADD
                    </Button>
                  )}
                </div>
              </div>
              <hr className="mt-4" />
            </div>
          ))
        ) : (
          <p>No recommended items found.</p>
        )}
      </div>
    </div>
  );
};

export default Recommended;
