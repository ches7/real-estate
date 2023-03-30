import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useEffect } from "react";
import { AuthContext } from "../utils/AuthContext";
import NotFound from "../NotFound";
import React from "react";
import Flash from "../components/Flash.js";
import styles from "../styles/ChangePassword.module.css";

const ChangePassword = () => {

  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [active, setActive] = useState(false);
  const [type, setType] = useState("default");
  const [width, setWidth] = useState("default");
  const [position, setPosition] = useState("default");
  const [timer, setTimer] = useState(2000);
  const message = useRef("");

  const { user, dispatch } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      message.current = 'passwords do not match';
      setType('error')
      handleShowFlash();
      return;
    };
    const id = user.id;
    const response = await axios({
      data: { id, oldPassword, newPassword },
      method: 'patch',
      url: '/api/changepassword',
    })
      .catch(err => {
        message.current = err.response.data.message;
        setType('error')
        handleShowFlash();
      });

    if (!response) return;
    message.current = response.data;
    setType('success');
    handleShowFlash();
    const res2 = await axios.get(`/api/users/${user.id}`);
    dispatch({ type: "REFRESH", payload: res2.data });
    setTimeout(() => {navigate(`/account`);}, 2000)
  };

  const hideFlash = () => {
    setActive(false);
  };

  const handleShowFlash = () => {
    hideFlash();
    if (message) {
      setActive(true);
      window.setTimeout(hideFlash, timer);
    }
  };

  if (!user) return <NotFound />;
  return (
    <div className="d-flex justify-content-center">
    <div className="d-flex flex-column">
        <h1 className="mt-3">Change password</h1>
        <p>
          <Link to="/account">Back to your account </Link>
        </p>
      <form onSubmit={handleSubmit} className="d-flex flex-column">
        <label htmlFor="old-password">Old Password</label>
        <input
          type="text"
          name="old-password"
          required
          onChange={(e) => { setOldPassword(e.target.value); }}
          className="mb-3"
        ></input>

        <label htmlFor="new-password">New Password</label>
        <input
          type="text"
          name="new-password"
          required
          onChange={(e) => { setNewPassword(e.target.value); }}
          className="mb-3"
        ></input>

        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          type="text"
          name="confirm-password"
          required
          onChange={(e) => { setConfirmPassword(e.target.value); }}
          className="mb-3"
        ></input>
          <button type="submit" className="btn btn-dark">
            Change password
          </button>
      </form>
      </div>
      {active && (
        <Flash
          type={type}
          message={message.current}
          duration={3000}
          active={active}
          setActive={setActive}
          position={"bcenter"}
          width={"default"}
        />
      )}
      </div>
  );
};

export default ChangePassword;