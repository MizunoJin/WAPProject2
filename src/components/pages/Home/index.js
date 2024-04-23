import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { axiosClient } from "../../../axiosClient";
import { Alert } from "react-bootstrap";
import { useSwipeable } from "react-swipeable";
import { useSpring, animated } from '@react-spring/web';

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

  const [props, set] = useSpring(() => ({ x: 0, opacity: 1, config: { tension: 400 } }));

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

      set({
        x: actionType === 'like' ? 200 : -200,
        opacity: 0,
        onRest: () => {
          setCurrentIndex(currentIndex + 1);
          set({ x: 0, opacity: 1 });
        }
      });
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleAction('dislike'),
    onSwipedRight: () => handleAction('like'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  if (loading) {
    return <div className="d-flex justify-content-center mt-5">Loading...</div>;
  }

  return (
    <div className="d-flex justify-content-center mt-5">
      {error && <Alert className="mb-4 mx-5 w-100" variant="danger">{error}</Alert>}
      {currentIndex < userProfiles.length ? (
        <animated.div {...handlers} style={{ ...props, width: "36rem", touchAction: 'none' }}>
          <Card>
            <Card.Img variant="top" src={userProfiles[currentIndex].imageUrl} />
            <Card.Body>
              <Card.Title>{userProfiles[currentIndex].name} ({userProfiles[currentIndex].location})</Card.Title>
              <Card.Text>
                {userProfiles[currentIndex].detail}
              </Card.Text>
              <div className="d-flex justify-content-between">
                <Button variant="danger" onClick={() => handleAction('dislike')}>Dislike</Button>
                <Button variant="success" onClick={() => handleAction('like')}>Like</Button>
              </div>
            </Card.Body>
          </Card>
        </animated.div>
      ) : (
        <div>No more profiles available.</div>
      )}
    </div>
  );
}

export default Home;
