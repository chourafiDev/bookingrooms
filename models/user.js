import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email address"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, "Please enter valid email address"],
    },
    country: {
      type: String,
      required: [true, "Please provide a country"],
    },
    city: {
      type: String,
      required: [true, "Please provide a city"],
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone"],
      unique: true,
    },
    photo: {
      public_id: {
        type: String,
        default: null,
      },
      url: {
        type: String,
        default: null,
      },
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      trim: true,
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["user", "seller", "admin"],
      default: "user",
    },
    savedRooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
      },
    ],
    passwordChangeAt: { type: Date },
  },
  { timestamps: true }
);

// userSchema.methods.changePasswordAfter = function (JWTTimestamp) {
//   if (this.passwordChangeAt) {
//     const changedTimestamp = parseInt(
//       this.passwordChangeAt.getTime() / 1000,
//       10
//     );

//     return JWTTimestamp < changedTimestamp;
//   }

//   //that means not chnaged
//   return false;
// };

export default mongoose.model("User", userSchema);
