import { FiChevronRight } from "react-icons/fi";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import MailList from "../../components/mailList/MailList";
import yes from "../../assets/icons/yes.png";
import map from "../../assets/icons/map.png";
import heart from "../../assets/icons/heart.png";
import home from "../../assets/icons/home.png";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";

const About = () => {
  return (
    <div>
      <Navbar />

      <Breadcrumb>
        <div className="flex items-center gap-1">
          <FiChevronRight />
          <span className="font-semibold text-blue">About us</span>
        </div>
      </Breadcrumb>

      <div className="container mx-auto md:px-10 px-5 py-16">
        <h1 className="text-blue text-center lg:text-[3rem] md:text-[2rem] text-[1.5rem] leading-normal mt-8">
          We Are Changing The Room Reservation With Progression And Passion.
        </h1>
        <p className="text-center text-dark/50 font-semibold mt-16 lg:px-40 md:px-30 px-10 leading-relaxed">
          We attempt to be the best hotel that provides great rooms for your
          comfort, offering an entirely personal and dedicated service.
        </p>

        <div className="text-center text-dark mt-16">
          <h2 className="md:text-[1.6rem] text-[1rem] font-bold ">
            Plenty Of Reasons To Choose Us
          </h2>
          <p className="text-dark/50 mt-3 text-[14px]">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque,
            voluptatem!
          </p>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 mt-10">
          <div className="p-5 border border-dark/10">
            <img src={yes} alt="yes" className="w-[3rem]" />
            <h3 className="text-dark mt-6">Excellent Reputation</h3>
            <p className="text-dark/70 text-[14px] mt-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A qui
              dolorem odio aut sunt iure accusamus deserunt repudiandae deleniti
              quod!
            </p>
          </div>
          <div className="p-5 border border-dark/10">
            <img src={map} alt="map" className="w-[2.9rem]" />
            <h3 className="text-dark mt-6">Best Location</h3>
            <p className="text-dark/70 text-[14px] mt-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A qui
              dolorem odio aut sunt iure accusamus deserunt repudiandae deleniti
              quod!
            </p>
          </div>
          <div className="p-5 border border-dark/10">
            <img src={heart} alt="heart" className="w-[2.8rem]" />
            <h3 className="text-dark mt-6">Peace Of Mind</h3>
            <p className="text-dark/70 text-[14px] mt-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A qui
              dolorem odio aut sunt iure accusamus deserunt repudiandae deleniti
              quod!
            </p>
          </div>
          <div className="p-5 border border-dark/10">
            <img src={home} alt="home" className="w-[2.8rem]" />
            <h3 className="text-dark mt-6">Tons Of Options</h3>
            <p className="text-dark/70 text-[14px] mt-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A qui
              dolorem odio aut sunt iure accusamus deserunt repudiandae deleniti
              quod!
            </p>
          </div>
        </div>
      </div>
      <MailList />
      <Footer />
    </div>
  );
};

export default About;
