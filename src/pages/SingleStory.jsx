import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAllStories,
  getSingleStory,
  likeStory,
  unlikeStory,
  saveStory,
  unsaveStory,
} from "../features/story/storySlice";
import { FaHeart, FaBookmark } from "react-icons/fa";
import Spinner from "../components/Spinner";
import { useDispatch, useSelector } from "react-redux";

import { resetSingleStory } from "../features/story/storySlice";

const SingleStory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  const { user } = useSelector((state) => state.auth);

  const { singleStory, isLoading, isError, isSuccess } = useSelector(
    (state) => state.story
  );

  const storyId = params.id;
  const storyArg = { id: storyId };

  useEffect(() => {
    // dispatch(getAllStories());
    dispatch(getSingleStory(storyArg));
    // console.log({ singleStory: singleStory[0] });
    // return () => {
    //   dispatch(resetSingleStory());
    // };
  }, [dispatch]);

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(null);
  useEffect(() => {
    if (singleStory && singleStory[0]) {
      setLikesCount(singleStory[0].likesCount);
      if (
        user &&
        singleStory[0].saves &&
        singleStory[0].saves.includes(user.user._id)
      ) {
        setSaved(true);
      }
      if (user && singleStory && singleStory[0].likes.includes(user.user._id)) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    }
  }, [user, singleStory]);

  const handleLikeClick = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      if (liked) {
        await dispatch(unlikeStory({ id: storyId }));
        setLikesCount(likesCount - 1);
      } else {
        await dispatch(likeStory({ id: storyId }));
        toast.success("Story liked successfully!", { position: "top-right" });

        setLikesCount(likesCount + 1);
      }
      setLiked(!liked);
    } catch (error) {
      console.error("Error liking/unliking story:", error);
    }
  };

  const handleSaveClick = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      if (!saved) {
        await dispatch(saveStory({ id: storyId }));
        toast.success("Story saved successfully!", { position: "top-right" });
      } else {
        await dispatch(unsaveStory({ id: storyId }));
      }
      setSaved(!saved);
    } catch (error) {
      console.error("Error Saving the story", error);
    }
  };

  const formatDate = (date) => {
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  const navigateToStories = () => {
    navigate("/myStories", {
      state: { userId: singleStory[0].createdBy._user },
    });
  };

  if (isLoading) {
    return <Spinner />;
  } else if (isError) {
    return <p>Error loading story</p>;
  } else if (!singleStory) {
    // Handle the case where singleStory is null or undefined
    return <p>Story not found</p>;
  }
  return (
    <>
      <div className="single-story">
        <h2>{singleStory[0].title}</h2>
        <p>{singleStory[0].content}</p>
        {singleStory[0].createdBy && ( // Check if createdBy field exists
          <p>
            Author:{" "}
            <div onClick={navigateToStories}>
              {singleStory[0].createdBy.user}
            </div>
          </p>
        )}
        <p>Date: {formatDate(singleStory[0].createdAt)}</p>
        <p onClick={handleLikeClick}>
          <FaHeart style={{ color: liked ? "red" : "grey" }} />
          {likesCount}
        </p>
        <div className="save" onClick={handleSaveClick}>
          <FaBookmark style={{ color: saved ? "black" : "grey" }} />
        </div>
      </div>
    </>
  );
};

export default SingleStory;
