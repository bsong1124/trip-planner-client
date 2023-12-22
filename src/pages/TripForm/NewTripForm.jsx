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
    const authId = user.sub.substring(user.sub.indexOf("|") + 1);
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
    // console.log(e.target.name, e.target.value);
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
    <section>
      <h2 className="max-w-xl sm:mx-auto text-3xl sm:text-4xl font-bold text-emerald-500 mb-4 text-center">
        Create a Trip
      </h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl sm:mx-auto mx-6 p-6 rounded mb-14 border border-emerald-500 bg-lime-50"
      >
        <label htmlFor="name" className="font-medium text-emerald-500 ml-1">
          Trip Name
        </label>
        <input
          type="text"
          value={newTrip.name}
          id="name"
          name="name"
          placeholder="Enter trip name..."
          required
          onChange={handleChange}
          className="w-full border rounded mb-2 p-2"
        />
        <label htmlFor="description" className="font-medium text-emerald-500 ml-1">
          Description
        </label>
        <input
          type="text"
          value={newTrip.description}
          id="description"
          name="description"
          placeholder="Enter description..."
          required
          onChange={handleChange}
          className="w-full border rounded mb-2 p-2"
        />
        <div className="flex justify-between gap-4">
          <div className="flex flex-col w-1/2">
            <label htmlFor="start" className="font-medium text-emerald-500 ml-1 mr-2">
              Start Date
            </label>
            <input
              type="date"
              value={newTrip.startDate}
              id="start"
              name="startDate"
              placeholder="startDate"
              onChange={handleChange}
              className="border rounded mb-2 p-2"
              min={getCurrentDate()}
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="end" className="font-medium text-emerald-500 ml-1 mr-2">
              End Date
            </label>
            <input
              type="date"
              value={newTrip.endDate}
              id="end"
              name="endDate"
              placeholder="endDate"
              onChange={handleChange}
              className="border rounded mb-2 p-2"
              min={newTrip.startDate}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-full my-4">Create Trip</button>
      </form>
    </section>
  );
};

export default NewTripForm;
