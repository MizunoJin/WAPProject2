import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Header from "./components/Header";
import Container from 'react-bootstrap/Container';

const isAuthenticated = () => {
  return !!localStorage.getItem('accessToken');
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/login" element={!isAuthenticated() ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!isAuthenticated() ? <Signup /> : <Navigate to="/" />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
