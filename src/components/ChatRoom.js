import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBTypography,
  MDBInputGroup,
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
      const fetchMessages = async () => {
        try {
          const accessToken = localStorage.getItem("accessToken");
          const response = await axios.get(
            `/api/Chats/${contacts[0].userId}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          setMessages(response.data.$values);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };
      fetchMessages();
    }
  }, [contacts]);

  return (
    <MDBContainer fluid className="py-5">
      <MDBRow>
        <MDBCol md="12">
          <MDBCard id="chat3" style={{ borderRadius: "15px" }}>
            <MDBCardBody>
              <MDBRow>
                <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
                  <div className="p-3">
                    <MDBInputGroup className="rounded mb-3">
                      <input
                        className="form-control rounded"
                        placeholder="Search"
                        type="search"
                      />
                      <span
                        className="input-group-text border-0"
                        id="search-addon"
                      >
                        <MDBIcon fas icon="search" />
                      </span>
                    </MDBInputGroup>

                    <MDBTypography listUnStyled className="mb-0">
                      {contacts.map((contact) => (
                        <li className="p-2 border-bottom" key={contact.name}>
                          <a
                            href="#!"
                            className="d-flex justify-content-between"
                          >
                            <div className="d-flex flex-row">
                              <div>
                                <img
                                  src={contact.avatarUrl}
                                  alt="avatar"
                                  className="d-flex align-self-center me-3"
                                  width="60"
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
                              <span className="badge bg-danger rounded-pill float-end">
                                {contact.unread}
                              </span>
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
                      className={`d-flex flex-row ${
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
                          style={{ width: "45px", height: "100%" }}
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
                          src={message.avatarUrl}
                          alt="avatar"
                          style={{ width: "45px", height: "100%" }}
                        />
                      )}
                    </div>
                  ))}
                  <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                    <img
                      src={userProfile.image}
                      alt="avatar 3"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                      }}
                    />
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="exampleFormControlInput2"
                      placeholder="Type message"
                    />
                    <a className="ms-1 text-muted" href="#!">
                      <MDBIcon fas icon="paperclip" />
                    </a>
                    <a className="ms-3 text-muted" href="#!">
                      <MDBIcon fas icon="smile" />
                    </a>
                    <a className="ms-3" href="#!">
                      <MDBIcon fas icon="paper-plane" />
                    </a>
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
