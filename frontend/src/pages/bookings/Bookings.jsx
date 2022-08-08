import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { FiChevronRight } from "react-icons/fi";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { reset, getBookings } from "../../redux/features/booking/bookingSlice";

import { toast } from "react-toastify";
import BookingItem from "./BookingItem";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";

const Bookings = () => {
  const dispatch = useDispatch();

  const { bookings, isError, message } = useSelector((state) => state.booking);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getBookings());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message]);

  return (
    <div>
      <Navbar />

      <Breadcrumb>
        <div className="flex items-center gap-1">
          <FiChevronRight />
          <span className="font-semibold text-blue">Bookings</span>
        </div>
      </Breadcrumb>
      <div className="text-center my-6">
        <h2 className="font-lora text-dark text-[1.6rem] relative before:absolute before:bg-blue before:w-10 before:h-1 before:-bottom-2 before:left-[49%] before:rounded-md">
          Your Bookings
        </h2>
      </div>
      <div className="container mx-auto px-5 py-16">
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10 lg:px-20 px-10">
          {bookings &&
            bookings.map((booking) => <BookingItem booking={booking} />)}
        </div>

        {bookings.length <= 0 && (
          <div>
            <p className="px-4 py-3 rounded-[5px] bg-yellow/80 text-white custome-shadow">
              No booking rooms yet
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Bookings;
