import _ from "lodash";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import DatePicker from "../../../components/Input/DatePicker";
import { saveBulkDoctor } from "../../../services/userService";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import "./ManageSchedule.scss";
import moment from "moment";
class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctors: [],
      selectedDoctor: {},
      currentDate: "",
      rangeTimes: [],
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.fetchAllScheduleTime();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.allDoctorsRedux !== this.props.allDoctorsRedux) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctorsRedux);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.allSchedule !== this.props.allSchedule) {
      let data = this.props.allSchedule.map((item) => ({
        ...item,
        isSelected: false,
      }));
      this.setState({
        rangeTimes: data,
      });
    }
  }

  buildDataInputSelect = (inputData) => {
    let { language } = this.props;
    return inputData.map((item) => ({
      label:
        language === LANGUAGES.VI
          ? `${item.lastName} ${item.firstName}`
          : `${item.firstName} ${item.lastName}`,
      value: item.id,
    }));
  };

  handleChange = (selectedOption) => {
    this.setState({ selectedDoctor: selectedOption });
  };

  handleOnChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };

  handleClickBtnTime = (time) => {
    let rangeTimes = this.state.rangeTimes.map((item) =>
      item.id === time.id ? { ...item, isSelected: !item.isSelected } : item
    );
    this.setState({ rangeTimes });
  };

  handleSaveSchedule = async () => {
    let { rangeTimes, selectedDoctor, currentDate } = this.state;
    if (_.isEmpty(selectedDoctor)) {
      toast.error("Invalid selected doctor");
      return;
    }
    if (!currentDate) {
      toast.error("Invalid date!");
      return;
    }
    let formattedDate = new Date(currentDate).getTime();
    let selectedTime = rangeTimes.filter((item) => item.isSelected);
    if (selectedTime.length === 0) {
      toast.error("Invalid selected time!");
      return;
    }
   let result = selectedTime.map((schedule) => ({
      doctorId: selectedDoctor.value,
      date: formattedDate,
      timeType: schedule.keyMap,
    }));

    try {
      let res = await saveBulkDoctor({ arrSchedule: result});
      if (res.errCode === 0) {
        toast.success("Schedule saved successfully!");
      } else {
        toast.error("Error saving schedule!");
      }
    } catch (error) {
      console.error(error);
    }
  };




  render() {
    let { rangeTimes, listDoctors, selectedDoctor, currentDate } = this.state;
    let { language } = this.props;
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    return (
      <div className="manage-schedule-container">
        <div className="m-s-title">
          <FormattedMessage id="manage-schedule.title" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="manage-schedule.choose-doctor" />
              </label>
              <Select
                value={selectedDoctor}
                onChange={this.handleChange}
                options={listDoctors}
              />
            </div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="manage-schedule.choose-day" />
              </label>
              <DatePicker
                onChange={this.handleOnChangeDatePicker}
                className="form-control"
                value={currentDate}
                minDate={yesterday}
              />
            </div>
            <div className="col-12 pick-hour-container">
              {rangeTimes.map((item, index) => (
                <button
                  className={`btn btn-schedule ${
                    item.isSelected ? "btn-info" : ""
                  }`}
                  key={index}
                  onClick={() => this.handleClickBtnTime(item)}
                >
                  {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                </button>
              ))}
            </div>
            <div className="col-12">
              <button
                className="btn btn-warning btn-save-schedule"
                onClick={this.handleSaveSchedule}
              >
                <FormattedMessage id="manage-schedule.save-info" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  allDoctorsRedux: state.admin.allDoctors,
  language: state.app.language,
  allSchedule: state.admin.allSchedule,
});

let mapDispatchToProps = (dispatch) => ({
  fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
  fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
