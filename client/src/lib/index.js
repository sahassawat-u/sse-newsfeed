import { Axios } from "../config";

export const getPosts = async () => {
  try {
    const {
      data: { data = [] },
    } = await Axios.get("/posts");
  } catch (error) {
    return { data: [], error: true };
  }
};

export const createPost = async (body) => {
  try {
    const {
      data: { data = [], message, error },
    } = await Axios.post("/posts", body);
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
  } catch (error) {
    return { data: [], message: error.message, error: true };
  }
};
