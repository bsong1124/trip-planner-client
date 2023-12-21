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
    // console.log(data);
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

export async function findLocations(id, q) {
  try {
    const location = await tripsAPI.searchLocations(id, q);
    return location;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}

export async function updateLocation(id, data) {
  try {
    // console.log({data});
    const updatedLocation = await tripsAPI.update(id, data);
    return updatedLocation;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}

export async function findActivity(id, q) {
  try {
    const activity = await tripsAPI.searchActivity(id, q);
    // console.log({q});
    // console.log({ id });
    // console.log(activity);
    return activity;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}
