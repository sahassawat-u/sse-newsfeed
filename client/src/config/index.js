import axios from "axios";

const isLocalhost = true;

const SERVER_URL = "http://localhost:5000";

export const Axios = axios.create({
  baseURL: `${SERVER_URL}/api`,
  withCredentials: true,
});

export const STREAM_URL = `${SERVER_URL}/stream`;

export const ssEvents = new EventSource(STREAM_URL, {
  withCredentials: true,
});
