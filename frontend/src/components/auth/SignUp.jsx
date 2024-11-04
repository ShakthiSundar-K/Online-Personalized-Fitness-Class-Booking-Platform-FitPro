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

  const [trainerData, setTrainerData] = useState({
    bio: "",
    specializations: "", // This will be split into an array upon submission
    experience: "",
    certifications: "", // This will be split into an array upon submission
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (step === 3 && formData.role === "trainer") {
      setTrainerData({ ...trainerData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNext = (e) => {
    e.preventDefault();

    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (formData.role === "trainer") {
        setStep(3); // Advance to step 3 if role is trainer
      } else {
        handleSignUp(); // Sign up immediately if role is user
      }
    } else if (step === 3) {
      handleSignUp(); // Trigger signup for trainers in the final step
    }
  };

  const handleSignUp = async () => {
    try {
      // Step 1: Call the signup API
      const response = await api.post(ApiRoutes.SIGNUP.path, formData, {
        authenticate: ApiRoutes.SIGNUP.authenticate,
      });
      const userId = response.userId; // Assuming the signup API returns userId in its response
      toast.success(response.message);

      // Step 2: If the role is "trainer," call the createTrainerProfile API
      if (formData.role === "trainer") {
        const trainerProfileData = {
          ...trainerData,
          userId, // Include the new user ID for trainer profile creation
          specializations: trainerData.specializations
            .split(",")
            .map((item) => item.trim()),
          certifications: trainerData.certifications
            .split(",")
            .map((item) => item.trim()),
        };

        await api.post(
          ApiRoutes.CREATE_TRAINER_PROFILE.path,
          trainerProfileData,
          {
            authenticate: false, // Trainer profile creation doesn’t require authentication in this case
          }
        );

        toast.success("Trainer profile created successfully");
      }

      navigate("/home"); // Adjust the route as needed
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
        <div className='w-full bg-white rounded-lg shadow md:mt-0 xl:p-0 sm:min-w-96'>
          <div
            className={`p-6 space-y-4 md:space-y-6 sm:px-8 ${
              step === 2 || step === 3 ? "pt-0" : ""
            }`}
          >
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
              {step === 1 ? "Create an account" : ""}
            </h1>
            <form onSubmit={handleNext} className='space-y-4 md:space-y-6'>
              {step === 1 && (
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
              )}
              {step === 2 && (
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
                </>
              )}
              {step === 3 && formData.role === "trainer" && (
                <>
                  <div>
                    <label
                      htmlFor='bio'
                      className='block mb-2 text-sm font-medium text-gray-900'
                    >
                      Bio
                    </label>
                    <textarea
                      name='bio'
                      id='bio'
                      value={trainerData.bio}
                      onChange={handleChange}
                      className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5'
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='specializations'
                      className='block mb-2 text-sm font-medium text-gray-900'
                    >
                      Specializations (comma-separated)
                    </label>
                    <input
                      type='text'
                      name='specializations'
                      id='specializations'
                      value={trainerData.specializations}
                      onChange={handleChange}
                      className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5'
                      placeholder='Yoga, Strength Training, ...'
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='experience'
                      className='block mb-2 text-sm font-medium text-gray-900'
                    >
                      Experience (Years)
                    </label>
                    <input
                      type='number'
                      name='experience'
                      id='experience'
                      value={trainerData.experience}
                      onChange={handleChange}
                      className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5'
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='certifications'
                      className='block mb-2 text-sm font-medium text-gray-900'
                    >
                      Certifications (comma-separated)
                    </label>
                    <input
                      type='text'
                      name='certifications'
                      id='certifications'
                      value={trainerData.certifications}
                      onChange={handleChange}
                      className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5'
                      placeholder='Certification A, Certification B, ...'
                      required
                    />
                  </div>
                </>
              )}
              <button
                type='submit'
                className='w-full text-white bg-orange-500 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
              >
                {step === 3 || (step === 2 && formData.role === "user")
                  ? "Sign Up"
                  : "Next"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
