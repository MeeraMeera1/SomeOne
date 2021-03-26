import React from "react";
import { useHistory } from "react-router-dom";
import { ChatContext } from "./index.js";

function ChatLogin() {
  const history = useHistory();
  const chatData = React.useContext(ChatContext);
  const userInput = React.useRef();
  const [error, setError] = React.useState(false);
  const [user, setUser] = React.useState({
    api: null,
    username: null,
    chatrooms: [],
  });
  
  const chatLogin = (e) => {
    if (e.type === "keyup" && e.key !== "Enter") {
      return;
    }
    setError(false);
    chatData.login(userInput.current.value).catch(() => setError(true));
  };
  const logoutChat = () => chatData.logoutChat();

  if (chatData.user.display_name === null) {
    return (
      <div id="chatLogin">
        <div>
          DisplayName:&nbsp;
          <input type="text" ref={userInput} onKeyUp={chatLogin} autoFocus />
          &nbsp;
          <button onClick={chatLogin}>Login</button>
          {error && <>&nbsp;Login error, please try again.</>}
        </div>
      </div>
    );
  } else {
    return (
      <div id="chatLogin">
        <div>
          Username: <b>{chatData.user.display_name}</b>&nbsp;
          <button onClick={logoutChat}>Logout</button>
        </div>
      </div>
    );
  }
}

export default ChatLogin;
