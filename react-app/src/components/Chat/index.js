import React from "react";
import Conversations from "@twilio/conversations";
import ChatLogin from "./ChatLogin";
import ChatRooms from "./ChatRooms";
import ChatLog from "./ChatLog";
import ChatInput from "./ChatInput";
// import Logo from "../../assets2/logo.svg"
import "./index.css";

export const ChatContext = React.createContext();

function Chat() {
  const [user, setUser] = React.useState({
    api: null,
    username: null,
    chatrooms: [],
  });
  const [selectedChatroom, setSelectedChatroom] = React.useState(null);

  const chatData = {
    user: user,
    selectedChatroom: selectedChatroom,

    login: (_username) => {
      document.body.style.cursor = "progress";
      return fetch("/chatlogin", {
        method: "POST",
        body: JSON.stringify({ display_name: _username }),
      })
        .then((res) => res.json())
        .then((data) => {
          Conversations.create(data.token).then((client) => {
            document.body.style.cursor = "default";
            setUser({
              api: client,
              display_name: _username,
              chatrooms: data.chatrooms,
            });
          });
        })
        .catch((error) => {
          document.body.style.cursor = "default";
          throw error;
        });
    },

    logoutChat: () => {
      setUser({ api: null, display_name: null, chatrooms: [] });
      setSelectedChatroom(null);
    },

    selectChatroom: (sid) => {
      user.api.getConversationBySid(sid).then((conv) => {
        setSelectedChatroom(conv);
      });
    },
  };

  return (
    <div className="App">
      <ChatContext.Provider value={chatData}>
          <ChatLogin />
        {chatData.user.display_name !== null && (
          <div id="chat">
            <ChatRooms />
            <ChatLog />
            <ChatInput />
          </div>
        )}
      </ChatContext.Provider>
    </div>
  );
}

export default Chat;
