import { BiBed, BiArea } from "react-icons/bi";
import CardPlaceholder from "../../assets/card-placeholder.png";
import { Link } from "react-router-dom";
import emptyStar from "../../assets/icons/star-empty.png";
import fullStar from "../../assets/icons/star-full.png";
import Rating from "react-rating";

const SearchItem = ({ room }) => {
  return (
    <div className="flex lg:flex-row flex-col custome-shadow rounded-md mb-6 p-2">
      <div className="lg:w-96 w-full">
        <img
          src={room.photos.length > 0 ? room.photos[0].url : CardPlaceholder}
          alt={room.title}
          className="rounded-lg w-full"
        />
      </div>

      <div className="w-full flex flex-col justify-between py-4 px-5">
        <div>
          <div className="text-dark">
            <div className="flex justify-between items-center sm:flex-row flex-col lg:mb-2 md:mb-5 mb-6">
              <h1 className="lg:text-[1.3rem] text-[1.2rem] text-dark/90">
                {room.title}
              </h1>
              <Link to={`/rooms/${room._id}`}>
                <button className="btn btn-yellow px-3 py-2">
                  See availability
                </button>
              </Link>
            </div>
          </div>
          <div className="flex lg:space-x-10 mb-3 mt-2 ">
            <div className="flex items-center gap-2 text-dark w-full ">
              <BiBed className="bg-blue/30 text-blue w-7 h-7 rounded-full p-1" />
              <span className="font-semibold lg:text-sm md:text-[13px] text-[11px] w-full">
                Adults: {room.adults}
              </span>
            </div>
            <div className="flex items-center gap-2 text-dark w-full ">
              <BiArea className="bg-blue/30 text-blue w-7 h-7 rounded-full p-1" />
              <span className="font-semibold lg:text-sm md:text-[13px] text-[11px] w-full">
                Children: {room.children}
              </span>
            </div>
            <div className="flex items-center gap-2 text-dark w-full ">
              <BiArea className="bg-blue/30 text-blue w-7 h-7 rounded-full p-1" />
              <span className="font-semibold lg:text-sm md:text-[13px] text-[11px] w-full">
                Size: {room.size}m²
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p>
            <span className="text-blue font-bold text-xl">
              ${room.pricePerNight}
            </span>{" "}
            <small className="text-dark/70 font-semibold">Per night</small>
          </p>
          <div className="flex gap-1 items-center text-yellow">
            <Rating
              emptySymbol={
                <img
                  src={emptyStar}
                  className="w-5 px-[1px] rotate-12"
                  alt="star"
                />
              }
              fullSymbol={
                <img
                  src={fullStar}
                  className="w-5 px-[1px] rotate-12"
                  alt="star"
                />
              }
              initialRating={room.ratings}
              readonly
            />
            <span className="mb-2">({room.numOfReviews})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
