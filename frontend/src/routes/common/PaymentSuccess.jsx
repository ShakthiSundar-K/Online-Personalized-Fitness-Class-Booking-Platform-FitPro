import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import ApiRoutes from "../../utils/ApiRoutes.jsx";
import api from "../../service/ApiService.jsx"; // assuming this is where your Axios instance is
import toast from "react-hot-toast";

const PaymentSuccess = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paymentId = queryParams.get("paymentId");
  const PayerID = queryParams.get("PayerID");
  const classId = queryParams.get("classId");
  const userId = sessionStorage.getItem("id");

  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);

  useEffect(() => {
    const confirmPayment = async () => {
      const { path, authenticate } = ApiRoutes.CONFIRM_PAYMENT_AND_BOOK_CLASS;

      try {
        await api.post(
          path,
          { paymentId, PayerID, classId, userId },
          { authenticate }
        );
        toast.success("Class Booked Successfully!");
        setIsPaymentConfirmed(true);
      } catch (error) {
        console.error("Error confirming payment and booking:", error);
      }
    };

    if (paymentId && PayerID && classId && userId) {
      confirmPayment();
    }
  }, [paymentId, PayerID, classId, userId]);

  return (
    <div className='h-screen flex items-center justify-center bg-[#151515]'>
      {isPaymentConfirmed ? (
        <div className='bg-white p-6 md:mx-auto max-w-md'>
          <svg
            viewBox='0 0 24 24'
            className='text-green-600 w-16 h-16 mx-auto my-6'
          >
            <path
              fill='currentColor'
              d='M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z'
            />
          </svg>
          <div className='text-center'>
            <h3 className='md:text-2xl text-base text-gray-900 font-semibold'>
              Payment Done!
            </h3>
            <p className='text-gray-600 my-2'>
              Thank you for completing your secure online payment.
              <br />
              Check your email for class confirmation.
            </p>
            <p>Have a great day!</p>
            <div className='py-10 text-center'>
              <Link
                to='/home'
                className='px-12 bg-orange-600 hover:bg-orange-400 text-white font-semibold py-3'
              >
                GO BACK
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className='text-center max-w-md bg-gray-800 text-white p-6 rounded-md'>
          <h3 className='text-lg md:text-xl font-semibold mb-4'>
            Payment Processing
          </h3>
          <p className='text-sm md:text-base mb-4'>
            Your payment is being processed. This may take a few moments.
            <br />
            <span className='text-yellow-500'>
              Due to backend inactivity, requests may take up to 50 seconds or
              more.
            </span>
            <br />
            If your payment is not processing, or the page seems inactive for a
            long time, please refresh the page a few times and wait patiently.
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
