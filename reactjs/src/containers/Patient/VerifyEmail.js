//Template class component:
import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { postVerifyBookingAppointment } from "../../services/userService";
import HomeHeader from "../Homepage/HomeHeader";
import { Modal } from "reactstrap";
import "./VerifyEmail.scss";

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
      isOpening: false,
      errCode:0
    };
  }

  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      let urlParams = new URLSearchParams(this.props.location.search);
      let token = urlParams.get("token");
      let doctorId = urlParams.get("doctorId");
      let res = await postVerifyBookingAppointment({
        token: token,
        doctorId: doctorId,
      });
      if (res && res.errCode === 0) {
        this.setState({
          statusVerify: true,
        });
      }else{
        this.setState({
            statusVerify: true,
            errCode:res && res.errCode ? res.errCode : -1
        })
      }
    }
  }

  componentDidUpdate(prevProps) {}

  render() {
    let {statusVerify,errCode} = this.state
    return (
      <>
        <div>
          <HomeHeader />
        </div>
        <div>
          <Modal
            isOpen={!this.state.isOpening}
            className="verify-email-modal"
            size="lg"
            centered
          >
            <div className="modal-content">
              {statusVerify === false ? (
                <>
                  <span className="spinner-icon">
                    <i className="fas fa-spinner fa-spin"></i>
                  </span>
                  <div className="message">Loading...</div>
                </>
              ) : (
                <>
                  {+errCode === 0 ? (
                    <>
                      <span className="check-icon">
                        <i className="far fa-check-circle"></i>
                      </span>
                      <div className="message">
                        Xác nhận lịch hẹn thành công!
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="time-icon">
                        <i class="far fa-times-circle"></i>
                      </span>
                      <div className="message">
                        Lịch hẹn không tồn tại hoặc đã được xác nhận!
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </Modal>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
