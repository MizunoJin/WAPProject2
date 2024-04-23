import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Like() {
  const [userProfiles, setUserProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get('/api/Swipes',{
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUserProfiles(response.data);
        setLoading(false);
      } catch (error) {
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
        const accessToken = localStorage.getItem("accessToken");
        await axios.post(`/api/Swipes/${userId}`, { action: actionType }, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(`${actionType} on user with ID ${userId}`);
      } catch (error) {
        console.error(`Error on ${actionType}:`, error);
      }
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleDecline = () => {
    handleAction('decline');
  };

  const handleAccept = () => {
    handleAction('accept');
  };

  if (loading) {
    return <div className="d-flex justify-content-center mt-5">Loading...</div>;
  }

  return (
    <div className="d-flex justify-content-center mt-5">
      {currentIndex < userProfiles.length ? (
        <Card style={{ width: "36rem" }}>
          <Card.Img variant="top" src={userProfiles[currentIndex].imageUrl} />
          <Card.Body>
            <Card.Title>{userProfiles[currentIndex].name} ({userProfiles[currentIndex].location})</Card.Title>
            <Card.Text>
              {userProfiles[currentIndex].detail}
            </Card.Text>
            <div className="d-flex justify-content-between">
              <Button variant="danger" onClick={handleDecline}>Decline</Button>
              <Button variant="success" onClick={handleAccept}>Accept</Button>
            </div>
          </Card.Body>
        </Card>
      ) : (
        <div>No more profiles available.</div>
      )}
    </div>
  );
}

export default Like;
