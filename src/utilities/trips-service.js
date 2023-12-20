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

export async function getTrip(id) {
  try {
    const tripId = await tripsAPI.show(id);
    if (tripId) {
      return tripId;
    } else {
      console.log("no trip found", id);
    }
  } catch (err) {
    console.log(err.message);
  }
}

export async function deleteTrip(id) {
  try {
    const deletedTrip = await tripsAPI.destroy(id);
    return deletedTrip;
  } catch (err) {
    console.log(err, err.message);
    throw err;
  }
}

export async function findLocation() {
  try {
    const location = await tripsAPI.searchLocation();
    return location;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}
