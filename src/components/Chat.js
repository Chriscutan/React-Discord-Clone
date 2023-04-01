import {
  AddCircle,
  CardGiftcard,
  EmojiEmotions,
  Gif,
} from "@mui/icons-material";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectChannelId, selectChannelName } from "../features/appSlice";
import { selectUser } from "../features/userSlice";
import { db } from "../firebase";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import FlipMove from "react-flip-move";

function Chat() {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, `channels/${channelId}/messages`),
      orderBy("timestamp", "desc")
    );

    onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, [channelId]);

  const sendMessage = (e) => {
    e.preventDefault();

    addDoc(collection(db, `channels/${channelId}/messages`), {
      message: input,
      user: user,
      timestamp: serverTimestamp(),
    });

    setInput("");
  };
  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />

      <div className="chat__messages">
        <FlipMove>
          {messages?.map((message) => (
            <Message
              key={message.id}
              timestamp={message.data.timestamp}
              user={message.data.user}
              message={message.data.message}
            />
          ))}
        </FlipMove>
      </div>

      <div className="chat__input">
        <AddCircle fontSize="large" />
        <form>
          <input
            disabled={!channelId}
            placeholder={`Message #{${channelName}}`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="chat__inputButton"
            onClick={sendMessage}
          >
            Send Message
          </button>
        </form>

        <div className="chat__inputIcons">
          <CardGiftcard fontSize="large" />
          <Gif fontSize="large" />
          <EmojiEmotions fontSize="large" />
        </div>
      </div>
    </div>
  );
}

export default Chat;
