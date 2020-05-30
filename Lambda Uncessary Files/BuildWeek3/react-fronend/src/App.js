import React from 'react';
import { Route } from 'react-router-dom';
import StoriesList from './components/Stories/StoryList';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import StoryForm from './components/Stories/StoryForm';
import SingleStory from './components/Stories/SingleStory';
import './App.css';
import Story from './components/Stories/Story';
import Navbar from "./components/Navigation/Navbar"

const App = () => {
  return (
    <div>
      <Route path='/' component={Navbar} />
      <Route path='/login' exact component={Login} />
      <Route path='/register' exact component={SignUp} />
      <Route exact path='/' component={StoriesList} />
      <Route path='/add-story' component={StoryForm} />
      <Route path='/read-story/:id' component={SingleStory} />
      <Route path='/stories/edit/:id' component={StoryForm} />

    </div>
  );
};

export default App;
