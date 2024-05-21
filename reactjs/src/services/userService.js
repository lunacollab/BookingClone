import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("api/login", { email, password });
};
const getAllUsers = (inputId) => {
  return axios.get(`api/get-all-users?id=${inputId}`);
};
const createNewUserService = (data) => {
  return axios.post(`api/create-new-user`, data);
};
const deleteUserById = (userId) => {
  return axios.delete(`api/delete-user?id=${userId}`);
};
const editUserService = (data) => {
  return axios.put("api/edit-user", data);
};
const getAllCodeService = (inputType) => {
  return axios.get(`api/allcode?type=${inputType}`);
};
const getDoctorLimitService = (limit)=>{
  return axios.get(`api/get-doctor-limit?limit=${limit}`)
}
const getAllDoctors = ()=>{
  return axios.get(`api/get-all-doctors`)
}
const saveDetailDoctor = (data)=>{
  return axios.post(`api/save-infor-doctors`,data);
}
const getDoctorInfor = (inputId)=>{
  return axios.get(`api/get-detail-doctor-by-id?id=${inputId}`);
}
const saveBulkDoctor = (data)=>{
  return axios.post(`/api/bulk-create-schedule`,data);
}
const getScheduleDocotorByDate = (doctorId, date)=>{
  return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
}
const getExtraDoctorInfoById = (doctorId)=>{
  return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`);
}
const getProfileDoctorById = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};
const postPatientBookAppointment = (data) => {
  return axios.post(`/api/patient-book-appointment`, data);
};
export {
  createNewUserService,
  deleteUserById,
  editUserService,
  getAllCodeService,
  getAllUsers,
  handleLoginApi,
  getDoctorLimitService,
  getAllDoctors,
  saveDetailDoctor,
  getDoctorInfor,
  saveBulkDoctor,
  getScheduleDocotorByDate,
  getExtraDoctorInfoById,
  getProfileDoctorById,
  postPatientBookAppointment,
};
