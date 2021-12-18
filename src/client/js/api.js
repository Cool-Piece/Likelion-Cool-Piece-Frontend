const BASE_URL = "";

export const fetchCategory = () => fetch(`${BASE_URL}`)
.then(res => {
  if(res.status === 200) { // GET success status expect 200
    return res.json();
  } else {
    throw new Error();
  }
})
.catch(error => {
  console.error(error);
})