import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Header from "../../Components/Header/Header";
import Button, { ButtonTypes } from "../../Shared/Button";
import Card from "../../Shared/Card/Card";
import Input from "../../Shared/Input/Input";
import { loginActions } from "../../store/login";
import s from "./Login.module.scss";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onLoginBtn = () => {
    if (validateFields()) {
      history.push("/scrollinglist");
    }
  };

  const validateFields = () => {
    usernameRef.current.validate();
    passwordRef.current.validate();
    return usernameRef.current.validate() && passwordRef.current.validate();
  };

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const state = useSelector((state) => state.login);

  return (
    <React.Fragment>
      <Header title={"Infinite Scrolling List"}></Header>
      <div className={`${s.mainParent}`}>
        <Card className={s.card}>
          <div className={"flexHeightTab"}>
            <div className={`row`}>
              <p className={`headerTitleRequired`}>UserName</p>
              <Input
                ref={usernameRef}
                type={"text"}
                placeholder={"Username"}
                required={true}
                className="maxChildContainer"
                value={state.username}
                onChange={(val) =>
                  dispatch(loginActions.setUsername(val.target.value))
                }
              />
            </div>

            <div className={`row`}>
              <p className={`headerTitleRequired`}>Password</p>
              <Input
                ref={passwordRef}
                type={"password"}
                placeholder={"Password"}
                required={true}
                className="maxChildContainer"
                value={state.password}
                onChange={(val) =>
                  dispatch(loginActions.setPassword(val.target.value))
                }
              />
            </div>
            <Button
              btnTheme={ButtonTypes.primaryHover_btn}
              onClick={onLoginBtn}
            >
              Login
            </Button>
          </div>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default Login;
