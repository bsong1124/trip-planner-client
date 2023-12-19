import { useState, useEffect } from "react";
import { createTrips } from "../utilities/trips-service";

const NewTripForm = ({updateTripList}) => {
    const [newTrip, setNewTrip] = useState({
        name: '',
        description: '',
        location: '',
        startDate: Date,
        endDate: Date,
        activities: [],
    })

    async function handleSubmit(e) {
        e.preventDefault();
        console.log('data', newTrip);
        try {
          await createTrips(newTrip);
          updateTripList()
        } catch (err) {}
    
        setNewTrip({
            name: '',
            description: '',
            location: '',
            startDate: Date,
            endDate: Date,
            activities: [],
        });
      }

      function handleChange(e) {
        console.log(e.target.name, e.target.value)
        setNewForm({ ...newTrip, [e.target.name]: e.target.name === 'startDate' || e.target.name === 'endDate' 
        ? Date(e.target.value) : e.target.value});
      }

    return (
        <section className="NewTripForm">
            <h2>New Trip</h2>
            <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={newTrip.name}
                name="name"
                placeholder="name"
                onChange={handleChange}/>
            <input
                type="text"
                value={newTrip.description}
                name="description"
                placeholder="description"
                onChange={handleChange}/>
            <input
                type="text"
                value={newTrip.location}
                name="location"
                placeholder="location"
                onChange={handleChange}/>
            <input
                type="date"
                value={newTrip.startDate}
                name="startDate"
                placeholder="startDate"
                onChange={handleChange}/>
            <input
                type="text"
                value={newTrip.endDate}
                name="endDate"
                placeholder="endDate"
                onChange={handleChange}/>
            <input type="submit"/>
            </form>
      </section>
    )
}

export default NewTripForm