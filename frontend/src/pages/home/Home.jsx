import RoomsList from "./rooms/RoomsList";
import Footer from "../../components/footer/Footer";
import Banner from "./Banner";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import RoomsCategory from "./roomCategory/RoomsCategory";
import FeaturedRooms from "./featuredRooms/FeaturedRooms";
import BlogList from "./blog/BlogList";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <RoomsCategory />
      <RoomsList />
      <FeaturedRooms />
      <BlogList />
      <MailList />
      <Footer />
    </div>
  );
};

export default Home;
