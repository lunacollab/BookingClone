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
module.exports = {
    createClinic
}