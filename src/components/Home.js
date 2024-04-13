import React from 'react';

function Home() {
  // ここではサンプルデータを使用していますが、実際のアプリケーションではAPIからユーザーデータを取得するでしょう。
  const userProfile = {
    name: 'User Name',
    description: 'User description here...',
    image: 'path_to_image' // ユーザーの画像パス
  };

  const handleDislike = () => {
    console.log('Disliked!');
    // Dislike 処理をここに実装
  };

  const handleLike = () => {
    console.log('Liked!');
    // Like 処理をここに実装
  };

  return (
    <div className="container py-5">
      <header className="text-center mb-4">
        <h1>Tender</h1>
      </header>
      <div className="card mx-auto" style={{ maxWidth: '540px' }}>
        <div className="row g-0">
          <div className="col-md-4 d-flex align-items-center justify-content-center">
            <img src={userProfile.image} className="img-fluid rounded-start" alt="User" />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{userProfile.name}</h5>
              <p className="card-text">{userProfile.description}</p>
              <div className="d-flex justify-content-between">
                <button onClick={handleDislike} className="btn btn-outline-danger">Dislike</button>
                <button onClick={handleLike} className="btn btn-outline-success">Like</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
