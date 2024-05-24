import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import "./DoctorExtraInfo.scss";
import { getExtraDoctorInfoById } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";
import _ from "lodash";

class DoctorExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfo: false,
      extraInfo: {},
    };
  }
async componentDidMount(){
  let { doctorIdFromParent } = this.props;
  if(doctorIdFromParent){
    let res = await getExtraDoctorInfoById(doctorIdFromParent);
    if (res && res.errCode === 0) {
      this.setState({
        extraInfo: res.data,
      });
    }
  }
}
  async componentDidUpdate(prevProps) {
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let { doctorIdFromParent } = this.props;
      let res = await getExtraDoctorInfoById(doctorIdFromParent);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfo: res.data,
        });
      }
    }
  }

  showHideDetailInfo = (status) => {
    this.setState({
      isShowDetailInfo: status,
    });
  };

  renderPrice = (extraInfo, language) => {
    if (
      extraInfo &&
      !_.isEmpty(extraInfo) &&
      extraInfo.priceTypeData &&
      !_.isEmpty(extraInfo.priceTypeData)
    ) {
      return (
        <NumberFormat
          className="currency"
          value={
            language === LANGUAGES.VI
              ? extraInfo.priceTypeData.valueVi
              : extraInfo.priceTypeData.valueEn
          }
          displayType={"text"}
          thousandSeparator={true}
          suffix={language === LANGUAGES.VI ? " VND" : ""}
          prefix={language === LANGUAGES.EN ? "$" : ""}
        />
      );
    }
    return "";
  };
  renderPaymentInfo = (extraInfo, language) => {
    if (extraInfo && !_.isEmpty(extraInfo) &&extraInfo.paymentTypeData && !_.isEmpty(extraInfo.paymentTypeData)) {
      let paymentTypeVi = extraInfo.paymentTypeData.valueVi;
      let paymentTypeEn = extraInfo.paymentTypeData.valueEn;

      if (paymentTypeVi === "Tất cả" || paymentTypeEn === "ALL") {
        return (
          <div className="all-payment">
            <FormattedMessage id="patient.extra-info-doctor.payment" />
            <span className="all-paymentType">
              {language === LANGUAGES.VI ? paymentTypeVi : paymentTypeEn}
            </span>
            <FormattedMessage id="patient.extra-info-doctor.method" />
          </div>
        );
      } else {
        return (
          <div className="payment">
            <FormattedMessage id="patient.extra-info-doctor.payment-method" />
            <span className="paymentType">
              {language === LANGUAGES.VI ? paymentTypeVi : paymentTypeEn}
            </span>
          </div>
        );
      }
    }
    return "";
  };

  render() {
    let { isShowDetailInfo, extraInfo } = this.state;
    let { language } = this.props;

    return (
      <div className="doctor-extra-info-container">
        <div className="content-up">
          <div className="text-address">
            <FormattedMessage id="patient.extra-info-doctor.text-address" />
          </div>
          <div className="name-clinic">
            {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ""}
          </div>
          <div className="detail-address">
            {extraInfo && extraInfo.addressClinic ? extraInfo.addressClinic: ""}
          </div>
        </div>
        <div className="content-down">
          {!isShowDetailInfo ? (
            <div className="short-info">
              <span className="price-info">
                <FormattedMessage id="patient.extra-info-doctor.price" />:
              </span>
              {this.renderPrice(extraInfo, language)}
              <span
                className="detail"
                onClick={() => this.showHideDetailInfo(true)}
              >
                <FormattedMessage id="patient.extra-info-doctor.detail" />
              </span>
            </div>
          ) : (
            <>
              <div className="title-price">
                <FormattedMessage id="patient.extra-info-doctor.price" />:
              </div>
              <div className="detail-info">
                <div className="price">
                  <span className="left">
                    <FormattedMessage id="patient.extra-info-doctor.price" />
                  </span>
                  <span className="right">
                    {this.renderPrice(extraInfo, language)}
                  </span>
                </div>
                <div className="note">
                  {extraInfo && extraInfo.note ? extraInfo.note : ""}
                </div>
              </div>
              {this.renderPaymentInfo(extraInfo, language)}
              <div className="hide-price">
                <span
                  className="detail"
                  onClick={() => this.showHideDetailInfo(false)}
                >
                  <FormattedMessage id="patient.extra-info-doctor.hide" />
                </span>
              </div>
            </>
          )}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
