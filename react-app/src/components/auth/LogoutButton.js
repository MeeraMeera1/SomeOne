import React from "react";
import { useDispatch } from "react-redux";

import { logout } from "../../store/session";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const onLogout = () => dispatch(logout());

  return (
    <button
      className="text-white border-none bg-transparent rounded-lg hover:bg-white text-dblue"
      onClick={onLogout}
    >
      Logout
    </button>
  );
};

export default LogoutButton;

