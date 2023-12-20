import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getTrip,
  deleteTrip,
  findLocation,
} from "../../utilities/trips-service";
import moment from "moment";
import config from "../../config";

const token = config.TOKEN;
console.log(token);

const MyTripDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [trip, setTrip] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

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

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const getLocation = async (e) => {
    e.preventDefault();
    try {
      console.log("running");
      console.log("search query", search);
      const locations = await findLocation(id, search);
      console.log({ locations });
    } catch (err) {
      console.log("error");
    }
  };

  const renderTrip = () => (
    <div>
      <h1>{trip.name}</h1>
      <h3>Location:</h3>
      <p>{trip.location}</p>
      <form onSubmit={getLocation}>
        <input type="text" value={search} onChange={handleChange} />
        <button type="submit">Search Location</button>
      </form>
      <h3>Dates:</h3>
      <p>
        {moment(trip.startDate).format("ll")} -{" "}
        {moment(trip.endDate).format("ll")}
      </p>
      <h3>Description:</h3>
      <p>{trip.description}</p>
      <h3>Activities:</h3>
      <p>{trip.activities}</p>
      <button onClick={handleDelete}>Delete Trip</button>
    </div>
  );

  return <div>{isLoading ? renderLoading() : renderTrip()}</div>;
};

export default MyTripDetails;
