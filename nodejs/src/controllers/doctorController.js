import doctorService from "../services/doctorService";

let getDoctorLimit = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let respone = await doctorService.getDoctorLimit(+limit);
	return res.status(200).json(respone)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        });
    }
}
let getAllDoctors =async (req,res)=>{
    try{
       let doctors = await doctorService.getAllDoctors()
       return res.status(200).json(doctors);
    }catch(e){
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
let postInforDoctor = async(req,res) =>{
   try{
    let respone = await doctorService.saveDetailInforDoctor(req.body);
    return res.status(200).json(respone);
   }catch(e){
     console.log(e);
     return res.status(200).json({
       errCode: -1,
       errMessage: "Error from server",
     })
   }
};
let getDetailDoctorById = async(req,res)=>{
try{
  let infor = await doctorService.getDetailDoctorById(req.query.id);
  return res.status(200).json(infor)
  }catch(e){
    console.log(e)
    return res.status(200).json({
        errCode:-1,
        errMessage: 'Error from server'
    })
  }
};

let bulkCreateDoctorSchedule = async(req, res) => {
  try{
    let data = await doctorService.bulkCreateDoctorSchedule(req.body);
    return res.status(200).json(data)
  }catch(e){
    console.log(e)
    return res.status(200).json({
      errCode:-1,
      errMessage: 'Error from server'
    })
  }
}
let getScheduleDoctorByDate = async(req,res) =>{
  try{
   let data = await doctorService.getScheduleDoctorByDate(req.query.doctorId, req.query.date);
   return res.status(200).json(data)
  }catch(e){
    console.log(e)
     return res.status(200).json({
       errCode: -1,
       errMessage: "Error from server",
     });
  }
};
let getExtraInfoDoctorById = async(req,res) =>{
  try{
   let data = await doctorService.getExtraInfoDoctorById(req.query.doctorId);
   return res.status(200).json(data);
  }catch(e){
    console.log(e)
    return res.status(200).json({
      errCode:-1,
      errMessage: "Error from server",
    })
  }
};
let getProfileDoctorById = async(req,res)=>{
  try{
   let data = await doctorService.getProfileDoctorById(req.query.doctorId);
   return res.status(200).json(data);
  }catch(e){
     console.log(e);
     return res.status(200).json({
       errCode: -1,
       errMessage: "Error from server",
     });
  }
};
let getListPatientForDoctor = async(req,res) => {
   try{
   let data = await doctorService.getListPatientForDoctor(req.query.doctorId,req.query.date);
   return res.status(200).json(data);
  }catch(e){
     console.log(e);
     return res.status(200).json({
       errCode: -1,
       errMessage: "Error from server",
     });
  }
};
module.exports = {
  getDoctorLimit,
  getAllDoctors,
  postInforDoctor,
  getDetailDoctorById,
  bulkCreateDoctorSchedule,
  getScheduleDoctorByDate,
  getExtraInfoDoctorById,
  getProfileDoctorById,
  getListPatientForDoctor,
};

