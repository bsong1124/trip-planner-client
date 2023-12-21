import "./MyTrips.css";
import moment from "moment";
import { useState, useEffect } from "react";
import { getTrips } from "../../utilities/trips-service";
import { Link } from "react-router-dom";
import NewTripForm from "../TripForm/NewTripForm";
import { useAuth0 } from "@auth0/auth0-react";

const MyTrips = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [trips, setTrips] = useState([]);
  const { user, isLoading: loadingAuth, isAuthenticated } = useAuth0();

  const handleRequest = async () => {
    const tripsData = await getTrips();
    if (tripsData) {
       setTrips(tripsData.filter((trip) => trip.id === user.sub.slice(14)))
    }
    console.log({tripsData})
    setIsLoading(false);
  };

  const sortedTrips = trips.sort(
    (a, b) => new Date(a.startDate) - new Date(b.startDate)
  );
  const renderTrips = () => (
    <>
      <h1>Upcoming Trips</h1>
      <section className="trips-list">
        {/* Refactor conditional to read as trips id = user id */}
        {trips.length
          ? sortedTrips.map((t) => (
                  <div key={t._id}>
                    <Link to={`/trips/${t._id}`}>
                      <div className="trips-card">
                        {t.name}
                        <br />
                        {t.location?.name ? t.location.name : "No location yet"}
                        <br />
                        Dates:
                        {moment(t.startDate).format("ll")} -{" "}
                        {moment(t.endDate).format("ll")}
                      </div>
                    </Link>
                  </div>
            ))
          : "No trips yet"}
      </section>
    </>
  );

  const renderLoading = () => (
    <section>
      <h2>Loading...</h2>
    </section>
  );

  useEffect(() => {
    if (user) handleRequest();
  }, [user]);

  return (
    <section>
      {isAuthenticated && !loadingAuth ? (
        <div>
          <NewTripForm updateTripList={handleRequest} />
          {isLoading ? renderLoading() : renderTrips()}
        </div>
      ) : (
        "Log in to create and view trips!"
      )}
    </section>
  );
};

export default MyTrips;
