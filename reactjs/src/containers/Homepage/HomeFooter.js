import React, { Component } from "react";
import { connect } from "react-redux";
import { changeLanguageApp } from "../../store/actions";
import { FormattedMessage } from "react-intl";
class HomeFooter extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  render() {
    return (
      <div>
        <div className="home-footer">
          <p>
            &copy; 2024 Gin More information,please visited my github. 
            <a target="_blank" href="https://github.com/lunacollab">
                 &#8594; Click here &#8592; 
            </a>
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
