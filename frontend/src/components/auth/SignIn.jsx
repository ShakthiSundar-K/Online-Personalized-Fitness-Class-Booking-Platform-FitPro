import React from "react";
import logo from "../../assets/horizontallogo.png";
import api from "../../service/ApiService";
import ApiRoutes from "../../utils/ApiRoutes";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignIn = () => {
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const data = {};
      for (let [key, value] of formData.entries()) {
        data[key] = value;
      }

      // Send data to the API
      let response = await api.post(ApiRoutes.LOGIN.path, data, {
        authenticate: ApiRoutes.LOGIN.authenticate,
      });
      console.log(response);
      toast.success(response.message);

      // store the token and other data in session storage
      sessionStorage.setItem("token", response.token);
      sessionStorage.setItem("role", response.role);
      sessionStorage.setItem("id", response.id);

      // Redirect to the login page after successful login
      navigate("/home");
    } catch (error) {
      toast.error(
        error.response.data.message || "Error occurred! Please try again!"
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
              Sign in to your account
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
              <div>
                <label
                  htmlFor='password'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5'
                  required
                />
              </div>
              <div className='flex items-center justify-between'>
                <a
                  href='/forgotpassword'
                  className='text-sm font-medium text-orange-600 hover:underline'
                >
                  Forgot password?
                </a>
              </div>
              <button
                type='submit'
                className='w-full text-white bg-orange-600 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
              >
                Sign in
              </button>
              <p className='text-sm font-light text-gray-500'>
                Don’t have an account yet?{" "}
                <a
                  href='/signup'
                  className='font-medium text-orange-600 hover:underline'
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
