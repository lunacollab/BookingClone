import db from "../models/index";


let checkRequiredFields = (inputData) => {
  let arr = [
    "name",
    "address",
    "descriptionHTML",
    "descriptionMarkdown",
    "imageBase64",
  ];
  let isValid = true;
  let element = "";
  for (let i = 0; i < arr.length; i++) {
    if (!inputData[arr[i]]) {
      isValid = false;
      element = arr[i];
      break;
    }
  }
  return { isValid, element };
};
let createClinic = (inputData) =>{
   return new Promise(async(resolve, reject) => {
    try{
      let checkObj = checkRequiredFields(inputData);
      if (checkObj.isValid === false) {
        resolve({
          errCode: 1,
          errMessage: `Missing parameter: ${checkObj.element}`,
        });
      }else{
        await db.Clinic.create({
          name: inputData.name,
          address: inputData.address,
          image: inputData.imageBase64,
          descriptionHTML: inputData.descriptionHTML,
          descriptionMarkdown: inputData.descriptionMarkdown,
        });
        resolve({
            errCode:0,
            errMessage:"Ok"
        })
      }
    }catch(e){
        reject(e);
    }
   })
}
let getAllClinics = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Clinic.findAll();
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = new Buffer(item.image, "base64").toString("binary");
          return item;
        });
      }
      resolve({
        errCode: 0,
        errMessage: "ok",
        data,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getDetailClinicById =(inputId)=>{
  return new Promise(async(resolve, reject)=>{
   try{
   if(!inputId){
    resolve({
      errCode:1,
      errMessage:"Missing required parameter"
    })
   }else{
    let data = await db.Clinic.findOne({
       where: { id: inputId },
       attributes: ["descriptionHTML", "descriptionMarkdown", "name","address"]
     });
     if(data){
      let doctorClinic = []
      doctorClinic = await db.Doctor_Info.findAll({
        where: { clinicId: inputId },
        attributes: ["doctorId"],
      });
       let doctorClinicData = doctorClinic.map((item) => item.dataValues);
       data = {
         ...data.dataValues,
         doctorClinic: doctorClinicData,
       };
     }
     else data ={}
     resolve({
       errCode: 0,
       errMessage: "ok",
       data,
     });
   }
   }catch(e){
    reject(e);
   } 
   })
};
module.exports = {
  createClinic,
  getAllClinics,
  getDetailClinicById,
};