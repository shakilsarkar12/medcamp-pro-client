import { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import axiosSecure from "../../Utils/axiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../Utils/Hooks/useAuth";

const StripeCheckoutForm = ({ registration }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const { user } = useAuth();

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const { campName, campFees, _id, participantName, participantEmail } =
    registration;

  useEffect(() => {
    // Create PaymentIntent
    if (campFees > 0) {
      axiosSecure
        .post(`/create-payment-intent?email=${user?.email}`, {
          amount: campFees,
        })
        .then((res) => {
          if (res.data?.clientSecret) {
            setClientSecret(res.data.clientSecret);
          } else {
            toast.error("Failed to initialize payment");
          }
        })
        .catch(() => toast.error("Failed to initialize payment"));
    }
  }, [campFees, user?.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (campFees <= 0) {
      toast.error("No payment required for this camp.");
      return;
    }

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setProcessing(true);

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      toast.error(error.message);
      setProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: participantName,
            email: participantEmail,
          },
        },
      });

    if (confirmError) {
      toast.error(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const paymentData = {
        transactionId: paymentIntent.id,
        participantName,
        participantEmail,
        campName,
        campId: registration.campId,
        registrationId: _id,
        amount: campFees,
        date: new Date(),
        status: "Paid",
      };

      try {
        // Save to payments collection
        const paymentRes = await axiosSecure.post(
          `/payments?email=${user?.email}`,
          paymentData
        );
        if (!paymentRes.data?.success) {
          throw new Error("Failed to save payment record");
        }
        // Update registration status
        const updateRes = await axiosSecure.patch(`/registrations/${_id}?email=${user?.email}`);
        if (!updateRes.data?.success) {
          throw new Error(
            updateRes.data?.message || "Failed to update registration"
          );
        }

        Swal.fire({
          title: "🎉 Payment Successful!",
          html: `
            <div style="font-size:1.1rem;">
              <p>Your payment of <span style="color:#2D91EF;font-weight:bold;">$${campFees}</span> has been processed successfully.</p>
              <p style="margin-top:16px;">
          <strong>Transaction ID:</strong>
          <span id="txnId" style="color:#16a34a;font-weight:bold;cursor:pointer;" onclick="navigator.clipboard.writeText('${paymentIntent.id}')">${paymentIntent.id}</span>
          <span style="margin-left:8px;color:#2D91EF;font-size:1.1em;">📋</span>
          <span style="font-size:0.95em;color:#888;">(Click to copy)</span>
              </p>
              <p style="margin-top:10px;">
          <span style="display:inline-block;background:#e6f7ff;color:#2D91EF;padding:6px 16px;border-radius:20px;font-weight:500;">Thank you for registering!
          </span>
              </p>
            </div>
          `,
          icon: "success",
          confirmButtonColor: "#2D91EF",
          background: "#f8fafc",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
        navigate("/registered-camps");
      } catch (error) {
        toast.error(error?.message || "Error storing payment info");
      } finally {
        setProcessing(false);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg p-6 bg-white rounded shadow space-y-4"
    >
      <h2 className="text-xl font-semibold">Pay for {campName}</h2>
      <p>
        Camp Fee: <strong>${campFees}</strong>
      </p>

      <CardElement className="border rounded p-2" />

      <button
        type="submit"
        disabled={!stripe || !clientSecret || processing}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {processing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default StripeCheckoutForm;
