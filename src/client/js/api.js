export const BASE_URL = "https://coolpiece-git.herokuapp.com/";

export const getFetcher = (path) => {
  return fetch(`http://localhost:5000/${path}`)
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => console.error(err));
}