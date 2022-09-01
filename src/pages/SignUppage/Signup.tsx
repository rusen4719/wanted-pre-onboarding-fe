import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postUser } from "../../services/axios.service";
import "./Signup.module.css";

export default function Signup() {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const navi = useNavigate();
  const validate = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return regex.test(inputEmail) && inputPassword.length >= 8;
  };

  function BackToLogin() {
    navi("/", { replace: true });
  }

  function SignUp() {
    postUser({
      email: inputEmail,
      password: inputPassword,
    }).then(() => navi("/"));
  }
  function onChangeInputEmail(event: ChangeEvent<HTMLInputElement>) {
    setInputEmail(event.currentTarget.value);
  }
  function onChangeInputPassword(event: ChangeEvent<HTMLInputElement>) {
    setInputPassword(event.currentTarget.value);
  }

  return (
    <div className="wrap">
      <button className="backToLogin" onClick={BackToLogin}>
        뒤로가기
      </button>
      <div className="signupMainFrame">
        <div className="idpw">
          <p>이메일</p>
          <input
            type="email"
            placeholder="Email"
            onChange={onChangeInputEmail}
          ></input>
          <p>비밀번호</p>
          <input
            type="password"
            placeholder="Password"
            onChange={onChangeInputPassword}
          ></input>
        </div>
        <button
          type="button"
          className="signup"
          disabled={!validate()}
          onClick={SignUp}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}
