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
import { useStore } from 'react-redux'
import Contact from "../../ui-parts/Contact";
import Message from "../../ui-parts/Message";
import MessageInput from "../../ui-parts/MessageInput";

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
  const store = useStore();

  useEffect(() => {
    const userProfile = store.getState().user.userProfile;
    setUserProfile({
      name: userProfile.name,
      description: userProfile.detail,
      image: userProfile.imageUrl,
      location: userProfile.location
    });
  }, [store]);

  useEffect(() => {
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
                        <Contact contact={contact} onContactClick={fetchMessages} />
                      ))}
                    </MDBTypography>
                  </div>
                </MDBCol>
                <MDBCol md="6" lg="7" xl="8">
                  {messages.map((message) => (
                    <Message message={message} />
                  ))}
                  <MessageInput userProfile={userProfile} newMessage={newMessage} setNewMessage={setNewMessage} sendMessage={sendMessage} />
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
