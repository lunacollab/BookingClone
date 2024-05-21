import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Slider from "react-slick";
import specialtyImg from "../../../assets/specialty/care1.jpg";
import { changeLanguageApp } from "../../../store/actions";

class Specialty extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  render() {
    let language = this.props.language;
    return (
      <div className=" section-share section-specialty">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="specialty.title" />
            </span>
            <button className="btn-section">
              <FormattedMessage id="specialty.header" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="img-customize">
                <img src={specialtyImg} />
                <h3>1</h3>
              </div>
              <div className="img-customize">
                <img src={specialtyImg} />
                <h3>2</h3>
              </div>
              <div className="img-customize">
                <img src={specialtyImg} />
                <h3>3</h3>
              </div>
              <div className="img-customize">
                <img src={specialtyImg} />
                <h3>4</h3>
              </div>
              <div className="img-customize">
                <img src={specialtyImg} />
                <h3>5</h3>
              </div>
              <div className="img-customize">
                <img src={specialtyImg} />
                <h3>6</h3>
              </div>
            </Slider>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
