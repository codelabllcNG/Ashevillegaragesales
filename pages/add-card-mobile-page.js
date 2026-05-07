import { Elements } from '@stripe/react-stripe-js';
import React from 'react'
import { loadStripe } from "@stripe/stripe-js";
import AddCardMobile from '@/components/AddCardMobile';

const stripePromise = loadStripe(
    `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
  );

function AddCardMobilePage() {
  return (
      <div>
          <Elements stripe={stripePromise}>
              <AddCardMobile/>
          </Elements>
    </div>
  )
}

export default AddCardMobilePage