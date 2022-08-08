import { useEffect, useState } from "react";
import { BiUpload } from "react-icons/bi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../components/admin/Layout";
import Input from "../../../components/admin/Utils/Input";
import Button from "../../../components/admin/Utils/Button";
import {
  getRoom,
  updateRoom,
} from "../../../redux/features/admin/room/roomSlice";
import { toast } from "react-toastify";
import Select from "react-select";

const featuresList = [
  { value: "Airport transfer", label: "Airport transfer" },
  { value: "All inclusive", label: "All inclusive" },
  { value: "Air-conditioned", label: "Air-conditioned" },
  { value: "Under protection", label: "Under protection" },
  { value: "Private pools", label: "Private pools" },
  { value: "Free wi-fi", label: "Free wi-fi" },
  { value: "Smart TV", label: "Smart TV" },
  { value: "Laundry", label: "Laundry" },
];

const categoryOptions = [
  { value: "King", label: "King" },
  { value: "Single", label: "Single" },
  { value: "Family", label: "Family" },
  { value: "Honeymoon", label: "Honeymoon" },
  { value: "Deluxe", label: "Deluxe" },
];

const EditRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const roomId = params.id;

  const { room, isError, isUpdated, isLoading, message } = useSelector(
    (state) => state.adminRoom
  );

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    size: 0,
    guestCapacity: 0,
    numOfBeds: 0,
    adults: 0,
    children: 0,
    pricePerNight: 0,
  });

  const {
    title,
    desc,
    size,
    address,
    guestCapacity,
    numOfBeds,
    adults,
    children,
    pricePerNight,
  } = formData;

  const [featured, setFeatured] = useState(false);
  const [category, setCategory] = useState("");
  const [features, setFeatures] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [oldPhotos, setOldPhotos] = useState([]);
  const [photoPreview, setPhotoPreview] = useState([]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isUpdated) {
      navigate("/rooms");
    }
  }, [dispatch, isError, message, isUpdated, navigate]);

  useEffect(() => {
    if (roomId) {
      dispatch(getRoom(roomId));
    }
  }, [roomId, dispatch]);

  useEffect(() => {
    if (room) {
      setFormData({
        title: room.title,
        desc: room.desc,
        size: room.size,
        guestCapacity: room.guestCapacity,
        numOfBeds: room.numOfBeds,
        adults: room.adults,
        children: room.children,
        pricePerNight: room.pricePerNight,
      });

      setFeatured(room.featured);
      setCategory(room.category);
      setFeatures(room.features);
      setOldPhotos(room.photos);
    }
  }, [room]);

  const handleChangeFeatures = (e) => {
    e.map((item, i) => setFeatures([...features, e[i].value]));
  };

  const handleChangeCategory = (e) => {
    setCategory(e.value);
  };

  const handleChangeOui = (e) => {
    setFeatured(e.target.value === "true" ? true : false);
  };
  const handleChangeNo = (e) => {
    setFeatured(e.target.value === "true" ? true : false);
  };

  const handleChange = (e) => {
    if (e.target.name === "photos") {
      const files = Array.from(e.target.files);
      setPhotos([]);
      setOldPhotos([]);
      setPhotoPreview([]);

      files.forEach((file) => {
        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {
            setPhotos([...photos, reader.result]);
            setPhotoPreview([...photos, reader.result]);
          }
        };
        reader.readAsDataURL(file);
      });

      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const roomData = {
      title,
      desc,
      size: Number(size),
      guestCapacity: Number(guestCapacity),
      numOfBeds: Number(numOfBeds),
      adults: Number(adults),
      children: Number(children),
      category,
      photos,
      pricePerNight: Number(pricePerNight),
      features,
      featured,
    };

    const roomInfo = { roomId, roomData };
    dispatch(updateRoom(roomInfo));
  };

  return (
    <Layout>
      <div className="p-6 bg-blue/5 mt-12 min-h-full">
        <div className="card custome-shadow-sm">
          <div className="flex justify-between items-center mb-5">
            <h6 className="text-dark/80 text-xl">Edit room</h6>
            <Link to="/admin/rooms">
              <button className="btn btn-primary">Back to rooms</button>
            </Link>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-3">
              <div className="">
                <label className="font-semibold">Title</label>
                <Input
                  type="text"
                  placeholder="Title"
                  name="title"
                  onChange={handleChange}
                  className="input mt-3"
                  value={title}
                />
              </div>
              <div className="">
                <label className="font-semibold">Size</label>
                <Input
                  type="number"
                  name="size"
                  placeholder="Size"
                  className="input mt-3"
                  onChange={handleChange}
                  value={size}
                />
              </div>
              <div className="">
                <label className="font-semibold">price Per Night</label>
                <Input
                  type="number"
                  name="pricePerNight"
                  placeholder="price Per Night"
                  className="input mt-3"
                  onChange={handleChange}
                  value={pricePerNight}
                />
              </div>
              <div className="">
                <label className="font-semibold">Categroy</label>
                <Select
                  options={categoryOptions}
                  name="categroy"
                  className="basic-single mt-3"
                  classNamePrefix="select"
                  onChange={handleChangeCategory}
                  value={categoryOptions.filter(
                    (item) => item.label === category
                  )}
                />
              </div>
              <div className="">
                <label className="font-semibold">featured</label>
                <div className="flex items-center gap-10 mt-3">
                  <label className="flex gap-2" htmlFor="no">
                    <input
                      checked={!featured ? true : false}
                      type="radio"
                      id="no"
                      name="featured"
                      value="false"
                      onChange={handleChangeNo}
                    />
                    <div className="">
                      <span>No</span>
                    </div>
                  </label>

                  <label className="flex gap-2" htmlFor="oui">
                    <input
                      checked={featured ? true : false}
                      type="radio"
                      name="featured"
                      id="oui"
                      value="true"
                      onChange={handleChangeOui}
                    />
                    <div className="">
                      <span>Oui</span>
                    </div>
                  </label>
                </div>
              </div>
              <div className="">
                <label className="font-semibold">Guest Capacity</label>
                <Input
                  type="number"
                  name="guestCapacity"
                  placeholder="Guest Capacity"
                  className="input mt-3"
                  onChange={handleChange}
                  value={guestCapacity}
                />
              </div>
              <div className="">
                <label className="font-semibold">Numbre of Beds</label>
                <Input
                  type="number"
                  name="numOfBeds"
                  placeholder="Numbre of Beds"
                  className="input mt-3"
                  onChange={handleChange}
                  value={numOfBeds}
                />
              </div>
              <div className="">
                <label className="font-semibold">Adults</label>
                <Input
                  type="number"
                  name="adults"
                  placeholder="Adults"
                  className="input mt-3"
                  onChange={handleChange}
                  value={adults}
                />
              </div>
              <div className="">
                <label className="font-semibold">Children</label>
                <Input
                  type="number"
                  name="children"
                  placeholder="Children"
                  className="input mt-3"
                  onChange={handleChange}
                  value={children}
                />
              </div>
              <div className="">
                <label className="font-semibold">Features</label>
                <Select
                  options={featuresList}
                  isMulti
                  name="features"
                  className="basic-multi-select mt-3 "
                  classNamePrefix="select"
                  onChange={handleChangeFeatures}
                  value={
                    features &&
                    features.map((feature) => ({
                      value: feature,
                      label: feature,
                    }))
                  }
                />
              </div>
            </div>

            <div className="w-full mt-4">
              <label className="font-semibold">Description</label>
              <textarea
                name="desc"
                onChange={handleChange}
                className="input mt-3"
                rows="6"
                placeholder="Description"
                value={desc}
              ></textarea>
            </div>

            <div className="w-full rounded-md custome-shadow-sm mt-8">
              <div className="input-group p-2">
                <label className="font-semibold">Hotel photos</label>
                <div className="flex items-center gap-4 mt-3">
                  <div className="file-input">
                    <input
                      type="file"
                      name="photos"
                      id="file-input"
                      className="file-input__input"
                      onChange={handleChange}
                    />
                    <label className="file-input__label" htmlFor="file-input">
                      <BiUpload />
                      <span>Upload images</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="p-2 flex gap-4">
                {photoPreview &&
                  photoPreview.map((img) => (
                    <img
                      key={img}
                      src={img}
                      alt={title}
                      style={{
                        width: "15%",
                        height: "15%",
                        borderRadius: "5px",
                        border: "1px solid #cdcbcb",
                        padding: "3px",
                      }}
                    />
                  ))}

                {oldPhotos &&
                  oldPhotos.map((img) => (
                    <img
                      key={img.public_id}
                      src={img.url}
                      alt={title}
                      style={{
                        width: "15%",
                        height: "15%",
                        borderRadius: "5px",
                        border: "1px solid #cdcbcb",
                        padding: "3px",
                      }}
                    />
                  ))}

                {oldPhotos && oldPhotos.length <= 0 && (
                  <p
                    className="bg-yellow p-2 w-100 fw-600"
                    style={{
                      borderRadius: "5px",
                      boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px",
                    }}
                  >
                    No photos added yet for this room
                  </p>
                )}
              </div>
            </div>
            <Button
              className="btn btn-primary mt-2"
              type="submit"
              text="Edit"
              loading={isLoading}
              disabled={isLoading}
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditRoom;
