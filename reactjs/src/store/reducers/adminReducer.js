import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingGender: false,
  genders: [],
  roles: [],
  positions: [],
  users: [],
  limitDoctors: [],
  allDoctors: [],
  detailDoctor: [],
  allSchedule: [],
  allRequiredDoctorInfo:[],
  type:""
};

const adminReducer = (state = initialState, action) => {
    let copyState = {};
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      copyState = { ...state };
      copyState.isLoadingGender = true;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      copyState = { ...state };
      copyState.genders = action.data;
      copyState.isLoadingGender = false;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      copyState = { ...state };
      copyState.isLoadingGender = false;
      copyState.genders = [];
      return {
        ...copyState,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      copyState = { ...state };
      copyState.positions = action.data;
      copyState.isLoadingGender = false;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_POSITION_FAILED:
      copyState = { ...state };
      copyState.isLoadingGender = false;
      copyState.positions = [];
      return {
        ...copyState,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      copyState = { ...state };
      copyState.roles = action.data;
      copyState.isLoadingGender = false;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_ROLE_FAILED:
      copyState = { ...state };
      copyState.isLoadingGender = false;
      copyState.roles = [];
      return {
        ...copyState,
      };
    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      copyState = { ...state };
      copyState.users = action.users;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_ALL_USERS_FAILED:
      copyState = { ...state };
      copyState.users = [];
      return {
        ...copyState,
      };
    case actionTypes.FETCH_DOCTOR_LIMIT_SUCCESS:
      copyState = { ...state };
      copyState.limitDoctors = action.dataDoctors;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_DOCTOR_LIMIT_FAILED:
      copyState = { ...state };
      copyState.limitDoctors = [];
      return {
        ...copyState,
      };
    case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
      copyState = { ...state };
      copyState.allDoctors = action.dataDr;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_ALL_DOCTORS_FAILED:
      copyState = { ...state };
      copyState.allDoctors = [];
      return {
        ...copyState,
      };
    case actionTypes.FETCH_DETAIL_INFO_DOCTOR_SUCCESS:
      copyState = { ...state };
      copyState.detailDoctor = action.dataInfor;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_DETAIL_INFO_DOCTOR_FAILED:
      copyState = { ...state };
      copyState.detailDoctor = [];
      return {
        ...copyState,
      };
    case actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_SUCCESS:
      copyState = { ...state };
      copyState.allSchedule = action.dataTime;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_FAILED:
      copyState = { ...state };
      copyState.allSchedule = [];
      return {
        ...copyState,
      };
    case actionTypes.FETCH_REQUIRE_DOCTOR_INFO_SUCCESS:
      copyState = { ...state };
      copyState.allRequiredDoctorInfo = action.data;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_REQUIRE_DOCTOR_INFO_FAILED:
      copyState = { ...state };
      copyState.allRequiredDoctorInfo = [];
      return {
        ...copyState,
      };
    default:
      return state;
  }
};

export default adminReducer;
