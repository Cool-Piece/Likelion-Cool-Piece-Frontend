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
    
    if(jwt && jwt[jwt.length-1] === ';') {
      jwt = jwt.slice(0, jwt.length-1);
    }
    return jwt;
  }

  static async isLoggedIn() {
    // TODO: 서버 연결하기
    // const jwt = await getToken();

    // const data = await fetch(`${BASE_URL}/user`, {
    //   method: 'GET',
    //   headers: {
    //     "Authorization":`Bearer ${jwt}`
    //   }
    // }).then(res => res.json())

    // return {
    //   userData: data,
    //   isLoggedIn: !!data
    // }

    return new Promise((resolve, _) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    })
  }

  static logout() {
    document.cookie = `${JWT_KEY}=${this.getToken()}; max-age=0`;
  }
}