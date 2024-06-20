import { useState, useEffect } from "react";
import { FaSignInAlt, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import StoryItem from "../components/Story/StoryItem";
import CreateStory from "../components/CreateStory";
import Pagination from "react-bootstrap/Pagination";

import { getAllStories, getStoriesByUser } from "../features/story/storySlice";
import Spinner from "../components/Spinner";

const MyStory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { story, isLoading, isError, isSuccess, totalCount } = useSelector(
    (state) => state.story
  );
  const { user } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const userId = location.state.userId;
  const userArg = { id: userId };
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5); // Default perPage
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // dispatch(getAllStories());
    dispatch(
      getStoriesByUser({
        id: userId,
        page: currentPage,
        perPage: perPage,
      })
    );
  }, [dispatch]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // getStories(page);
  };

  const handlePerPageChange = (value) => {
    setPerPage(value);
    setCurrentPage(1); // Reset to the first page when changing perPage
    // getStories(1);
  };

  const openCreateStoryModal = () => {
    setShowModal(true);
  };

  const closeCreateStoryModal = () => {
    setShowModal(false);
  };

  const getStories = () => {
    try {
      dispatch(getAllStories());
    } catch (error) {
      console.log(error?.data?.message || error);
    }
  };

  const handleItemClick = (storyId) => {
    // dispatch(getSingleStory(storyId));
    navigate(`/singleStory`, { state: { storyId: storyId } });
  };

  return (
    <>
      {isLoading ? (
        <Spinner /> // Display a loading spinner while fetching data
      ) : isError ? (
        <p>Error loading stories</p> // Handle error state
      ) : isSuccess && story ? (
        <>
          {user?.user._id === userId ? (
            <h1>My Stories</h1>
          ) : (
            <h1>{story[0].createdBy.user}'s Stories</h1>
          )}
          {story.map((st) => (
            <StoryItem key={st._id} story={st} onTitleClick={handleItemClick} />
          ))}
          <Pagination>
            <Pagination.Prev
              onClick={() =>
                currentPage > 1 && handlePageChange(currentPage - 1)
              }
            />
            <Pagination.Item active>{currentPage}</Pagination.Item>
            <Pagination.Next
              onClick={() => {
                currentPage < Math.ceil(totalCount / perPage) &&
                  handlePageChange(currentPage + 1);
              }}
            />
          </Pagination>
          <div className="mt-3">
            <span>Show per page: </span>
            <select
              value={perPage}
              onChange={(e) => handlePerPageChange(Number(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              {/* Add more perPage options as needed */}
            </select>
          </div>
        </>
      ) : null}
    </>
  );
};

export default MyStory;
