import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.module.css";

export default function Login() {
  const baseAPI =
    "https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production";
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const navi = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      window.location.replace("/todo");
    }
  }, []);

  async function onClickLogin() {
    await axios
      .post(
        baseAPI + `/auth/signin`,
        {
          email: inputEmail,
          password: inputPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((Response) => {
        window.localStorage.setItem("access_token", Response.data.access_token);
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
            onChange={(email) => setInputEmail(email.currentTarget.value)}
          ></input>
          <input
            type="password"
            placeholder="Password"
            onChange={(password) =>
              setInputPassword(password.currentTarget.value)
            }
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
