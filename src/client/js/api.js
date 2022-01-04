export const BASE_URL = "https://coolpiece-git.herokuapp.com/";

export const getFetcher = (path) => {
  return fetch(`http://localhost:5000/${path}`)
    .then((res) => {
      if (res.status === 200) {
        return res.json()
      } else {
        return new Error(`${path} 요청 중 에러 발생`);
      }
    }).catch((err) => console.error(err));
}