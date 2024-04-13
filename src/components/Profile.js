import React from 'react';

function Profile() {
  // ここではサンプルデータを使用していますが、実際のアプリケーションではAPIからユーザーデータを取得するでしょう。
  const userProfile = {
    name: 'User Name',
    description: 'User description here...',
    image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh6XGT5Hz9MpAiyfTHlBczavuUjyTBza9zWdzYmoifglj0p1lsylcTEScnpSa-Youh7YXw-ssgO-mMQmw-DBz4NeesioQPTe8beOH_QS-A4JMnfZAGP-01gxPQrS-pPEnrnJxbdVnWguhCC/s1600/pose_pien_uruuru_woman.png'
  };

  const handleSave = () => {
    console.log('save!');
    // Save 処理をここに実装
  };

  return (
    <div className="container py-5">
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
                <button onClick={handleSave} className="btn btn-outline-success">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
