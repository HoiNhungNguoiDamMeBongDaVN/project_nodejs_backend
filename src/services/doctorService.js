
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
                attributes: { exclude: ['password'] },
                include: [
                    { model: db.allcodes, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.allcodes, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.doctorinfor, attributes: ['note'] }

                ],
                raw: true,
                nest: true
            });
            if (allDoctor && allDoctor.length > 0) {
                allDoctor.map(item => {
                    item.image = Buffer.from(item.image, 'base64').toString('binary');
                    return item;
                })
            }
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

let checkReuireFiels = (data) => {
    let arr = ['doctorid', 'contentHTML', 'contentMarkdown', 'action', 'selectPrice', 'selectPayment', 'selectProvice', 'nameClinic', 'nameAddress', 'note', 'selectSpecialtyId']

    let isCheck = true;
    let element = '';
    for (let i = 0; i < arr.length; i++) {
        if (!data[arr[i]]) {
            isCheck = false;
            element = arr[i]
            break;
        }
    }
    return {
        isCheck: isCheck,
        element: element
    }
}

let saveInforDoctor = (data) => {

    return new Promise(async (resolve, reject) => {
        try {
            let check = checkReuireFiels(data)
            if (check.isCheck === false) {
                resolve({
                    errCode: 1,
                    message: `Missing parameter: ${check.element}`
                });
            }
            else {
                // create or edit data table markdowns
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

                // create or edit data table doctorInfor

                let dataDoctorinfor = await db.doctorinfor.findOne({
                    where: {
                        doctorid: data.doctorid
                    },
                    raw: true
                })

                if (dataDoctorinfor) {
                    await db.doctorinfor.update({
                        specialtyid: data.selectSpecialtyId,
                        clinicid: data.selectClinicId,
                        priceid: data.selectPrice,
                        proviceid: data.selectProvice,
                        paymentid: data.selectPayment,
                        addressclinic: data.nameAddress,
                        nameclinic: data.nameClinic,
                        note: data.note
                    }, {
                        where: { doctorid: data.doctorid }
                    });
                }
                else {
                    await db.doctorinfor.create({
                        specialtyid: data.selectSpecialtyId,
                        clinicid: data.selectClinicId,
                        doctorid: data.doctorid,
                        priceid: data.selectPrice,
                        proviceid: data.selectProvice,
                        paymentid: data.selectPayment,
                        addressclinic: data.nameAddress,
                        nameclinic: data.nameClinic,
                        note: data.note
                    })
                }

                resolve({
                    errCode: 0,
                    message: 'Created infor doctor'
                });
            }
        } catch (error) {
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
                        {
                            model: db.doctorinfor,
                            attributes: { exclude: ['id', 'doctorid', 'createdAt', 'updatedAt'] },
                            include: [
                                { model: db.allcodes, as: 'priceType', attributes: ['valueEn', 'valueVi'] },
                                { model: db.allcodes, as: 'provice', attributes: ['valueEn', 'valueVi'] },
                                { model: db.allcodes, as: 'payment', attributes: ['valueEn', 'valueVi'] }
                            ]
                        },
                        { model: db.allcodes, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    ],
                    raw: true,
                    nest: true
                });
                if (inforDoctor && inforDoctor.image) {
                    inforDoctor.image = Buffer.from(inforDoctor.image, 'base64').toString('binary');
                }
                if (!inforDoctor) inforDoctor = {};
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
                    where: { doctorid: doctorIdBigInt, date: { [Op.eq]: new Date(data.date) } },
                    attributes: ['maxNumber', 'date', 'timeType', 'doctorid']
                });
                //check xem du lieu co bi trung ko
                // dau + de chuyen doi tu string sang number
                let toCreate = _.differenceWith(schedule, exiting, (a, b) => {
                    return a.timeType === b.timeType && +a.date === +b.date
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
                    },
                    include: [
                        { model: db.allcodes, as: 'timeData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.user, as: 'doctorData', attributes: ['firstName', 'lastName'] }
                    ],
                    raw: true,
                    nest: true
                });
                if (!dataSchedule) dataSchedule = [];
                if (dataSchedule) {
                    resolve({
                        errCode: 0,
                        message: 'OK',
                        data: dataSchedule
                    })
                }
            }
        } catch (error) {
            reject(error);
        }
    })
}

let getDoctorExtraInforById = (idDoctor) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!idDoctor) {
                resolve({
                    errCode: 1,
                    message: 'Missing required parameters'
                });
            }
            else {
                let dataExtra = await db.doctorinfor.findOne({
                    where: {
                        doctorid: idDoctor
                    },
                    attributes: { exclude: ['id', 'doctorid', 'createdAt', 'updatedAt'] },
                    include: [
                        { model: db.allcodes, as: 'priceType', attributes: ['valueEn', 'valueVi'] },
                        { model: db.allcodes, as: 'provice', attributes: ['valueEn', 'valueVi'] },
                        { model: db.allcodes, as: 'payment', attributes: ['valueEn', 'valueVi'] }
                    ],
                    raw: true,
                    nest: true
                });
                if (!dataExtra) dataExtra = {};
                resolve({
                    errCode: 0,
                    message: 'OK',
                    data: dataExtra
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}

let getProfileDoctorById = (idDoctor) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!idDoctor) {
                resolve({
                    errCode: 1,
                    message: "Missing required parameters"
                })
            }
            else {
                let profileDoctor = await db.user.findOne({
                    where: { id: idDoctor },
                    attributes: { exclude: ['password'] },
                    include: [
                        { model: db.markdowns, attributes: ['id', 'contentHTML', 'contentMarkdown', 'descriptions', 'doctorid'] },
                        {
                            model: db.doctorinfor,
                            attributes: { exclude: ['id', 'doctorid', 'createdAt', 'updatedAt'] },
                            include: [
                                { model: db.allcodes, as: 'priceType', attributes: ['valueEn', 'valueVi'] },
                                { model: db.allcodes, as: 'provice', attributes: ['valueEn', 'valueVi'] },
                                { model: db.allcodes, as: 'payment', attributes: ['valueEn', 'valueVi'] }
                            ]
                        },
                        { model: db.allcodes, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    ],
                    raw: true,
                    nest: true
                });
                if (profileDoctor && profileDoctor.image) {
                    profileDoctor.image = Buffer.from(profileDoctor.image, 'base64').toString('binary');
                }
                if (!profileDoctor) profileDoctor = {};
                resolve({
                    errCode: 0,
                    message: "OK",
                    data: profileDoctor
                })
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
    getScheduleDoctorByDate: getScheduleDoctorByDate,
    getDoctorExtraInforById: getDoctorExtraInforById,
    getProfileDoctorById: getProfileDoctorById
}