import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBTypography,
} from "mdb-react-ui-kit";
import axios from "axios";

export default function ChatRoom() {
  const [userProfile, setUserProfile] = useState({
    name: "Loading...",
    description: "Loading...",
    image: "placeholder-image-url",
  });
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);

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

    const fetchContacts = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get("/api/Chats", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setContacts(response.data.$values);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchUserProfile();
    fetchContacts();
  }, []);

  useEffect(() => {
    if (contacts.length > 0) {
      setSelectedUserId(contacts[0].userId); 
      fetchMessages(contacts[0].userId);
    }
  }, [contacts]);

  const fetchMessages = async (userId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(`/api/Chats/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setMessages(response.data.$values);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage || !selectedUserId) return;

    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.post(`/api/Chats/${selectedUserId}`, { message: newMessage }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setMessages(prevMessages => [
        ...prevMessages,
        {
          text: newMessage,
          isUser: true,
          avatarUrl: userProfile.image,
          time: "Just now",
        }
      ]);

      setNewMessage("");
      // fetchMessages(selectedUserId);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <MDBContainer fluid className="py-5">
      <MDBRow>
        <MDBCol md="12">
          <MDBCard id="chat3" style={{ borderRadius: "15px" }}>
            <MDBCardBody>
              <MDBRow>
                <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
                  <div className="p-3">
                    <MDBTypography listUnStyled className="mb-0">
                      {contacts.map((contact) => (
                        <li className="p-2 border-bottom" key={contact.name} onClick={() => fetchMessages(contact.userId)}>
                          <a
                            href="#!"
                            className="d-flex justify-content-between"
                          >
                            <div className="d-flex flex-row">
                              <div>
                                <img
                                  src={contact.avatarUrl}
                                  alt="avatar"
                                  className="d-flex align-self-center me-3 rounded-circle object-fit-cover"
                                  width="60"
                                  height="60"
                                />
                                <span
                                  className={`badge ${contact.statusColor} badge-dot`}
                                ></span>
                              </div>
                              <div className="pt-1">
                                <p className="fw-bold mb-0">{contact.name}</p>
                                <p className="small text-muted">
                                  {contact.message}
                                </p>
                              </div>
                            </div>
                            <div className="pt-1">
                              <p className="small text-muted mb-1">
                                {contact.timestamp}
                              </p>
                              {contact.unread === 0 ? "" : 
                              <span className="badge bg-danger rounded-pill float-end">
                                {contact.unread}
                              </span>}
                            </div>
                          </a>
                        </li>
                      ))}
                    </MDBTypography>
                  </div>
                </MDBCol>
                <MDBCol md="6" lg="7" xl="8">
                  {messages.map((message) => (
                    <div
                      className={`d-flex flex-row pt-3 ${
                        message.isUser
                          ? "justify-content-end"
                          : "justify-content-start"
                      }`}
                      key={message.text}
                    >
                      {!message.isUser && (
                        <img
                          src={message.avatarUrl}
                          alt="avatar"
                          style={{ width: "45px", height: "45px", borderRadius: "50%", objectFit: "cover"}}
                        />
                      )}
                      <div>
                        <p
                          className={`small p-2 ${
                            message.isUser ? "me-3" : "ms-3"
                          } mb-1 ${
                            message.isUser
                              ? "text-white rounded-3 bg-primary"
                              : "rounded-3"
                          }`}
                          style={{
                            backgroundColor: message.isUser ? "" : "#f5f6f7",
                          }}
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
                  ))}
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
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
