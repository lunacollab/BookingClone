import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import { changeLanguageApp } from "../../../store/actions";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import {LANGUAGES} from "../../../utils";
import {withRouter} from "react-router-dom";

class OutStandingDoctor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (prevProps.limitDoctorsRedux !== this.props.limitDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.limitDoctorsRedux,
      });
    }
  };
  componentDidMount() {
    this.props.loadDoctorLimit();
  }
  handleViewDetailDoctor =(doctor)=>{
    if(this.props.history){
    this.props.history.push(`/detail-doctor/${doctor.id}`);
    }
  };
  render() {
    let arrDoctors = this.state.arrDoctors;
    let language = this.props.language;
    return (
      <div>
        <div className=" section-share section-doctor">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">
                <FormattedMessage id="doctor.title" />
              </span>
              <button className="btn-section">
                <FormattedMessage id="doctor.header" />
              </button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                {arrDoctors &&
                  arrDoctors.length > 0 &&
                  arrDoctors.map((item, index) => {
                    let imageBase64 = " ";
                    if (item.image) {
                      imageBase64 = new Buffer(item.image, "base64").toString(
                        "binary"
                      );
                    }
                    let nameVi = `${item.positionData.valueVi},${item.lastName} ${item.firstName}`;
                    let nameEn = `${item.positionData.valueEn},${item.firstName} ${item.lastName}`;
                    return (
                      <div
                        className="section-customize customize"
                        key={index}
                        onClick={() =>this.handleViewDetailDoctor(item)}
                      >
                        <div className="custom-border">
                          <div className="outer-bg">
                            <div
                              className="bg-image section-outstanding-doctor"
                              style={{ backgroundImage: `url(${imageBase64})` }}
                            ></div>
                          </div>
                        </div>
                        <div className=" position text-center mt-4">
                          <div>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                          </div>
                          <div>3</div>
                        </div>
                      </div>
                    );
                  })}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    limitDoctorsRedux: state.admin.limitDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    loadDoctorLimit: () => dispatch(actions.fetchDoctorLimit()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor)
);
