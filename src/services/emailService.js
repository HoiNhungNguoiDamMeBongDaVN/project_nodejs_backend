
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
    const info = await transporter.sendMail({
        from: '"Kha Ho 👻" <zukanopro2002@gmail.com>',
        to: dataSend.reciverEmail,
        subject: changeSubject(dataSend),
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

let sendAttachments = async (dataSend) => {
    // console.log(dataSend.file,"ra cai j");
    // return;
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        }
    });

    const info = await transporter.sendMail({
        from: '"Kha Ho 👻" <zukanopro2002@gmail.com>',
        to: dataSend.email,
        subject: changeSubject(dataSend),
        html: getBodyHTMLEmailRemedy(dataSend),
        attachments: [
            {
                filename: 'file.txt',
                content: dataSend.file,
                encoding: 'utf-8'
                // filename: 'file.docx',
                // content: dataSend.file.split(',')[1],  // Data URL format: data:image/jpeg;base64, ...
                // encoding: 'utf-8'
            },
        ]
    });
}


let changeSubject = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result = 'Thông tin đặt lịch khám bệnh ✔';
    }
    else {
        result = 'Medical Appointment Booking Information ✔';
    }
    return result;
}

let getBodyHTMLEmailRemedy = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result = `
        <h3>Xin chào ${dataSend.namePatient}</h3>
        <p>Bạn nhận được email thì đã khám bệnh thành công !</p>
        <p>Thông tin đơn thuốc:</p>
        <div><b ><i style="color:#737574">Đơn thuốc của bạn được gửi ở file bên dưới.</i></b></div>
        <div><span>Xin chân thành cảm ơn!</span></div>
        `
    }
    else {
        result = `
        <h3>Hello ${dataSend.namePatient}</h3>
        <p>You have received the email, the medical examination was successful!</p>
        <p>Prescription information:</p>
        <div><b ><i style="color:#737574">Your prescription is sent in the file below.</i></b></div>
        <div><span>Thank you sincerely!</span></div>
        `
    }
    return result;
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendAttachments: sendAttachments
}