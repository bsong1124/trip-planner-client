






































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






import config from "../config";

export async function index() {
    console.log(config.BASE_URL)
    const res = await fetch(config.BASE_URL, {method: "GET"})
    if (res.ok) {
        return res.json()
    } else {
        throw new Error("Invalid request");
    }
}

