import "./MyTripsDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getTrip,
  deleteTrip,
  findLocations,
  findActivity,
  updateLocation,
} from "../../utilities/trips-service";
import moment from "moment";

const MyTripDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [trip, setTrip] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState("");
  const [locations, setLocations] = useState([]);
  const [images, setImages] = useState([]);
  // const [searchActivity, setSearchActivity] = useState('')
  const [activities, setActivities] = useState([]);

  async function handleRequest() {
    const tripDetails = await getTrip(id);
    console.log({ tripDetails });
    setTrip(tripDetails);
    setIsLoading(false);
  }

  useEffect(() => {
    handleRequest();
  }, []);

  const renderLoading = () => (
    <section>
      <h2>Loading...</h2>
    </section>
  );

  const handleChange = (e) => {
    setSearchLocation(e.target.value);
  };

  const getLocations = async (e) => {
    e.preventDefault();
    try {
      console.log("search query", searchLocation);
      const locationResponse = await findLocations(id, searchLocation);
      console.log({ locationResponse });
      setLocations(locationResponse.allData);
      setImages(locationResponse.imageData);
    } catch (err) {
      console.log("error");
    }
  };

  const getActivity = async (e) => {
    e.preventDefault();
    try {
      // console.log(searchActivity)
      const activityResponse = await findActivity(id, trip.location.id);
      console.log({ activityResponse });
      setActivities(activityResponse);
    } catch (err) {}
  };

  const addLocation = async (l, idx) => {
    console.log({ l });
    try {
      console.log({ images });
      console.log("it works");
      const updatedTripData = {
        ...trip,
        location: {
          id: l.location_id,
          name: l.name,
          image: images[idx].url,
        },
      };
      setTrip(updatedTripData);
      updateLocation(id, updatedTripData);
      console.log({ updatedTripData });

      // navigate(`/trips/${id}`);
    } catch (err) {
      console.log(err);
      // navigate(`/trips/${id}`);
    }
  };
  // console.log({trip})

  const handleDelete = async () => {
    try {
      await deleteTrip(id);
      navigate("/trips");
    } catch (err) {}
  };

  const renderLocations = (l, idx) => {
    const submit = async (e) => {
      e.preventDefault();
      await addLocation(l, idx);
    };
    return (
        <div className="locations" key={l.location_id}>
          <form onSubmit={submit}>
              <div className="location-item">
                <img className="img-details" src={images[idx].url} alt={l.name} />
                <p className="location-name">{l.name}</p>
                <button className="btn btn-primary select-btn" type="submit">Select Location</button>
              </div>
          </form>
        </div>
      );
    };

  const renderTrip = () => (
    <div className="trip-container">
      <h1 className="details-name">{trip.name.toUpperCase()}</h1>
      {trip.location ? (
        <div className="location-section">
          <h3>Location:</h3>
          <p>{trip.location.name}</p>
          <img src={trip.location.image} />
        </div>
      ) : (
        <div className="search-section">
          <h3>Enter your location:</h3>
          <form onSubmit={getLocations}>
            <input
              className="input-field"
              type="text"
              value={searchLocation}
              onChange={handleChange}
            />
            <button className="btn btn-primary p-2" type="submit">
              Search Location
            </button>
          </form>
          <div className="select-location">
          {locations && locations.map((l, idx) => renderLocations(l, idx))}
        </div>
        </div>
      )}
      <div className="dates-section">
        <h3>Dates:</h3>
        <p>
          {moment(trip.startDate).format("ll")} -{" "}
          {moment(trip.endDate).format("ll")}
        </p>
      </div>

      <div className="description-section">
        <h3>Description:</h3>
        <p>{trip.description}</p>
      </div>
      <h3>Activities:</h3>
      <p>{trip.activities}</p>
      <form onSubmit={getActivity}>
        <button type="submit">Search Activities</button>
      </form>
      <button className="btn btn-primary p-2" onClick={handleDelete}>
        Delete Trip
      </button>
    </div>
  );

  return <div>{isLoading ? renderLoading() : renderTrip()}</div>;
};

export default MyTripDetails;
