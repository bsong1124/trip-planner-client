import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getTrip } from "../utilities/trips-service"
import moment from "moment"

const MyTripDetails = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [trip, setTrip] = useState(null)
    const { id } = useParams()


    async function handleRequest() {
        const tripDetails = await getTrip(id);
        setTrip(tripDetails);
        setIsLoading(false);
      }
    

    useEffect(()=>{
        handleRequest()
    }, [])


    const renderLoading = () => (
        <section>
          <h2>Loading...</h2>
        </section>
      );

    const renderTrip = () => (
        <div>
            <h1>{trip.name}</h1>
            <h3>Location:</h3>
            <p>{trip.location}</p>
            <h3>Dates:</h3>
            <p>
              {moment(trip.startDate).format("ll")} -{" "}
              {moment(trip.endDate).format("ll")}
            </p>
            <h3>Description:</h3>
            <p>{trip.description}</p>
            <h3>Activities:</h3>
            <p>{trip.activities}</p>
        </div>
    )

    return (
        <div>
        {isLoading ? renderLoading() : renderTrip()}
        </div>
    )
}

export default MyTripDetails