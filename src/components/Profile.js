import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

function Profile() {
  const [userProfile, setUserProfile] = useState({
    name: "Loading...",
    description: "Loading...",
    image: "placeholder-image-url",
    location: null
  });
  const [file, setFile] = useState(null);
  const fileInputRef = React.createRef();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get("/api/UserProfiles", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUserProfile({
          name: response.data.name,
          description: response.data.detail,
          image: response.data.imageUrl,
          location: response.data.location
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserProfile({
          name: "Error Loading User",
          description: "Could not load user data. Please try again later.",
          image: "error-placeholder-image-url",
        });
      }
    };
    fetchUserProfile();
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUserProfile({
        ...userProfile,
        image: URL.createObjectURL(selectedFile)  // 新しい画像のURLを即座に生成して状態を更新
      });
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleSave = async () => {
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
      console.log("Data saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving user data:", error);
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
            type="name"
            placeholder="name"
            value={userProfile.name}
            onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={userProfile.description}
            onChange={(e) => setUserProfile({...userProfile, description: e.target.value})}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="location"
            placeholder="location"
            value={userProfile.location}
            onChange={(e) => setUserProfile({...userProfile, location: e.target.value})}
          />
          {userProfile.location !== null ? <div className="mt-3">
              <div className="rounded-2 overflow-hidden"><div className="gmap_canvas"><iframe width="100%" height="320" id="gmap_canvas" src={`https://maps.google.com/maps?q=${userProfile.location}&t=&z=13&ie=UTF8&iwloc=&output=embed`} frameborder="0" scrolling="no" marginheight="0" marginwidth="0" title=""></iframe></div></div>
          </div> : null}
        </Form.Group>
        <Button variant="primary" onClick={handleSave}>Save</Button>
      </Form>
    </div>
  );
}

export default Profile;
