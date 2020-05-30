import axiosWithAuth from "../../axios/axiosWithAuth"

import faker from "faker";
// Fetch Story
export const FETCHING_STORIES = "FETCHING_STORIES";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_FAILURE = "FETCH_FAILURE";
export const SET_CURRENT_STORY = "SET_CURRENT_STORY";

// Delete Story
export const DELETING_STORIES = "DELETING_STORIES";
export const DELETE_SUCCESS = "DELETE_SUCCESS";
export const DELETE_FAILURE = "DELETE_FAILURE";

// Add Story
export const ADDING_STORY = "ADDING_STORY";
export const ADD_FAILURE = "ADD_FAILURE";
export const ADD_SUCCESS = "ADD_SUCCESS";

// Updating Story
export const UPDATING_STORY = "UPDATING_STORY";
export const UPDATE_FAILURE = "UPDATE_FAILURE";
export const UPDATE_SUCCESS = "UPDATE_SUCCESS";

// GET Story
export const GETTING_STORY = "GETTING_STORY";
export const GET_FAILURE = "GET_FAILURE";
export const GET_SUCCESS = "GET_SUCCESS";
export const EDITING_STORY = "EDITING_STORY";



const apiUrl = "https://expat-journal-2-back-end.herokuapp.com"



// FETCH STORIES

export const fetchStories = (id) => dispatch => {
  dispatch({ type: FETCHING_STORIES });
  axiosWithAuth()
    .get(`${apiUrl}/users/${id}/stories`)
    .then(res => dispatch({ type: FETCH_SUCCESS, payload: res.data }) & console.log(res))
    .catch(err => dispatch({ type: FETCH_FAILURE, payload: err.response }))
};

// DELETE STORIES

export const deleteStory = id => dispatch => {
  dispatch({ type: DELETING_STORIES });
  axiosWithAuth()
  .delete(`${apiUrl}/stories/delete/${id}`)
  .then(res => dispatch({ type:  DELETE_SUCCESS, payload: res.data }) & console.log(res))
  .catch(err => dispatch({ type: DELETE_FAILURE, payload: err.response }))
};


// ADD STORY

export const addStory = story => dispatch => {
  dispatch({ type:ADDING_STORY });
  axiosWithAuth()
  .get(`${apiUrl}/stories/new`)
  .then(res => dispatch({ type:  ADD_SUCCESS, payload: res.data }) & console.log(res))
  .catch(err => dispatch({ type: ADD_FAILURE, payload: err.response }))
};



// GET STORY

export const getStory = id => dispatch => {
  dispatch({ type:GETTING_STORY });
  axiosWithAuth()
  .get(`${apiUrl}/stories/byId/${id}`)
  .then(res => dispatch({ type:  GET_SUCCESS, payload: res.data }) & console.log(res))
  .catch(err => dispatch({ type: GET_FAILURE, payload: err.response }))
};




// UPDATE STORY

export const updateStory = story => dispatch => {
  dispatch({ type: UPDATING_STORY });
  axiosWithAuth()
  .put(`{apiUrl}/stories/update/${story.id}`)
  .then(res => dispatch({ type:  UPDATE_SUCCESS, payload: res.data }) & console.log(res))
  .catch(err => dispatch({ type: UPDATE_FAILURE, payload: err.response }))

};