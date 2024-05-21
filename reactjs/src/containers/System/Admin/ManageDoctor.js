import MarkdownIt from "markdown-it";
import React, { Component } from "react";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { connect } from "react-redux";
import Select from "react-select";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import { LANGUAGES, CRUD_ACTIONS } from "../../../utils";
import { FormattedMessage } from "react-intl";


const mdParser = new MarkdownIt();
class ManageRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
      listDoctors: [],
      hasOldData: false,
      //Save doctor info table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
    };
  }
  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        if(type === "USERS"){
                 let object = {};
                 let labelVi = `${item.lastName} ${item.firstName}`
                 let labelEn =`${item.firstName} ${item.lastName}`
                 object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                 object.value = item.id;
                 result.push(object);
        }
        if(type === "PRICE" ){
               let object = {};
               let labelVi = item.valueVi;
               let labelEn = `${item.valueEn} USD`;
               object.label = language === LANGUAGES.VI ? labelVi : labelEn;
               object.value = item.keyMap;
               result.push(object);
        }
        if(type==="PAYMENT" || type==="PROVINCE"){
           let object = {};
           let labelVi = item.valueVi;
           let labelEn = item.valueEn;
           object.label = language === LANGUAGES.VI ? labelVi : labelEn;
           object.value = item.keyMap;
           result.push(object);
        }

      });
    }
    return result;
  };
  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.getRequireDoctorInfo();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctorsRedux !== this.props.allDoctorsRedux) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctorsRedux,"USERS");
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctorsRedux,"USERS");
      let { resPayment, resPrice, resPronvince } =
        this.props.allRequiredDoctorInfo;
      let dataSelectedPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectedPayment = this.buildDataInputSelect(resPayment,"PAYMENT");
      let dataSelectedProvince = this.buildDataInputSelect( resPronvince,"PROVINCE");
      this.setState({
        listDoctors: dataSelect,
        listPrice: dataSelectedPrice,
        listPayment: dataSelectedPayment,
        listProvince: dataSelectedProvince,
      });
    }

    if (prevProps.detailDoctorRedux !== this.props.detailDoctorRedux) {
      let { detailDoctorRedux } = this.props;
      let Markdowns = detailDoctorRedux.Markdown;
      if (Markdowns) {
        this.setState({
          contentMarkdown: Markdowns.contentMarkdown,
          contentHTML: Markdowns.contentHTML,
          description: Markdowns.description,
          hasOldData: true,
        });
      } else {
        this.setState({
          contentMarkdown: "",
          contentHTML: "",
          description: "",
          hasOldData: false,
        });
      }
    }
    if (prevProps.detailDoctorRedux !== this.props.detailDoctorRedux) {
      let { detailDoctorRedux } = this.props;
      let {listPayment, listPrice,listProvince} = this.state
      let DoctorInfors = detailDoctorRedux.Doctor_Info
      let {priceId,paymentId,provinceId,nameClinic,addressClinic,note} = DoctorInfors;
      let findItemPrice = listPrice.find((item) => {
          return item && item.value === priceId;
        });
      let findItemPayment = listPayment.find(item=>{
        return item && item.value === paymentId;
      })
      let findItemProvince = listProvince.find((item) => {
          return item && item.value === provinceId;
        });
      if (DoctorInfors) {
        this.setState({
          selectedPrice: findItemPrice,
          selectedPayment: findItemPayment,
          selectedProvince: findItemProvince,
          nameClinic: nameClinic,
          addressClinic: addressClinic,
          note: note,
          hasOldData: true,
        });
      } else {
        this.setState({
          selectedPrice: "",
          selectedPayment: "",
          selectedProvince: "",
          nameClinic: "",
          addressClinic: "",
          note: "",
          hasOldData: false,
        });
      }
    }
    if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
      let { resPayment, resPrice, resPronvince } =this.props.allRequiredDoctorInfo;
      let dataSelectedPrice = this.buildDataInputSelect(resPrice,"PRICE");
      let dataSelectedPayment = this.buildDataInputSelect(resPayment,"PAYMENT");
      let dataSelectedProvince = this.buildDataInputSelect(resPronvince,"PROVINCE");
      this.setState({
        listPrice: dataSelectedPrice,
        listPayment: dataSelectedPayment,
        listProvince: dataSelectedProvince,
      });
    }
  }
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };
  handleSaveContentMarkdown = () => {
    let { hasOldData } = this.state;
    this.props.saveDetailDoctorAction({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
    });
  };
  handleChange = async (selectedOption, name) => {
    await this.props.fetchAllDoctorInfor(selectedOption.value);
    this.setState({ selectedOption });
  };
  handleChangeSelectedDoctorInfo = async (selectedOption, name) => {
    let stateName = name.name
    let stateCopy = {...this.state}
    stateCopy[stateName] = selectedOption
    this.setState({
      ...stateCopy
    })
  };

  handleOnChangeText = (event,id) => {
    let stateCopy = {...this.state}
    stateCopy[id] = event.target.value
    this.setState({
      ...stateCopy
    });
  };
  render() {
    let { hasOldData } = this.state;

    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">
          <FormattedMessage id="admin.manage-doctor.title" />
        </div>
        <div className="more-infor">
          <div className="content-left form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.select-doctor" />
            </label>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChange}
              options={this.state.listDoctors}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.select-doctor" />
              }
            />
          </div>
          <div className="content-right">
            <label>
              <FormattedMessage id="admin.manage-doctor.info" />
            </label>
            <textarea
              className="form-control"
              rows="4"
              onChange={(event) =>
                this.handleOnChangeText(event, "description")
              }
              value={this.state.description}
            ></textarea>
          </div>
        </div>
        <div className="more-infor-extra row">
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.price" />
            </label>
            <Select
              value={this.state.selectedPrice}
              onChange={this.handleChangeSelectedDoctorInfo}
              options={this.state.listPrice}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.choosePrice" />
              }
              name="selectedPrice"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.payment" />
            </label>
            <Select
              value={this.state.selectedPayment}
              onChange={this.handleChangeSelectedDoctorInfo}
              options={this.state.listPayment}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.choosePayment" />
              }
              name="selectedPayment"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.province" />
            </label>
            <Select
              value={this.state.selectedProvince}
              onChange={this.handleChangeSelectedDoctorInfo}
              options={this.state.listProvince}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.chooseProvince" />
              }
              name="selectedProvince"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.nameClinic" />
            </label>
            <input
              className="form-control"
              onChange={(event) => this.handleOnChangeText(event, "nameClinic")}
              value={this.state.nameClinic}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.addressClinic" />
            </label>
            <input
              className="form-control"
              onChange={(event) =>
                this.handleOnChangeText(event, "addressClinic")
              }
              value={this.state.addressClinic}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.note" />
            </label>
            <input
              className="form-control"
              onChange={(event) => this.handleOnChangeText(event, "note")}
              value={this.state.note}
            />
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
        <button
          className={
            hasOldData === true
              ? "save-contain-doctor"
              : "create-contain-doctor"
          }
          onClick={this.handleSaveContentMarkdown}
        >
          {hasOldData === true ? (
            <span>
              <FormattedMessage id="admin.manage-doctor.save" />
            </span>
          ) : (
            <span>
              <FormattedMessage id="admin.manage-doctor.create" />
            </span>
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctorsRedux: state.admin.allDoctors,
    language: state.app.language,
    detailDoctorRedux: state.admin.detailDoctor,
    allRequiredDoctorInfo:state.admin.allRequiredDoctorInfo,
    type:state.admin.type,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    saveDetailDoctorAction: (data) => dispatch(actions.saveDetailDoctorAction(data)),
    getRequireDoctorInfo:()=> dispatch(actions.getRequireDoctorInfo()),
    fetchAllDoctorInfor: (id) => dispatch(actions.fetchAllDoctorInfor(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageRedux);