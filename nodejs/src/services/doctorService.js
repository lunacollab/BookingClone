import db from "../models/index";
require("dotenv").config();
let MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;
let getDoctorLimit = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        limit: limitInput,
        order: [["createdAt", "DESC"]],
        where: { roleId: "R2" },
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        raw: true,
        nest: true,
      });
      resolve({
        errCode: 0,
        data: users,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getAllDoctors = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctors = await db.User.findAll({
        where: { roleId: "R2" },
        attributes: {
          exclude: ["password", "image"],
        },
      });
      resolve({
        errCode: 0,
        data: doctors,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let checkRequiredFields = (inputData)=>{
    let arr =["doctorId", "contentHTML","contentMarkdown","action",
     "selectedPrice","selectedPayment","selectedProvince","nameClinic",
     "addressClinic","note","specialtyId"	    
    ]
    let isValid = true;
    let element = "";    
   for(let i = 0;i < arr.length;i++){
    if(!inputData[arr[i]]){
       isValid = false;
       element = arr[i];
       break;
    }
   }
  return({isValid, element})		
}

let saveDetailInforDoctor = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkObj = checkRequiredFields(inputData);
      if (checkObj.isValid === false) {
        resolve({
          errCode: 1,
          errMessage: `Missing parameter: ${checkObj.element}`,
        });
      } else {
        if (inputData.action === "CREATE") {
          await db.Markdown.create({
            contentHTML: inputData.contentHTML,
            contentMarkdown: inputData.contentMarkdown,
            description: inputData.description,
            doctorId: inputData.doctorId,
          });
        } else if (inputData.action === "EDIT") {
          let doctorMarkdown = await db.Markdown.findOne({
            where: { doctorId: inputData.doctorId },
            raw: false,
          });
          if (doctorMarkdown) {
            doctorMarkdown.contentHTML = inputData.contentHTML;
            doctorMarkdown.contentMarkdown = inputData.contentMarkdown;
            doctorMarkdown.description = inputData.description;
            await doctorMarkdown.save();
          }
        }

        let doctorInfo = await db.Doctor_Info.findOne({
          where: { doctorId: inputData.doctorId },
          raw: false,
        });

        if (doctorInfo) {
          doctorInfo.priceId = inputData.selectedPrice;
          doctorInfo.paymentId = inputData.selectedPayment;
          doctorInfo.provinceId = inputData.selectedProvince;
          doctorInfo.nameClinic = inputData.nameClinic;
          doctorInfo.addressClinic = inputData.addressClinic;
          doctorInfo.note = inputData.note;
          doctorInfo.specialtyId = inputData.specialtyId;
          doctorInfo.clinicId = inputData.clinicId ? inputData.clinicId : null;
          await doctorInfo.save();
        } else {
          await db.Doctor_Info.create({
            doctorId: inputData.doctorId,
            priceId: inputData.selectedPrice,
            paymentId: inputData.selectedPayment,
            provinceId: inputData.selectedProvince,
            nameClinic: inputData.nameClinic,
            addressClinic: inputData.addressClinic,
            specialtyId: inputData.specialtyId,
            clinicId: inputData.clinicId ? inputData.clinicId : null,
            note: inputData.note,
          });
        }

        resolve({
          errCode: 0,
          errMessage: "Save doctor information succeeded",
        });
      }
    } catch (error) {
      console.error("Error saving doctor information:", error);
      reject(error);
    }
  });
};

