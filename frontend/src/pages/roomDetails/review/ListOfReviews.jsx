import React from "react";
import photoPlaceholder from "../../../assets/placeholder.jpg";
import Rating from "react-rating";
import moment from "moment";

import emptyStar from "../../../assets/icons/star-empty.png";
import fullStar from "../../../assets/icons/star-full.png";

const ListOfReviews = ({ reviews }) => {
  const SVGIcon = (props) => (
    <svg className={props.className} pointerEvents="none">
      <use xlinkHref={props.href} />
    </svg>
  );

  return (
    <div>
      {reviews &&
        reviews.map((review) => (
          <div
            key={review.name}
            className="flex gap-5 border-b border-dark/10 w-[70%] py-3"
          >
            <img
              src={
                review.user.photo.url ? review.user.photo.url : photoPlaceholder
              }
              alt={review.name}
              className="w-14 h-14 rounded-full custome-shadow-sm border-2 border-white"
            />
            <div>
              <p className="font-bold text-dark mb-1">{review.name}</p>
              <div className="flex gap-3 items-center">
                <div>
                  <Rating
                    emptySymbol={
                      <img src={emptyStar} className="w-5 px-[1px] rotate-12" />
                    }
                    fullSymbol={
                      <img src={fullStar} className="w-5 px-[1px] rotate-12" />
                    }
                    initialRating={review.rating}
                    readonly
                  />
                </div>

                <p className="text-dark/40 font-semibold text-[12px]">
                  {moment(review.createdAt).fromNow()}
                </p>
              </div>

              <p className="text-dark/80 text-sm mt-2">{review.comment}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ListOfReviews;
