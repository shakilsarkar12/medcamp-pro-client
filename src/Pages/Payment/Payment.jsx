import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../Utils/axiosSecure";
import Spinner from "../../Shared/Spinner";
import StripeCheckoutForm from "./StripeCheckoutForm";

// Replace with your Stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {
  const { id } = useParams();
  const { data: registration, isLoading } = useQuery({
    queryKey: ["registration", id],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/registrations/${id}`
      );
      return res.data;
    },
  });
    
    console.log(registration);

  if (isLoading) {
    return <Spinner/>;
  }
  if (!registration) {
    return <div className="p-6 text-center text-red-500">Registration not found.</div>;
  }
  return (
    <div className="p-6">
      <Elements stripe={stripePromise}>
        <StripeCheckoutForm registration={registration} />
      </Elements>
    </div>
  );
};

export default Payment;
