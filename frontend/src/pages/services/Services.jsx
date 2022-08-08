import { FiChevronRight, FiHexagon } from "react-icons/fi";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import MailList from "../../components/mailList/MailList";
import ServiceImage from "../../assets/blog/blog1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRooms } from "../../redux/features/room/roomSlice";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";

const Services = () => {
  const dispatch = useDispatch();

  const { rooms } = useSelector((state) => state.room);

  useEffect(() => {
    dispatch(getRooms());
  }, [dispatch]);

  return (
    <div>
      <Navbar />

      <Breadcrumb>
        <div className="flex items-center gap-1">
          <FiChevronRight />
          <span className="font-semibold text-blue">Services</span>
        </div>
      </Breadcrumb>
      <div className="container mx-auto px-10 py-16">
        <div className="lg:flex flex-row justify-between gap-20 lg-space-y-0 space-y-10">
          <div className="w-full">
            <h1 className="text-dark text-[1.6rem] mb-5">Services We Offer</h1>
            <p className="text-dark/50 mb-8">
              We truly care about our users and our product. We are dedicated to
              providing you with the best experience possible.
            </p>
            <div className="flex items-center justify-between">
              <ul className="text-dark text-[14px] space-y-2">
                <li className="flex items-center gap-2">
                  <FiHexagon className="text-blue text-[14px]" />
                  Browse all rooms
                </li>
                <li className="flex items-center gap-2">
                  <FiHexagon className="text-blue text-[14px]" />
                  Modern rooms
                </li>
                <li className="flex items-center gap-2">
                  <FiHexagon className="text-blue text-[14px]" />
                  Luxury rooms
                </li>
                <li className="flex items-center gap-2">
                  <FiHexagon className="text-blue text-[14px]" />
                  Vintage rooms
                </li>
                <li className="flex items-center gap-2">
                  <FiHexagon className="text-blue text-[14px]" />
                  Love rooms
                </li>
                <li className="flex items-center gap-2">
                  <FiHexagon className="text-blue text-[14px]" />
                  Premium rooms
                </li>
              </ul>
              <ul className="text-dark text-[14px] space-y-2">
                <li className="flex items-center gap-2">
                  <FiHexagon className="text-blue text-[14px]" />
                  Private pools
                </li>
                <li className="flex items-center gap-2">
                  <FiHexagon className="text-blue text-[14px]" />
                  Air-conditioned
                </li>
                <li className="flex items-center gap-2">
                  <FiHexagon className="text-blue text-[14px]" />
                  Free wi-fi
                </li>
                <li className="flex items-center gap-2">
                  <FiHexagon className="text-blue text-[14px]" />
                  Smart TV
                </li>
                <li className="flex items-center gap-2">
                  <FiHexagon className="text-blue text-[14px]" />
                  Under protection
                </li>
                <li className="flex items-center gap-2">
                  <FiHexagon className="text-blue text-[14px]" />
                  Comfort zone
                </li>
              </ul>
            </div>
            <div className="flex justify-between items-center bg-dark text-white p-4 rounded-sm mt-10">
              <div>
                <h4 className="text-2xl font-bold text-white">
                  {rooms.length}
                </h4>
                <p className="text-[14px] text-white">Rooms</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white">4</h4>
                <p className="text-[14px] text-white">Category</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white">6</h4>
                <p className="text-[14px] text-white">Services</p>
              </div>
            </div>
          </div>
          <div className="w-full">
            <img
              src={ServiceImage}
              alt="services"
              className="rounded-md custome-shadow"
            />
          </div>
        </div>
      </div>
      <MailList />
      <Footer />
    </div>
  );
};

export default Services;
