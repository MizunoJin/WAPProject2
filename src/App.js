import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Profile from "./components/pages/Profile";
import Header from "./components/shared/Header";
import Container from "react-bootstrap/Container";
import Like from "./components/pages/Like";
import ChatRoom from "./components/pages/ChatRoom";
import NotFound from "./components/pages/NotFound";
import Footer from "./components/shared/Footer";
import { useDispatch } from "react-redux";
import {
  setUserProfile,
  clearUserProfile,
  setAuthState,
} from "./actions/userActions";
import { axiosClient } from "./axiosClient";
import { ErrorBoundary } from "./ErrorBoundary";

const fetchUserProfile = async (dispatch) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      dispatch(clearUserProfile());
      dispatch(setAuthState(false));
      return false;
    }

    const response = await axiosClient.get("/api/UserProfiles");

    if (response.status === 200) {
      dispatch(setUserProfile(response.data));
      dispatch(setAuthState(true));
      return true;
    } else {
      dispatch(clearUserProfile());
      dispatch(setAuthState(false));
      return false;
    }
  } catch (error) {
    console.error("Authentication check failed:", error);
    dispatch(clearUserProfile());
    dispatch(setAuthState(false));
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
      <ErrorBoundary>
        <Container>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/like"
              element={
                <PrivateRoute>
                  <Like />
                </PrivateRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <PrivateRoute>
                  <ChatRoom />
                </PrivateRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </ErrorBoundary>
      <Footer />
    </Router>
  );
}

export default App;
