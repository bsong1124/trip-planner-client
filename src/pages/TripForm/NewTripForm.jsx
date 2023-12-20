import { useState, useEffect } from "react";
import { createTrips } from "../../utilities/trips-service";
import { useNavigate, useParams } from "react-router-dom";
import "./NewTripForm.css";
import { useAuth0 } from "@auth0/auth0-react";

const NewTripForm = ({ updateTripList }) => {
  const { user, isLoading: loadingAuth, isAuthenticated } = useAuth0();

  const [newTrip, setNewTrip] = useState({
    name: "",
    description: "",
    location: "",
    startDate: "",
    endDate: "",
    activities: [],
  });
  const { id } = useParams();
  const navigate = useNavigate();
  
  async function handleSubmit(e) {
    e.preventDefault();
    // console.log('data', newTrip);
    // console.log('ID', id)
    const authId = user.sub.slice(14);
    console.log(authId);
    try {
      const tripData = { ...newTrip, id: authId };
      const trip = await createTrips(tripData);
      //   console.log(trip)
      await updateTripList();
      navigate(`/trips/${trip._id}`);
    } catch (err) {}

    setNewTrip({
      name: "",
      description: "",
      location: "",
      startDate: "",
      endDate: "",
      activities: [],
    });
  }

  function handleChange(e) {
    console.log(e.target.name, e.target.value);
    setNewTrip({ ...newTrip, [e.target.name]: e.target.value });
  }

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();

    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };

  return (
    <section className="NewTripForm">
      <h2>New Trip</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTrip.name}
          name="name"
          placeholder="name"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          value={newTrip.description}
          name="description"
          placeholder="description"
          required
          onChange={handleChange}
        />
        {/* <input
                type="text"
                value={newTrip.location}
                name="location"
                placeholder="location"
                required
                onChange={handleChange}/> */}
        <input
          type="date"
          value={newTrip.startDate}
          name="startDate"
          placeholder="startDate"
          onChange={handleChange}
          min={getCurrentDate()}
        />
        <input
          type="date"
          value={newTrip.endDate}
          name="endDate"
          placeholder="endDate"
          onChange={handleChange}
          min={newTrip.startDate}
        />
        <button type="submit">Create Trip</button>
      </form>
    </section>
  );
};

export default NewTripForm;
