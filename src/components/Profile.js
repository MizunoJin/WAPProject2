import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";

function Profile() {
  const [userProfile, setUserProfile] = useState({
    name: "Loading...",
    description: "Loading...",
    image: "placeholder-image-url",
  });

  useEffect(() => {
    // ユーザープロフィール情報を取得する関数
    const fetchUserProfile = async () => {
      try {
        // localStorageからアクセストークンを取得
        const accessToken = localStorage.getItem("accessToken");

        // axiosリクエストにトークンをヘッダーとして添付
        const response = await axios.get("/api/UserProfiles", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setUserProfile({
          name: response.data.name,
          description: response.data.detail,
          image: response.data.imageUrl,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        // エラーが発生した場合の処理
        setUserProfile({
          name: "Error Loading User",
          description: "Could not load user data. Please try again later.",
          image: "error-placeholder-image-url",
        });
      }
    };

    fetchUserProfile();
  }, []);

  const handleSave = () => {
    console.log("save!");
    // Save 処理をここに実装
  };

  return (
    <div className="container py-5">
      <Form>
        <div className="col-md-4 d-flex align-items-center justify-content-center mx-auto ">
          <img
            src={userProfile.image}
            className="img-fluid rounded-start mx-auto d-block"
            alt="User"
          />
        </div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="name"
            value={userProfile.name}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={userProfile.description}
          />
        </Form.Group>
      </Form>
    </div>
  );
}

export default Profile;
