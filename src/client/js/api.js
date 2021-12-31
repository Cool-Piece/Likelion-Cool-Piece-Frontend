export const BASE_URL = "https://coolpiece-git.herokuapp.com/";

export const getFetcher = (path) => {
  return fetch(`http://localhost:5000/${path}`)
    .then((res) => {
      // TODO: 에러처리 해주기 -> status 또는 message
      return res.json()
    })
    .then((res) => res)
    .catch((err) => console.error(err));
}