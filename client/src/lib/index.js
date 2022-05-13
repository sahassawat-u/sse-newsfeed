import { Axios } from "../config";

export const getPosts = async () => {
  try {
    const {
      data: { data = [] },
    } = await Axios.get("/posts");
    // console.log("data", data);
    return { data, error: false };
  } catch (error) {
    return { data: [], error: true };
  }
};

export const createPost = async (body) => {
  // console.log(body);
  try {
    const {
      data: { data = [], message, error },
    } = await Axios.post("/posts", body);
    // console.log(data);
    return { data, message, error };
  } catch (error) {
    return { data: [], message: error.message, error: true };
  }
};

export const postReaction = async (body) => {
  try {
    const {
      data: { data = [], message, error },
    } = await Axios.patch(`/posts/${body.id}`, body);
    return { data, message, error };
  } catch (error) {
    return { data: [], message: error.message, error: true };
  }
};
