import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Room",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    checkInDate: {
      type: Date,
      required: true,
    },
    checkOutDate: {
      type: Date,
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
    daysOfStay: {
      type: Number,
      required: true,
    },
    paymentInfo: {
      id: {
        type: String,
        require: true,
      },
      status: {
        type: String,
        require: true,
      },
    },
    paidAt: {
      type: Date,
      require: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
