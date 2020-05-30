import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import {
  loginUser,
  registerUser,
  setErrorMessage
} from "../../actions/authActions.js";


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginOpen: true,
      registerOpen: false,
      loginData: {
        username: "",
        password: ""
      },
      registerData: {
        username: "",
        password: "",
        passwordConf: ""
      },
      msg: "",
      msgClass: ""
    };
  }

  loginChange = e => {
    this.setState({
      ...this.state,
      loginData: { ...this.state.loginData, [e.target.name]: e.target.value }
    });
  };

  registerChange = e => {
    this.setState({
      ...this.state,
      registerData: {
        ...this.state.registerData,
        [e.target.name]: e.target.value
      }
    });
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.modalOpen && nextProps.userId) {
      this.setState({
        msg: "You are now logged in. Redirecting...",
        msgClass: "alert-success"
      });
      setTimeout(() => {
        this.setState({
          msg: "",
          msgClass: ""
        });
        window.location.reload();
      }, 3000);
    }
    if (this.props.modalOpen && !nextProps.userId) {
      this.setState({
        msg: nextProps.error,
        msgClass: "alert-danger"
      });
    }
  }

  submitLogin = e => {
    e.preventDefault();
    this.props.setErrorMessage(null);
    this.props.loginUser(this.state.loginData);
  };

  submitRegister = e => {
    e.preventDefault();
    this.props.setErrorMessage(null);
    const { username, password, passwordConf } = this.state.registerData;
    if (password !== passwordConf) {
      this.setState({
        ...this.state,
        msg: "The two passwords do not match",
        msgClass: "alert-danger"
      });
    } else if (!username) {
      this.setState({
        ...this.state,
        msg: "Username required",
        msgClass: "alert-danger"
      });
    } else {
      this.props.registerUser({ username, password });

      if (this.props.userId && this.props.modalOpen) {
        this.setState({
          ...this.state,
          msg: "You are now logged in. Redirecting...",
          msgClass: "alert-success"
        });
        window.location.reload();
      }
    }
  };

  render() {
    const { modalOpen, afterOpenModal, closeModal } = this.props;
    const { loginOpen, registerOpen, loginData, registerData } = this.state;
    const LoginDisplay = (
      <div>
        <form method="POST" onSubmit={e => this.submitLogin(e)}>
          <h3>Login</h3>
          <div>
            <input
              autoFocus
              type="text"
              name="username"
              value={loginData.username}
              onChange={this.loginChange}
              placeholder="Username"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={this.loginChange}
              placeholder="Password"
            />
          </div>
          <div>
            <button type="submit" className="login-btn">
              Login
            </button>
          </div>
        </form>
      </div>
    );
    const RegisterDisplay = (
      <div>
        <form method="post" onSubmit={this.submitRegister}>
          <h3>Register</h3>
          <div>
            <input
              autoFocus
              type="text"
              name="username"
              value={registerData.username}
              onChange={this.registerChange}
              placeholder="Username"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={registerData.password}
              onChange={this.registerChange}
              placeholder="Password"
            />
          </div>
          <div>
            <input
              type="password"
              name="passwordConf"
              value={registerData.passwordConf}
              onChange={this.registerChange}
              placeholder="Password Confirm"
            />
          </div>
          <div>
            <button type="submit" className="register-btn">
              Register
            </button>
          </div>
        </form>
      </div>
    );

    return (
      <Modal
        isOpen={modalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        overlayClassName="Overlay"
        ariaHideApp={false}
      >
        
        <div>
          <span
            onClick={() =>
              this.setState({
                registerOpen: false,
                loginOpen: true,
                msg: "",
                msgClass: ""
              })
            }
            className={loginOpen ? "active" : "login-tab inactive"}
          >
            Login
          </span>
          <span
            onClick={() =>
              this.setState({
                loginOpen: false,
                registerOpen: true,
                msg: "",
                msgClass: ""
              })
            }
            className={registerOpen ? "active" : "register-tab inactive"}
          >
            Register
          </span>
        </div>
        {this.state.msg && (
          <div className={`alert ${this.state.msgClass}`}>
            {this.state.msg}
          </div>
        )}
        {loginOpen && LoginDisplay}
        {registerOpen && RegisterDisplay}
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.auth.userId,
  error: state.auth.error
});

export default connect(
  mapStateToProps,
  { loginUser, registerUser, setErrorMessage }
)(Login);