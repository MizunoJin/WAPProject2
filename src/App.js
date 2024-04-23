import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Profile from "./components/pages/Profile";
import Header from "./components/shared/Header";
import Container from 'react-bootstrap/Container';
import Like from "./components/pages/Like/Like";
import ChatRoom from "./components/pages/ChatRoom";
import NotFound from "./components/pages/NotFound";
import Footer from "./components/shared/Footer";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setUserProfile, clearUserProfile } from './actions/userActions';

const fetchUserProfile = async (dispatch) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      dispatch(clearUserProfile());
      return false;
    }

    const response = await axios.get('/api/UserProfiles', {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (response.status === 200) {
      dispatch(setUserProfile(response.data));
      return true;
    } else {
      dispatch(clearUserProfile());
      return false;
    }
  } catch (error) {
    console.error("Authentication check failed:", error);
    dispatch(clearUserProfile());
    return false;
  }
};

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await fetchUserProfile(dispatch);
      setIsAuth(authenticated);
    };

    checkAuth();
  }, [dispatch]);

  if (isAuth === null) {
    return <div>Loading...</div>;
  }

  return isAuth ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await fetchUserProfile(dispatch);
      setIsAuth(authenticated);
    };

    checkAuth();
  }, [dispatch]);

  if (isAuth === null) {
    return <div>Loading...</div>;
  }

  return !isAuth ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/like" element={<PrivateRoute><Like /></PrivateRoute>} />
          <Route path="/chat" element={<PrivateRoute><ChatRoom /></PrivateRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
