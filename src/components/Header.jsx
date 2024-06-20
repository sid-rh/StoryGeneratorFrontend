import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { NavDropdown, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { logout, reset, resetCredentials } from "../features/auth/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const navigateToMyStories = () => {
    if (user) {
      navigate("/myStories", { state: { userId: user.user._id } });
    }
  };

  const navigateToSavedStories = () => {
    if (user) {
      navigate("/savedStories");
    }
  };

  const onLogout = async () => {
    try {
      dispatch(logout(user));
      dispatch(reset());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">StoryGenerator</Link>
      </div>

      <ul>
        {user ? (
          <>
            <NavDropdown title={user.user.username} id="username">
              <NavDropdown.Item onClick={navigateToMyStories}>
                My Stories
              </NavDropdown.Item>

              <NavDropdown.Item onClick={navigateToSavedStories}>
                Saved Stories
              </NavDropdown.Item>

              <NavDropdown.Item>Logout</NavDropdown.Item>
            </NavDropdown>
            <li>
              <button className="btn" onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt />
                Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser />
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
