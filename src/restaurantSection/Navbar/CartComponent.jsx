
// import React from "react";
// import { Card, Button } from "antd";
// import { useCart } from "./CartContext";

// const CartComponent = () => {
//   const { cart, addToCart, removeFromCart, decreaseFromCart } = useCart();
  


//   const subtotal = Object.values(cart).reduce((acc, item) => acc + item.price * item.count, 0);
//   const taxRate = 0.1; 
//   const taxes = subtotal * taxRate;
//   const total = subtotal + taxes;

//   return (
//     <div className="w-full p-5 space-y-8">
//       <h2 className="text-2xl font-bold mb-5">Your Cart</h2>

//       {Object.values(cart).length === 0 ? (
//         <p className="text-lg text-gray-500">Your cart is empty</p>
//       ) : (
//         <div className="flex flex-row space-x-32">
//           {/* Cart Items */}
//           <div className="w-1/2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {Object.values(cart).map((item) => (
//               <Card
//                 key={item.id}
//                 hoverable
//                 className="rounded-lg shadow-lg overflow-hidden border-none -space-y-4"
//                 cover={
//                   <img
//                     src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item.imageId}`}
//                     alt={item.name}
//                     className="h-28 w-full object-cover"
//                   />
//                 }
//               >
//                 <div className="flex flex-col justify-between h-40">
//                   <h3 className="text-gray-800 text-lg font-bold mb-0 truncate ">
//                     {item.name}
//                   </h3>
//                   <p className="text-gray-500 text-sm mb-1 mt-0">
//                     Price: ₹{item.price}
//                   </p>
//                   {/* Quantity Controls */}
//                   <div className="flex items-center space-x-3 mb-3">
//                     <button
//                       onClick={() => decreaseFromCart(item.id)}
//                       className="bg-gray-200 text-gray-800 px-2 py-1 rounded hover:bg-gray-300 transition"
//                     >
//                       -
//                     </button>
//                     <span className="text-gray-800 font-medium">
//                       {item.count}
//                     </span>
//                     <button
//                       onClick={() => addToCart(item)}
//                       className="bg-gray-200 text-gray-800 px-2 py-1 rounded hover:bg-gray-300 transition"
//                     >
//                       +
//                     </button>
//                   </div>
//                   {/* Action Buttons */}
//                   <div className="flex justify-between space-x-2">
//                     <button
//                       onClick={() => removeFromCart(item.id)}
//                       className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition w-full"
//                     >
//                       Remove
//                     </button>
//                     <button
//                       onClick={() => alert(`Purchased: ${item.name}`)}
//                       className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition w-full"
//                     >
//                       Buy
//                     </button>
//                   </div>
//                 </div>
//               </Card>
//             ))}
//           </div>

//           {/* Billing Section */}
//           <div className="w-1/3  p-4 bg-gray-150 shadow-2xl rounded-lg shadow-md space-y-4">
//             <h3 className="text-xl font-bold">Billing Details</h3>

//             {/* List of Items in the Bill */}
//             <div className="space-y-4">
//               {Object.values(cart).map((item) => (
//                 <div key={item.id} className="flex justify-between">
//                   <span className="text-gray-600">{item.name} (x{item.count})</span>
//                   <span className="text-gray-800 font-medium">₹{(item.price * item.count).toFixed(2)}</span>
//                 </div>
//               ))}
//             </div>

//             <div className="flex justify-between mt-4">
//               <span className="text-gray-600 font-semibold">Subtotal:</span>
//               <span className="text-gray-600 font-semibold">₹{subtotal.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-600">Taxes (10%):</span>
//               <span className="text-gray-800 font-medium">₹{taxes.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between border-t border-gray-300 pt-2">
//               <span className="text-lg font-bold">Total:</span>
//               <span className="text-lg font-bold">₹{total.toFixed(2)}</span>
//             </div>

//             <div className="flex justify-between space-x-4">
//               <button
//                 onClick={() => alert("Checkout process started")}
//                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800 transition w-full"
//               >
//                 Buy Now
//               </button>
//               <button
//                 onClick={() => Object.keys(cart).forEach((id) => removeFromCart(id))}
//                 className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800 transition w-full"
//               >
//                 Clear Cart
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartComponent;



import React from "react";
import { Card, Button } from "antd";
import { useCart } from "./CartContext";

const CartComponent = () => {
  const { cart, addToCart, removeFromCart, decreaseFromCart } = useCart();

  const subtotal = Object.values(cart).reduce((acc, item) => acc + item.price * item.count, 0);
  const taxRate = 0.1;
  const taxes = subtotal * taxRate;
  const total = subtotal + taxes;

  return (
    <div className="w-full p-5 space-y-8">
      <h2 className="text-2xl font-bold mb-5">Your Cart</h2>

      {Object.values(cart).length === 0 ? (
        <p className="text-lg text-gray-500">Your cart is empty</p>
      ) : (
        <div className="flex flex-col sm:flex-row space-y-8 sm:space-y-0 sm:space-x-8">
          {/* Cart Items */}
          <div className="w-full sm:w-2/3 grid grid-cols-2 gap-4"> {/* 2 cards per row for mobile */}
            {Object.values(cart).map((item) => (
              <Card
                key={item.id}
                hoverable
                className="rounded-lg shadow-lg overflow-hidden border-none -space-y-4"
                cover={
                  <img
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item.imageId}`}
                    alt={item.name}
                    className="h-28 w-full object-cover"
                  />
                }
              >
                <div className="flex flex-col justify-between h-40">
                  <h3 className="text-gray-800 text-lg font-bold mb-0 truncate">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-1 mt-0">
                    Price: ₹{item.price}
                  </p>
                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3 mb-3">
                    <button
                      onClick={() => decreaseFromCart(item.id)}
                      className="bg-gray-200 text-gray-800 px-2 py-1 rounded hover:bg-gray-300 transition"
                    >
                      -
                    </button>
                    <span className="text-gray-800 font-medium">
                      {item.count}
                    </span>
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-gray-200 text-gray-800 px-2 py-1 rounded hover:bg-gray-300 transition"
                    >
                      +
                    </button>
                  </div>
                  {/* Action Buttons */}
                  <div className="flex justify-between space-x-2">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition w-full"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => alert(`Purchased: ${item.name}`)}
                      className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition w-full"
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Billing Section */}
          <div className="w-full sm:w-1/3 p-4 bg-gray-150 shadow-2xl rounded-lg shadow-md space-y-4">
            <h3 className="text-xl font-bold">Billing Details</h3>

            {/* List of Items in the Bill */}
            <div className="space-y-4">
              {Object.values(cart).map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span className="text-gray-600">{item.name} (x{item.count})</span>
                  <span className="text-gray-800 font-medium">₹{(item.price * item.count).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-4">
              <span className="text-gray-600 font-semibold">Subtotal:</span>
              <span className="text-gray-600 font-semibold">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Taxes (10%):</span>
              <span className="text-gray-800 font-medium">₹{taxes.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-gray-300 pt-2">
              <span className="text-lg font-bold">Total:</span>
              <span className="text-lg font-bold">₹{total.toFixed(2)}</span>
            </div>

            <div className="flex justify-between space-x-4">
              <button
                onClick={() => alert("Checkout process started")}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800 transition w-full"
              >
                Buy Now
              </button>
              <button
                onClick={() => Object.keys(cart).forEach((id) => removeFromCart(id))}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800 transition w-full"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartComponent;
