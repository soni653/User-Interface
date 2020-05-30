import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { connect } from "react-redux";
import { registeringUser } from "../actions/authActions"
import axios from 'axios';
import PogLogo from '../../images/poglogo.svg';
import {
  Container,
  Form,
  Label,
  Input,
  FormGroup,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from 'reactstrap';

const formSchema = yup.object().shape({
  username: yup.string().min(2).max(40).required(),
  password: yup.string().min(8).max(40).required()
});

function SignUp(props) {
  const [formState, setFormState] = useState({
    username: '',
    password: ''
  });

  const [errorState, setErrorState] = useState({
    username: '',
    password: ''
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  const validate = e => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(valid => {
        setErrorState({
          ...errorState,
          [e.target.name]: ''
        });
      })
      .catch(err => {
        setErrorState({
          ...errorState,
          [e.target.name]: err.errors[0]
        });
      });
  };

  const changeHandler = e => {
    e.persist();
    validate(e);
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <Container
      fluid
      className='min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light'
    >
      <Form
        className='login-form mb-3 bg-white px-md-5 px-3 py-5 text-center'
      >
        <img src={PogLogo} className='pog-logo' alt='small logo' />
        <h2 className='font-weight-bold'>Sign Up</h2>
        <p className='text-muted text-center mb-4'>
          It's free and only takes a minute!
        </p>
        <FormGroup>
          <Label for='username' className='d-none'>
            Username
          </Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <i className='fas fa-user'></i>
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type='text'
              name='username'
              id='username'
              placeholder='Username'
              value={formState.username}
              onChange={changeHandler}
              invalid={errorState.username ? true : false}
            />
          </InputGroup>
        </FormGroup>
       
        <FormGroup>
          <Label for='password' className='d-none'>
            Password
          </Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <i className='fas fa-lock'></i>
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type='password'
              name='password'
              id='password'
              placeholder='Password'
              value={formState.password}
              onChange={changeHandler}
              invalid={errorState.password ? true : false}
              addon
            />
          </InputGroup>
        </FormGroup>
        <Button onClick={() => props.registeringUser(formState)} block color='primary'>
          Sign Up
        </Button>
      </Form>
      <p className='text-center text-muted small'>
        Already have an account? <Link to='/login'>Login here</Link>
      </p>
      <button onClick={() => console.log(props)}>Check State</button>
    </Container>
  );
}

const mapStateToProps = state => {
  return {
      userId: state.userId,
      username: state.username,
      error: state.error
  };
};

export default connect(
  mapStateToProps,
  { registeringUser }
)(SignUp)
