import { useContext, useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import { db, messaging } from "../../firebase/config";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { getToken, onMessage } from "firebase/messaging";
import { AuthContext } from "../../AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Chat = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const messagesCollection = collection(db, "messages");
    const chatQuery = query(messagesCollection, orderBy("timestamp"));

    const unsubscribe = onSnapshot(chatQuery, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      setMessages(data);
    });

    // Request permission for notifications
    getToken(messaging)
      .then((currentToken) => {
        if (currentToken) {
          console.log("Device token:", currentToken);
          // Save the token to your user's profile or database
        } else {
          console.log("No registration token available.");
        }
      })
      .catch((error) => {
        console.log("Error occurred while requesting permission:", error);
      });

    onMessage(messaging, (payload) => {
      console.log("Received notification:", payload);
      // Display the notification to the user
      const { title, body } = payload.notification;
      new Notification(title, { body });
    });

    return () => unsubscribe();
  }, []);

  const handleSendMessage = async () => {
    const messagesCollection = collection(db, "messages");
    await addDoc(messagesCollection, {
      senderId: userId,
      message: newMessage,
      timestamp: new Date(),
    });

    setNewMessage("");
  };

  const handleClick = () => {
    localStorage.removeItem("user");
    navigate("/");
    logout();
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <Link to="/home">
          <Button>Home</Button>
        </Link>
        <Button variant="contained" onClick={handleClick}>
          Sign Out
        </Button>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Paper
          sx={{
            padding: "10px",
            width: "500px",
            maxHeight: "800px",
            overflowY: "auto",
            scrollbarWidth: "thin",
          }}
          elevation={10}
        >
          <Box>
            <Typography variant="h6" textAlign="center">
              Chat System
            </Typography>
          </Box>
          <Divider />

          <List sx={{ maxHeight: "400px", overflowY: "auto" }}>
            {messages.map((message, index) => (
              <ListItem
                key={index}
                alignItems="flex-start"
                sx={{
                  borderRadius: "10px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                  marginBottom: "10px",
                  padding: "10px",
                  color: "#ffffff",
                  backgroundColor: "#1e88e5",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography>{message.message}</Typography>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    sx={{ alignSelf: "flex-end" }}
                  >
                    {message.timestamp.toDate().toLocaleString()}
                  </Typography>
                </Box>
              </ListItem>
            ))}
          </List>
          <TextField
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            label="New Message"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: "10px" }}
          />
          <Button variant="contained" onClick={handleSendMessage}>
            Send
          </Button>
        </Paper>
      </Box>
    </>
  );
};

export default Chat;
