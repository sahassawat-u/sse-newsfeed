const { nanoid } = require("nanoid");
const PostSchema = require("../models/Post");

const getPostsService = async () => {
  try {
    const posts = await PostSchema.find();
    const _length = posts.length;
    const message = _length === 0 ? "Not found" : "success";
    const error = _length === 0 ? true : false;
    const statusCode = _length === 0 ? 404 : 200;
    return { data: posts, error, message, statusCode };
  } catch (error) {
    return {
      data: [],
      error: true,
      message: "Sorry an error occured",
      statusCode: 500,
    };
  }
};

const createPostService = async (post) => {
  try {
    const _post = await PostSchema.create(post);
    return { data: [_post], error: false, message: "success", statusCode: 200 };
  } catch (error) {
    return {
      data: [],
      error: true,
      message: "Sorry an error occured",
      statusCode: 500,
    };
  }
};

const updatePostReaction = async (postId, userId) => {
  try {
    const post = await PostSchema.findByIdAndUpdate(
      postId,
      { $push: { likers: userId } },
      { new: true }
    );
    return { data: [post], error: false, message: "success", statusCode: 200 };
  } catch (error) {
    return {
      data: [],
      error: true,
      message: "Sorry an error occured",
      statusCode: 500,
    };
  }
};

const createNotification = ({ postId, authorId, userId }) => {
  return {
    id: nanoid(),
    userId: authorId,
    title: `Your post has been liked by user ${userId}`,
    type: "post",
    meta: {
      id: postId,
    },
  };
};

module.exports = {
  getPostsService,
  createPostService,
  updatePostReaction,
  createNotification,
};
