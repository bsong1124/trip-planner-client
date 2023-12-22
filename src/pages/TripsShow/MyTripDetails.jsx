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
  const [activities, setActivities] = useState([]);
  const [activitiesImage, setActivitiesImage] = useState([]);

  async function handleRequest() {
    const tripDetails = await getTrip(id);
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
      const locationResponse = await findLocation(id, searchLocation);
      setLocations(locationResponse.allData);
      setImage(locationResponse.imageData);
    } catch (err) {
      console.log("error");
    }
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
  
  const addLocation = async (l, idx) => {
    try {
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
    } catch (err) {
      console.log(err);
    }
  };
  
  const getActivity = async (e) => {
    e.preventDefault();
    try {
      const activityResponse = await findActivity(id, trip.location.id);
      setActivities(activityResponse.allNearbyData);
      setActivitiesImage(activityResponse.nearbyDataPromises);
    } catch (err) {}
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

  const addActivity = async (a, idx) => {
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

  const handleDelete = async () => {
    try {
      await deleteTrip(id);
      navigate("/trips");
    } catch (err) {}
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
        {trip.startDate || trip.endDate ? <h3 className="text-2xl">Dates:</h3> : null}
        {trip.startDate && (
        <span>{moment(trip.startDate).format("ll")}</span>
        )}
        {trip.startDate && trip.endDate ? <span> - </span> : null}
        {trip.endDate && <span>{moment(trip.endDate).format("ll")}</span>}
        </div>

      <div className="description-section">
        <h3 className="text-2xl">Description:</h3>
        <p>{trip.description}</p>
      </div>
      {trip.location ? (
        <>
          <h3 className="text-3xl sm:text-4xl font-bold text-emerald-500 ml-4 mb-4">Current Activities Planned:</h3>
          <div className="activity-grid">
          {trip.activities.map((a) => (
            <div key={a.id}>
              <div className="activity-card">
              <p className="activity-name">{a.name}</p>
              <p className="activity-address">{a.address}</p>
              <img className="activity-image" src={a.image} />
              </div>
            </div>
          ))}
          </div>
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
