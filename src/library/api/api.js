import axios from "axios";

const ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const api = axios.create({
  baseURL: ENDPOINT,
});

export async function getPing() {
  return await api.get("/ping").then((res) => res.data);
}

export async function postEcho(payload) {
  return api.post("/echo", payload).then((res) => res.data);
}
