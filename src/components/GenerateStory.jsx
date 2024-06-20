import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createStory,
  getAllStories,
  generateStories,
} from "../features/story/storySlice";

const GenerateStory = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const [prompt, setPrompt] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const { story, isLoading, isError, isSuccess, storyTitle, storyContent } =
    useSelector((state) => state.story);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onPromptChange = (e) => {
    setPrompt(e.target.value);
  };
  useEffect(() => {
    setFormData({
      title: storyTitle || "", // Use an empty string if storyTitle is null
      content: storyContent || "", // Use an empty string if storyContent is null
    });
  }, [storyTitle, storyContent]);

  const handleGenerateStory = async () => {
    if (prompt === "") {
      toast.error("Enter the prompt");
      return;
    }
    await dispatch(generateStories({ prompt: prompt }));
  };

  const handleCreateStory = async () => {
    if (formData.title.trim() === "" || formData.content.trim() === "") {
      toast.error("Title and content cannot be empty");
      return; // Don't proceed if there are empty fields
    }
    await dispatch(createStory(formData));
    await dispatch(getAllStories());

    setFormData({
      title: "",
      content: "",
    });
    setPrompt("");

    handleClose();
  };

  const handleModalHide = () => {
    setFormData({
      title: "",
      content: "",
    });
    setPrompt(""); // Reset the prompt to an empty string
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Story</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="prompt">
            <Form.Label>Prompt</Form.Label>
            <Form.Control
              type="text"
              name="prompt"
              placeholder="Enter the prompt"
              value={prompt}
              onChange={onPromptChange}
            />
            <Button variant="primary" onClick={handleGenerateStory}>
              Generate Story
            </Button>
          </Form.Group>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Enter the title"
              value={formData.title}
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

export default GenerateStory;
