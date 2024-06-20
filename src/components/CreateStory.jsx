import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createStory, getAllStories } from "../features/story/storySlice";

const CreateStory = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreateStory = async () => {
    await dispatch(createStory(formData));
    await dispatch(getAllStories());

    setFormData({
      title: "",
      content: "",
    });

    handleClose();
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Story</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Enter title"
              value={formData.title}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group controlId="content">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="content"
              placeholder="Enter content"
              value={formData.content}
              onChange={onChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleCreateStory}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateStory;
