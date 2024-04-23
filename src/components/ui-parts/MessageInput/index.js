import React from 'react';

function MessageInput({ userProfile, newMessage, setNewMessage, sendMessage }) {
  return (
    <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
      <img
        src={userProfile.image}
        alt="avatar 3"
        style={{
          width: "45px",
          height: "45px",
          borderRadius: "50%",
          objectFit: "cover",
          marginRight: "10px",
        }}
      />
      <input
        type="text"
        className="form-control form-control-lg"
        id="exampleFormControlInput2"
        placeholder="Type message"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button className="btn btn-primary btn-lg ms-3" onClick={sendMessage}>Send</button>
    </div>
  );
}

export default MessageInput;
