import logos from "../assets/image/coolpiece_logo.png";
import "regenerator-runtime";
import "../scss/styles.scss";

const logoBox = document.querySelector(".title");
logoBox.src = logos;

const githubLogin = document.querySelector(".login-github");

const handleGithub = () => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GITHUB_KEY,
    allow_signup: false,
    scope: "read:user user:email",
  };

  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;

  githubLogin.href = finalUrl;
};

//1.github.href =finalUrl // 이것은 유저 정보를 갑자기 화면에 난대 없이 뿌려줌

//2 const response = await fetch("https"2342324 heroku/users/github/start");
//console.log(response," response test: cors")

//githubLogin.href = "../html/index.html";
//return res.redirect(finalUrl);

//// 2.페이지 이동

githubLogin.addEventListener("click", handleGithub);
