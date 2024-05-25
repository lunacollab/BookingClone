import { toast } from "react-toastify";
import {
  createNewUserService,
  deleteUserById,
  editUserService,
  getAllCodeService,
  getAllDoctors,
  getAllUsers,
  getDoctorLimitService,
  saveDetailDoctor,
  getDoctorInfor,
  getAllSpecialties,
  getAllClinics
} from "../../services/userService";
import actionTypes from "./actionTypes";

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
      console.log("fetch gender error", e);
    }
  };
};
export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});
export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (e) {
      dispatch(fetchPositionFailed());
      console.log("fetch position error", e);
    }
  };
};
export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});
export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (e) {
      dispatch(fetchRoleFailed());
      console.log("fetch role error", e);
    }
  };
};
export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      if (res && res.errCode === 0) {
        toast.success("Created a new user succeeded!");
        dispatch(saveUserSuccess(res.data));
        dispatch(fetchAllUsersStart());
      } else {
        dispatch(saveUserFailed());
      }
    } catch (e) {
      dispatch(saveUserFailed());
      console.log("fetch role error", e);
    }
  };
};
export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});
export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});
export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllUsersSuccess(res.users.reverse()));
      } else {
        dispatch(fetchAllUsersFailed());
      }
    } catch (e) {
      dispatch(fetchAllUsersFailed());
      console.log("fetch role error", e);
    }
  };
};
export const fetchAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data,
});
export const fetchAllUsersFailed = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
});
export const deleteUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserById(userId);
      if (res && res.errCode === 0) {
        toast.success("Delete the user succeeded!");
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("Delete the user failed");
        dispatch(deleteUserFailed());
      }
    } catch (e) {
      dispatch(deleteUserFailed());
      console.log("fetch delete error", e);
    }
  };
};
export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

export const editUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      if (res && res.errCode === 0) {
        toast.success("Update user succeeded!");
        dispatch(editUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("Update user failed");
        dispatch(editUserFailed());
      }
    } catch (e) {
      dispatch(editUserFailed());
      console.log("fetch edit error", e);
    }
  };
};
export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});
export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});

export const fetchDoctorLimit = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getDoctorLimitService(10);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_DOCTOR_LIMIT_SUCCESS,
          dataDoctors: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_DOCTOR_LIMIT_FAILED,
        });
      }
    } catch (e) {
      console.log("fetch limit user error", e);
      dispatch({
        type: actionTypes.FETCH_DOCTOR_LIMIT_FAILED,
      });
    }
  };
};

export const fetchAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctors();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
          dataDr: res.data
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
        });
      }
    } catch (e) {
      console.log("fetch all doctors error", e);
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
      });
    }
  };
};
export const saveDetailDoctorAction = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailDoctor(data);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
        });
        toast.success("Save Detail Doctor Suceeded");
      } else {
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
        });
        toast.error("Save Detail Doctor Failed");
      }
    } catch (e) {
      dispatch({
        type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
      });
      toast.error("Save Detail Doctor Failed");
    }
  };
};
export const fetchAllDoctorInfor = (id,type) => {
  return async (dispatch, getState) => {
    try {
      let res = await getDoctorInfor(id);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_DETAIL_INFO_DOCTOR_SUCCESS,
          dataInfor: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_DETAIL_INFO_DOCTOR_FAILED,
        });
      }
    } catch (e) {
      console.log(e)
      dispatch({
        type: actionTypes.FETCH_DETAIL_INFO_DOCTOR_FAILED,
      });
    }
  };
};

export const fetchAllScheduleTime = (type) => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME"); 
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_SUCCESS,
          dataTime:res.data
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_FAILED,
        });
      }
    } catch (e) {
      console.log("fetch all schedule error", e);
      dispatch({
        type: actionTypes.FETCH_ALL_CODE_SCHEDULE_HOURS_FAILED,
      });
    }
  };
};
export const getRequireDoctorInfo = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_REQUIRE_DOCTOR_INFO_START,
      });
      let resPrice = await getAllCodeService("PRICE");
      let resPayment = await getAllCodeService("PAYMENT");
      let resPronvince = await getAllCodeService("PROVINCE");
      let resSpecialty  = await getAllSpecialties()
      let resClinic = await getAllClinics()
      if (resPrice && resPrice.errCode === 0 
        && resPayment && resPayment.errCode == 0
        && resPronvince && resPronvince.errCode === 0
        && resSpecialty && resSpecialty.errCode === 0
        && resClinic && resClinic.errCode === 0
        ) {
          let data = {
            resPrice: resPrice.data,
            resPayment: resPayment.data,
            resPronvince: resPronvince.data,
            resSpecialty:resSpecialty.data,
            resClinic: resClinic.data
          }
        dispatch(fetchRequiredDoctorSuccess(data));
      } else {
        dispatch(fetchRequiredDoctorFailed());
      }
    } catch (e) {
      dispatch(fetchRequiredDoctorFailed());
      console.log("fetch data error", e);
    }
  };
};
export const fetchRequiredDoctorSuccess = (allRequiredData) => ({
  type: actionTypes.FETCH_REQUIRE_DOCTOR_INFO_SUCCESS,
  data: allRequiredData,
});
export const fetchRequiredDoctorFailed = () => ({
  type: actionTypes.FETCH_REQUIRE_DOCTOR_INFO_FAILED,
});
