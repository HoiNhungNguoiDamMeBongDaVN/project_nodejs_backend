
import db from "../models/index";
require('dotenv').config();
const _ = require('lodash');
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let getTopDoctorHome = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            // let limit =limitInput;
            let allDoctor = await db.user.findAll({
                where: { roleid: "R2" },
                limit: parseInt(limitInput),
                order: [['createdAt', 'DESC']],
                attributes: { exclude: 'password' },
                include: [
                    { model: db.allcodes, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.allcodes, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
                ],
                raw: true,
                nest: true
            });
            resolve({
                errCode: 0,
                message: "Ok",
                data: allDoctor
            })
        } catch (error) {
            reject(error);
        }
    })
}

let getAllDoctors = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctorAll = await db.user.findAll({
                where: { roleid: "R2" },
                attributes: { exclude: ['password', 'image'] },
            });
            resolve({
                errCode: 0,
                message: "Ok",
                data: doctorAll
            })
        } catch (error) {
            reject(error)
        }
    })
}

let saveInforDoctor = (data) => {

    return new Promise(async (resolve, reject) => {
        try {
            if (!data.doctorid || !data.contentHTML || !data.contentMarkdown || !data.action) {
                resolve({
                    errCode: 1,
                    message: "Missing parameter"
                });
            }
            else {
                if (data.action === 'CREATE') {
                    await db.markdowns.create({
                        contentHTML: data.contentHTML,
                        contentMarkdown: data.contentMarkdown,
                        descriptions: data.descriptions,
                        doctorid: data.doctorid
                    });
                }
                else if (data.action === 'EDIT') {
                    let doctorInfor = await db.markdowns.findOne({
                        where: { doctorid: data.doctorid },
                        raw: true
                    });
                    if (doctorInfor) {
                        await db.markdowns.update({
                            contentHTML: data.contentHTML,
                            contentMarkdown: data.contentMarkdown,
                            descriptions: data.descriptions,
                            doctorid: data.doctorid
                        }, {
                            where: { doctorid: data.doctorid }
                        });
                    }
                }
                resolve({
                    errCode: 0,
                    message: 'Created infor doctor'
                });
            }
        } catch (error) {
            console.log(error, "loi gi o day");
            reject(error)
        }
    })
}


let getDetailInforDoctor = (idDoctor) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!idDoctor) {
                resolve({
                    errCode: 1,
                    message: "Missing required parameter!"
                })
            }
            else {
                let inforDoctor = await db.user.findOne({
                    where: { id: idDoctor },
                    attributes: { exclude: ['password'] },
                    include: [
                        { model: db.markdowns, attributes: ['id', 'contentHTML', 'contentMarkdown', 'descriptions', 'doctorid'] },
                        { model: db.allcodes, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    ],
                    raw: true,
                    nest: true
                });
                if (inforDoctor && inforDoctor.image) {
                    inforDoctor.image = Buffer.from(inforDoctor.image, 'base64').toString('binary');
                }
                resolve({
                    errCode: 0,
                    message: "OK",
                    data: inforDoctor
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

let bulkCreateScheduleDoctor = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.arrSchedule) {
                resolve({
                    errCode: 1,
                    message: "Missing required param !"
                })
            }
            else {
                // MAX_NUMBER_SCHEDULE dung để giới hạng số lượng người khám bệnh, ko cho số lượng lớn hơn 10(với 10 là biến hardcode trong file env)
                let schedule = data.arrSchedule;

                if (schedule && schedule.length > 0) {
                    schedule = schedule.map((item, index) => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE;
                        return item;
                    })
                }
                //check data exist
                let exiting = await db.schedules.findAll({
                    where: { doctorid: data.doctorid, date: data.date },
                    attributes: ['maxNumber', 'date', 'timeType', 'doctorid']
                });
                //convert date
                if (exiting && exiting.length > 0) {
                    exiting = exiting.map(item => {
                        item.date = new Date(item.date).getTime();
                        return item;
                    })

                }
                //check xem du lieu co bi trung ko
                let toCreate = _.differenceWith(schedule, exiting, (a, b) => {
                    return a.timeType === b.timeType && a.date === b.date
                });

                if (toCreate && toCreate.length > 0) {
                    await db.schedules.bulkCreate(toCreate);
                }
                resolve({
                    errCode: 0,
                    message: "ok"
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

let getScheduleDoctorByDate = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    errCode: 1,
                    message: 'Missing required parameters'
                })
            }
            else {
                let dataSchedule = await db.schedules.findAll({
                    where: {
                        doctorid: doctorId,
                        date: date
                    }
                });
                if (!dataSchedule) dataSchedule = [];
                if (dataSchedule) {
                    resolve({
                        errCode: 0,
                        data: dataSchedule
                    })
                }
            }
        } catch (error) {
            reject(error);
        }
    })
}


module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    saveInforDoctor: saveInforDoctor,
    getDetailInforDoctor: getDetailInforDoctor,
    bulkCreateScheduleDoctor: bulkCreateScheduleDoctor,
    getScheduleDoctorByDate: getScheduleDoctorByDate
}