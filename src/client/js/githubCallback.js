import logos from "../assets/image/coolpiece_logo.png";
import "regenerator-runtime";
import "../scss/styles.scss";
import { BASE_URL } from './api';
import { COOKIE_EXPIRES_TIME } from './constant';

const logoBox = document.querySelector(".title");
logoBox.src = logos;

const sendToken = async () => {

  const getJwt = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code: new URL(window.location.href).searchParams.get("code"),
    }),
  });

  console.log("result => ", getJwt);

  const test = await getJwt.json();
  console.log(test);

  // const jwt = await result.json().;
  // console.log(jwt, "jwt");

  // if (result) {
  //   window.location.href = "http://127.0.0.1:5500/assets/html/index.html";
  //   document.cookie = `jwt=${result.token}; max-age=${COOKIE_EXPIRES_TIME}; Path=/;`;
  // }
};

sendToken();
