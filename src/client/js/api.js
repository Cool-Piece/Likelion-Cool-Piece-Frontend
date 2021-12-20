const BASE_URL = "https://coolpiece-git.herokuapp.com/";

export const fetchCategory = () => fetch(`${BASE_URL}`)
.then(res => {
  if (res.status === 200) {
    return res.json();
  } else {
    throw new Error();
  }
})
.catch(error => {
  console.error(error);
})

export const fetchCard = () => fetch(`${BASE_URL}`)
.then(res => {

})
.catch(error => {
  console.error(errro);
})