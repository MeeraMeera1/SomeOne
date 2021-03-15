import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../../store/session";
import { ShowModal, HideModal } from "../../store/modal";

import "./LoginModal.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const modalDisplay = useSelector((state) => state.modal.display);

  const [errors, setErrors] = useState([]);
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    dispatch(login(displayName, password)).then((errors) => {
      setErrors(errors);
    });
  };

  const updateDisplayName = (e) => {
    setDisplayName(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <button onClick={() => dispatch(ShowModal())}>Log In</button>
      {modalDisplay ? (
        <div className="modal-background" onClick={() => dispatch(HideModal())}>
          <form onSubmit={onLogin} onClick={(e) => e.stopPropagation()}>
            <div>
              {errors.map((error, idx) => (
                <div key={idx}>{error}</div>
              ))}
            </div>
            <div>
              <label htmlFor="email">Display Name</label>
              <input
                name="displayName"
                type="text"
                placeholder="Who are you"
                value={displayName}
                onChange={updateDisplayName}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={updatePassword}
              />
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
};

export default LoginForm;

