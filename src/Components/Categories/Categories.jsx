


import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { Link } from "react-router-dom";
import useScrollToTop from "../../hooks/useScrollToTop";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  useScrollToTop();

  useEffect(() => {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((res) => setCategories(res.data.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return categories.length ? (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-8 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">
         Top Categories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {categories.map((category) => (
          <div
            key={category._id}
            className="relative group overflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            <Link to={`/categoryProducts/${category.name}`}>
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-xl font-semibold uppercase tracking-widest">
                  {category.name}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <LoadingSpinner />
  );
}

