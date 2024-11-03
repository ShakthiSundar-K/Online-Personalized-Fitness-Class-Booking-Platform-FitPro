import React, { useState } from "react";
import logo from "../../assets/horizontallogo.png";
import api from "../../service/ApiService"; // Adjust the import path if necessary
import ApiRoutes from "../../utils/ApiRoutes"; // Adjust the import path if necessary
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    role: "user",
    preferences: "",
    goals: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      handleSignUp();
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await api.post(ApiRoutes.SIGNUP.path, formData, {
        authenticate: ApiRoutes.SIGNUP.authenticate,
      });

      toast.success(response.message);
      navigate("/home"); // Adjust the route as needed
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
        <div className='w-full bg-white rounded-lg shadow md:mt-0 xl:p-0 sm:min-w-96 '>
          <div
            className={`p-6 space-y-4 md:space-y-6 sm:px-8 ${
              step === 2 ? "pt-0" : ""
            }`}
          >
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
              {step === 1 ? "Create an account" : ""}
            </h1>
            <form onSubmit={handleNext} className='space-y-4 md:space-y-6'>
              {step === 1 ? (
                <>
                  <div>
                    <label
                      htmlFor='name'
                      className='block mb-2 text-sm font-medium text-gray-900'
                    >
                      Your name
                    </label>
                    <input
                      type='text'
                      name='name'
                      id='name'
                      value={formData.name}
                      onChange={handleChange}
                      className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5'
                      placeholder='John Doe'
                      required
                    />
                  </div>
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
                      value={formData.email}
                      onChange={handleChange}
                      className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5'
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
                      value={formData.password}
                      onChange={handleChange}
                      placeholder='••••••••'
                      className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5'
                      required
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label
                      htmlFor='mobile'
                      className='block mb-2 text-sm font-medium text-gray-900'
                    >
                      Phone Number
                    </label>
                    <input
                      type='tel'
                      name='mobile'
                      id='mobile'
                      value={formData.mobile}
                      onChange={handleChange}
                      className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5'
                      placeholder='123-456-7890'
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='role'
                      className='block mb-2 text-sm font-medium text-gray-900'
                    >
                      User Type
                    </label>
                    <select
                      name='role'
                      id='role'
                      value={formData.role}
                      onChange={handleChange}
                      className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5'
                      required
                    >
                      <option value='user'>User</option>
                      <option value='trainer'>Trainer</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor='preferences'
                      className='block mb-2 text-sm font-medium text-gray-900'
                    >
                      Preferences
                    </label>
                    <select
                      name='preferences'
                      id='preferences'
                      value={formData.preferences}
                      onChange={handleChange}
                      className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5'
                      required
                    >
                      <option value=''>Select...</option>
                      <option value='yoga'>Yoga</option>
                      <option value='strength'>Strength</option>
                      <option value='cardio'>Cardio</option>
                      <option value='dance'>Dance</option>
                      <option value='pilates'>Pilates</option>
                      <option value='boxing'>Boxing</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor='goals'
                      className='block mb-2 text-sm font-medium text-gray-900'
                    >
                      Goals
                    </label>
                    <select
                      name='goals'
                      id='goals'
                      value={formData.goals}
                      onChange={handleChange}
                      className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5'
                      required
                    >
                      <option value=''>Select...</option>
                      <option value='weight loss'>Weight Loss</option>
                      <option value='muscle gain'>Muscle Gain</option>
                      <option value='flexibility'>Flexibility</option>
                      <option value='stamina'>Stamina</option>
                    </select>
                  </div>
                </>
              )}
              <div className='flex items-center justify-between mt-4'>
                {step === 2 && (
                  <button
                    type='button'
                    onClick={() => setStep(1)}
                    className='text-sm font-medium text-orange-600 hover:underline pb-3'
                  >
                    Back
                  </button>
                )}
                <p className='text-sm font-light text-gray-500'>
                  Already have an account?{" "}
                  <a
                    href='/'
                    className='font-medium text-orange-600 hover:underline'
                  >
                    Sign in
                  </a>
                </p>
              </div>
              <button
                type='submit'
                className='w-full text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
              >
                {step === 1 ? "Next" : "Sign Up"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
