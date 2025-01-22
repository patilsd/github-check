
import React, { useEffect, useState, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

const Deals = () => {
  const [deals, setDeals] = useState([]); 
  const scrollContainerRef = useRef(null);
  const BASE_IMAGE_URL = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/"

  useEffect(() => {
    fetch('/data.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Data:", data);

        const cards = data?.data?.cards;
  
        console.log("All Cards:", cards);
  
        const desiredCard = cards?.find((card) =>
          card?.card?.card?.gridElements?.infoWithStyle?.offers
        );
  
        if (desiredCard) {
          const offers = desiredCard.card.card.gridElements.infoWithStyle.offers;
          console.log("Offers:", offers);
  
          setDeals(offers.map((offer) => ({
            header: offer.info.header || "No Header",
            offerLogo: `${BASE_IMAGE_URL}${offer.info.offerLogo || ""}`,
            description: offer.info.description || "No Description",
          })));
        } else {
          console.error("Desired card not found in the data structure.");
          setDeals([]); 
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
   

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -400, 
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 400, 
        behavior: "smooth",
      });
    }
  };

  if (deals.length === 0) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="p-6 max-w-4xl mx-auto ">
      <div className="flex justify-between mb-8">
        <h2 className="text-2xl font-extrabold">Deals for you</h2>
        <div className="flex space-x-2 ">
          <button
            onClick={scrollLeft}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button
            onClick={scrollRight}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div
        className="flex space-x-12 overflow-x-auto scrollbar-hide"
        ref={scrollContainerRef}
      >
        {deals.map((deal, index) => (
          <div
            key={index}
            className="min-w-[400px] border rounded-3xl flex items-center space-x-4 shadow-md p-4"
          >
            <div className="flex items-center justify-center">
              <img
                src={deal.offerLogo}
                alt="Offer Logo"
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div>
              <p className="text-xl font-extrabold mb-1">{deal.header}</p>
              <p className="text-md font-bold text-gray-500">
                {deal.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deals;
