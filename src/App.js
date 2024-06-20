
import './App.css';
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import {Container} from 'react-bootstrap';
import PrivateRoute from './components/PrivateRoute';
import 'react-toastify/dist/ReactToastify.css'
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SingleStory from './pages/SingleStory';
import MyStory from './pages/MyStory';
import SavedStories from './pages/SavedStories';


function App() {
  const Layout = () => {
    return (
      <>
      
        <Header />
        <Container className='my-2'>
          <Outlet />
        </Container>
        
        
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path:"/singleStory/:id",
          element:<SingleStory/>,
        },
        {
          path:"/myStories",
          element:<MyStory/>
        },
        {
          path:"/savedStories",
          element:<SavedStories/>
        },
      ],
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
  return (
    <div className="App">
    <div className="container">
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar/>
    </div>
  </div>
  );
}

export default App;
