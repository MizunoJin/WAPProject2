import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Home() {
  // ここではサンプルデータを使用していますが、実際のアプリケーションではAPIからユーザーデータを取得するでしょう。
  const userProfile = {
    name: "User Name",
    description: "User description here...",
    image:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh6XGT5Hz9MpAiyfTHlBczavuUjyTBza9zWdzYmoifglj0p1lsylcTEScnpSa-Youh7YXw-ssgO-mMQmw-DBz4NeesioQPTe8beOH_QS-A4JMnfZAGP-01gxPQrS-pPEnrnJxbdVnWguhCC/s1600/pose_pien_uruuru_woman.png",
  };

  const handleDislike = () => {
    console.log("Disliked!");
    // Dislike 処理をここに実装
  };

  const handleLike = () => {
    console.log("Liked!");
    // Like 処理をここに実装
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={userProfile.image} />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default Home;
