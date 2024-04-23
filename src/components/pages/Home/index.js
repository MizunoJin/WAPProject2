import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { axiosClient } from "../../../axiosClient";
import { Alert } from "react-bootstrap";

function Home() {
  const [userProfiles, setUserProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    
    const fetchUsers = async () => {
      try {
        const response = await axiosClient.get('/api/Users');
        setUserProfiles(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleAction = async (actionType) => {
    if (currentIndex < userProfiles.length) {
      try {
        const userId = userProfiles[currentIndex].userId;
        await axiosClient.post(`/api/Swipes/${userId}`, { action: actionType });
        console.log(`${actionType} on user with ID ${userId}`);
      } catch (error) {
        setError(error.message);
        console.error(`Error on ${actionType}:`, error);
      }
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleDislike = () => {
    handleAction('dislike');
  };

  const handleLike = () => {
    handleAction('like');
  };

  if (loading) {
    return <div className="d-flex justify-content-center mt-5">Loading...</div>;
  }

  return (
    <div className="d-flex justify-content-center mt-5">
      {error && <Alert className="mb-4 mx-5 w-100" variant="danger">{error}</Alert>}
      {currentIndex < userProfiles.length ? (
        <Card style={{ width: "36rem" }}>
          <Card.Img variant="top" src={userProfiles[currentIndex].imageUrl} />
          <Card.Body>
            <Card.Title>{userProfiles[currentIndex].name} ({userProfiles[currentIndex].location})</Card.Title>
            <Card.Text>
              {userProfiles[currentIndex].detail}
            </Card.Text>
            <div className="d-flex justify-content-between">
              <Button variant="danger" onClick={handleDislike}>Dislike</Button>
              <Button variant="success" onClick={handleLike}>Like</Button>
            </div>
          </Card.Body>
        </Card>
      ) : (
        <div>No more profiles available.</div>
      )}
    </div>
  );
}

export default Home;
