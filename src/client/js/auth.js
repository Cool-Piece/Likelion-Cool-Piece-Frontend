import "regenerator-runtime";
import { BASE_URL } from './api.js';
import {COOKIE_EXPIRES_TIME, JWT_KEY} from './constant.js';


export default class Auth {
  static setToken(jwt, maxAge = COOKIE_EXPIRES_TIME) {
    document.cookie = `${JWT_KEY}=${jwt}; max-age=${maxAge}`;
  }

  static getToken() {
    let jwt = document.cookie
      .split(" ")
      .filter((v) => v.split("=")[0] === JWT_KEY)
      .join("")
      .split("=")[1];

    if (jwt && jwt[jwt.length - 1] === ";") {
      jwt = jwt.slice(0, jwt.length - 1);
    }
    return jwt;
  }

  static async getUserData() {
    const jwt = this.getToken();

    const userData = await fetch(`http://localhost:5000/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer${jwt}`,
      },
    }).then((res) => res.json());

    return {
      ...userData,
      isLoggedIn: !!userData,
    };
  }

  static logout() {
    // TODO: 서버쪽으로부터 쿠키삭제 해결못하면 프론트에서 직접 삭제해주기
    // document.cookie = `${JWT_KEY}=${this.getToken()}; max-age=0`;
    fetch("http://localhost:5000/users/logout")
      .then((res) => {})
      .catch((error) => console.error(error));
  }
}
