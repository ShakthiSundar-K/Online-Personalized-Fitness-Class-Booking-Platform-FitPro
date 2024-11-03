import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiRoutes from "../../utils/ApiRoutes.jsx";
import { useLocation } from "react-router-dom";
import api from "../../service/ApiService.jsx"; // assuming this is where your Axios instance is
import toast from "react-hot-toast";

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

  return <div>Processing your booking...</div>;
};

export default PaymentSuccess;
