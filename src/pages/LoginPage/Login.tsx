import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken } from "../../services/axios.service";
import "./Login.module.css";

export default function Login() {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const navi = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      window.location.replace("/todo");
    }
  }, []);

  function onChangeEmailInput(event: ChangeEvent<HTMLInputElement>) {
    setInputEmail(event.currentTarget.value);
  }
  function onChangePasswordInput(event: ChangeEvent<HTMLInputElement>) {
    setInputPassword(event.currentTarget.value);
  }

  function onClickLogin() {
    getToken({
      email: inputEmail,
      password: inputPassword,
    }).then((Response) => {
      window.localStorage.setItem("access_token", Response);
      navi("/todo", { replace: true });
    });
  }

  return (
    <div className="wrap">
      <div className="loginMainFrame">
        <div className="idpw">
          <input
            type="email"
            placeholder="Email"
            onChange={onChangeEmailInput}
          ></input>
          <input
            type="password"
            placeholder="Password"
            onChange={onChangePasswordInput}
          ></input>
          <p>
            {" "}
            <Link to={"./signup"}>회원가입</Link>
          </p>
        </div>
        <button className="login" onClick={onClickLogin}>
          로그인
        </button>
      </div>
    </div>
  );
}
