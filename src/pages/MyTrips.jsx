import { useState, useEffect } from "react";
import { getTrips } from "../utilities/trips-service";
import moment from 'moment';

const MyTrips = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [trips, setTrips] = useState([]);

  const handleRequest = async () => {
    const tripsData = await getTrips();
    if (tripsData) setTrips(tripsData);
    setIsLoading(false);
  };

  const renderTrips = () => (
    <>
      <h1>Upcoming Trips:</h1>
      <section className="trips-list">
        {trips.map((t) => (
          <div key={t._id}>
            <h2>{t.name}</h2>
            <h3>Description:</h3>
            <p>{t.description}</p>
            <h3>Location:</h3>
            <p>{t.location}</p>
            <h3>Dates:</h3>
            <p>
            {moment(t.startDate).format("ll")} - {moment(t.endDate).format("ll")}
            </p>
            <h3>Activities:</h3>
            <p>{t.activities}</p>
          </div>
        ))}
      </section>
    </>
  );

  const renderLoading = () => (
    <section>
      <h2>Loading...</h2>
    </section>
  );

  useEffect(() => {
    handleRequest();
  }, []);

  return (
    <div>
      <button>Create a Trip</button>
      {isLoading ? renderLoading() : renderTrips()}
    </div>
  );
};

export default MyTrips;
