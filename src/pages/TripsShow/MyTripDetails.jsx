import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { getTrip, deleteTrip, findLocation } from "../../utilities/trips-service"
import moment from "moment"

const MyTripDetails = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [trip, setTrip] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()


    async function handleRequest() {
        const tripDetails = await getTrip(id);
        setTrip(tripDetails);
        setIsLoading(false);
    }

      const handleDelete = async () => {
        try {
          await deleteTrip(id)
          navigate('/trips')
        } catch(err) {}
      }
  
    useEffect(()=>{
        handleRequest()
    }, [])

    const renderLoading = () => (
        <section>
          <h2>Loading...</h2>
        </section>
      );

    const getLocation = async (e) => {
      e.preventDefault()
      try{
        const locations = await findLocation()
        console.log('LOCATIONS', locations)
      } catch(err) {}
    }

    const renderTrip = () => (
        <div>
            <h1>{trip.name}</h1>
            <h3>Location:</h3>
            <p>{trip.location}</p>
            <form onSubmit={getLocation}>
              <input type='text' />
              <button type='submit'>Search Location</button>
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
    )

    return (
        <div>
        {isLoading ? renderLoading() : renderTrip()}
        </div>
    )
}

export default MyTripDetails