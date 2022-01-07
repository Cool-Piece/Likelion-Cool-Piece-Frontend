import "regenerator-runtime";
import { BASE_URL } from './api.js';
import {COOKIE_EXPIRES_TIME, JWT_KEY} from './constant.js';


export default class Auth {
  static setToken(jwt, maxAge = COOKIE_EXPIRES_TIME) {
    document.cookie = `${JWT_KEY}=${jwt}; max-age=${maxAge};`;
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

    if (!jwt) {
      return {
        isLoggedIn: false
      }
    }

    const userData = await fetch(`http://localhost:5000/users`, {
      method: "GET",
      headers: {
        "Authorization":`Bearer${jwt}`
      }
    }).then(res => {
      if (res.status === 200) {
        return res.json()
      } else {
        return new Error('로그인 실패')
      }
    }).catch(err => console.error(err));

    return {
      ...userData,
      isLoggedIn: !!userData,
    };
  }

  static logout() {
    // fetch('http://localhost:5000/users/logout')
    // .then(res => {
    //   if (res.status === 200) {
    //   } else {
    //     return new Error('로그아웃 실패');
    //   }
    // })
    // .catch(error => console.error(error))
    document.cookie = `${JWT_KEY}=${this.getToken()}; max-age=0;`;
    window.location.reload();
  }
}
