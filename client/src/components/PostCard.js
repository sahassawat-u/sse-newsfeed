import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardImage,
  MDBCardSubTitle,
  MDBCardTitle,
  MDBIcon,
} from "mdb-react-ui-kit";
import { POST_REACTION } from "../actions";
import { useAppContext } from "../context";
import { postReaction } from "../lib";

const PostCard = ({ post }) => {
  const {
    appState: { userId },
    appDispatch,
  } = useAppContext();

  // console.log(post.likers.includes(userId));
  const handlePostLike = async (_post) => {
    try {
      appDispatch({
        type: POST_REACTION,
        payload: { id: _post._id, likers: [...post.likers, userId] },
      });
      await postReaction({ userId, id: _post._id });
    } catch (error) {}
  };
  return (
    <MDBCard className="h-100">
      <MDBCardImage
        src={post.photo}
        position="top"
        style={{ maxHeight: 350, objectFit: "cover" }}
      />
      <MDBCardBody>
        <MDBCardTitle
          className="d-inline-block text-truncate"
          style={{ maxWidth: "100%" }}
        >
          {post.title}
        </MDBCardTitle>
        <MDBCardSubTitle
          className="d-inline-block text-truncate"
          style={{ maxWidth: "100%" }}
        >
          {post.content}
        </MDBCardSubTitle>
      </MDBCardBody>
      <MDBCardFooter>
        {post.likers.includes(userId) ? (
          <>
            {post.likers.length}
            <MDBIcon
              className="likeBtn"
              size="lg"
              fas
              icon="heart"
              color="danger"
            />
          </>
        ) : (
          <>
            {post.likers.length}
            <MDBIcon
              className="likeBtn"
              size="lg"
              far
              icon="heart"
              onClick={() => handlePostLike(post)}
            />
          </>
        )}
      </MDBCardFooter>
    </MDBCard>
  );
};

export default PostCard;
