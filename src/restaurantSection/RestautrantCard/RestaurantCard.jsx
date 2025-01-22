// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Card } from "antd";
// import { FaStar } from "react-icons/fa";

// const RestaurantCard = ({
//   id,
//   imageUrl,
//   priceTag,
//   name,
//   rating,
//   time,
//   cuisine,
//   location,
//   costForTwo
// }) => {
//   const navigate = useNavigate();

//   const handleCardClick = () => {
//     navigate(`/restaurant/${id}`, {
//       state: {
//         imageUrl,
//         priceTag,
//         name,
//         rating,
//         time,
//         cuisine,
//         location,
//         costForTwo
//       },
//     });
//   };

//   return (
//     <div
//       className="max-w-lg w-full mx-auto mt-5 mb-5 flex-col md:flex cursor-pointer "
//       onClick={handleCardClick}
//     >
//       <Card
//         hoverable
//         className="h-96 w-lg mr-4 ml-4 rounded-lg -space-y-4 shadow-lg overflow-hidden p-0 border-none transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
//         cover={
//           <div className="relative group h-48">
//             <img
//               src={imageUrl}
//               alt={name}
//               className="h-full w-full rounded-3xl transition-transform duration-500 group-hover:scale-102"
//             />
//             <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent to-transparent p-2">
//               <p className="text-white text-3xl font-extrabold">{priceTag}</p>
//             </div>
//           </div>
//         }
//       >
//         <div className="flex flex-col justify-between h-30">
//           <h3 className="text-2xl font-extrabold text-gray-800 transition-colors duration-300">
//             {name}
//           </h3>
//           <div className="flex items-center space-x-2 text-sm text-black">
//             <FaStar className="text-green-500 text-xl" />
//             <span className="text-lg">{rating}</span>
//             <span className="text-xl font-bold text-gray-800">•</span>
//             <span className="text-lg font-semibold text-black">{time}</span>
//           </div>
//           <p className="mt-1 text-gray-700 text-lg">{cuisine}</p>
//           <p className="text-gray-700 text-lg">{location}</p>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default RestaurantCard;



import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "antd";
import { FaStar } from "react-icons/fa";

const RestaurantCard = ({
  id,
  imageUrl,
  priceTag,
  name,
  rating,
  time,
  cuisine,
  location,
  costForTwo
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/restaurant/${id}`, {
      state: {
        imageUrl,
        priceTag,
        name,
        rating,
        time,
        cuisine,
        location,
        costForTwo
      },
    });
  };

  return (
    <div
      className="max-w-lg w-full mx-auto mt-5 mb-5 flex-col md:flex cursor-pointer "
      onClick={handleCardClick}
    >
      <Card
        hoverable
        className="h-96 w-lg mr-4 ml-4 rounded-lg -space-y-4 shadow-lg overflow-hidden p-0 border-none transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
        cover={
          <div className="relative group h-48">
            <img
              src={imageUrl}
              alt={name}
              className="h-full w-full rounded-3xl transition-transform duration-500 group-hover:scale-102"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent to-transparent p-2">
              <p className="text-white text-3xl font-extrabold">{priceTag}</p>
            </div>
          </div>
        }
      >
        <div className="flex flex-col justify-between h-30">
          <h3 className="text-2xl font-extrabold text-gray-800 transition-colors duration-300">
            {name}
          </h3>
          <div className="flex items-center space-x-2 text-sm text-black">
            <FaStar className="text-green-500 text-xl" />
            <span className="text-lg">{rating}</span>
            <span className="text-xl font-bold text-gray-800">•</span>
            <span className="text-lg font-semibold text-black">{time}</span>
          </div>
          <p className="mt-1 text-gray-700 text-lg">{cuisine}</p>
          <p className="text-gray-700 text-lg">{location}</p>
        </div>
      </Card>
    </div>
  );
};

export default RestaurantCard;
