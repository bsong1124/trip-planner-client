import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTrip, deleteTrip } from "../../utilities/trips-service";
import moment from "moment";

const MyTripDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [trip, setTrip] = useState(null);
  // const [location, setLocation] = useState(false)
  const { id } = useParams();
  const navigate = useNavigate();

  async function handleRequest() {
    const tripDetails = await getTrip(id);
    setTrip(tripDetails);
    setIsLoading(false);
  }

  const handleDelete = async () => {
    try {
      await deleteTrip(id);
      navigate("/trips");
    } catch (err) {}
  };

  useEffect(() => {
    handleRequest();
  }, []);

  const renderLoading = () => (
    <section>
      <h2>Loading...</h2>
    </section>
  );

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("data", newTrip);
    try {
      await createTrips(newTrip);
      await updateTripList();
    } catch (err) {}
  }

  const handleChange = () => {
    console.log(e.target.name, e.target.value);
    setNewTrip({ ...newTrip, [e.target.name]: e.target.value });
  };

  const renderTrip = () => (
    <div>
      <h1>{trip.name}</h1>
      <h3>Dates:</h3>
      <p>
        {moment(trip.startDate).format("ll")} -{" "}
        {moment(trip.endDate).format("ll")}
      </p>
      <h3>Description:</h3>
      <p>{trip.description}</p>
      <h3>Location:</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={trip.location}
          name="location"
          placeholder="location"
          required
          onChange={handleChange}
        />
        <button type="submit">
          {trip.location ? "Edit Location" : "Search Location"}
        </button>
      </form>
      {/* <p>{trip.location}</p> */}
      {trip.location && (
        <>
          <h3>Activities:</h3>
          <p>{trip.activities}</p>
        </>
      )}
      <button onClick={handleDelete}>Delete Trip</button>
    </div>
  );

  return <div>{isLoading ? renderLoading() : renderTrip()}</div>;
};

export default MyTripDetails;
