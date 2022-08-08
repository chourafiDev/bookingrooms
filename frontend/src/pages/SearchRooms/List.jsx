import Navbar from "../../components/navbar/Navbar";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import SearchItem from "./SearchItem";
import { BiChevronRight, BiFilterAlt } from "react-icons/bi";
import { FiChevronRight } from "react-icons/fi";
import Footer from "../../components/footer/Footer";
import StickyBox from "react-sticky-box";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  reset,
  getFilterRooms,
  getRoomCategories,
} from "../../redux/features/room/roomSlice";
import { toast } from "react-toastify";
import Select from "react-select";
import HorizontalCardLoader from "../../components/loader/HorizontalCardLoader";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";

const List = () => {
  const location = useLocation();

  const [destination, setDestination] = useState(
    location.state ? location.state.destination : ""
  );
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [adults, setAdults] = useState(null);
  const [children, setChildren] = useState(null);

  const [filterData, setFilterData] = useState({
    destination,
    category: "",
    minPrice,
    maxPrice,
    adults,
    children,
  });

  const dispatch = useDispatch();
  const { filterRooms, roomCategories, isError, message, isLoading } =
    useSelector((state) => state.room);

  let categoriesOptions = [];

  {
    roomCategories &&
      roomCategories.map((item) =>
        categoriesOptions.push({ value: item, label: item })
      );
  }

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getRoomCategories());

    return () => {
      dispatch(reset());
    };
  }, [isError, dispatch, message]);

  //Change category
  const handleChangeCategory = (e) => {
    setCategory(e.value);
  };

  useEffect(() => {
    if (destination || category || minPrice || maxPrice || adults || children) {
      setFilterData({
        destination,
        category,
        minPrice,
        maxPrice,
        adults,
        children,
      });
    }
  }, [dispatch, destination, category, minPrice, maxPrice, adults, children]);

  useEffect(() => {
    if (filterData) {
      dispatch(getFilterRooms(filterData));
    }
  }, [dispatch, filterData]);

  const handleSearch = () => {
    if (filterData) {
      dispatch(getFilterRooms(filterData));
    }
  };

  return (
    <div>
      <Navbar />

      <Breadcrumb>
        <div className="flex items-center gap-1">
          <FiChevronRight />
          <span className="font-semibold text-blue">rooms</span>
        </div>
      </Breadcrumb>
      <div className="container mx-auto md:px-10 px-3 py-16">
        <h3 className="text-dark/70">
          <span className="text-blue text-2xl">{filterRooms.length}</span>{" "}
          {filterRooms.length <= 1 ? "Result found" : "Results found"}{" "}
        </h3>
        <div className="flex md:flex-row flex-col items-start gap-10 w-full mt-5">
          {/* search */}
          <StickyBox offsetTop={5} offsetBottom={5}>
            <div
              className={
                "custome-shadow py-10 px-5 w-full h-full md:block hidden"
              }
            >
              <h1 className="text-dark/80 bg-dark/5 px-4 py-3 rounded-md text-[1.2rem] mb-6 flex items-center gap-2">
                <pv>Filter</pv> <BiFilterAlt />
              </h1>
              <div className="space-y-8">
                <div className="">
                  <div className="mb-6">
                    <div className="flex gap-2 items-center mb-2">
                      <BiChevronRight className="bg-pink/20 text-pink rounded-full" />
                      <label className="block text-dark  font-bold">
                        Distination
                      </label>
                    </div>
                    <input
                      placeholder={
                        destination ? destination : "Search for room"
                      }
                      onChange={(e) => setDestination(e.target.value)}
                      type="text"
                      className="input py-3 custome-shadow-sm"
                    />
                  </div>
                  <div className="mb-6">
                    <div className="flex gap-2 items-center mb-2">
                      <BiChevronRight className="bg-pink/20 text-pink rounded-full" />
                      <label className="block text-dark  font-bold">
                        Categories
                      </label>
                    </div>
                    <Select
                      options={categoriesOptions}
                      name="categroy"
                      className="basic-single shadow-sm"
                      classNamePrefix="select"
                      onChange={handleChangeCategory}
                    />
                  </div>
                  <div className="mb-6">
                    <div className="flex gap-2 items-center mb-2">
                      <BiChevronRight className="bg-pink/20 text-pink rounded-full" />
                      <label className="block text-dark font-bold">
                        Options
                      </label>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-dark">
                          Min price{" "}
                          <small className="text-pink">per night</small>
                        </span>
                        <input
                          type="number"
                          value={minPrice}
                          min={1}
                          onChange={(e) => setMinPrice(e.target.value)}
                          className="border border-dark/30 w-10 h-full pl-1 outline-none"
                        />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-dark">
                          Max price{" "}
                          <small className="text-pink">per night</small>
                        </span>
                        <input
                          type="number"
                          value={maxPrice}
                          min={1}
                          onChange={(e) => setMaxPrice(e.target.value)}
                          className="border border-dark/30 w-10 h-full pl-1 outline-none"
                        />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-dark">Adult</span>
                        <input
                          type="number"
                          min={1}
                          onChange={(e) => setAdults(e.target.value)}
                          className="border border-dark/30 w-10 h-full pl-1 outline-none"
                        />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-dark">Children</span>
                        <input
                          type="number"
                          min={0}
                          onChange={(e) => setChildren(e.target.value)}
                          className="border border-dark/30 w-10 h-full pl-1 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <button
                  onClick={handleSearch}
                  className="btn btn-primary mt-8 flex items-center gap-2 px-20"
                >
                  <BiFilterAlt />
                  Search
                </button>
              </div>
            </div>
          </StickyBox>

          <div className="card custome-shadow-sm w-full md:hidden block">
            <h1 className="text-dark/80 bg-dark/5 py-2 rounded-md text-[1.2rem] mb-6 flex items-center justify-center gap-2">
              <pv>Filter</pv> <BiFilterAlt />
            </h1>

            <div className="space-y-4">
              <div className="mb-3">
                <div className="flex gap-2 items-center mb-2">
                  <BiChevronRight className="bg-pink/20 text-pink rounded-full" />
                  <label className="block text-dark  font-bold">
                    Distination
                  </label>
                </div>
                <input
                  placeholder={destination ? destination : "Search for room"}
                  onChange={(e) => setDestination(e.target.value)}
                  type="text"
                  className="input py-3 custome-shadow-sm"
                />
              </div>
              <div className="mb-3">
                <div className="flex gap-2 items-center mb-2">
                  <BiChevronRight className="bg-pink/20 text-pink rounded-full" />
                  <label className="block text-dark  font-bold">
                    Categories
                  </label>
                </div>
                <Select
                  options={categoriesOptions}
                  name="categroy"
                  className="basic-single shadow-sm"
                  classNamePrefix="select"
                  onChange={handleChangeCategory}
                />
              </div>
              <div className="mb-6">
                <div className="flex gap-2 items-center mb-2">
                  <BiChevronRight className="bg-pink/20 text-pink rounded-full" />
                  <label className="block text-dark font-bold">Options</label>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-dark">
                      Min price <small className="text-pink">per night</small>
                    </span>
                    <input
                      type="number"
                      value={minPrice}
                      min={1}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="border border-dark/30 w-10 h-full pl-1 outline-none"
                    />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dark">
                      Max price <small className="text-pink">per night</small>
                    </span>
                    <input
                      type="number"
                      value={maxPrice}
                      min={1}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="border border-dark/30 w-10 h-full pl-1 outline-none"
                    />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dark">Adult</span>
                    <input
                      type="number"
                      min={1}
                      onChange={(e) => setAdults(e.target.value)}
                      className="border border-dark/30 w-10 h-full pl-1 outline-none"
                    />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dark">Children</span>
                    <input
                      type="number"
                      min={0}
                      onChange={(e) => setChildren(e.target.value)}
                      className="border border-dark/30 w-10 h-full pl-1 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full">
              <button
                onClick={handleSearch}
                className="btn btn-primary mt-8 flex items-center justify-center gap-2 px-20 w-full"
              >
                <BiFilterAlt />
                Search
              </button>
            </div>
          </div>

          {/* Items */}
          <div className="w-full ">
            {!isLoading ? (
              filterRooms.length > 0 ? (
                filterRooms.map((room) => (
                  <SearchItem room={room} key={room._id} />
                ))
              ) : (
                <p className="bg-yellow/10 text-yellow p-5 rounded-md shadow-sm font-semibold">
                  No rooms about your search
                </p>
              )
            ) : (
              <>
                <HorizontalCardLoader />
                <HorizontalCardLoader />
                <HorizontalCardLoader />
                <HorizontalCardLoader />
                <HorizontalCardLoader />
                <HorizontalCardLoader />
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default List;
