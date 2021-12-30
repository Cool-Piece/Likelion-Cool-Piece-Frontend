import logos from "../assets/image/coolpiece_logo.png";
import "regenerator-runtime";
import "../scss/styles.scss";

const logoBox = document.querySelector(".title");
logoBox.src = logos;

const githubLogin = document.querySelector(".login-github");

const handleGithub = () => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  console.log(process.env.GITHUB_KEY, "check");
  const config = {
    client_id: process.env.GITHUB_KEY,
    allow_signup: false,
    scope: "read:user user:email",
  };

  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;

  githubLogin.href = finalUrl;
};

githubLogin.addEventListener("click", handleGithub);
