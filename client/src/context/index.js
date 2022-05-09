import { nanoid } from "nanoid";
import { createContext, useContext, useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import { GET_POSTS, GET_POST_STREAM, POST_REACTION } from "../actions";
import { ssEvents } from "../config";
import { getPosts } from "../lib";
import { appReducer } from "../reducer";

const initialState = {
  userId: nanoid(),
  posts: [],
  isLoading: true,
  isError: false,
};

export const AppContext = createContext(initialState);

const AppProvider = (props) => {
  cost[(appState, appDispatch)] = useReducer(appReducer, initialState);

  const { userId } = appState;

  useEffect(() => {
    // getch initial posts
    const getFetchPosts = async () => {
      const res = await getPosts();
      appDispatch({ type: GET_POSTS, payload: res });
    };
    getFetchPosts();
    // listen to message even
    ssEvents.addEventListener("message", (e) => {});

    // listen to post event
    ssEvents.addEventListener("post", (e) => {
      const data = JSON.parse(e.data);
      if (userId !== data.userId) {
        toast("New incoming post", {
          position: "bottom-right",
          autoClose: 1000,
          draggable: true,
          pauseOnHover: true,
          progress: undefined,
          hideProgressBar: false,
        });
      }
      setTimeout(() => {
        appDispatch({ type: GET_POST_STREAM, payload: data });
      }, 500);
    });

    // listen to post event
    ssEvents.addEventListener("post_reaction", (e) => {
      const { liker, post } = JSON.parse(e.data);
      if (liker !== userId) {
        const message =
          post.userId === userId
            ? "Someone reacted to your post"
            : "New post reaction";
        toast(message, {
          position: "bottom-right",
          autoClose: 1000,
          draggable: true,
          pauseOnHover: true,
          progress: undefined,
          hideProgressBar: false,
        });
        appDispatch({
          type: POST_REACTION,
          payload: { id: post._id, likers: post.likers },
        });
      }
    });

    // listen to notificaiton event
    ssEvents.addEventListener(`notification-${userId}`, (e) => {
      const data = JSON.parse(e.data);
      toast(data.title, {
        position: "top-right",
        autoClose: 1000,
        draggable: true,
        pauseOnHover: true,
        progress: undefined,
        hideProgressBar: false,
      });
    });

    // listen to open event
    ssEvents.onopen = (e) => {
      console.log(e);
    };
    ssEvents.onerror = (e) => {
      console.log(e);
    };

    return () => {
      ssEvents.close();
    };
  }, [userId]);

  return (
    <AppContext.Provider value={{ appState, appDispatch }}>
      {props.children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export default AppProvider;
