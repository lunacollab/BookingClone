import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { FormattedMessage } from "react-intl";
import Navigator from "../../components/Navigator";
import * as actions from "../../store/actions";
import { changeLanguageApp } from "../../store/actions";
import { LANGUAGES, USER_ROLE } from "../../utils";
import "./Header.scss";
import { adminMenu,doctorMenu } from "./menuApp";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp:[]
    }
  }
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  componentDidMount(){
    let {userInfo} = this.props;
    let menu = []
    if(userInfo && !_.isEmpty(userInfo)){
      let role = userInfo.roleId
      if(role === USER_ROLE.ADMIN){
         menu = adminMenu
      }
      if (role === USER_ROLE.DOCTOR) {
           menu = doctorMenu;
        }
    }
    this.setState({
      menuApp:menu
    })
  }
  render() {
    const { processLogout, language, userInfo } = this.props;

    return (
      <div className="header-container">
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApp} />
        </div>
        <div className="languages">
          <span className="welcome">
            <FormattedMessage id="homeheader.welcome"/>, 
            {userInfo && userInfo.firstName ? userInfo.firstName : ""} !
          </span>
          <span
            className={
              language === LANGUAGES.VI ? "language-vi active" : "language-vi"
            }
            onClick={() => this.changeLanguage(LANGUAGES.VI)}
          >
            VI
          </span>
          <span
            className={
              language === LANGUAGES.EN ? "language-en active" : "language-en"
            }
            onClick={() => this.changeLanguage(LANGUAGES.EN)}
          >
            EN
          </span>
          <div
            className="btn btn-logout"
            onClick={processLogout}
            title="Log out"
          >
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
