import logos from "../assets/image/coolpiece_logo.png";
import "regenerator-runtime";
import "../scss/styles.scss";

const logoBox = document.querySelector(".title");
logoBox.src = logos;

const githubLogin = document.querySelector(".login-github");

const handleGithub = () => {
  githubLogin.href = "https://coolpiece-git.herokuapp.com/users/github/start";
};

githubLogin.addEventListener("click", handleGithub);
