import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import roomReducer from "./features/room/roomSlice";
import bookingReducer from "./features/booking/bookingSlice";
import reviewReducer from "./features/review/reviewSlice";
import adminRoomReducer from "./features/admin/room/roomSlice";
import adminUserReducer from "./features/admin/users/usersSlice";
import adminBookingReducer from "./features/admin/bookings/bookingSlice";
import adminReviewReducer from "./features/admin/reviews/reviewSlice";
import adminStatisticsReducer from "./features/admin/statistics/statisticSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    room: roomReducer,
    booking: bookingReducer,
    review: reviewReducer,
    adminRoom: adminRoomReducer,
    adminUser: adminUserReducer,
    adminBooking: adminBookingReducer,
    adminReview: adminReviewReducer,
    statistics: adminStatisticsReducer,
  },
});
