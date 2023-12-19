






































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






