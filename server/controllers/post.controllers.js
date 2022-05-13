const {
  getPostsService,
  createPostService,
  updatePostReaction,
  createNotification,
} = require("../service/post.service");
const sse = require("../sse");

const getPostsController = async (req, res) => {
  const result = await getPostsService();
  res.status(result.statusCode).json(result);
};

const createPostController = async (req, res) => {
  const body = req.body;
  const result = await createPostService(body);
  res.status(result.statusCode).json(result);
  if (!result.error) {
    // emit post event
    // console.log("in createPost sse send", result.data[0]);
    sse.send(result.data[0], "post");
  }
};

const updateReactionController = async (req, res) => {
  const postId = req.params.id;
  const userId = req.body.userId;
  const result = await updatePostReaction(postId, userId);
  res.status(result.statusCode).json(result);
  if (!result.error) {
    const post = result.data[0];
    const data = { liker: userId, post };
    // emit post_reaction event to all users
    sse.send(data, "post_reaction");
    //send notification to the post author
    if (post.userId !== userId) {
      const authorId = post.userId;
      const _notif = createNotification({ postId, userId, authorId });
      // emit notification_{userId} to the post author
      sse.send(_notif, `notification-${authorId}`);
    }
  }
};

module.exports = {
  getPostsController,
  createPostController,
  updateReactionController,
};
