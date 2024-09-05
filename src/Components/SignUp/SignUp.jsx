import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";
import useScrollToTop from "../../hooks/useScrollToTop";

export default function SignUp() {
  const navigate = useNavigate();
  const { setUserLogin } = useContext(UserContext);
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3).max(10).required(),
    email: Yup.string().email().required(),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/).required(),
    password: Yup.string().matches(/^[A-Za-z0-9]{6,10}$/).required(),
    rePassword: Yup.string().oneOf([Yup.ref("password")]).required(),
  });

  const handleRegister = async (values) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values);
      if (data.message === "success") {
        localStorage.setItem("userToken", data.token);
        setUserLogin(data.token);
        navigate("/");
      }
    } catch (error) {
      setApiError(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "", rePassword: "", phone: "" },
    validationSchema,
    onSubmit: handleRegister,
  });

  useScrollToTop();

  return (
    <div className="text-white pt-5 w-11/12 mx-auto md:pt-0">
      <h2 className="text-center py-3 text-3xl font-semibold text-emerald-500 dark:text-white mb-2">Register</h2>
      {apiError && (
        <div className="flex items-center p-2 my-5 w-1/3 mx-auto text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-[#282828] dark:text-red-400 dark:border-red-800" role="alert">
          <span className="font-medium">{apiError}</span>
        </div>
      )}
      <div className="container px-5 pb-8">
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
          {["name", "email", "password", "rePassword", "phone"].map((field) => (
            <div key={field} className="relative z-0 w-full mb-5 pb-4 group">
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values[field]}
                type={field === "email" ? "email" : "text"}
                name={field}
                id={field}
                className="block py-2.5 px-0 w-full text-sm text-slate-600 dark:text-white bg-transparent border-0 border-b-2 border-[#1ABC9C] appearance-none focus:outline-none focus:ring-0 focus:border-[#1ABC9C] peer"
                placeholder=" "
              />
              <label
                htmlFor={field}
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#1ABC9C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter your {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              {formik.errors[field] && formik.touched[field] && (
                <div className="flex items-center p-2 mt-2 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-[#282828] dark:text-red-400 dark:border-red-800" role="alert">
                  <span className="font-medium">{formik.errors[field]}</span>
                </div>
              )}
            </div>
          ))}
          <div className="text-center">
            <button
              type="submit"
              className="relative inline-flex items-center justify-center w-full px-5 py-2.5 text-sm font-medium text-white rounded-lg bg-emerald-500 group focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-500 hover:bg-emerald-400"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  
                  Loading...
                </>
              ) : "Register"}
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300 pt-2">
              Already have an account?
              <Link to="/login" className="text-emerald-500 hover:underline dark:text-emerald-500 pl-1">
                Sign In
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
