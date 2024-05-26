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
const postVerifyBookingAppointment = (data) => {
   return axios.post(`/api/verify-book-appointment`, data);
}
const createNewSpecialty = (data) => {
  return axios.post(`/api/create-new-specialty`, data);
};
const getAllSpecialties = ()=>{
  return axios.get(`/api/get-all-specialties`)
}
const getDetailSpecialtyById = (data) => {
  return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
};
const createNewClinic = (data)=>{
   return axios.post(`/api/create-new-clinic`, data);
}
const getAllClinics = ()=>{
   return axios.get(`/api/get-all-clinics`)
}
const getDetailClinicById=(data)=>{
  return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
}
const getAllPatientForDoctor = (data) => {
  return axios.get(`api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`);
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
  postVerifyBookingAppointment,
  createNewSpecialty,
  getAllSpecialties,
  getDetailSpecialtyById,
  createNewClinic,
  getAllClinics,
  getDetailClinicById,
  getAllPatientForDoctor,
};
