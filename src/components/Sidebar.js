import {
  Add,
  Call,
  ExpandMore,
  Headphones,
  InfoOutlined,
  Mic,
  Settings,
  SignalCellularAlt,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import { addDoc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { auth, channelsRef } from "../firebase";
import "./Sidebar.css";
import SidebarChannel from "./SidebarChannel";

function Sidebar() {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    onSnapshot(channelsRef, (snapshot) => {
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          channel: doc.data(),
        }))
      );
    });
  }, []);

  const addChannel = () => {
    const channelName = prompt("Please enter a channel name");

    if (channelName) {
      addDoc(channelsRef, {
        channelName: channelName,
      });
    }
  };
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h3>Clever Programmer</h3>
        <ExpandMore />
      </div>

      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <ExpandMore />
            <h4>Text Channel</h4>
          </div>
          <Add onClick={addChannel} className="sidebar__addChannel" />
        </div>
        <div className="sidebar__channelsList">
          {channels?.map(({ id, channel }) => (
            <SidebarChannel
              key={id}
              id={id}
              channelName={channel.channelName}
            />
          ))}
        </div>
      </div>

      <div className="sidebar__voice">
        <SignalCellularAlt className="sidebar__voiceIcon" fontSize="large" />
        <div className="sidebar__voiceInfo">
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>
        <div className="sidebar__voiceIcons">
          <InfoOutlined />
          <Call />
        </div>
      </div>

      <div className="sidebar__profile">
        <IconButton onClick={() => auth.signOut()}>
          <Avatar src={user.photo} />
        </IconButton>

        <div className="sidebar__profileInfo">
          <h3>{user.displayName}</h3>
          <p>#{user.uid.substring(0, 5)}</p>
        </div>

        <div className="sidebar__profileIcons">
          <Mic />
          <Headphones />
          <Settings />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
