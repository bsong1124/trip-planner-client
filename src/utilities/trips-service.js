






































export async function createTrips(data) {
    try {
      const newTrip = await tripAPI.create(data);
      return newTrip;
    } catch (err) {
      console.log(err.message);
    }
  }


