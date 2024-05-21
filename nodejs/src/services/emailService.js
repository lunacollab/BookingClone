import nodemailer from "nodemailer";
require("dotenv").config();

let sendSimpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
      user: process.env.EMAIL_APP, 
      pass: process.env.EMAIL_APP_PASSWORD, 
    },
  });

  let info = await transporter.sendMail({
    from: '"JUST MIND 👻" <justmind234@gmail.com>',
    to: dataSend.receiverEmail,
    subject: "Thông tin đặt lịch khám bệnh",
    html: getBodyHtmlEmail(dataSend),
  });
};
let getBodyHtmlEmail = (dataSend)=>{
 let result = ""
 if(dataSend.language === "en"){
  result = `
     <h3>Dear ${dataSend.patientName}!</h3>
     <p>You received this email because you booked an online consultation on Booking clone</p>
     <p>Medical appointment booking information:</p>
     <div><b>Time: ${dataSend.time}</b></div>
     <div><b>Doctor: ${dataSend.doctorName}</b></div>
     <p>
     If the above information is true, 
     please click on the link below to confirm and complete the medical appointment procedure.
     </p>
     <div><a href=${dataSend.redirectLink} target="_blank">Click here</a></div>
     <div>Sincere thanks to all of you</div>
    `;
 }
 if(dataSend.language === "vi"){
   result = 
    `
     <h3>Xin chào ${dataSend.patientName}!</h3>
     <p>Bạn đã nhận được email này vì đã đặt lịch khám bệnh online trên Booking clone</p>
     <p>Thông tin đặt lịch khám bệnh:</p>
     <div><b>Thời gian: ${dataSend.time}</b></div>
     <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
     <p>Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để xác nhận 
     và hoàn tất thủ tục đặt lịch khám bệnh.
     </p>
     <div><a href=${dataSend.redirectLink} target="_blank">Click here</a></div>
     <div>Xin chân thành cảm ơn</div>
    `;
 }
 return result;
}

module.exports = {
  sendSimpleEmail,
};
