import axios from "axios";

const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // IPv6 locahost address
    window.location.hostname === "[::1]"
  // window.location.hostname.match(

  // )
);

const SERVER_URL = isLocalhost
  ? "http://localhost:5000"
  : "https://api.sse.techfortified.com";

export const Axios = axios.create({
  baseURL: `${SERVER_URL}/api`,
  withCredentials: true,
});

export const STREAM_URL = `${SERVER_URL}/stream`;

export const ssEvents = new EventSource(STREAM_URL, {
  withCredentials: true,
});
