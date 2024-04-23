import React from "react";

function Message({ message }) {
  return (
    <div
      className={`d-flex flex-row pt-3 ${
        message.isUser ? "justify-content-end" : "justify-content-start"
      }`}
      key={message.text}
    >
      {!message.isUser && (
        <img
          src={message.avatarUrl}
          alt="avatar"
          style={{
            width: "45px",
            height: "45px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      )}
      <div>
        <p
          className={`small p-2 ${message.isUser ? "me-3" : "ms-3"} mb-1 ${
            message.isUser ? "text-white rounded-3 bg-primary" : "rounded-3"
          }`}
          style={{ backgroundColor: message.isUser ? "" : "#f5f6f7" }}
        >
          {message.text}
        </p>
        <p
          className={`small ${
            message.isUser ? "me-3" : "ms-3"
          } mb-3 rounded-3 text-muted`}
        >
          {message.time}
        </p>
      </div>
      {message.isUser && (
        <img
          className="rounded-circle object-fit-cover"
          src={message.avatarUrl}
          alt="avatar"
          style={{ width: "45px", height: "45px" }}
        />
      )}
    </div>
  );
}

export default Message;
