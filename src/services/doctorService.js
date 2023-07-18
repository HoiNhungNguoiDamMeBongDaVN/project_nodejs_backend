import db from "../models/index";

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
                mesage: "Ok",
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
                mesage: "Ok",
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
                    mesage: "Missing parameter"
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
                    mesage: "Missing required parameter!"
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
                    mesage: "OK",
                    data: inforDoctor
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
    getDetailInforDoctor: getDetailInforDoctor
}