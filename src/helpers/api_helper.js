import axios from "axios"
import accessToken from "./jwt-token-access/accessToken"

//pass new generated access token here
// const get_auth = localStorage.getItem('authUser')
const get_auth = JSON.parse(localStorage.getItem("authUser"))
//apply base url for axios
const API_URL = process.env.REACT_APP_APIKEY

const axiosApi = axios.create({
  baseURL: API_URL,
})

axiosApi.defaults.headers.common["Authorization"] =  get_auth && 'Bearer '+get_auth.token

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config }).then(response => response.data)
}

export async function post(url, data, config = {}) {
  console.log('config ==>', config);
  console.log('data ==>', data);

  let postData = {...data};

  if(config?.headers?.['Content-Type'] === 'multipart/form-data'){
    postData = data
  }

  return axiosApi
    .post(url, postData, { ...config })
    .then(response => response.data)
}

export async function put(url, data, config = {}) {

  console.log('config ==>', config);
  console.log('data ==>', data);

  let postData = {...data};

  if(config?.headers?.['Content-Type'] === 'multipart/form-data'){
    postData = data
  }
  
  return axiosApi
    .put(url, postData, { ...config })
    .then(response => response.data)
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data)
}
