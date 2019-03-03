import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "./../actions/user.action";

import {
  Form,
  FormGroup,
  Input,
  Label,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardFooter,
  Row,
  Col
} from "reactstrap";

import { PanelHeader, Button } from "./../components";

/*const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};*/

class Login extends Component {
  constructor(props) {
    super(props);

    this.props.logout();

    this.state = {
      email: "",
      password: "",
      submitted: false,
      login: {
        fullNameState: ""
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { email, password } = this.state;
    //const { dispatch } = this.props;
    if (email && password) {
      this.props.login(this.state);
      //dispatch(userActions.authenticate(this.state));
    }
  }

  render() {
    //    const { token, isAuthenticated } = this.props;
    const { loggingIn, error } = this.props;
    const { email, password, submitted } = this.state;
    /*if (redirectToReferrer) {
      return <Redirect to={from} />;
    }*/

    return (
      <div>
        {error}
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col xs={12} md={6}>
              <Form onSubmit={this.handleSubmit} method="POST">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Login</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <FormGroup
                      className={"has-label " + this.state.login.fullNameState}>
                      <Label>Email *</Label>
                      <Input
                        type="email"
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                    <FormGroup
                      className={"has-label " + this.state.login.passwordState}>
                      <Label>Password *</Label>
                      <Input
                        type="password"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                    <div className="category form-category">
                      * Required fields
                    </div>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button color="primary">Login</Button>
                  </CardFooter>
                </Card>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { token, authentication } = state;
  return {
    token,
    isAuthenticated: token ? true : false,
    error: authentication.error || ""
  };
};

const mapDispatchToProps = dispatch => ({
  login: data => {
    dispatch(userActions.authenticate(data));
  },
  logout: () => {
    dispatch(userActions.logout());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
