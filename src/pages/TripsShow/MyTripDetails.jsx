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
  const [image, setImage] = useState([]);
  // const [searchActivity, setSearchActivity] = useState('')
  const [activities, setActivities] = useState([]);
  const [activitiesImage, setActivitiesImage] = useState([]);


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
      // console.log("search query", searchLocation);
      const locationResponse = await findLocation(id, searchLocation);
      // console.log({ locationResponse });
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
      // console.log(trip.location.id)
      console.log({ activityResponse });
      setActivities(activityResponse.allNearbyData);
      setActivitiesImage(activityResponse.nearbyDataPromises);
    } catch (err) {}
  };
  console.log({ activitiesImage });
  // console.log({activities})
  // console.log(activities[0])
      console.log({ activityResponse });
      setActivities(activityResponse);
    } catch (err) {}
  };


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

          image: image[idx].url

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
  console.log({ trip });

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

  const renderActivity = (a, idx) => {
    const submit = async (e) => {
      e.preventDefault();
      await addActivity(a, idx);
    };
    return (
      <div key={idx}>
        <form onSubmit={submit}>
          <p>Name: {a.name}</p>
          <p>Adress: {a.address_obj.address_string}</p>
          <img src={activitiesImage[idx].url} />
          <button type="submit">Add Activity</button>
        </form>
        <br />
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
          <form onSubmit={getLocation}>
            <input type="text" value={searchLocation} onChange={handleChange} />
            <button className="btn btn-primary p-2" type="submit">
          </form>
          <div className="select-location">
          {locations && locations.map((l, idx) => renderLocation(l, idx))}
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
      {trip.activities.map((a) => (
        <>
          <p>{a.name}</p>
          <p>{a.address}</p>
          <img src={a.image} />
        </>
      ))}
      {/* <p>{trip.activities}</p> */}
      <form onSubmit={getActivity}>
        <button type="submit">Search Activities</button>
      </form>

      {activities && activities.map((a, idx) => renderActivity(a, idx))}
      <button onClick={handleDelete}>Delete Trip</button>

      <button className="btn btn-primary p-2" onClick={handleDelete}>
        Delete Trip
      </button>

    </div>
  );

  return <div>{isLoading ? renderLoading() : renderTrip()}</div>;
};

export default MyTripDetails;
