import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginApi } from "../../services/userService";

class Login extends Component {
  state = {
    username: "",
    password: "",
    showPassword: false,
    errMessage: "",
  };

  handleOnChangeUserName = (e) => {
    this.setState({ username: e.target.value });
  };

  handleOnChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  handleLogin = async () => {
    this.setState({ errMessage: "" });

    try {
      const { username, password } = this.state;
      const data = await handleLoginApi(username, password);

      if (data && data.errCode !== 0) {
        this.setState({ errMessage: data.message });
      } else if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong!";
      this.setState({ errMessage: errorMessage });
    }
  };

  handleShowHidePassword = () => {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  };

  handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      this.handleLogin();
    }
  };

  render() {
    const { username, password, showPassword, errMessage } = this.state;

    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-center login-title">Login</div>
            <div className="col-12 form-group">
              <label>Username:</label>
              <input
                type="text"
                className="form-control login-input"
                placeholder="Enter your username"
                value={username}
                onChange={this.handleOnChangeUserName}
              />
            </div>
            <div className="col-12 form-group">
              <label>Password:</label>
              <div className="login-password">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control login-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={this.handleOnChangePassword}
                  onKeyDown={this.handleKeyDown}
                />
                <span onClick={this.handleShowHidePassword}>
                  <i
                    className={
                      showPassword
                        ? "fas fa-eye show-password"
                        : "fas fa-eye-slash show-password"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12" style={{ color: "red" }}>
              {errMessage}
            </div>
            <div className="col-12">
              <button className="btn-login" onClick={this.handleLogin}>
                Login
              </button>
            </div>
            <div className="col-12">
              <span className="forgot-password">Forgot your password?</span>
            </div>
            <div className="col-12 text-center login-with mt-3">
              <span>Or login with:</span>
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-facebook social-icon fb"></i>
              <i className="fab fa-google-plus social-icon gg"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
});

const mapDispatchToProps = (dispatch) => ({
  navigate: (path) => dispatch(push(path)),
  userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
});

export default connect(null, mapDispatchToProps)(Login);
