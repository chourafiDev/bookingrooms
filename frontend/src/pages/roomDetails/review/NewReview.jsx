import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  reset,
  createReview,
  checkIsReviewAvailable,
} from "../../../redux/features/review/reviewSlice";
import { toast } from "react-toastify";
import { Dialog, Transition } from "@headlessui/react";
import Rating from "react-rating";
import emptyStar from "../../../assets/icons/star-empty.png";
import fullStar from "../../../assets/icons/star-full.png";
import { getRoom } from "../../../redux/features/room/roomSlice";

const NewReview = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const roomId = params.id;

  let [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const { isSuccess, isError, message, messageSuccess } = useSelector(
    (state) => state.review
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success(messageSuccess);
      dispatch(reset());
    }

    if (roomId) {
      dispatch(getRoom(roomId));
      dispatch(checkIsReviewAvailable(roomId));
    }
  }, [dispatch, isError, message, isSuccess, messageSuccess, roomId]);

  const onRate = (rate) => {
    setRating(rate);
  };

  const submitHandler = () => {
    const reviewData = {
      rating,
      comment,
      roomId,
    };

    dispatch(createReview(reviewData));
    closeModal();
    setComment("");
    setRating(0);
  };

  return (
    <div>
      <div
        className="text-dark/60 bg-dark/5 border border-dark/10 rounded-[5rem] px-5 py-3 w-96 cursor-pointer custome-shadow-sm"
        onClick={openModal}
      >
        <span>Submit Your Review...</span>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-dark/40" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add review for this room
                  </Dialog.Title>
                  <div className="mt-8">
                    <div className="flex justify-center">
                      <Rating
                        emptySymbol={
                          <img
                            src={emptyStar}
                            className="w-16 cursor-pointer rotate-12 px-3"
                          />
                        }
                        fullSymbol={
                          <img
                            src={fullStar}
                            className="w-16 cursor-pointer rotate-12 px-3"
                          />
                        }
                        initialRating={rating}
                        onChange={onRate}
                      />
                    </div>
                    <textarea
                      className="input outline-none w-full hover:border-blue text-sm text-dark mt-4"
                      placeholder="comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="mt-4">
                    <button
                      className="btn btn-primary outline-none"
                      onClick={submitHandler}
                    >
                      Submit
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default NewReview;
