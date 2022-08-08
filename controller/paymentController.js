import Room from "../models/room.js";
import User from "../models/user.js";
import Booking from "../models/booking.js";
import asyncHandler from "express-async-handler";
import ErrorHandler from "../utils/errorHandler.js";
import Stripe from "stripe";
const stripe = new Stripe("sk_test_nNwtZLNRHmyjAhej3NAtfIgc00dDYNNCs9");

const stripeCheckoutSession = asyncHandler(async (req, res) => {
  // 1- Get room booked
  const room = await Room.findById(req.params.id);

  const { checkOutDate, checkInDate, daysOfStay } = req.query;

  // 2- Create stripe checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: "http://localhost:3000/bookings",
    cancel_url: `http://localhost:3000/rooms/${room._id}`,
    customer_email: req.user.email,
    client_reference_id: req.params.id,
    metadata: { checkOutDate, checkInDate, daysOfStay },
    line_items: [
      {
        name: room.title,
        images: [
          `${
            room.photos.length >= 1
              ? room.photos[0].url
              : "https://res.cloudinary.com/abdelmonaime/image/upload/v1657917445/reservation_app/card-placeholder_grgdsv.png"
          }`,
        ],
        amount: req.query.amount * 100,
        currency: "usd",
        quantity: 1,
      },
    ],
  });

  res.status(200).json(session);
});

//Create new booking after payment
const webHookCheckout = asyncHandler(async (request, response) => {
  try {
    const sig = request.headers["stripe-signature"];
    const event = stripe.webhooks.constructEvent(
      request.rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const room = session.client_reference_id;
      const user = (await User.findOne({ email: session.customer_email })).id;
      const amountPaid = session.amount_total / 100;
      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
      };
      const checkInDate = session.metadata.checkInDate;
      const checkOutDate = session.metadata.checkOutDate;
      const daysOfStay = session.metadata.daysOfStay;

      const booking = await Booking.create({
        room,
        user,
        checkInDate,
        checkOutDate,
        daysOfStay,
        amountPaid,
        paymentInfo,
        paidAt: Date.now(),
      });

      response
        .status(201)
        .json({ message: "You're successfully booked this room" });
    }
  } catch (err) {
    console.log("Error in stripe checkout payment =>", err);
  }
});

export { stripeCheckoutSession, webHookCheckout };
