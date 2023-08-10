

import db from "../models/index";
require('dotenv').config();
import emailservice from "./emailService";
import { v4 as uuidv4 } from 'uuid';

let buildUrlEmail = (doctorid, token) => {
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorid=${doctorid}`;
    return result;

}

let createPatienBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorid || !data.timeType || !data.date || !data.fullname || !data.nameDoctor || !data.selectGender || !data.address || !data.fullname) {
                resolve({
                    errCode: 1,
                    message: "Missing parameter"
                });
            }
            else {
                let token = uuidv4();
                await emailservice.sendSimpleEmail({
                    reciverEmail: data.email,
                    patienName: data.fullname,
                    time: data.timeBooking,
                    nameDoctor: data.nameDoctor,
                    language: data.language,
                    redirectLink: buildUrlEmail(data.doctorid, token)
                });

                // method findOrCreate de check neu trong data co patienid roi thi ko luu data vao nua neu chu co thi luu vo
                let user = await db.user.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        firstName: data.fullname,
                        gender: data.selectGender,
                        address: data.address,
                        email: data.email,
                        roleid: "R3"
                    }
                });
                // lay user[0] them 0 vao boi vi ham findOrCreate tra ra array co 2 phan tu data khi query va bien true or false, nen them 0 de lay phan tu dau tien moi tao data cho ban booking
                // method findOrCreate de check neu trong data co patienid roi thi ko luu data vao nua neu chu co thi luu vo
                if (user && user[0]) {
                    await db.bookings.findOrCreate({
                        where: { patienid: user[0].id },
                        defaults: {
                            statusid: "S1",
                            doctorid: data.doctorid,
                            patienid: user[0].id,
                            date: data.date,
                            time_type: data.timeType,
                            token: token
                        }
                    })
                }
                resolve({
                    errCode: 0,
                    message: "OK"
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

let verifyPatienBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.token || !data.doctorid) {
                resolve({
                    errCode: 1,
                    message: "Missing parameter"
                });
            }
            else {
                let appointment = await db.bookings.findOne({
                    where: { doctorid: data.doctorid, token: data.token, statusid: 'S1' },
                    raw: false
                })
                if (appointment) {
                    await appointment.update({
                        statusid: 'S2'
                    });
                    resolve({
                        errCode: 0,
                        message: "Update appointment success!"
                    })
                }
                else {
                    resolve({
                        errCode: 2,
                        message: "appointment has been activated or does not exist!"
                    })
                }
            }
        } catch (error) {
            reject(error);
        }
    })
}

let getListPatient = (id, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id || !date) {
                resolve({
                    errCode: 1,
                    message: "Missing parameter"
                });
            }
            else {
                let dataPatient = await db.bookings.findAll({
                    where: { doctorid: id, date: date, statusid: 'S2' },
                    include: [
                        {
                            model: db.user, as: 'dataPatient', attributes: ['email', 'firstName', 'address', 'gender'],

                            include: [
                                { model: db.allcodes, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
                            ]
                        },
                        {
                            model: db.allcodes, as: 'timeDetail', attributes: ['valueEn', 'valueVi']
                        }
                    ],
                    raw: false, nest: true
                });
                resolve({
                    errCode: 0,
                    message: "OK",
                    data: dataPatient
                });
            }
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
}

let sendRemedyPatient = (data) => {
    // console.log(data, "co j ko");
    // return;
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.file || !data.doctorid || !data.patientid || !data.timeType) {
                resolve({
                    errCode: 1,
                    message: "Missing parameter"
                });
            }
            else {
                let appointment = await db.bookings.findOne({
                    where: { doctorid: data.doctorid, patienid: data.patientid, time_type: data.timeType, statusid: "S2" },
                    raw: false
                })
                if (appointment) {
                    await appointment.update({
                        statusid: 'S3'
                    });
                }
                await emailservice.sendAttachments(data);
                resolve({
                    errCode: 0,
                    message: "Update appoinment success!"
                })
            }
        } catch (error) {
            reject(error);
        }
        // try {
        //     if (!data.email || !data.image || !data.doctorid || !data.patientid || !data.timeType) {
        //         resolve({
        //             errCode: 1,
        //             message: "Missing parameter"
        //         });
        //     }
        //     else {

        //         let appointment = await db.bookings.findOne({
        //             where: { doctorid: data.doctorid, patienid: data.patientid, time_type: data.timeType, statusid: "S2" },
        //             raw: false
        //         })
        //         if (appointment) {
        //             await appointment.update({
        //                 statusid: 'S3'
        //             });
        //         }
        //         await emailservice.sendAttachments(data);
        //         resolve({
        //             errCode: 0,
        //             message: "Update appoinment success!"
        //         })
        //     }
        // } catch (error) {
        //     reject(error);
        // }
    })
}

module.exports = {
    createPatienBookAppointment: createPatienBookAppointment,
    verifyPatienBookAppointment: verifyPatienBookAppointment,
    getListPatient: getListPatient, sendRemedyPatient: sendRemedyPatient
}