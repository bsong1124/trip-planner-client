import { Routes, Route } from "react-router-dom";

import Home from "../../pages/Home";
import Profile from "../../pages/Profile/Profile";
import MyTrips from "../../pages/TripsIndex/MyTrips";
import About from "../../pages/About";
import NewTripForm from "../../pages/TripForm/NewTripForm";
import MyTripDetails from "../../pages/TripsShow/MyTripDetails"

const Main = () => {
  return (
    <div id="main" className="mx-auto max-w-screen-lg">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/trips" element={<MyTrips />} />
        <Route path='/trips/:id' element = {<MyTripDetails />} />
        <Route path="/trips/new" element={<NewTripForm />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default Main;
