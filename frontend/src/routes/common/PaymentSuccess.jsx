import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiRoutes from "../../utils/ApiRoutes.jsx";
import { useLocation } from "react-router-dom";
import api from "../../service/ApiService.jsx"; // assuming this is where your Axios instance is
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paymentId = queryParams.get("paymentId");
  const PayerID = queryParams.get("PayerID");
  const classId = queryParams.get("classId");
  const userId = sessionStorage.getItem("id");
  console.log(paymentId, PayerID, classId, userId);
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
        // console.log("Booking confirmed:", response.data);
        // Display success message or navigate to a confirmation page
      } catch (error) {
        console.error("Error confirming payment and booking:", error);
      }
    };

    if (paymentId && PayerID && classId && userId) {
      confirmPayment();
    }
  }, [paymentId, PayerID, classId, userId]);

  return (
    <div className=' h-screen flex items-center justify-center bg-[#151515]'>
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
            Check your email for class confirmation
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
    </div>
  );
};

export default PaymentSuccess;
