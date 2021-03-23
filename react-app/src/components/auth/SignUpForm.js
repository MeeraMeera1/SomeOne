import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../store/session";
import { ShowModal, HideModal } from "../../store/signupModal";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const modalDisplay = useSelector((state) => state.signupModal.display);
  
  const [errors, setErrors] = useState([]);
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
          errors ? setErrors(errors) : dispatch(HideModal());
      });
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

  if (user) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <button onClick={() => dispatch(ShowModal())}>Sign Up</button>
      {modalDisplay ? (
        <div className="modal-background" onClick={() => dispatch(HideModal())}>
          <form onSubmit={onSignUp} onClick={(e) => e.stopPropagation()}>
            <div>
              {errors.map((error) => (
                <div>{error}</div>
              ))}
            </div>
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
        </div>
      ) : null}
    </>
  );
};

export default SignUpForm;
