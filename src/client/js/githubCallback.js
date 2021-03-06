import "regenerator-runtime";
import "../scss/styles.scss";
import logos from "../assets/image/coolpiece_logo.png";
import { BASE_URL } from './api';
import Auth from './auth';

const logoBox = document.querySelector(".title");
logoBox.src = logos;

const sendToken = async () => {
  const tokenRequest = await fetch(
    `${BASE_URL}/users/github/callback`,
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
    window.location.href = "./index.html";
  }
};

sendToken();
