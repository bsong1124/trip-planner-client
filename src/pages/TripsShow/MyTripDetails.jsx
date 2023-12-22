import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getTrip,
  deleteTrip,
  findLocation,
  findActivity,
  updateLocation,
} from "../../utilities/trips-service";
import "./MyTripsDetails.css";
import moment from "moment";

const MyTripDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [trip, setTrip] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState("");
  const [locations, setLocations] = useState([]);
  const [image, setImage] = useState([]);
  // const [searchActivity, setSearchActivity] = useState('')
  const [activities, setActivities] = useState([]);
  const [activitiesImage, setActivitiesImage] = useState([]);

  async function handleRequest() {
    const tripDetails = await getTrip(id);
    // console.log({tripDetails})
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

  const getLocation = async (e) => {
    e.preventDefault();
    try {
      console.log("search query", searchLocation);
      const locationResponse = await findLocation(id, searchLocation);
      console.log({ locationResponse });
      setLocations(locationResponse.allData);
      setImage(locationResponse.imageData);
    } catch (err) {
      console.log("error");
    }
  };

  const getActivity = async (e) => {
    e.preventDefault();
    try {
      // console.log(searchActivity)
      const activityResponse = await findActivity(id, trip.location.id);
      // console.log(trip.location.id)
      // console.log({ activityResponse });
      console.log({ activityResponse });
      setActivities(activityResponse.allNearbyData);
      setActivitiesImage(activityResponse.nearbyDataPromises);
    } catch (err) {}
  };
  // console.log({ activitiesImage });
  // console.log({activities})
  // console.log(activities[0])

  const addLocation = async (l, idx) => {
    console.log({ l });
    try {
      console.log({ image });
      console.log("it works");
      const updatedTripData = {
        ...trip,
        location: {
          id: l.location_id,
          name: l.name,
          image: image[idx].url,
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

  const addActivity = async (a, idx) => {
    console.log("working");
    try {
      trip.activities = [
        ...trip.activities,
        {
          name: a.name,
          address: a.address_obj.address_string,
          image: activitiesImage[idx].url,
        },
      ];
      setTrip(trip);
      updateLocation(id, trip);
      navigate(`/trips/${id}`);
    } catch (err) {}
  };
  // console.log({ trip });

  const handleDelete = async () => {
    try {
      await deleteTrip(id);
      navigate("/trips");
    } catch (err) {}
  };

  const renderLocation = (l, idx) => {
    const submit = async (e) => {
      e.preventDefault();
      await addLocation(l, idx);
    };
    return (
      <div className="locations" key={l.location_id}>
        <form onSubmit={submit}>
          <div className="location-item">
            <img className="img-details" src={image[idx].url} />
            <p className="location-name">{l.name}</p>
            <button className="btn btn-primary" type="submit">
              Select Location
            </button>
          </div>
        </form>
      </div>
    );
  };

  const renderActivity = (a, idx) => {
    const submit = async (e) => {
      e.preventDefault();
      await addActivity(a, idx);
    };
    return (
        <div key={idx}>
          <div className="activity-card">
            <form onSubmit={submit} className="activity-form">
              <p className="activity-name">Name: {a.name}</p>
              <p className="activity-address">Address: {a.address_obj.address_string}</p>
              {activitiesImage[idx] && (
                <>
                  <img src={activitiesImage[idx].url} alt={a.name} className="activity-image" />
                  <button type="submit" className="btn btn-primary p-2">Add Activity</button>
                </>
              )}
            </form>
          </div>
        </div>
      );
    };

  const renderTrip = () => (
    <div className="trip-container">
      <h1 className="details-name">
        {trip.name.charAt(0).toUpperCase() + trip.name.slice(1)}
      </h1>
      {trip.location ? (
        <div className="location-section">
          <h3>Location:</h3>
          <p>{trip.location.name}</p>
          <img src={trip.location.image} />
        </div>
      ) : (
        <div className="search-section">
          {/* <h3>Enter your location: </h3> */}
          <form onSubmit={getLocation}>
            <input
              className="input-field"
              type="text"
              value={searchLocation}
              onChange={handleChange}
              placeholder="Where are you traveling to?"
            />
            <button className="btn btn-primary p-2" type="submit">
              Search Location
            </button>
          </form>
          <div className="select-location">
            {locations && locations.map((l, idx) => renderLocation(l, idx))}
          </div>
        </div>
      )}
      <div className="dates-section">
        <h3 className="text-2xl">Dates:</h3>
        <p>
          {moment(trip.startDate).format("ll")} -{" "}
          {moment(trip.endDate).format("ll")}
        </p>
      </div>
      <div className="description-section">
        <h3 className="text-2xl">Description:</h3>
        <p>{trip.description}</p>
      </div>
      {/* TODO: conditionally render activities only if location is set */}
      {trip.location ? (
        <>
          <h3>Activities:</h3>
          {trip.activities.map((a) => (
            <>
              <p>{a.name}</p>
              <p>{a.address}</p>
              <img src={a.image} />
            </>
          ))}
          <form onSubmit={getActivity}>
            <button type="submit" className="btn btn-primary p-2">
              Search Activities
            </button>
          </form>
          <div className="activity-grid">
          {activities && activities.map((a, idx) => renderActivity(a, idx))}
          </div>
        </>
      ) : null}
<div className="flex justify-end mt-14">
      <button className="btn btn-secondary border-red-500 text-red-500 hover:bg-red-100 p-2" onClick={handleDelete}>
        Delete Trip
      </button>
      </div>
    </div>
  );

  return <div>{isLoading ? renderLoading() : renderTrip()}</div>;
};

export default MyTripDetails;
