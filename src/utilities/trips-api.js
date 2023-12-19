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
  console.log(config.BASE_URL);
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
  let endpoint = `${config.BASE_URL}/${id}`;
  const response = await fetch(endpoint, {
    method: "DELETE",
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Invalid Request");
  }
}
