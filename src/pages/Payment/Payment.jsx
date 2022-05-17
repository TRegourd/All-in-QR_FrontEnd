import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./Payment.css";
import CheckoutForm from "../../components/Register_Components/CheckoutForm";
import paymentServices from "../../services/payment";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51L0JKmAB1sRKYFO6UPJ1GM7TdckIZnYUyVD13X7g6oC3YyOA3HE0nejoXtxgyp9XU8C9QbrNNrA3f8lrkSW80tgQ00FteYzG0K"
);

export default function Payment() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    paymentServices
      .intentPayment({ tshirt: 1200, lunettes: 3000 })
      .then((data) => {
        setClientSecret(data.data.clientSecret);
      });

    //     // Create PaymentIntent as soon as the page loads
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="payment">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
