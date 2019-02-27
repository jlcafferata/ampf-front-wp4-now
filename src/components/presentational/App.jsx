import React, { Component } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

import Login from "./../../modules/Login.jsx";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div>
          <AuthButton />
          <Route path="/" component={MainWrapper} />
          <Route path="/public" component={Public} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/protected" component={Protected} />
        </div>
      </Router>
    );
  }
}

const fakeAuth = {
  isAuthenticate: false,
  authenticate(cb) {
    this.isAuthenticate = true;
    setTimeout(cb, 1000);
  },
  signout(cb) {
    this.isAuthenticate = false;
    setTimeout(cb, 1000);
  }
};

const MainWrapper = () => <h1>MainWrapper</h1>;
const Public = () => <h3>Public</h3>;
const Protected = () => <h3>Protected</h3>;
const AuthButton = withRouter(({ history }) =>
  fakeAuth.isAuthenticate ? (
    <p>
      Welcome
      <button
        value="Logout"
        onClick={() => {
          fakeAuth.signout(() => history.push("/"));
        }}>
        Logout
      </button>
    </p>
  ) : (
    <p>
      You're not logged
      <button
        onClick={() => {
          fakeAuth.authenticate(() => {
            history.push("/protected");
          });
        }}>
        Login
      </button>
    </p>
  )
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(at.logout());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
