import { loadStripe } from "@stripe/stripe-js";

let stripePromisse;

const getStripe = () => {
  if (!stripePromisse) {
    stripePromisse = loadStripe("pk_test_Kkf7X52bm6u7DGtBmi4RIUEC00GSAampw8");
  }

  return stripePromisse;
};

export default getStripe;
