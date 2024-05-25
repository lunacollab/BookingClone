import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import specialtyImg from "../../../assets/specialty/care1.jpg";
import { changeLanguageApp } from "../../../store/actions";
import { FormattedMessage } from "react-intl";
import { getAllClinics } from "../../../services/userService";
import { withRouter } from "react-router-dom";

class MedicalSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinics: [],
    };
  }

  async componentDidMount() {
    let res = await getAllClinics();
    console.log(res);
    if (res && res.errCode === 0) {
      this.setState({
        dataClinics: res.data ? res.data : [],
      });
    }
  }

  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  handleViewClinicSpecialty =(clinic)=>{
     if (this.props.history) {
       this.props.history.push(`/detail-clinic/${clinic.id}`);
     }
  };
  render() {
    let { dataClinics } = this.state;
    return (
      <div>
        <div className="section-share section-medical-facility">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">
                <FormattedMessage id="medical.title" />
              </span>
              <button className="btn-section">
                <FormattedMessage id="medical.header" />
              </button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                {dataClinics && dataClinics.length > 0 &&
                  dataClinics.map((item, index) => {
                    return (
                      <div
                        className="medical-specialty"
                        key={index}
                        onClick={() => this.handleViewClinicSpecialty(item)}
                      >
                        <div
                          className="image-medical-specialty"
                          style={{ backgroundImage: `url(${item.image})` }}
                        ></div>
                        <h3>{item.name}</h3>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalSpecialty));
