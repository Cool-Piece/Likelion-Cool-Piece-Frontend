import logos from "../assets/image/coolpiece_logo.png";
import "regenerator-runtime";
import "../scss/styles.scss";
import { BASE_URL } from './api';
import { COOKIE_EXPIRES_TIME } from './constant';
import Auth from './auth';

const logoBox = document.querySelector(".title");
logoBox.src = logos;

const sendToken = async () => {
  // TODO: 배포용 서버로 fetch 바꿔주기!
  const tokenRequest = await fetch(
    "http://localhost:5000/users/github/callback",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: new URL(window.location.href).searchParams.get("code"),
      }),
    }
  );

  const result = await tokenRequest.json();
  if (result.access_token) {
    Auth.setToken(result.access_token);
    window.location.href =
      "http://127.0.0.1:5500/Likelion-Cool-Piece-Frontend/assets/html/index.html";
  }
};

sendToken();
