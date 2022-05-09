import {
    MDBBtn,
    MDBInput,
    MDBModalBody,
    MDBModalDialog,
    MDBModalFooter,
    MDBModalHeader,
    MDBModalTitle,
    MDBSpinner
} from "mdb-react-ui-kit";
import { useState } from "react";
import { useAppContext } from "../context";
import { createPost } from "../lib";
// {
//     MDBModal,
//     MDBModalDialog,
// mdm
// }
// from 'mdb-react-ui-kit'

const AddPost = ({ isOpen, toggleShow }) => {
  const {
    appState: { userId },
  } = useAppContext();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTitleInput = (e) => {
    setTitle(e.target.value);
    setMessage("");
  };
  const handleImageInput = (e) => {
    setImage(e.target.value);
    setMessage("");
  };
  const handleContentInput = (e) => {
    setContent(e.target.value);
    setMessage("");
  };

  const resetForm = () => {
    setTitle("");
    setImage("");
    setContent("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !image || !content) {
      return setMessage("ALl inputs are required");
    }
    try {
      setLoading(true);
      const res = await createPost({ title, photo: image, userId, content });
      setMessage(res.message);
      resetForm();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <MDBModal show={isOpen} tabIndex="-1">
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle> Add New Post</MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={toggleShow}
            ></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <form>
              <div className="mb-2">
                <label htmlFor="title">Post title</label>
                <MDBInput
                  value={title}
                  onChange={handleTitleInput}
                  placeholder="Post title"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="image">Post image link</label>
                <MDBInput
                  value={image}
                  onChange={handleImageInput}
                  placeholder="Post image link"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="image">Post content</label>
                <MDBInput
                  value={image}
                  onChange={handleContentInput}
                  placeholder="Post content"
                />
              </div>
              <div className="d-block text-center">
                <p className="info">{message}</p>
                {loading && <MDBSpinner />}
              </div>
            </form>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={toggleShow}>
              Close
            </MDBBtn>
            <MDBBtn onClick={handleSubmit} disabled={loading}>
              Submit
            </MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDial>
    </MDBModal>
  );
};
