import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";

import {
  reset,
  getFeaturedRooms,
} from "../../../redux/features/room/roomSlice";
import FeaturedRoom from "./FeaturedRoom";
import VerticatCardLoader from "../../../components/loader/VerticatCardLoader";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";

const FeaturedRooms = () => {
  const dispatch = useDispatch();

  const { featuredRooms, isSuccess, isError, isLoading } = useSelector(
    (state) => state.room
  );

  useEffect(() => {
    if (isError) {
      toast.error(isError);
    }

    dispatch(getFeaturedRooms());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError]);
  return (
    <div className="container mx-auto mt-32">
      <div className="text-center my-12">
        <h2 className="text-dark font-bold mb-5 font-lora">Featured Rooms</h2>
        <p className="text-dark/70 px-4">
          Check the listings of the best rooms on "Booking" and see availability
          to book that room.
        </p>
      </div>

      <div className="lg:px-20 px-1">
        {!isLoading ? (
          <Swiper
            spaceBetween={30}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
            breakpoints={{
              1024: {
                width: 1024,
                slidesPerView: 3,
              },
              // when window width is >= 640px
              640: {
                width: 640,
                slidesPerView: 1,
              },
              // when window width is >= 768px
              768: {
                width: 768,
                slidesPerView: 2,
              },
            }}
          >
            {featuredRooms.map((room) => (
              <SwiperSlide key={room._id}>
                <FeaturedRoom room={room} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
            <VerticatCardLoader />
            <VerticatCardLoader />
            <VerticatCardLoader />
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedRooms;
