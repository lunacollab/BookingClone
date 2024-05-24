import db from "../models/index";

let createSpecialty = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        });
      } else {
        await db.Specialty.create({
          name: data.name,
          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
        });
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
let getAllSpecialties = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Specialty.findAll();
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
let getDetailSpecialtyById = (inputId, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId || !location) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        });
      } else {
         let data = await db.Specialty.findOne({
            where: { id: inputId },
            attributes: ["descriptionHTML", "descriptionMarkdown","name"],
          });

          if (data) {
            let doctorSpecialty = []
            if(location === "ALL"){
                doctorSpecialty = await db.Doctor_Info.findAll({
                  where: { specialtyId: inputId },
                  attributes: ["doctorId", "provinceId"],
                });
            }else{
               doctorSpecialty = await db.Doctor_Info.findAll({
                 where: { 
                  specialtyId: inputId,
                  provinceId:location
                 },
                 attributes: ["doctorId", "provinceId"],
               });
            }
            let doctorSpecialtyData = doctorSpecialty.map(
              (item) => item.dataValues
            );
            data = {
              ...data.dataValues,
              doctorSpecialty: doctorSpecialtyData,
            };
          } else data = {};

          resolve({
            errCode: 0,
            errMessage: "ok",
            data,
          });
       
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createSpecialty,
  getAllSpecialties,
  getDetailSpecialtyById,
};
