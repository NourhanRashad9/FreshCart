import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function Brands() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/brands")
      .then((res) => {
        setBrands(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching brands:", error);
      });
  }, []);

  return (
    <div className="container mx-auto p-6">
      {brands.length > 0 ? (
        <>
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
            Shop Popular Brands
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((brand) => (
              <Link
                key={brand._id}
                to={`/brandsProducts/${brand.name}`}
                className="relative block bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden dark:bg-gray-800"
              >
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-48 object-cover transition-transform duration-300 transform hover:scale-105"
                />
                <div className="p-4 text-center">
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                    {brand.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}



