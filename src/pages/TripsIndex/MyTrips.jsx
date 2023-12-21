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
      setTrips(tripsData.filter((trip) => trip.id === user.sub.slice(14)));
    }
    console.log({ tripsData });
    setIsLoading(false);
  };

  // console.log({trips})

  const sortedTrips = trips.sort(
    (a, b) => new Date(a.startDate) - new Date(b.startDate)
  );
  const renderTrips = () => (
    <section className="mx-6">
      <h2 className="text-4xl font-bold text-emerald-500 mb-4">
        Upcoming Trips
      </h2>
      <div id="trips" className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-4 trips-list">
        {trips.length
          ? sortedTrips.map((t) => (
              <div id="card" key={t._id} className="trips-card">
                <Link to={`/trips/${t._id}`}>
                  {t.location ? (
                    <img
                      src={t.location.image}
                      alt={`Photo of ${t.location.name}`}
                      className="rounded-t-lg"
                    />
                  ) : (
                    // change null to fallback image
                    <img
                      src="../../../public/images/location-image-fallback.png"
                      alt="Fallback photo"
                      className="rounded-t-lg"
                    />
                  )}
                  <div
                    id="card-bottom"
                    className="bg-lime-100 rounded-b-lg pt-4 px-6 pb-6 shadow-2xl hover:bg-emerald-200"
                  >
                    <h3 className="text-xl font-semibold">{t.name}</h3>
                    {t.location && <p>{t.location.name}</p>}
                    {t.startDate && (
                      <span>{moment(t.startDate).format("ll")}</span>
                    )}
                    {t.startDate && t.endDate ? <span> - </span> : null}
                    {t.endDate && <span>{moment(t.endDate).format("ll")}</span>}
                    {/* <Link to={`/trips/${t._id}`} className="underline pt-2">View Trip</Link> */}
                  </div>
                </Link>
              </div>
            ))
          : "No trips yet"}
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
        "Log in to create and view trips!"
      )}
    </>
  );
};

export default MyTrips;
