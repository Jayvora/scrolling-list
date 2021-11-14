import React from "react";
import { useHistory } from "react-router";
import Button from "../../Shared/Button";
import s from "./Header.module.scss";
import logo from "../../logo.svg";
import { useDispatch } from "react-redux";
import { loginActions } from "../../store/login";

const Header = ({ title, showLogout = false }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogout = () => {
    dispatch(loginActions.reset());
    history.push("/login");
  };

  return (
    <React.Fragment>
      <div className={s.wrapper}>
        <div className={s.title}>
          <img src={logo} alt="" />
          <span>{title}</span>
        </div>
        {showLogout && <Button onClick={onLogout}>Logout</Button>}
      </div>
    </React.Fragment>
  );
};

export default Header;
