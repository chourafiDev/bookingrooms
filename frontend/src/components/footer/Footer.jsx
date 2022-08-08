import post_one from "../../assets/card-placeholder.png";
import { BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";
import lightLogo from "../../assets/light-logo.svg";

const Footer = () => {
  return (
    <>
      <footer className="mx-auto text-sm relative before:absolute before:left-0 before:right-0 before:bg-dark/95 before:w-full before:h-full">
        <div className="z-40">
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10 p-10">
            <ul className="space-y-6 z-10">
              <img src={lightLogo} alt="logo" className="w-32" />
              <p className="leading-7 text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim,
                adipisci. Lorem ipsum.
              </p>
              <div className="flex text-white items-center gap-2">
                <BiChevronRight className="text-blue bg-blue/30 w-6 h-6 rounded-full" />
                <p className="text-white">214 Ait Ourir, Marrakech 10003</p>
              </div>
              <div className="flex text-white items-center gap-2">
                <BiChevronRight className="text-blue bg-blue/30 w-6 h-6 rounded-full" />
                <p className="text-white">(+212) 603940215</p>
              </div>
              <div className="flex text-white items-center gap-2">
                <BiChevronRight className="text-blue bg-blue/30 w-6 h-6 rounded-full" />
                <p className="text-white">chourafidev@gmail.com</p>
              </div>
            </ul>
            <ul className="space-y-6 z-10">
              <h2 className="text-[1.4rem] text-white relative before:absolute before:w-10 before:h-1 before:rounded-md before:bottom-0 before:left-0 before:bg-blue">
                Useful Links
              </h2>
              <ul className="space-y-6 text-white">
                <li>
                  <Link to="/" className="hover:text-blue">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/rooms" className="hover:text-blue">
                    Rooms
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-blue">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-blue">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-blue">
                    Conact Us
                  </Link>
                </li>
              </ul>
            </ul>
            <ul className="space-y-6 z-10">
              <h2 className="text-[1.4rem] text-white relative before:absolute before:w-10 before:h-1 before:rounded-md before:bottom-0 before:left-0 before:bg-blue">
                Recently Bolgs
              </h2>
              <div className="flex items-center gap-3 bg-white p-2 rounded-md">
                <img
                  src={post_one}
                  width="100"
                  height="100"
                  alt="hotel"
                  className="rounded-md"
                />
                <div>
                  <p className="text-dark/80 text-[13px]">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white p-2 rounded-md">
                <img
                  src={post_one}
                  width="100"
                  height="100"
                  alt="hotel"
                  className="rounded-md"
                />
                <div>
                  <p className="text-dark/80 text-[13px]">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </div>
            </ul>
            <ul className="space-y-6 z-10">
              <h2 className="text-[1.4rem] text-white relative before:absolute before:w-10 before:h-1 before:rounded-md before:bottom-0 before:left-0 before:bg-blue">
                Subscribe Us
              </h2>
              <p className="leading-7 text-white">
                Sign up to our newsletter to get the latest news and offers.
              </p>
              <input placeholder="Entre email" className="input" />
              <button className="btn btn-primary">Get notified</button>
            </ul>
          </div>
        </div>
      </footer>
      <div className=" text-center font-semibold border-t border-dark/10 bg-dark py-3 ">
        <p className=" text-white">
          Copyright © 2022{" "}
          <a
            href="chourafidev.com"
            className="text-blue font-bold hover:text-blue"
          >
            Chourafidev.
          </a>
        </p>
      </div>
    </>
  );
};

export default Footer;
