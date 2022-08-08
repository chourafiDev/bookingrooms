import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { reset, getBooking } from "../../redux/features/booking/bookingSlice";

import { toast } from "react-toastify";
import { FiChevronRight } from "react-icons/fi";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";

const Booking = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const bookingId = params.id;

  const { booking, isError, message } = useSelector((state) => state.booking);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (bookingId) {
      dispatch(getBooking(bookingId));
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message, bookingId]);

  return (
    <div>
      <Navbar />

      <Breadcrumb>
        <div className="flex items-center gap-1">
          <FiChevronRight />
          <span className="font-semibold text-blue">booking</span>
        </div>
        <div className="flex items-center gap-1">
          <FiChevronRight />
          <span className="font-semibold text-blue">
            {booking.room && booking.room.title}
          </span>
        </div>
      </Breadcrumb>
      <div className="container mx-auto px-5 py-16">
        <div className="mb-8">
          <h1 className="font-lora text-dark text-[1.6rem]">Booking Details</h1>
        </div>

        <div className="mt-5">
          <h3 className="text-pink bg-pink/10 px-5 py-2 rounded-md custome-shadow-sm border border-pink/30 inline">
            User Info
          </h3>
          <div className="space-y-2 bg-white custome-shadow-sm rounded-md p-4 text-dark/70 mt-5 border border-dark/5">
            <p>
              <span className="font-semibold">Name:</span>{" "}
              {booking.user && booking.user.username}
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {booking.user && booking.user.email}
            </p>
            <p>
              <span className="font-semibold">Amount:</span> $
              {booking.amountPaid}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-pink bg-pink/10 px-5 py-2 rounded-md custome-shadow-sm border border-pink/30 inline">
            Booking Info
          </h3>
          <div className="space-y-2 bg-white custome-shadow-sm rounded-md p-4 text-dark/70 mt-5 border border-dark/5">
            <p>
              <span className="font-semibold">Check In:</span>{" "}
              {new Date(booking.checkInDate).toLocaleString("en-US")}
            </p>
            <p>
              <span className="font-semibold">Check Out:</span>{" "}
              {new Date(booking.checkOutDate).toLocaleString("en-US")}
            </p>
            <p>
              <span className="font-semibold">Days of Stay:</span>{" "}
              {booking.daysOfStay} {booking.daysOfStay > 1 ? "Days" : "Day"}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-pink bg-pink/10 px-5 py-2 rounded-md custome-shadow-sm border border-pink/30 inline">
            Payment Status
          </h3>
          <div className="space-y-2 bg-white custome-shadow-sm rounded-md p-4 text-dark/70 mt-5 border border-dark/5">
            <p className="text-blue font-bold">
              {booking.paymentInfo && booking.paymentInfo.status}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-pink bg-pink/10 px-5 py-2 rounded-md custome-shadow-sm border border-pink/30 inline">
            Booked Room
          </h3>
          <div className="space-y-3 bg-white custome-shadow-sm rounded-md p-4 text-dark/70 mt-5 border border-dark/5">
            <Link
              to={`/rooms/${booking.room && booking.room._id}`}
              className="hover:text-blue font-semibold"
            >
              <span className="font-semibold">Room name:</span>{" "}
              {booking.room && booking.room.title}
            </Link>
            <p>
              <span className="font-semibold">Price Per Night:</span>{" "}
              {booking.room && booking.room.pricePerNight}
            </p>
            <p>
              <span className="font-semibold">Days of Stay:</span>{" "}
              {booking.daysOfStay} {booking.daysOfStay > 1 ? "Days" : "Day"}
            </p>

            <div className="mt-16 flex gap-3">
              {booking.room && booking.room.photos > 0 ? (
                <p className="font-semibold">Room Photos:</p>
              ) : (
                ""
              )}

              {booking.room &&
                booking.room.photos.map((photo) => (
                  <div className="w-40 border border-dark/10 rounded-md p-1 custome-shadow-sm">
                    <img
                      src={photo.url}
                      className="rounded-md"
                      alt={booking.room.title}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Booking;
