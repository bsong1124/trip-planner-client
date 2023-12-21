import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getTrip,
  deleteTrip,
  findLocation,
  findActivity,
  updateLocation
} from "../../utilities/trips-service";
import moment from "moment";

const MyTripDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [trip, setTrip] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState("");
  const [locations, setLocations] = useState([]);
  const [image, setImage] = useState([])
  // const [searchActivity, setSearchActivity] = useState('')
  const [activities, setActivities] = useState([])


  async function handleRequest() {
    const tripDetails = await getTrip(id);
    console.log({tripDetails})
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
    e.preventDefault()
    try{
      // console.log(searchActivity)
      const activityResponse = await findActivity(id, trip.location.id)
      console.log({activityResponse})
      setActivities(activityResponse)
    } catch(err) {}
  }

  const addLocation = async (l, idx ) => {
    console.log({l})
    try {
      console.log({image})
      console.log("it works");
      const updatedTripData = {...trip, location: {
        id: l.location_id,
        name: l.name,
        image: image[idx].url,
      },
    }
    setTrip(updatedTripData)
    updateLocation(id, updatedTripData)
    console.log({updatedTripData})
    
    // navigate(`/trips/${id}`);
  } catch (err) {
    console.log(err);
    // navigate(`/trips/${id}`);
  }
};
console.log({trip})

  const handleDelete = async () => {
    try {
      await deleteTrip(id);
      navigate("/trips");
    } catch (err) {}
  };

  const renderLocation = (l, idx) => {
    const submit = async (e) => { 
      e.preventDefault()
        await addLocation(l,idx);
    }
      return (
        <div key={l.location_id}>
            <form onSubmit={submit}>
              <p>{l.name}</p>
              {/* <p>{image[idx].url}</p> */}
              <img src={image[idx].url} />
              <button type="submit">Select Location</button>
            </form>
          </div>
      );
  };

  const renderTrip = () => (
    <div>
      <h1>{trip.name}</h1>
      <h3>User ID: {trip.id}</h3>
      <h3>Location:</h3>
      {trip.location ? (
        <>
      <p>{trip.location.name}</p>
      </>
 ) : (
   <>
      <form onSubmit={getLocation}>
        <input type="text" value={searchLocation} onChange={handleChange} />
        <button type="submit">Search Location</button>
      </form>
      {locations &&
        locations.map((l, idx) => (
          renderLocation(l,idx)
          ))}
          </>
        )}
      <h3>Dates:</h3>
      <p>
        {moment(trip.startDate).format("ll")} -{" "}
        {moment(trip.endDate).format("ll")}
      </p>
      <h3>Description:</h3>
      <p>{trip.description}</p>
      <h3>Activities:</h3>
      <p>{trip.activities}</p>
      <form onSubmit={getActivity}>
        <button type='submit'>Search Activities</button>
      </form>
      <button onClick={handleDelete}>Delete Trip</button>
    </div>
  );

  return <div>{isLoading ? renderLoading() : renderTrip()}</div>;
};

export default MyTripDetails;
