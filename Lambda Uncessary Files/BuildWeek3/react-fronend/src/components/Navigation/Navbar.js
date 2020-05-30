import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false
    };
  }

  componentDidMount() {
  }

  openLoginModal = () => {
    this.setState({ modalOpen: true });
  };

  openModal = () => {
    this.setState({ modalOpen: true });
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    const { modalOpen } = this.state;
    return (
      <div>
         <div className="logo-div">
          <h1><strong>Expat Stories</strong></h1>
        </div>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {!this.props.userId ? (
            <li>
              <NavLink to="/">Stories</NavLink>
            </li>
          ) : (
            <li>
              <NavLink to="/add-story">Add Story</NavLink>
            </li>
          )}
          {!this.props.userId ? (
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          ) : (
            <li>
              <a
                href="/#"
                onClick={e => {
                  e.preventDefault();
                  localStorage.removeItem("token");
                  window.location.reload();
                }}
                style={{ color: "red" }}
              >
                Logout
              </a>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.userId
});

export default connect(mapStateToProps)(Navbar);