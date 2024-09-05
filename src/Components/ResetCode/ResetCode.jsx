import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useScrollToTop from "../../hooks/useScrollToTop";

export default function ResetCode() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useScrollToTop();

  async function handleResetCode({ resetCode }) {
    setIsLoading(true);

    try {
      await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        { resetCode }
      );

      setTimeout(() => {
        navigate("/resetpassword");
      }, 1500);

      formik.resetForm();
      toast.success("The Reset Code Entered Successfully", {
        style: {
          backgroundColor: "#34D399",
          color: "white",
        },
      });
    } catch (error) {
      console.error("Error in reset code request:", error);
      toast.error(error.response?.data?.message, {
        style: {
          backgroundColor: "#F87171",
          color: "white",
        },
      });
    } finally {
      setIsLoading(false);
    }
  }

  const validationSchema = Yup.object().shape({
    resetCode: Yup.string().required("Reset Code is required"),
  });

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: handleResetCode,
  });

  return (
    <>
      <div className="py-10">
        <h2 className="text-center text-emerald-500 font-semibold text-3xl py-5">
          Enter Verification Code
        </h2>
        <p className="text-gray-400 font-semibold text-center">
          We've Sent a Code to Your Email
        </p>
      </div>
      <div className="container px-5 pb-8">
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
          <div className="relative z-0 w-full mb-5 pb-4 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.resetCode}
              type="text"
              name="resetCode"
              id="resetCode"
              className="block py-2.5 px-0 w-full text-sm text-slate-600 dark:text-white bg-transparent border-0 border-b-2 border-emerald-500 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-500 peer"
              placeholder=" "
              aria-label="Enter your reset code"
            />
            <label
              htmlFor="resetCode"
              className="absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-emerald-500"
            >
              Enter your Reset Code
            </label>
            {formik.errors.resetCode && formik.touched.resetCode && (
              <div
                className="flex items-center p-2 mt-2 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-[#282828] dark:text-red-400 dark:border-red-800"
                role="alert"
              >
                <span className="font-medium">{formik.errors.resetCode}</span>
              </div>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="relative inline-flex items-center justify-center w-full px-5 py-2.5 text-sm font-medium text-white rounded-lg bg-emerald-500 focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-500 hover:bg-emerald-400"
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
                //       d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5538C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7232 75.2124 7.41289C69.5422 4.10256 63.2754 1.94025 56.7688 1.0519C51.7666 0.367437 46.6987 0.446906 41.7345 1.27866C39.2611 1.69443 37.7926 4.19778 38.4297 6.62326C39.0668 9.04874 41.539 10.4566 44.0001 10.0209C47.7756 9.3554 51.6142 9.34166 55.4078 9.98734C60.8784 10.9377 65.9981 13.0137 70.3661 16.0837C74.7342 19.1538 78.2526 23.1355 80.6395 27.7922C82.6566 31.6424 84.0506 35.7837 84.7637 40.0675C85.2979 42.4253 87.5422 43.9631 89.9676 43.326C92.393 42.6889 93.9308 40.4446 93.9676 39.0409Z"
                //       fill="currentColor"
                //     />
                //   </svg>
                //   Verifying...
                // </>

                <> Verifying...
                </>
              ) : (
                "Verify"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
