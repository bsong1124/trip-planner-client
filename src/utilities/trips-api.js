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