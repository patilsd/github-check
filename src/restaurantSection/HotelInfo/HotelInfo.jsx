
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { Card, Tooltip } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const HotelInfo = () => {
  const location = useLocation();
  const { id } = useParams();
  const {
    imageUrl,
    name,
    rating,
    costForTwo,
    cuisine = "",
    location: restaurantLocation,
  } = location.state || {};

 
  const cuisines = cuisine.split(",").map((c) => c.trim());

  if (!location.state) {
    return <div>No restaurant data available for ID: {id}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mb-10 bg-gray-40">
      <h3 className="text-2xl font-extrabold mt-20 mb-7 ml-4">{name}</h3>
      <Card
        bordered={false}
        className="md:w-full border border-gray-200 rounded-3xl m-2 w-100"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px",
        }}
      >
        <div className="bg-red-100 border border-red-200 text-red-600 rounded-md p-3 mb-4 flex">
          <ExclamationCircleOutlined className="mr-2 text-lg" />
          <span>This location is outside the outlet's delivery area</span>
        </div>

        <div className="text-left">
          <div className="flex items-center text-gray-700 text-sm my-2">
            <div className="flex justify-center items-center w-8 h-8 bg-green-600 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-4 h-4 text-white"
                viewBox="0 0 20 20"
              >
                <path d="M10 15.27l-6.18 3.73 1.64-7.03L1 6.97l7.19-.61L10 0l2.81 5.36 7.19.61-4.46 5.99 1.64 7.03L10 15.27z" />
              </svg>
            </div>
            <span className="font-bold ml-2 text-xl">{rating || "N/A"}</span>
            <span className="ml-2 text-xl font-bold">(492 ratings)</span>
            <span className="ml-2 mx-2 text-xl font-bold text-gray-500">·</span>
            <span className="text-xl font-bold">{costForTwo || "Price not available"}</span>
          </div>

          <div className="mb-3">
            {cuisines.length > 0 ? (
              cuisines.map((cuisine, index) => (
                <span
                  className="mr-1 text-orange-500 font-bold text-lg underline decoration-orange-500"
                  key={index}
                >
                  {cuisine}
                  {index < cuisines.length - 1 && ','}
                </span>
              ))
            ) : (
              <p>No cuisines available</p>
            )}
          </div>

          <div className="text-gray-700 mb-2 space-x-2">
            <span className="font-bold text-md text-black-500">Outlet</span>{" "}
            <span className="font-medium text-md text-gray-500">
              {restaurantLocation || "Location not available"}
            </span>
          </div>

          <Tooltip title="This outlet does not deliver to your location">
            <div className="text-black-500 text-md font-bold">Does not deliver</div>
          </Tooltip>
        </div>
      </Card>
    </div>
  );
};

export default HotelInfo;
