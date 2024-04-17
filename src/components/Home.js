import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Home() {
  const [userProfiles, setUserProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/Users');
        setUserProfiles(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDislike = () => {
    console.log("Disliked!");
    setCurrentIndex(currentIndex + 1);
  };

  const handleLike = () => {
    console.log("Liked!");
    setCurrentIndex(currentIndex + 1);
  };

  if (loading) {
    return <div className="d-flex justify-content-center mt-5">Loading...</div>;
  }

  return (
    <div className="d-flex justify-content-center mt-5">
      {currentIndex < userProfiles.length ? (
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={userProfiles[currentIndex].imageUrl} />
          <Card.Body>
            <Card.Title>{userProfiles[currentIndex].name}</Card.Title>
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