let getDetailDoctorById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let data = await db.User.findOne({
          where: { id: inputId },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.Markdown,
              attributes: ["description", "contentHTML", "contentMarkdown"],
            },
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Doctor_Info,
              attributes: {
                exclude: ["id", "doctorId"],
              },
              include: [
                {
                  model: db.Allcode,
                  as: "priceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "paymentTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "provinceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
              ],
            },
          ],
          raw: false,
          nest: true,
        });
        if (data && data.image) {
          data.image = new Buffer(data.image, "base64").toString("binary");
        }
        if(!data) data = {};
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let bulkCreateDoctorSchedule = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.arrSchedule) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let schedule = data.arrSchedule;

        let uniqueDates = [...new Set(schedule.map((item) => item.date))];

        for (let i = 0; i < uniqueDates.length; i++) {
          let currentDate = uniqueDates[i];
          let currentDateSchedules = schedule.filter(
            (item) => item.date === currentDate
          );
          let uniqueTimeTypes = [
            ...new Set(currentDateSchedules.map((item) => item.timeType)),
          ];

          for (let j = 0; j < uniqueTimeTypes.length; j++) {
            let currentTimeType = uniqueTimeTypes[j];
            let existingSchedule = await db.Schedule.findOne({
              where: {
                doctorId: currentDateSchedules[0].doctorId, 
                timeType: currentTimeType,
                date: currentDate,
              },
            });

            if (existingSchedule) {
              schedule = schedule.filter(
                (item) =>
                  !(
                    item.date === currentDate &&
                    item.timeType === currentTimeType
                  )
              );
            }
          }
        }

        if (schedule.length > 0) {
          schedule = schedule.map((item) => {
            item.maxNumber = MAX_NUMBER_SCHEDULE;
            return item;
          });
          await db.Schedule.bulkCreate(schedule);
        }

        resolve({
          errCode: 0,
          errMessage: "Ok",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getScheduleDoctorByDate = (doctorId, date)=>{
  return new Promise(async(resolve, reject)=>{
     try {
      if(!doctorId||!date){
        resolve({
          errCode:1,
          errMessage:"Missing required parameter"
        })
      }else{
        let dataSchedule = await db.Schedule.findAll({
          where: {
            doctorId: doctorId,
            date: date,
          },

          include: [
            {
              model: db.Allcode,
              as: "timeTypeData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.User,
              as: "doctorData",
              attributes: ["firstName", "lastName"],
            },
          ],
          raw: false,
          nest: true,
        });
        if(!dataSchedule) dataSchedule = [];
        resolve({
          errCode:0,
          data:dataSchedule
        })
      }
     } catch (e) {
      reject(e)
     }
  })
};
let getExtraInfoDoctorById =(doctorId)=>{
  return new Promise(async(resolve, reject)=>{
      try{
        if(!doctorId){
          resolve({
            errCode:1,
            errMessage:"Missing required parameters"
          })
        }else{
          let data = await db.Doctor_Info.findOne({
            where: { doctorId: doctorId },
            attributes: {
              exclude: ["doctorId","id"],
            },
            include: [
              {
                model: db.Allcode,
                as: "priceTypeData",
                attributes: ["valueEn", "valueVi"],
              },
              {
                model: db.Allcode,
                as: "paymentTypeData",
                attributes: ["valueEn", "valueVi"],
              },
              {
                model: db.Allcode,
                as: "provinceTypeData",
                attributes: ["valueEn", "valueVi"],
              },
            ],
            raw:false,
            nest:true
          });
          if(!data) data={}
          resolve({
            errCode:0,
            data:data
          })
        }

      }catch(e){
        reject(e)
      }
  })
};
let getProfileDoctorById = (doctorId)=>{
 return new Promise(async(resolve, reject)=>{
  try{
     if(!doctorId){
          resolve({
            errCode:1,
            errMessage:"Missing required parameters"
          })
     }else{
        let data = await db.User.findOne({
          where: { id: doctorId },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Markdown,
              attributes: ["description"],
            },
            {
              model: db.Doctor_Info,
              attributes: {
                exclude: ["id", "doctorId"],
              },
              include: [
                {
                  model: db.Allcode,
                  as: "priceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "paymentTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "provinceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
              ],
            },
          ],
          raw: false,
          nest: true,
        });
        if (data && data.image) {
          data.image = new Buffer(data.image, "base64").toString("binary");
        }
        if (!data) data = {};
        resolve({
          errCode: 0,
          data: data,
        });
     }
  }catch(e){
    reject(e)
  }
 })
};
module.exports = {
  getDoctorLimit,
  getAllDoctors,
  saveDetailInforDoctor,
  getDetailDoctorById,
  bulkCreateDoctorSchedule,
  getScheduleDoctorByDate,
  getExtraInfoDoctorById,
  getProfileDoctorById,
};
