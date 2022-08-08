//React
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

//Components
import Navbar from "../../components/navbar/Navbar";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import SimilarRoom from "./SimilarRoom";
import NewReview from "./review/NewReview";
import ListOfReviews from "./review/ListOfReviews";

//Images
import CardPlaceholder from "../../assets/card-placeholder.png";
import emptyStar from "../../assets/icons/star-empty.png";
import fullStar from "../../assets/icons/star-full.png";

//Icons
import {
  FiSquare,
  FiUsers,
  FiUser,
  FiCreditCard,
  FiKey,
  FiChevronRight,
} from "react-icons/fi";

//Redux functions
import {
  getRoom,
  getSimilarRooms,
  reset,
} from "../../redux/features/room/roomSlice";
import {
  checkBookingAvailability,
  getAllBookedDates,
} from "../../redux/features/booking/bookingSlice";
import { checkIsReviewAvailable } from "../../redux/features/review/reviewSlice";

//Libraries
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Rating from "react-rating";
import StickyBox from "react-sticky-box";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { toast } from "react-toastify";

import getStripe from "../../utils/getStripe";
import axios from "axios";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";

const Room = () => {
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const [daysOfStay, setDaysOfStay] = useState();

  const dispatch = useDispatch();
  const params = useParams();

  const roomId = params.id;

  const { user } = useSelector((state) => state.auth);
  const { isReviewAvailable } = useSelector((state) => state.review);
  const {
    bookingAvailable,
    bookedDates,
    messageSuccess,
    isLoading: isLoadingBooking,
    isError: isErrorBooking,
  } = useSelector((state) => state.booking);
  const { room, similarRooms, isError, message } = useSelector(
    (state) => state.room
  );

  const excludeDates = [];

  bookedDates.forEach((date) => {
    excludeDates.push(new Date(date));
  });

  const similarRoomsList = similarRooms.filter((room) => room._id !== roomId);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (roomId) {
      dispatch(getRoom(roomId));
      dispatch(getAllBookedDates(roomId));
      dispatch(checkIsReviewAvailable(roomId));
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message, roomId]);

  useEffect(() => {
    if (room) {
      dispatch(getSimilarRooms(room.category));
    }
  }, [dispatch, room]);

  useEffect(() => {
    if (isErrorBooking) {
      toast.error(isErrorBooking);
    }

    if (messageSuccess) {
      toast.success(messageSuccess);
    }
  }, [messageSuccess, isErrorBooking]);

  const onChange = (dates) => {
    const [checkInDate, checkOutDate] = dates;

    setCheckInDate(checkInDate);
    setCheckOutDate(checkOutDate);
    if (checkInDate && checkOutDate) {
      //Calculate days of stay
      const days = Math.floor(
        (new Date(checkOutDate) - new Date(checkInDate)) / 86400000 + 1
      );

      setDaysOfStay(days);

      const bookingInfo = {
        roomId,
        checkInDate: checkInDate.toISOString(),
        checkOutDate: checkOutDate.toISOString(),
      };
      dispatch(checkBookingAvailability(bookingInfo));
    }
  };

  const [paymentLoading, setPaymentLoading] = useState(false);

  const bookRoom = async (id, pricePerNight) => {
    setPaymentLoading(true);

    const amount = pricePerNight * daysOfStay;

    try {
      const userToken = localStorage.getItem("user");
      const { token } = JSON.parse(userToken);

      const link = `http://localhost:8000/api/client/payments/checkout_session/${id}?checkInDate=${checkInDate.toISOString()}&checkOutDate=${checkOutDate.toISOString()}&daysOfStay=${daysOfStay}&amount=${amount}`;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(link, config);

      const stripe = await getStripe();

      //Redirect to checkout
      stripe.redirectToCheckout({ sessionId: data.id });
      setPaymentLoading(false);
    } catch (error) {
      setPaymentLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <Navbar />

      <Breadcrumb>
        <div className="flex items-center gap-1">
          <FiChevronRight />
          <span className="font-semibold text-blue">room</span>
        </div>
        <div className="flex items-center gap-1">
          <FiChevronRight />
          <span className="font-semibold text-blue">{room.title}</span>
        </div>
      </Breadcrumb>

      <div className="container mx-auto px-5 py-16">
        <div className="">
          <h1 className="text-dark md:text-[2rem] text-[1.5rem] mb-10">
            {room.title}
          </h1>

          <div className="bg-white p-6 custome-shadow rounded-lg mb-16 flex md:flex-row flex-col items-center justify-between">
            <div className="flex w-full md:w-auto sm:flex-row flex-col items-center gap-5">
              <div className="flex w-full md:w-auto items-center bg-pink/10 px-3 py-2 rounded-md border border-pink/20 custome-shadow-sm">
                <FiUser className="bg-pink/20 text-pink rounded-full mr-3 w-8 h-8 p-1" />
                <span className="md:mt-0 mt-2">
                  {room.adults} {room.adults <= 1 ? "Adult" : "Adults"}{" "}
                </span>
              </div>
              <div className="flex w-full md:w-auto items-center bg-pink/10 px-3 py-2 rounded-md border border-pink/20 custome-shadow-sm">
                <FiUsers className="bg-pink/20 text-pink rounded-full mr-3 w-8 h-8 p-1" />
                <span className="md:mt-0 mt-2">
                  {room.children <= 1
                    ? `${room.children} Child`
                    : `${room.children} Children`}
                </span>
              </div>
              <div className="flex w-full md:w-auto items-center bg-pink/10 px-3 py-2 rounded-md border border-pink/20 custome-shadow-sm">
                <FiSquare className="bg-pink/20 text-pink rounded-full mr-3 w-8 h-8 p-1" />
                <span className="md:mt-0 mt-2">
                  sqft {room.size}
                  m²
                </span>
              </div>
            </div>
            <div className="flex gap-1 items-center text-yellow md:mt-0 mt-5">
              <span className="text-dark font-semibold mr-3">Reviews:</span>
              <div>
                <Rating
                  emptySymbol={
                    <img
                      src={emptyStar}
                      className="w-5 px-[1px] rotate-12"
                      alt="start"
                    />
                  }
                  fullSymbol={
                    <img
                      src={fullStar}
                      className="w-5 px-[1px] rotate-12"
                      alt="start"
                    />
                  }
                  initialRating={room.ratings}
                  readonly
                />
              </div>

              <span className="mb-2">({room.numOfReviews})</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 items-start gap-10 ">
            <div className="lg:col-span-2 w-full ">
              {room.photos && room.photos.length > 0 ? (
                <Swiper
                  modules={[Navigation]}
                  spaceBetween={0}
                  slidesPerView={1}
                  navigation
                >
                  {room.photos.map((photo) => (
                    <SwiperSlide>
                      <img src={photo.url} alt={room.title} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <img
                  src={CardPlaceholder}
                  alt=""
                  className="rounded-md custome-shadow-sm"
                />
              )}

              <h1 className="text-[1.5rem] text-dark my-10">
                Stay in the heart of City
              </h1>
              <p className="text-dark/80 leading-7">{room.desc}</p>

              <div className="mt-10">
                <h3 className="text-dark text-2xl mb-10">Amenity</h3>
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
                  {room.features &&
                    room.features.map((item) => (
                      <div className="card custome-shadow" key={item}>
                        <p className="text-dark font-bold text-center text-[14px]">
                          {item}
                        </p>
                      </div>
                    ))}
                </div>
              </div>

              <div className="mt-16">
                <h3 className="text-dark text-2xl mb-6">Reviews</h3>
              </div>
              {isReviewAvailable && <NewReview />}

              {room.reviews && room.reviews.length > 0 ? (
                <div className="mt-16">
                  <ListOfReviews reviews={room.reviews} />
                </div>
              ) : (
                <p className="mt-8 bg-yellow/10 font-semibold text-yellow p-3 rounded-md custome-shadow-sm border border-yellow/20">
                  No Reviews on this room
                </p>
              )}
            </div>

            <StickyBox offsetTop={10} offsetBottom={10}>
              <div
                className="bg-blue/5 border border-blue/20 p-5 rounded-md custome-shadow w-full  h-full"
                id="reserve"
              >
                <div className="w-full flex justify-center">
                  <h2 className="text-[1.3rem] mb-5 text-pink bg-pink/10 rounded-md inline-block text-center px-5  ">
                    ${room.pricePerNight} Per Night
                  </h2>
                </div>

                <p className="mt-5 mb-3 text-center">
                  Pick Check in & Check out date
                </p>
                <div className="w-full flex justify-center">
                  <DatePicker
                    selected={checkInDate}
                    onChange={onChange}
                    selectsRange
                    startDate={checkInDate}
                    endDate={checkOutDate}
                    minDate={new Date()}
                    excludeDates={excludeDates}
                    inline
                  />
                </div>

                {bookingAvailable === true && (
                  <p className="bg-success/20 border border-success/30 px-2 py-3 rounded-md mt-5 text-success font-semibold">
                    Room is available, Book now.
                  </p>
                )}

                {bookingAvailable === false && (
                  <p className="bg-danger/20 border border-danger/30 px-2 py-3 rounded-md mt-5 text-danger font-semibold">
                    Room not available, Try different dates.
                  </p>
                )}

                {bookingAvailable && !user && (
                  <Link to="/login">
                    <button className="btn btn-danger mt-3 w-full flex items-center gap-2 justify-center text-md custome-shadow">
                      <FiKey />
                      <span className="text-white">
                        Login to book this room
                      </span>
                    </button>
                  </Link>
                )}

                {bookingAvailable && user && (
                  <button
                    className="btn btn-success mt-3 w-full flex items-center gap-2 justify-center text-xl custome-shadow"
                    onClick={() => bookRoom(room._id, room.pricePerNight)}
                    disabled={isLoadingBooking || paymentLoading ? true : false}
                  >
                    <FiCreditCard />
                    <span className="text-white">
                      Pay - ${daysOfStay * room.pricePerNight}
                    </span>
                  </button>
                )}
              </div>
            </StickyBox>
          </div>
        </div>

        {similarRoomsList.length >= 1 ? (
          <div className="mb-20 mt-32 ">
            <h2 className="text-dark text-center mb-5 text-[2rem] font-lora">
              Similar Rooms
            </h2>
            <p className="text-dark text-center px-32">
              Consectetur adipisicing elit. Nihil, illum voluptate eveniet ex
              fugit ea delectus, sed voluptatem. Laborum accusantium libero
              commodi id officiis itaque esse adipisci, necessitatibus
              asperiores, illo odio.
            </p>

            <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10 mt-16">
              {similarRoomsList.map((room) => (
                <SimilarRoom room={room} key={room._id} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
      <MailList />
      <Footer />
    </div>
  );
};

export default Room;
