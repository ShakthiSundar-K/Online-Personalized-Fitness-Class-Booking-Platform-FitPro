import React, { useState } from "react"; // Added useState here
import logo from "../../assets/horizontallogo.png";
import api from "../../service/ApiService"; // Adjust the import path if necessary
import ApiRoutes from "../../utils/ApiRoutes"; // Adjust the import path if necessary
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams(); // Captures the token from the URL
  const [newPassword, setNewPassword] = useState(""); // useState for new password

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      // Send data to the API
      await api.post(
        ApiRoutes.RESETPASSWORD.path,
        { token, newPassword },
        {
          authenticate: ApiRoutes.RESETPASSWORD.authenticate,
        }
      );

      toast.success("Password Reset Successful");

      // Redirect to the desired page after successful reset
      navigate("/"); // Adjust the route as needed
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error occurred! Please try again!"
      );
    }
  };

  return (
    <section className='h-screen flex items-center justify-center'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <a
          href='#'
          className='flex items-center text-2xl font-semibold text-gray-900'
        >
          <img className='w-36 h-30' src={logo} alt='logo' />
        </a>
        <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 sm:min-w-96 lg:mb-9'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
              Reset Your Password
            </h1>
            <form onSubmit={handleReset} className='space-y-4 md:space-y-6'>
              <div>
                <label
                  htmlFor='newPassword'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  New Password
                </label>
                <input
                  type='password'
                  name='newPassword'
                  id='newPassword'
                  className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type='submit'
                className='w-full text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
