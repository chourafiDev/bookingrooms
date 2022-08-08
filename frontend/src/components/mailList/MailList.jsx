import hotel from "../../assets/hotel-illustartion.png";

const MailList = () => {
  return (
    <div className="mail-area container mx-auto my-20 px-3">
      <div className="custome-shadow text-center lg:p-16 p-4 rounded-lg">
        <div className="flex justify-between items-center lg:flex-row flex-col">
          <div className="md:w-[80%] lg:w-full w-full">
            <h1 className="mb-10 text-dark text-2xl lg:text-5xl">
              Save time, save money!
            </h1>
            <span className="text-dark">
              Sign up and we'll send the best deals to you
            </span>
            <div className="mt-4 space-x-3 mx-auto">
              <input
                type="text"
                placeholder="Your Email"
                className="input lg:w-96 mb-6 lg:mb-0"
              />
              <button className="btn btn-primary py-[14px]">Subscribe</button>
            </div>
          </div>

          <div className="lg:w-[40%] w-[80%] mt-8 lg:mt-0">
            <img src={hotel} alt="hotel" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailList;
