import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import {
  FiHome,
  FiChevronRight,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiYoutube,
} from "react-icons/fi";
import Footer from "../../components/footer/Footer";
import MailList from "../../components/mailList/MailList";
import MapIcon from "../../assets/icons/map.png";
import Phone from "../../assets/icons/mobile-phone.png";
import Email from "../../assets/icons/email.png";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";

const Contact = () => {
  return (
    <div>
      <Navbar />

      <Breadcrumb>
        <div className="flex items-center gap-1">
          <FiChevronRight />
          <span className="font-semibold text-blue">contact us</span>
        </div>
      </Breadcrumb>
      <div className="container mx-auto lg:px-10 px-3 py-16">
        <h1 className="-z-10 text-dark text-[1.6rem] relative before:absolute before:bg-blue before:w-16 before:h-[3px] before:rounded-md before:-bottom-2 before:left-0">
          Contact us
        </h1>
        <div className="md:flex flex-row gap-10 mt-14 space-y-10 md:space-y-0">
          <div className="space-y-8 bg-dark/5 p-8 rounded-md h-full">
            <div className="text-dark">
              <div className="flex items-center gap-5">
                <img src={MapIcon} alt="map-icon" className="w-10" />
                <div className="space-y-2">
                  <p className="font-semibold text-[16px]">Address</p>
                  <p className="text-[14px] text-dark/80">
                    214 Marrakech Ait Ourir 42050
                  </p>
                </div>
              </div>
            </div>
            <div className="text-dark">
              <div className="flex items-center gap-5">
                <img src={Email} alt="map-icon" className="w-10" />
                <div className="space-y-2">
                  <p className="font-semibold text-[16px]">Email</p>
                  <p className="text-[14px] text-dark/80">
                    chourafidev@gmail.com
                  </p>
                </div>
              </div>
            </div>
            <div className="text-dark">
              <div className="flex items-center gap-5">
                <img src={Phone} alt="map-icon" className="w-10" />
                <div className="space-y-2">
                  <p className="font-semibold text-[16px]">Phone Number</p>
                  <p className="text-[14px] text-dark/80">(+212) 603940215</p>
                </div>
              </div>
            </div>

            <div className="flex gap-5 items-center">
              <p className="text-dark font-semibold text-[16px]">Social:</p>
              <div className="flex md:flex-nowrap flex-wrap gap-3 items-center">
                <div className="bg-white text-blue w-10 h-10 rounded-full custome-shadow flex items-center justify-center">
                  <FiFacebook />
                </div>
                <div className="bg-white text-blue w-10 h-10 rounded-full custome-shadow flex items-center justify-center">
                  <FiTwitter />
                </div>
                <div className="bg-white text-blue w-10 h-10 rounded-full custome-shadow flex items-center justify-center">
                  <FiInstagram />
                </div>
                <div className="bg-white text-blue w-10 h-10 rounded-full custome-shadow flex items-center justify-center">
                  <FiYoutube />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <h3 className="text-dark md:text-[1.3rem] text-[1rem] mb-8">
              Need Assistance? Please Complete The Contact Form
            </h3>
            <div className="grid gap-5 lg:grid-cols-2 grid-cols-1">
              <div>
                <input type="text" placeholder="You name" className="input" />
              </div>
              <div>
                <input type="email" placeholder="You email" className="input" />
              </div>
              <div>
                <input type="tel" placeholder="You phone" className="input" />
              </div>
              <div>
                <input type="text" placeholder="Subject" className="input" />
              </div>
            </div>
            <textarea
              placeholder="Your message"
              className="input mt-6"
              rows="5"
            ></textarea>

            <button type="button" className="btn btn-primary mt-10">
              Send message
            </button>
          </div>
        </div>
      </div>
      <MailList />
      <Footer />
    </div>
  );
};

export default Contact;
