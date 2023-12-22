import config from "../config";

export async function create(data) {
  const clientData = JSON.stringify(data);
  const response = await fetch(config.BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: clientData,
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Invalid request");
  }
}

export async function index() {
  const res = await fetch(config.BASE_URL, { method: "GET" });
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid request");
  }
}

export async function show(id) {
  const res = await fetch(config.BASE_URL + `/${id}`, { method: "GET" });
  if (res.ok) {
    return res.json();
  } else {
    console.log(err.message);
  }
}

export async function destroy(id) {
  const response = await fetch(config.BASE_URL + `/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Invalid Request");
  }
}

export async function searchLocations(id, q) {
  const response = await fetch(`${config.BASE_URL}/${id}/search?q=${q}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const locationData = await response.json();
    return locationData;
  } else {
    console.log(err.message);
  }
}

export async function update(id, data) {
  const response = await fetch(`${config.BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Invalid PUT Request");
  }
}

export async function searchActivity(id, q) {
  console.log({ q });
  const response = await fetch(
    `${config.BASE_URL}/${id}/activities/search?q=${q}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (response.ok) {
    const activityData = await response.json();
    console.log({ activityData });
    return activityData;
  } else {
    console.log(err.message);
  }
}
