import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useScrollToTop from "../../hooks/useScrollToTop";

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useScrollToTop();

  async function handleResetPassword({ email, newPassword }) {
    setIsLoading(true);

    try {
      const response = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
        {
          email,
          newPassword,
        }
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);

      formik.resetForm();

      toast.success("The New Password has been set successfully", {
        style: {
          backgroundColor: "#34D399",
          color: "white",
        },
      });
    } catch (error) {
      console.error("Error in new password request:", error);

      toast.error(
        error.response?.data?.message ||
          "Something went wrong, please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Email is required"),
    newPassword: Yup.string()
      .matches(
        /^[A-Za-z0-9]{6,10}$/,
        "New Password must be between 6 and 10 alphanumeric characters long. Example: abcABC12"
      )
      .required("New Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: handleResetPassword,
  });

  return (
    <>
      <div className="py-10">
        <h2 className="text-center text-emerald-500 font-semibold text-3xl py-5">
          Set New Password
        </h2>
      </div>

      <div className="container px-5 pb-8">
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
          <div className="relative z-0 w-full mb-5 pb-4 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-slate-600 dark:text-white bg-transparent border-0 border-b-2 border-[#1ABC9C] appearance-none focus:outline-none focus:ring-0 focus:border-[#1ABC9C] peer"
              placeholder=" "
              aria-describedby="email-error"
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#1ABC9C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your email
            </label>
            {formik.errors.email && formik.touched.email ? (
              <div
                id="email-error"
                className="flex items-center p-2 mt-2 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-[#282828] dark:text-red-400 dark:border-red-800"
                role="alert"
              >
                <div>
                  <span className="font-medium">{formik.errors.email}</span>
                </div>
              </div>
            ) : null}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.newPassword}
              type="password"
              name="newPassword"
              id="newPassword"
              className="block py-2.5 px-0 w-full text-sm text-slate-600 dark:text-white bg-transparent border-0 border-b-2 border-[#1ABC9C] appearance-none focus:outline-none focus:ring-0 focus:border-[#1ABC9C] peer"
              placeholder=" "
              aria-describedby="password-error"
            />
            <label
              htmlFor="newPassword"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#1ABC9C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your new password
            </label>
            {formik.errors.newPassword && formik.touched.newPassword ? (
              <div
                id="password-error"
                className="flex items-center p-2 mt-2 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-[#282828] dark:text-red-400 dark:border-red-800"
                role="alert"
              >
                <div>
                  <span className="font-medium">
                    {formik.errors.newPassword}
                  </span>
                </div>
              </div>
            ) : null}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="relative inline-flex items-center justify-center w-full px-5 py-2.5 text-sm font-medium text-white rounded-lg bg-emerald-500 group focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-500 hover:bg-emerald-400"
              disabled={isLoading}
            >
              {isLoading ? (
                // <>
                //   <svg
                //     aria-hidden="true"
                //     role="status"
                //     className="inline w-4 h-4 mr-3 text-white animate-spin"
                //     viewBox="0 0 100 101"
                //     fill="none"
                //     xmlns="http://www.w3.org/2000/svg"
                //   >
                //     <path
                //       d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9765 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9765 100 50.5908ZM9.08124 50.5908C9.08124 73.2556 27.3353 91.5097 50 91.5097C72.6647 91.5097 90.9188 73.2556 90.9188 50.5908C90.9188 27.926 72.6647 9.67192 50 9.67192C27.3353 9.67192 9.08124 27.926 9.08124 50.5908Z"
                //       fill="#E5E7EB"
                //     />
                //     <path
                //       d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5538C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.6305 75.6946 6.88551C73.5322 5.1163 69.9895 5.66758 68.6536 8.70727C67.4382 11.2988 67.4823 14.099 68.6268 16.7168C69.769 19.3353 71.5445 22.6826 73.4447 25.8883C75.0744 28.5267 76.6241 31.233 77.9468 33.9786C79.3132 36.7015 82.8269 38.501 85.7301 37.5791C88.522 36.7071 90.9512 34.6423 93.9676 39.0409Z"
                //       fill="currentColor"
                //     />
                //   </svg>
                //   Please wait...
                // </>
                <>
                 Please wait...
                </>
              ) : (
                "Reset Password"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

