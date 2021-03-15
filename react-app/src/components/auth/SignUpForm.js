import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const modalDisplay = useSelector((state) => state.modal.display);

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState();
  const [bio, setBio] = useState();
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      dispatch(signUp(displayName, email, birthday, bio, password)).then(
        (errors) => {
          setErrors(errors);
        }
      );
    }
  };

  const updateDisplayName = (e) => {
    setDisplayName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateBirthday = (e) => {
    setBirthday(e.target.value);
  };

  const updateBio = (e) => {
    setBio(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  return (
    <>
      <button onClick={() => dispatch(ShowModal())}>Log In</button>
      {modalDisplay ? (
        <form onSubmit={onSignUp}>
          <div>
            <label>Display Name</label>
            <input
              type="text"
              name="displayName"
              onChange={updateDisplayName}
              value={displayName}
            ></input>
          </div>
          <div>
            <label>Email</label>
            <input
              type="text"
              name="email"
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div>
            <label>Birthday</label>
            <input
              type="date"
              name="birthday"
              onChange={updateBirthday}
              value={birthday}
            ></input>
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div>
            <label>Bio</label>
            <input
              type="text"
              name="bio"
              onChange={updateBio}
              value={bio}
            ></input>
          </div>
          <div>
            <label>Repeat Password</label>
            <input
              type="password"
              name="repeat_password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <button type="submit">Sign Up</button>
        </form>
      ) : null}
    </>
  );
};

export default SignUpForm;
