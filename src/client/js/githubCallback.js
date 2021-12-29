import logos from "../assets/image/coolpiece_logo.png";
import "regenerator-runtime";
import "../scss/styles.scss";

const logoBox = document.querySelector(".title");
logoBox.src = logos;

const sendToken = async () => {
  // TODO: 배포용 서버로 fetch 바꿔주기!
  const result = await fetch("http://localhost:5000/users/github/callback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code: new URL(window.location.href).searchParams.get("code"),
    }),
  });

  const test = await result.json();
  console.log(test, "Test");

  // TODO:  client에서 쿠키 저장해줄 것!
  /* maxAge: 1d
  if (result.ok) {
    window.location.href = "http://127.0.0.1:5500/assets/html/index.html";
    document.cookie = `jwt=${result.token};`;
  }*/
};

sendToken();
