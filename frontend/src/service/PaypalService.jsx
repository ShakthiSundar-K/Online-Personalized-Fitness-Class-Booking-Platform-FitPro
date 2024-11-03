// import axios from "axios";

// const paypalApi = axios.create({
//   baseURL: "https://api.sandbox.paypal.com",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// paypalApi.interceptors.request.use(
//   (config) => {
//     // Include any necessary PayPal authorization headers here
//     const token = sessionStorage.getItem("token");
//     if (config.authenticate === true && token)
//       config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// paypalApi.interceptors.response.use(
//   (response) => response.data,
//   (error) => {
//     console.error("PayPal API Error:", error);
//     return Promise.reject(error);
//   }
// );

// export default paypalApi;
