import React from "react";
import { ChatContext } from "./index.js";

function ChatLogin() {
  const chatData = React.useContext(ChatContext);
  const userInput = React.useRef();
  const [error, setError] = React.useState(false);
  const login = (e) => {
    if (e.type === "keyup" && e.key !== "Enter") {
      return;
    }
    setError(false);
    chatData.login(userInput.current.value).catch(() => setError(true));
  };
  const logoutChat = () => chatData.logoutChat();

  if (chatData.user.display_name === null) {
    return (
      <div id="login">
        <div>
          DisplayName:&nbsp;
          <input type="text" ref={userInput} onKeyUp={login} autoFocus />
          &nbsp;
          <button onClick={login}>Login</button>
          {error && <>&nbsp;Login error, please try again.</>}
        </div>
      </div>
    );
  } else {
    return (
      <div id="login">
        <div>
          Username: <b>{chatData.user.display_name}</b>&nbsp;
          <button onClick={logoutChat}>Logout</button>
        </div>
      </div>
    );
  }
}

export default ChatLogin;
