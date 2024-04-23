import React from "react";

function Contact({ contact, onContactClick }) {
  return (
    <li
      className="p-2 border-bottom"
      key={contact.name}
      onClick={() => onContactClick(contact.userId)}
    >
      <a href="#!" className="d-flex justify-content-between">
        <div className="d-flex flex-row">
          <div>
            <img
              src={contact.avatarUrl}
              alt="avatar"
              className="d-flex align-self-center me-3 rounded-circle object-fit-cover"
              width="60"
              height="60"
            />
            <span className={`badge ${contact.statusColor} badge-dot`}></span>
          </div>
          <div className="pt-1">
            <p className="fw-bold mb-0">{contact.name}</p>
            <p className="small text-muted">{contact.message}</p>
          </div>
        </div>
        <div className="pt-1">
          <p className="small text-muted mb-1">{contact.timestamp}</p>
          {contact.unread === 0 ? (
            ""
          ) : (
            <span className="badge bg-danger rounded-pill float-end">
              {contact.unread}
            </span>
          )}
        </div>
      </a>
    </li>
  );
}

export default Contact;
