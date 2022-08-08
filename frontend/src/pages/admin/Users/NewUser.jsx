import { useEffect, useState } from "react";
import { BiUpload } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../components/admin/Layout";
import Input from "../../../components/admin/Utils/Input";
import Button from "../../../components/admin/Utils/Button";
import Placeholder from "../../../assets/admin/placeholder.jpg";
import { newUser } from "../../../redux/features/admin/users/usersSlice";
import { toast } from "react-toastify";

const NewUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isError, isAdded, isLoading, message } = useSelector(
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

  const { username, email, phone, password, city, country } = formData;

  const [photo, setPhoto] = useState("");
  const [photoPreview, setPhotoPreview] = useState(Placeholder);

  useEffect(() => {
    if (isError) {
      toast.error(isError);
    }

    if (isAdded) {
      navigate("/users");
    }
  }, [dispatch, isError, isAdded, isLoading, message, navigate]);

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
      password,
      city,
      country,
      photo,
    };

    dispatch(newUser(userData));
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
                />
              </div>
              <div className="">
                <label className="font-semibold">Email</label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input mt-2"
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
                  onChange={handleChange}
                />
              </div>

              <div className="">
                <label className="font-semibold">Password</label>
                <Input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input mt-2"
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
                  onChange={handleChange}
                />
              </div>

              <div className=" p-2">
                <label className="font-semibold">User photo</label>
                <div className="flex items-center gap-4">
                  <img
                    src={photoPreview}
                    alt="Placeholder"
                    width="80"
                    className="mt-3 rounded-md"
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
              text="Ajouter"
              loading={isLoading}
              disabled={isLoading}
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NewUser;
