import { useState, useEffect } from "react";
import { FaSignInAlt, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import StoryItem from "../components/Story/StoryItem";
import CreateStory from "../components/CreateStory";
import GenerateStory from "../components/GenerateStory";
import Pagination from "react-bootstrap/Pagination";
import { getAllStories, getSingleStory } from "../features/story/storySlice";
import Spinner from "../components/Spinner";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { story, isLoading, isError, isSuccess, totalCount } = useSelector(
    (state) => state.story
  );
  const { user } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const [showGenerate, setShowGenerate] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5); // Default perPage
  const [totalPages, setTotalPages] = useState(1);

  const openCreateStoryModal = () => {
    setShowModal(true);
  };

  const closeCreateStoryModal = () => {
    setShowModal(false);
  };

  const openGenerateStory = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setShowGenerate(true);
  };

  const closeGenerateStory = () => {
    setShowGenerate(false);
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
    navigate(`/singleStory/${storyId}`, { state: { storyId: storyId } });
  };

  useEffect(() => {
    dispatch(getAllStories({ page: currentPage, perPage: perPage }));
  }, [dispatch, currentPage, perPage, user]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // getStories(page);
  };

  const handlePerPageChange = (value) => {
    setPerPage(value);
    setCurrentPage(1); // Reset to the first page when changing perPage
    // getStories(1);
  };

  return (
    <>
      {/* {user && (
        <button className="btn" onClick={openCreateStoryModal}>
          <FaPlus /> Create Story
        </button>
      )} */}
      <h1>Leaderboard</h1>
      <button className="btn" onClick={openGenerateStory}>
        <FaPlus /> Generate Story
      </button>

      <CreateStory show={showModal} handleClose={closeCreateStoryModal} />
      <GenerateStory show={showGenerate} handleClose={closeGenerateStory} />

      {isLoading ? (
        <Spinner /> // Display a loading spinner while fetching data
      ) : isError ? (
        <p>Error loading stories</p> // Handle error state
      ) : isSuccess && story ? (
        <>
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

export default Home;
