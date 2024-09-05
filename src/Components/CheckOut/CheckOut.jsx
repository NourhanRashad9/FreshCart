

import { useFormik } from "formik";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { CartContext } from "../../Context/CartContext";
import useScrollToTop from "../../hooks/useScrollToTop";

export default function CheckOut() {
  let { checkOut } = useContext(CartContext);
  let navigate = useNavigate(); // To handle navigation after payment
  useScrollToTop();

  // Validation schema using Yup
  let validationSchema = Yup.object().shape({
    details: Yup.string(),
    city: Yup.string().required("City Name is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Invalid Phone Number")
      .required("Phone is required"),
  });

  // Formik configuration
  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: (values) => {
      checkOut(values).then(() => {
        // Redirect to the desired path after successful checkout
        navigate("http://localhost:5173", { replace: true });
      });
    },
  });

  return (
    <div className="text-white py-12 pb-16">
      <h2 className="text-center py-3 text-3xl font-semibold text-emerald-500 dark:text-white mb-2">
        Complete Your Checkout
      </h2>
      <div className="container px-5 pb-8">
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
          {/* details input */}
          <div className="relative z-0 w-full mb-5 pb-4 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.details}
              type="text"
              name="details"
              id="details"
              className="block py-2.5 px-0 w-full text-sm text-slate-600 dark:text-white bg-transparent border-0 border-b-2 border-emerald-500 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-500 peer"
              placeholder=" "
            />
            <label
              htmlFor="details"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Street Name
            </label>
          </div>

          {/* city input */}
          <div className="relative z-0 w-full mb-5 pb-4 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.city}
              type="text"
              name="city"
              id="city"
              className="block py-2.5 px-0 w-full text-sm text-slate-600 dark:text-white bg-transparent border-0 border-b-2 border-emerald-500 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-500 peer"
              placeholder=" "
            />
            <label
              htmlFor="city"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              City Name
            </label>
            {formik.errors.city && formik.touched.city ? (
              <div className="flex items-center p-2 mt-2 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-[#282828] dark:text-red-400 dark:border-red-800">
                <div>
                  <span className="font-medium">{formik.errors.city}</span>
                </div>
              </div>
            ) : null}
          </div>

          {/* phone input */}
          <div className="relative z-0 w-full mb-5 pb-4 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phone}
              type="tel"
              name="phone"
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-slate-600 dark:text-white bg-transparent border-0 border-b-2 border-emerald-500 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-500 peer"
              placeholder=" "
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone Number
            </label>
            {formik.errors.phone && formik.touched.phone ? (
              <div className="flex items-center p-2 mt-2 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-[#282828] dark:text-red-400 dark:border-red-800">
                <div>
                  <span className="font-medium">{formik.errors.phone}</span>
                </div>
              </div>
            ) : null}
          </div>

          {/* Submit button */}
          <div className="text-center">
            <button
              type="submit"
              className="relative inline-flex items-center justify-center w-full px-5 py-2.5 text-sm font-medium text-white rounded-lg bg-emerald-500 focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-500 hover:bg-emerald-400"
            >
              Confirm & Pay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

