import { Avatar, Box, Typography, Button, IconButton } from "@mui/material";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useAuth } from "../context/authContext";
import { red } from "@mui/material/colors";
import ChatItem from "../components/chats/ChatItem";
import { IoMdSend } from "react-icons/io";
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from "../helpers/api-communicator";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Message = {
  role: "user" | "assistant";
  content: string;
};
const Chat = () => {
  const auth = useAuth();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
    const chatData = await sendChatRequest(content);

    setChatMessages([...chatData.chats]);
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechat" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Deleted chats successfully", { id: "deletechat" });
    } catch (error) {
      console.log(error);
      toast.error("Error deleting chats", { id: "deletechat" });
    }
  };

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Successfully loaded chats", { id: "loadchats" });
        })
        .catch((error) => {
          toast.error("Error loading chats", { id: "loadchats" });
        });
    }
  }, [auth]);
  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth]);
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "#00ccca",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name[0]}{" "}
            {auth?.user?.name.split(" ")[1]
              ? auth?.user?.name.split(" ")[1]
              : ""}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            Hi {auth?.user?.name}, I am NIX
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
            You can ask questions related to Education, Business, etc. Kindly
            avoid sharing the personal information.
          </Typography>
          <Button
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: 700,
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[300],
              ":hover": {
                bgcolor: red.A400,
              },
            }}
            onClick={handleDeleteChats}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "40px",
            color: "white",
            mb: 2,
          }}
        >
          Nix is using Model GPT 3.5 Turbo
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            scrollBehavior: "smooth",
          }}
        >
          {chatMessages.map((chat, index) => (
            //@ts-ignore
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <div
          style={{
            width: "100%",
            padding: "20px",
            borderRadius: 8,
            backgroundColor: "rgba(17,27,39)",
            display: "flex",
            margin: "auto",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Ask Nix..."
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "10px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
            }}
          />
          <IconButton
            onClick={handleSubmit}
            sx={{ ml: "auto", color: "white" }}
          >
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};
export default Chat;
