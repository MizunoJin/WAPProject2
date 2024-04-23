import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useStore } from 'react-redux'

function Profile() {
  const store = useStore();
  const [userProfile, setUserProfile] = useState({
    name: "Loading...",
    description: "Loading...",
    image: "placeholder-image-url",
    location: null
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const fileInputRef = React.createRef();

  useEffect(() => {
    const userProfile = store.getState().user.userProfile;
    setUserProfile({
      name: userProfile.name,
      description: userProfile.detail,
      image: userProfile.imageUrl,
      location: userProfile.location
    });
  }, [store]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUserProfile({
        ...userProfile,
        image: URL.createObjectURL(selectedFile)
      });
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleSave = async () => {
    setMessage(""); // Clear any previous messages
    if (!userProfile.name || !userProfile.description || !userProfile.location) {
      setError("Please fill out all fields.");
      return;
    }
    setError(""); // Clear any previous errors
    console.log("Saving data...");
    const accessToken = localStorage.getItem("accessToken");
    const formData = new FormData();
    formData.append('name', userProfile.name);
    formData.append('description', userProfile.description);
    formData.append('location', userProfile.location);
    if (file) {
      formData.append('image', file);
    }

    try {
      const response = await axios.put("/api/UserProfiles", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage("Data saved successfully.");
      console.log("Data saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving user data:", error);
      setError("Error saving data.");
    }
  };

  return (
    <div className="container py-5">
      <Form>
        <div className="col-md-4 d-flex align-items-center justify-content-center mx-auto ">
          <img
            src={userProfile.image}
            className="img-fluid rounded-start mx-auto d-block"
            alt="User"
            style={{ cursor: 'pointer' }}
            onClick={handleImageClick}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={userProfile.name}
            onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Describe yourself"
            value={userProfile.description}
            onChange={(e) => setUserProfile({...userProfile, description: e.target.value})}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your location"
            value={userProfile.location}
            onChange={(e) => setUserProfile({...userProfile, location: e.target.value})}
          />
          {userProfile.location ? <div className="mt-3">
              <div className="rounded-2 overflow-hidden"><div className="gmap_canvas"><iframe width="100%" height="320" id="gmap_canvas" src={`https://maps.google.com/maps?q=${userProfile.location}&t=&z=13&ie=UTF8&iwloc=&output=embed`} frameborder="0" scrolling="no" marginheight="0" marginwidth="0" title=""></iframe></div></div>
          </div> : null}
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="info">{message}</Alert>}
        <Button variant="primary" onClick={handleSave}>Save</Button>
      </Form>
    </div>
  );
}

export default Profile;
