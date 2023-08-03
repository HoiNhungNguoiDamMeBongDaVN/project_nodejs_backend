
import nodemailer from "nodemailer";
require('dotenv').config();

let sendSimpleEmail = async (dataSend) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        }
    });

    // async..await is not allowed in global scope, must use a wrapper
    const info = await transporter.sendMail({
        from: '"Kha Ho 👻" <zukanopro2002@gmail.com>', // sender address
        to: dataSend.reciverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh ✔", // Subject line
        // text: "Hello world?", // plain text body
        html: getBodyHTMLEmail(dataSend),
    });
}

let getBodyHTMLEmail = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result = `
        <h3>Xin chào ${dataSend.patienName}</h3>
        <p>Bạn nhận được email thì đã đặt lịch khám bệnh online trên web KhaHo</p>
        <p>Thông tin đặt lịch khám bệnh:</p>
        <span>Thời gian:&emsp;<b>${dataSend.time}</b></span><br/>
        <span>Tên bác sĩ khám:&emsp;<b>${dataSend.nameDoctor}</b></span>
        <div><b ><i style="color:#737574">Nếu thông tin trên là đúng sự thật, vui long click vào đường link này để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh </i></b></div>
        <a href=${dataSend.redirectLink} target="_blank">Click here!</a>
        <div><span>Xin chân thành cảm ơn!</span></div>
        `
    }
    else {
        result = `
        <h3>Hello ${dataSend.patienName}</h3>
        <p>In case you have received the email, you have already scheduled an online medical appointment on the KhaHo website.</p>
        <p>Medical Appointment Booking Information:</p>
        <span>Time:&emsp;<b>${dataSend.time}</b></span><br/>
        <span>Doctor's Name:&emsp;<b>${dataSend.nameDoctor}</b></span>
        <div><b ><i style="color:#737574">If the information above is true, please click on this link to confirm and complete the procedure for scheduling a medical appointment.</i></b></div>
        <a href=${dataSend.redirectLink} target="_blank">Click here!</a>
        <div><span>Thank you sincerely!</span></div>
        `
    }
    return result;
}



module.exports = {
    sendSimpleEmail: sendSimpleEmail
}