import axios from "axios";
import axiosWithAuth from "../../axios/axiosWithAuth"




// user login
export const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE";
export const LOGGING_IN = "LOGGING_IN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

// user login
export const REGISTERING = "REGISTERING";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
  
  const apiUrl = "https://expat-journal-2-back-end.herokuapp.com";
  
  export const loginUser = (user) => dispatch => {
    dispatch({ type: LOGGING_IN });
    axiosWithAuth()
      .post(`${apiUrl}/auth/login`, user)
      .then(res => dispatch({ type: LOGIN_SUCCESS, payload: res.data }) & localStorage.setItem("token", res.data.token) & console.log(res))
      .catch(err => dispatch({ type: LOGIN_FAILURE, payload: err.response }))
  };
  
  // register user
  export const registeringUser = (user) => dispatch => {
    dispatch({ type: REGISTERING });
    axiosWithAuth()
      .post(`${apiUrl}/auth/register`, user)
      .then(res => dispatch({ type: REGISTER_SUCCESS, payload: res.data }) & localStorage.setItem("token", res.data.token) & console.log(res))
      .catch(err => dispatch({ type: REGISTER_FAILURE, payload: err.response }))
  };
  