import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    desc: {
      type: String,
      required: [true, "Please provide a description"],
      trim: true,
    },
    size: {
      type: Number,
      required: [true, "Please provide a distance"],
    },
    guestCapacity: {
      type: Number,
      required: [true, "Please provide a guest capacity."],
    },
    numOfBeds: {
      type: Number,
      required: [true, "Please provide a number of beds."],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    adults: {
      type: Number,
      required: [true, "Please provide a number of adults."],
    },
    children: {
      type: Number,
      required: [true, "Please provide a number of children."],
    },
    category: {
      type: String,
      required: [true, "Please provide a category."],
      enum: {
        values: ["King", "Single", "Family", "Honeymoon", "Deluxe"],
        massage: "Please select the correct category",
      },
    },
    photos: [
      {
        public_id: {
          type: String,
          default: null,
        },
        url: {
          type: String,
          default: null,
        },
      },
    ],
    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          required: true,
        },
      },
    ],
    pricePerNight: {
      type: Number,
      required: [true, "Please provide a price"],
      min: 1,
    },
    features: {
      type: Array,
      required: [true, "Please provide a features"],
    },
    featured: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

roomSchema.index({ title: "text" });

export default mongoose.model("Room", roomSchema);
