import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/home/Home";
import RoomDetails from "./pages/roomDetails/Room";
import SearchRooms from "./pages/SearchRooms/List";
import Bookings from "./pages/bookings/Bookings";
import BookingDetails from "./pages/bookings/BookingDetails";
import RoomsSaved from "./pages/RoomsSaved/RoomsSaved";
import Contact from "./pages/contact/Contact";
import Services from "./pages/services/Services";
import About from "./pages/about/About";
import NotFound from "./pages/404";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
//Admin pages
import Dashboard from "./pages/admin/Dashboard";
import AdminUser from "./pages/admin/Users";
import AdminNewUser from "./pages/admin/Users/NewUser";
import AdminEditUser from "./pages/admin/Users/EditUser";
import AdminRoom from "./pages/admin/Rooms";
import AdminNewRoom from "./pages/admin/Rooms/newRoom";
import AdminEditRoom from "./pages/admin/Rooms/editRoom";
import AdminBookings from "./pages/admin/Bookings";
import AdminBookingDetails from "./pages/admin/Bookings/BookingDetails";
import AdminReviews from "./pages/admin/Rooms/Reviews";

import RequireAuth from "./components/RequireAuth";
import AuthorizeRoute from "./components/AuthorizeRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<SearchRooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />

          <Route
            path="/bookings"
            element={
              <RequireAuth>
                <Bookings />
              </RequireAuth>
            }
          />
          <Route
            path="/bookings/:id"
            element={
              <RequireAuth>
                <BookingDetails />
              </RequireAuth>
            }
          />
          <Route
            path="/rooms-saved"
            element={
              <RequireAuth>
                <RoomsSaved />
              </RequireAuth>
            }
          />

          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <AuthorizeRoute>
                <Dashboard />
              </AuthorizeRoute>
            }
          />
          <Route path="/admin/users">
            <Route
              index
              element={
                <AuthorizeRoute>
                  <AdminUser />
                </AuthorizeRoute>
              }
            />
            <Route
              path="newUser"
              element={
                <AuthorizeRoute>
                  <AdminNewUser />
                </AuthorizeRoute>
              }
            />
            <Route
              path="editUser/:id"
              element={
                <AuthorizeRoute>
                  <AdminEditUser />
                </AuthorizeRoute>
              }
            />
          </Route>

          <Route path="/admin/rooms">
            <Route
              index
              element={
                <AuthorizeRoute>
                  <AdminRoom />
                </AuthorizeRoute>
              }
            />
            <Route
              path="reviews/:id"
              element={
                <AuthorizeRoute>
                  <AdminReviews />
                </AuthorizeRoute>
              }
            />
            <Route
              path="newRoom"
              element={
                <AuthorizeRoute>
                  <AdminNewRoom />
                </AuthorizeRoute>
              }
            />
            <Route
              path="editRoom/:id"
              element={
                <AuthorizeRoute>
                  <AdminEditRoom />
                </AuthorizeRoute>
              }
            />
          </Route>

          <Route path="/admin/bookings">
            <Route
              index
              element={
                <AuthorizeRoute>
                  <AdminBookings />
                </AuthorizeRoute>
              }
            />
            <Route
              path="bookingDetails/:id"
              element={
                <AuthorizeRoute>
                  <AdminBookingDetails />
                </AuthorizeRoute>
              }
            />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
