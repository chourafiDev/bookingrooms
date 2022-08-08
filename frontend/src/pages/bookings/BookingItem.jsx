import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { useEffect, Fragment, useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import CardPlaceholder from "../../assets/card-placeholder.png";
import { reset, getBooking } from "../../redux/features/booking/bookingSlice";
import moment from "moment";

const BookingItem = ({ booking }) => {
  const dispatch = useDispatch();
  let [isOpen, setIsOpen] = useState(false);
  let invoiceRef = useRef(null);

  const { booking: bookingDetails } = useSelector((state) => state.booking);

  function closeModal() {
    setIsOpen(false);
  }

  const handleDownload = () => {
    setIsOpen(true);
    dispatch(getBooking(booking._id));
  };
  return (
    <div className="rounded-lg custome-shadow p-4">
      <div className="">
        <img
          src={
            booking.room.photos.length > 0
              ? booking.room.photos[0].url
              : CardPlaceholder
          }
          alt={booking.room.title}
          className="rounded-lg mb-4 custome-shadow-sm"
        />
      </div>

      <p className="text-dark font-bold text-[20px]">{booking.room.title}</p>

      <div className="py-2 space-y-1">
        <p className="text-dark/70 text-sm">
          <span className="font-semibold">Check In:</span>{" "}
          {moment(booking.checkInDate).format("L")}
        </p>
        <p className="text-dark/70 text-sm">
          <span className="font-semibold">Check Out:</span>{" "}
          {moment(booking.checkOutDate).format("L")}
        </p>
      </div>

      <div className="flex gap-1 mt-3">
        <Link to={`/bookings/${booking._id}`}>
          <button className="btn btn-primary px-4 py-2 w-full text-center">
            Details
          </button>
        </Link>
        <button
          onClick={handleDownload}
          className="btn btn-yellow p-2 w-full text-center"
        >
          Invoice
        </button>
      </div>

      {/* Modal invoice */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-dark/40" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-[70rem] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div
                    className="p-5 border border-dark/60"
                    ref={(el) => (invoiceRef = el)}
                  >
                    <div className="flex items-center justify-between">
                      <img
                        src="https://res.cloudinary.com/abdelmonaime/image/upload/v1659553698/reservation_app/logo_fimayr.svg"
                        alt="logo"
                        className="w-36"
                      />
                      <h1 className="text-dark text-[24px]">Booking Invoice</h1>
                    </div>
                    <div className=" text-dark space-y-2 mt-8">
                      <p className="text-sm">
                        <span className="font-semibold">Adress:</span> 13th Ait
                        Ourir 42050
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">City:</span> Marrackech
                        1223AB
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">Country:</span> Morocco
                      </p>
                    </div>

                    <hr className="my-7 text-dark/60" />

                    <div className="flex justify-between">
                      <div className=" text-dark space-y-2">
                        <p className="text-sm font-semibold">
                          {bookingDetails.user && bookingDetails.user.username}
                        </p>
                        <p className="text-sm">
                          {bookingDetails.user && bookingDetails.user.email}
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold">Check In:</span>{" "}
                          {new Date(bookingDetails.checkInDate).toLocaleString(
                            "en-US"
                          )}
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold">Check Out:</span>{" "}
                          {new Date(bookingDetails.checkOutDate).toLocaleString(
                            "en-US"
                          )}
                        </p>
                      </div>
                      <div className=" text-dark space-y-2">
                        <p className="text-sm">
                          <span className="font-semibold">Invoice Numbre:</span>{" "}
                          {bookingDetails._id}
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold">Invoice Date:</span>{" "}
                          {new Date(Date.now()).toLocaleString("en-US")}
                        </p>
                      </div>
                    </div>

                    <div className="w-full mt-10">
                      <table className="w-full text-dark">
                        <tr className="bg-dark/10">
                          <th className="p-2">Room</th>
                          <th className="p-2">Days of Stay</th>
                          <th className="p-2">Price</th>
                          <th className="p-2">Total</th>
                        </tr>
                        <tr>
                          <td className="p-2">
                            {bookingDetails.room && bookingDetails.room.title}
                          </td>
                          <td className="p-2">
                            {bookingDetails.daysOfStay}{" "}
                            {bookingDetails.daysOfStay > 1 ? "days" : "day"}
                          </td>
                          <td className="p-2">
                            $
                            {bookingDetails.room &&
                              bookingDetails.room.pricePerNight}
                          </td>
                          <td className="p-2">${bookingDetails.amountPaid}</td>
                        </tr>
                      </table>
                    </div>
                    <div className="mt-8 flex justify-end">
                      <p className="text-blue bg-blue/10 px-5 py-2 rounded-sm">
                        <span className="font-bold">Total:</span> {""}$
                        {bookingDetails.amountPaid}
                      </p>
                    </div>
                    <p className="text-dark text-sm text-center mt-16">
                      This is auto generated Invoice of your booking.
                    </p>
                  </div>

                  <div className="mt-4">
                    <ReactToPrint
                      trigger={() => {
                        return (
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={closeModal}
                          >
                            Download Invoice
                          </button>
                        );
                      }}
                      content={() => invoiceRef}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default BookingItem;
