import { useEffect } from "react";
import Layout from "../../../components/admin/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getBookingDetails,
  reset,
} from "../../../redux/features/admin/bookings/bookingSlice";

import { FiChevronRight } from "react-icons/fi";

const BookingDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const bookingId = params.id;

  const { booking, isError, message } = useSelector(
    (state) => state.adminBooking
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (bookingId) {
      dispatch(getBookingDetails(bookingId));
    }

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch, bookingId]);

  console.log("booking", booking);

  return (
    <Layout>
      {booking && booking.room && booking.user && (
        <div className="p-6 bg-blue/5 mt-12 min-h-full">
          <div className="card custome-shadow-sm">
            <div>
              <h3 className="bg-blue/20 text-blue rounded-md custome-sahdow-sm px-4 py-2 border border-blue/30 inline-block">
                Booking Info
              </h3>
              <p className="text-dark flex items-center gap-2 mb-2 mt-5">
                <FiChevronRight className="w-6 h-6 text-pink bg-pink/20 border border-pink/30 rounded-full custome-shadow-2" />
                <div>
                  <span className="fw-600">Check In Date:</span>{" "}
                  {new Date(booking.checkInDate).toLocaleString("en-US")}
                </div>
              </p>
              <p className="text-dark flex items-center gap-2 mb-2">
                <FiChevronRight className="w-6 h-6 text-pink bg-pink/20 border border-pink/30 rounded-full custome-shadow-2" />
                <div>
                  <span className="fw-600">Check Out Date:</span>{" "}
                  {new Date(booking.checkOutDate).toLocaleString("en-US")}
                </div>
              </p>
              <p className="text-dark flex items-center gap-2">
                <FiChevronRight className="w-6 h-6 text-pink bg-pink/20 border border-pink/30 rounded-full custome-shadow-2" />
                <div>
                  <span className="fw-600">Days Of Stay:</span>{" "}
                  {booking.daysOfStay} {booking.daysOfStay > 1 ? "Days" : "Day"}
                </div>
              </p>
            </div>

            <div className="mt-5">
              <h3 className="bg-blue/20 text-blue rounded-md custome-sahdow-sm px-4 py-2 border border-blue/30 inline-block">
                User Info
              </h3>
              <p className="text-dark flex gap-2 items-center mb-2 mt-5">
                <FiChevronRight className="w-6 h-6 text-pink bg-pink/20 border border-pink/30 rounded-full custome-shadow-2" />
                <div>
                  <span className="fw-600">Name:</span> {booking.user.username}
                </div>
              </p>
              <p className="text-dark flex gap-2 items-center">
                <FiChevronRight className="w-6 h-6 text-pink bg-pink/20 border border-pink/30 rounded-full custome-shadow-2" />
                <div>
                  <span className="fw-600">Email:</span> {booking.user.email}
                </div>
              </p>
            </div>

            <div className="mt-5">
              <h3 className="bg-blue/20 text-blue rounded-md custome-sahdow-sm px-4 py-2 border border-blue/30 inline-block">
                Room Info
              </h3>
              <p className="text-dark flex gap-2 items-center mb-2 mt-5">
                <FiChevronRight className="w-6 h-6 text-pink bg-pink/20 border border-pink/30 rounded-full custome-shadow-2" />
                <div>
                  <span className="fw-600">Title:</span> {booking.room.title}
                </div>
              </p>
              <p className="text-dark flex gap-2 items-center mb-2">
                <FiChevronRight className="w-6 h-6 text-pink bg-pink/20 border border-pink/30 rounded-full custome-shadow-2" />
                <div>
                  <span className="fw-600">Price Per Night:</span>{" "}
                  {booking.room.pricePerNight}
                </div>
              </p>
              <div>
                <p className="text-dark flex gap-2 items-center mb-2">
                  <FiChevronRight className="w-6 h-6 text-pink bg-pink/20 border border-pink/30 rounded-full custome-shadow-2" />
                  <div>
                    <span className="fw-600">Room Images:</span>
                  </div>
                </p>
                <div className="flex gap-5 items-center">
                  {booking.room.photos.map((photo) => (
                    <img
                      src={photo.url}
                      alt={booking.room.title}
                      width="20%"
                      className="rounded-md custome-shadow mt-4"
                    />
                  ))}
                </div>
                <div>
                  {booking.room.photos.length < 1 && (
                    <p className="text-card-header-warning">
                      No photos for this room
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default BookingDetails;
