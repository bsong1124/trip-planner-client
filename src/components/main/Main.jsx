import { Routes, Route } from "react-router-dom";

import Home from "../../pages/Home";
import Profile from "../../pages/Profile/profile";
import MyTrips from "../../pages/MyTrips";
import About from "../../pages/About";
import NewTripForm from "../../pages/NewTripForm";

const Main = () => {
  return (
    <div className="Main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/trips" element={<MyTrips />} />
        <Route path="/trips/new" element={<NewTripForm />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

import Home from '../../pages/Home'
import MyTrips from '../../pages/TripsIndex/MyTrips'
import About from '../../pages/About'
import NewTripForm from '../../pages/TripForm/NewTripForm'
import MyTripDetails from '../../pages/TripsShow/MyTripDetails'

const Main = () => {
    return (
        <div className='Main'>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path ='/trips' element ={<MyTrips />} />
                {/* <Route path='/trips/new' element ={<NewTripForm updateTripList={}/>} /> */}
                <Route path='/trips/:id' element = {<MyTripDetails />} />
                <Route path='/about' element ={<About />}/>
            </Routes>
        </div>
    )
}

export default Main;
