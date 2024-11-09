import React from "react";
import logo from "../../assets/horizontallogo.png";
import api from "../../service/ApiService";
import ApiRoutes from "../../utils/ApiRoutes";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const email = e.target.email.value;

      // Send data to the API
      let response = await api.post(
        ApiRoutes.ForgotPassword.path,
        { email },
        {
          authenticate: ApiRoutes.ForgotPassword.authenticate,
        }
      );

      toast.success("Mail Sent Successfully");

      // Redirect to the desired page after successful action
      navigate("/"); // Adjust the route as needed
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Error occurred! Please try again!"
      );
    }
  };

  return (
    <section className='h-screen flex items-center justify-center'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <a
          href='#'
          className='flex items-center text-2xl font-semibold text-gray-900'
          onClick={(e) => e.preventDefault()}
        >
          <img className='w-36 h-30' src={logo} alt='logo' />
        </a>
        <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 sm:min-w-96 lg:mb-9'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
              Let’s get you back into your account in no time!
            </h1>
            <form onSubmit={handleSignIn} className='space-y-4 md:space-y-6'>
              <div>
                <label
                  htmlFor='email'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Your email
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5'
                  placeholder='name@company.com'
                  required
                />
              </div>

              <button
                type='submit'
                className='w-full text-white bg-orange-600 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
              >
                Send Password Reset Link
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
