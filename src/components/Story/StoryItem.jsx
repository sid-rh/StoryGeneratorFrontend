import React, { useState, useEffect } from "react";
import { FaHeart, FaBookmark, FaShare } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  likeStory,
  unlikeStory,
  saveStory,
  unsaveStory,
} from "../../features/story/storySlice";
import { useNavigate } from "react-router-dom";
import Share from "../Share";
import "./StoryItem.css"; // Import your CSS file for StoryItem styles

const StoryItem = ({ story, onTitleClick }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(story.likesCount);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [showShareModal, setShowShareModal] = useState(false);

  const handleCloseShareModal = () => setShowShareModal(false);
  const handleShowShareModal = () => setShowShareModal(true);
  const [shortenedUrl, setShortenedUrl] = useState("");

  const storyUrl = `http://localhost:3000/singleStory/${story._id}`;
  const title = "story.title";

  useEffect(() => {
    if (user && story.likes.includes(user.user._id)) {
      setLiked(true);
    }
    if (user && story.saves && story.saves.includes(user.user._id)) {
      setSaved(true);
    }
  }, [user, story]);

  const handleLikeClick = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      if (liked) {
        await dispatch(unlikeStory({ id: story._id }));
        setLikesCount(likesCount - 1);
      } else {
        await dispatch(likeStory({ id: story._id }));
        toast.success("Story liked successfully!", { position: "top-right" });
        setLikesCount(likesCount + 1);
      }
      setLiked(!liked);
    } catch (error) {
      console.error("Error liking/unliking story:", error);
    }
  };

  const formatDate = (date) => {
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const navigateToStories = () => {
    navigate("/myStories", { state: { userId: story.createdBy._user } });
  };

  const handleSaveClick = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      if (!saved) {
        await dispatch(saveStory({ id: story._id }));
        toast.success("Story saved successfully!", { position: "top-right" });
      } else {
        await dispatch(unsaveStory({ id: story._id }));
      }
      setSaved(!saved);
    } catch (error) {
      console.error("Error Saving the story", error);
    }
  };

  return (
    <div className="story-item">
      <div className="save" onClick={handleSaveClick}>
        <FaBookmark style={{ color: saved ? "black" : "grey" }} />
      </div>
      <div className="story-info">
        <div onClick={() => onTitleClick(story._id)}>
          <h3>{story.title}</h3>
        </div>
        {story.createdBy && ( // Check if createdBy field exists
          <p>
            Author:{" "}
            <div onClick={navigateToStories}>{story.createdBy.user}</div>
          </p>
        )}
        <p>Date: {formatDate(story.createdAt)}</p>
      </div>

      <div className="actions">
        <div className="likes" onClick={handleLikeClick}>
          <FaHeart style={{ color: liked ? "red" : "grey" }} />
          <span>{likesCount}</span>
        </div>
        <div className="share">
          <FaShare onClick={handleShowShareModal} />
        </div>
      </div>
      <Share
        show={showShareModal}
        handleClose={handleCloseShareModal}
        storyUrl={storyUrl}
      />
    </div>
  );
};

export default StoryItem;
