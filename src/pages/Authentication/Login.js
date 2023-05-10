import PropTypes from 'prop-types'
import React, { useEffect } from "react"
import { useAlert } from "react-alert";

import { Row, Col, Alert, Container } from "reactstrap"

// Redux
import { connect, useDispatch } from "react-redux"
import { withRouter, Link, useHistory } from "react-router-dom"
// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

import logo from "../../assets/images/logo-sm-dark.png"
import { loginUser, apiError, socialLogin } from "../../store/actions"
import { userLogin } from '../../helpers/backend_helper'

const Login = (props) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    document.body.className = "authentication-bg";
    // remove classname when component will unmount
    return function cleanup() {
      document.body.className = "";
    };
  });

  // handleValidSubmit
  const handleValidSubmit = (event, values) => {

    userLogin({
      username: values.email,
      password: values.password,
    }).then(resp => {
      if (resp.status == true) {

          let auth_data = { name: resp?.data[0].name, email: resp?.data[0].email, avatar: resp?.data[0].avatar, token: resp?.data[0].token, userRole: resp?.data[0].userRole, user_id: resp?.data[0]._id }
        localStorage.setItem("authUser", JSON.stringify(auth_data))
        // history.push("/dashboard")
        alert.success('Login Successfully');
        dispatch(loginUser(resp?.data))
        window.location.replace("/dashboard");
        
      } else {
        alert.error('Your account is deactivated!!');
      }

    }).catch(err => {
      alert.error(err.response);
      dispatch(loginUser(err.response))
    })

  }

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <div className="card overflow-hidden">
                <div className="bg-login text-center">
                  <div className="bg-login-overlay"></div>
                  <div className="position-relative">
                    <h5 className="text-white font-size-20">Welcome Back !</h5>
                    <p className="text-white-50 mb-0">Sign in to continue to EasyDM.</p>
                    <Link to="/" className="logo logo-admin mt-4">
                      <img src={logo} alt="" height="30" />
                    </Link>
                  </div>
                </div>
                <div className="card-body pt-5">
                  <div className="p-2">
                    <AvForm
                      className="form-horizontal"
                      onValidSubmit={(e, v) => {
                        handleValidSubmit(e, v)
                      }}
                    >
                      {props.error && typeof props.error === "string" ? (
                        <Alert color="danger">{props.error}</Alert>
                      ) : null}

                      <div className="mb-3">

                        <AvField
                          name="email"
                          label="Email"
                          value="admin@narola.email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <AvField
                          name="password"
                          label="Password"
                          value="Password@14"
                          type="password"
                          required
                          placeholder="Enter Password"
                        />
                      </div>

                      {/* <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customControlInline"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customControlInline"
                        >
                          Remember me
                        </label>
                      </div> */}

                      <div className="mt-3">
                        <button
                          className="btn btn-primary w-100 waves-effect waves-light"
                          type="submit"
                        >
                          Log In
                        </button>
                      </div>

                      {/* <div className="mt-4 text-center">
                        <Link to="/forgot-password" className="text-muted"><i
                          className="mdi mdi-lock me-1"></i> Forgot your password?</Link>
                      </div> */}
                    </AvForm>

                  </div>
                </div>
              </div>
              <div className="mt-5 text-center">
                {/* <p>Don't have an account ? <Link to="/register"
                  lassName="fw-medium text-primary"> Signup now </Link> </p> */}
                <p>© {new Date().getFullYear()} EasyDM. All Rights Reserved By - <a href="https://www.narolainfotech.com/" target="_blank"> Narola Infotech</a>
                </p>
              </div>
            </Col>
          </Row>

        </Container>
      </div>
    </React.Fragment>
  )
}


export default withRouter(Login)

Login.propTypes = {
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
  socialLogin: PropTypes.func
}