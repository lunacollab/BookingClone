import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ProfieDoctor.scss";
import { getProfileDoctorById } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import NumberFormat from "react-number-format";
import _ from "lodash";
import { Link } from "react-router-dom";


class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }
  async componentDidMount() {
    let data = await this.getInfoDoctorById(this.props.doctorId);
    this.setState({ dataProfile: data });
  }
  getInfoDoctorById = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileDoctorById(id);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }
    return result;
  };
 async componentDidUpdate(prevProps) {
    if (this.props.doctorId !== prevProps.doctorId) {
      let data =  await this.getInfoDoctorById(this.props.doctorId);
      this.setState({ dataProfile: data });
    }
  }
  renderPrice = (dataProfile, language) => {
    if (
      dataProfile &&
      !_.isEmpty(dataProfile) &&
      dataProfile.Doctor_Info &&
      !_.isEmpty(dataProfile.Doctor_Info)
    ) {
      return (
        <NumberFormat
          className="currency"
          value={
            language === LANGUAGES.VI
              ? dataProfile.Doctor_Info.priceTypeData.valueVi
              : dataProfile.Doctor_Info.priceTypeData.valueEn
          }
          displayType={"text"}
          thousandSeparator={true}
          suffix={language === LANGUAGES.VI ? " VND" : ""}
          prefix={language === LANGUAGES.EN ? "$" : ""}
        />
      );
    }
    return " ";
  };
 
  render() {
    let { dataProfile } = this.state;
    let {
      language,
      isShowDescriptionDoctor,
      dataTime,
      isShowLinkDetail,
      isShowPrice,
      doctorId
    } = this.props;
    let nameVi = "",
      nameEn = "";
    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData.valueVi},${dataProfile.lastName} ${dataProfile.firstName}`;
      nameEn = `${dataProfile.positionData.valueEn},${dataProfile.firstName} ${dataProfile.lastName}`;
    }

    return (
      <div className="profile-doctor-container">
        <div className="intro-doctor">
          <div
            className="content-left"
            style={{ backgroundImage: `url(${dataProfile.image})` }}
          ></div>
          <div className="content-right">
            <div className="up">
              {language === LANGUAGES.VI ? nameVi : nameEn}
            </div>
            <div className="down">
              {isShowDescriptionDoctor === true ? (
                <>
                  {dataProfile.Markdown && dataProfile.Markdown.description && (
                    <span>{dataProfile.Markdown.description}</span>
                  )}
                </>
              ) : (
                <>{this.props.renderTimeBooking(dataTime)}</>
              )}
            </div>
          </div>
        </div>
        {isShowLinkDetail === true && (
          <div className="view-detail-doctor">
            <Link to={`/detail-doctor/${doctorId}`}>Xem thêm </Link>
          </div>
        )}
        {isShowPrice === true && (
          <div className="price">
            <FormattedMessage id="patient.profile-doctor.price"/>
            {this.renderPrice(dataProfile, language)}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);