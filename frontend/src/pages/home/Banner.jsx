import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const Banner = () => {
  const navigate = useNavigate();
  const initialValues = { destination: "" };

  const validationSchema = Yup.object({
    destination: Yup.string().required(
      "Please provide a keyword for your search"
    ),
  });

  const onSubmit = (values) => {
    navigate("/rooms", { state: { destination: values.destination } });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div className="container mx-auto relative -z-10 lg:-z-0">
      <div className="px-4 ">
        <video
          autoPlay
          loop
          muted
          className="relative custome-shadow rounded-xl object-cover w-full h-ful"
        >
          <source
            src="https://res.cloudinary.com/abdelmonaime/video/upload/v1659813634/reservation_app/banner-video_pyw4ic.mp4"
            type="video/mp4"
          />
        </video>

        <div className="absolute top-1 md:top-16 lg:top-36 left-0 w-full h-full ">
          <div className="text-center lg:space-y-8 space-y-2">
            <h1 className="text-white md:text-5xl text-[14px] px-4">
              A lifetime of discounts? It's Genius.
            </h1>
            <p className="text-sm lg:text-lg font-medium text-dark bg-white/50 mx-6 lg:mx-36 py-4 lg:py-10 rounded-md backdrop-blur-sm">
              Get rewarded for your travels – unlock instant savings of 10% or
              more with a free Lamabooking account
            </p>
          </div>
          <form onSubmit={formik.handleSubmit} className="mt-10">
            <div className="card lg:p-3 p-2 lg:my-56 my-0 mx-auto lg:w-[60%] w-[90%] space-y-5 lg:space-y-0 custome-shadow">
              <div className="flex lg:gap-10 gap-3 justify-between items-center lg:flex-row flex-col">
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Search for a room..."
                    name="destination"
                    id="destination"
                    className="w-full outline-none text-dark/80 lg:border-0  border border-dark/10 rounded-md px-3 py-2"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.destination}
                  />
                </div>

                <div className="w-full lg:w-32">
                  <button
                    className="btn btn-primary py-2 px-4 w-full"
                    type="submit"
                  >
                    Search
                  </button>
                </div>
              </div>
              {formik.touched.destination && formik.errors.destination ? (
                <div className="">
                  <p className="card-error-validation mt-2">
                    {formik.errors.destination}
                  </p>
                </div>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Banner;
