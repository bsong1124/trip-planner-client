import moment from "moment";
import { useState, useEffect } from "react";
import { getTrips } from "../../utilities/trips-service";
import { Link } from "react-router-dom";
import NewTripForm from "../TripForm/NewTripForm";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../../components/Auth/LoginButton";

const MyTrips = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [trips, setTrips] = useState([]);
  const { user, isLoading: loadingAuth, isAuthenticated } = useAuth0();

  const handleRequest = async () => {
    const tripsData = await getTrips();
    if (tripsData) {
      setTrips(
        tripsData.filter(
          (trip) => trip.id === user.sub.substring(user.sub.indexOf("|") + 1)
        )
      );
    }
    setIsLoading(false);
  };

  const sortedTrips = trips.sort(
    (a, b) => new Date(a.startDate) - new Date(b.startDate)
  );
  const renderTrips = () => (
    <section id="trips" className="mx-6 lg:mx-12 mb-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-emerald-500 ml-4 mb-4">
        Upcoming Trips
      </h2>
      <div
        id="trips-grid"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {trips.length ? (
          sortedTrips.map((t) => (
            <div id="trip-card" key={t._id}>
              <Link to={`/trips/${t._id}`}>
                {t.location ? (
                  <img
                    src={t.location.image}
                    alt={`Photo of ${t.location.name}`}
                    className="rounded-t-lg"
                  />
                ) : (
                  <img
                    src="../../../images/location-image-fallback.png"
                    alt="Fallback photo"
                    className="rounded-t-lg"
                  />
                )}
                <div
                  id="card-bottom"
                  className="rounded-b-lg pt-4 px-6 pb-8 shadow-2xl hover:bg-emerald-100"
                >
                  <h3 className="text-xl font-semibold">
                    {t.name.charAt(0).toUpperCase() + t.name.slice(1)}
                  </h3>
                  {t.location && <p>{t.location.name}</p>}
                  {t.startDate && (
                    <span>{moment(t.startDate).format("ll")}</span>
                  )}
                  {t.startDate && t.endDate ? <span> - </span> : null}
                  {t.endDate && <span>{moment(t.endDate).format("ll")}</span>}
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="ml-6">No trips yet...</div>
        )}
      </div>
    </section>
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
    <>
      {isAuthenticated && !loadingAuth ? (
        <>
          <NewTripForm updateTripList={handleRequest} />
          {isLoading ? renderLoading() : renderTrips()}
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl mt-12 mb-4">
            Log in to create and view trips!
          </h2>
          <LoginButton />
        </div>
      )}
    </>
  );
};

export default MyTrips;
