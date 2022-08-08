import { useEffect, useState } from "react";
import { BiUpload } from "react-icons/bi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../components/admin/Layout";
import Input from "../../../components/admin/Utils/Input";
import Button from "../../../components/admin/Utils/Button";
import Placeholder from "../../../assets/admin/placeholder.jpg";
import {
  getUser,
  updateUser,
} from "../../../redux/features/admin/users/usersSlice";
import { toast } from "react-toastify";
import { Skeleton } from "antd";

const EditUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const userId = params.id;

  const { user, isError, isLoading, isUpdated } = useSelector(
    (state) => state.adminUser
  );

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    city: "",
    country: "",
  });

  let { username, email, phone, city, country } = formData;

  const [photo, setPhoto] = useState("");
  const [photoPreview, setPhotoPreview] = useState(Placeholder);

  useEffect(() => {
    if (isError) {
      toast.error(isError);
    }

    if (userId) {
      dispatch(getUser(userId));
    }

    if (isUpdated) {
      navigate("/users");
    }
  }, [dispatch, userId, isError, isUpdated, navigate]);

  useEffect(() => {
    if (user) {
      // console.log("yeees", user && user.photo.url);
      setFormData({
        username: user.username,
        email: user.email,
        phone: user.phone,
        city: user.city,
        country: user.country,
      });
      setPhotoPreview(user.photo && user.photo.url);
    }
  }, [user]);

  const handleChange = (e) => {
    if (e.target.name === "photo") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setPhoto(reader.result);
          setPhotoPreview(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username,
      email,
      phone,
      city,
      country,
      photo,
    };

    const userInfo = { userId, userData };
    dispatch(updateUser(userInfo));
  };

  return (
    <Layout>
      <div className="p-6 bg-blue/5 mt-12 min-h-full">
        <div className="card custome-shadow-sm">
          <div className="flex justify-between items-center mb-5">
            <h6 className="text-dark/80 text-xl">Add new user</h6>
            <Link to="/admin/users">
              <button className="btn btn-primary"> Back to users</button>
            </Link>
          </div>
          {user ? (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-3">
                <div className="">
                  <label className="font-semibold">Username</label>
                  <Input
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={handleChange}
                    className="input mt-2"
                    value={username}
                  />
                </div>
                <div className="">
                  <label className="font-semibold">Email</label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="input mt-2"
                    value={email}
                    onChange={handleChange}
                  />
                </div>
                <div className="">
                  <label className="font-semibold">Phone</label>
                  <Input
                    type="text"
                    name="phone"
                    className="input mt-2"
                    placeholder="Phone"
                    value={phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="">
                  <label className="font-semibold">Country</label>
                  <Input
                    type="text"
                    name="country"
                    placeholder="Country"
                    className="input mt-2"
                    value={country}
                    onChange={handleChange}
                  />
                </div>
                <div className="">
                  <label className="font-semibold">City</label>
                  <Input
                    type="text"
                    name="city"
                    placeholder="City"
                    className="input mt-2"
                    value={city}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-group p-2">
                  <label className="font-semibold">User photo</label>
                  <div className="flex items-center gap-4">
                    <img
                      src={photoPreview && photoPreview}
                      alt="Placeholder"
                      className="mt-3 rounded-md"
                      width="90"
                    />
                    <div className="file-input">
                      <input
                        type="file"
                        name="photo"
                        id="file-input"
                        className="file-input__input"
                        onChange={handleChange}
                      />
                      <label className="file-input__label" htmlFor="file-input">
                        <BiUpload />
                        <span>Upload image</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                className="btn btn-primary mt-6"
                type="submit"
                text="Edit"
                loading={isLoading}
                disabled={isLoading}
              />
            </form>
          ) : (
            <Skeleton active />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default EditUser;
