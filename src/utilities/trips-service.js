import * as tripsAPI from "./trips-api";

export async function createTrips(data) {
  try {
    const newTrip = await tripsAPI.create(data);
    return newTrip;
  } catch (err) {
    console.log(err.message);
  }
}

export async function getTrips() {
  try {
    const data = await tripsAPI.index();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err.message);
  }
}
