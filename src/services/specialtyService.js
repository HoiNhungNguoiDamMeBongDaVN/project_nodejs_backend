import db from "../models/index";


let createSpecialty = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name_specialty || !data.imageBase64 || !data.descriptionHtml || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    message: "Missing parameter"
                });
            }
            else {
                let response = await db.specialtys.create({
                    namespecialty: data.name_specialty,
                    descriptionHtml: data.descriptionHtml,
                    descriptionMarkdown: data.descriptionMarkdown,
                    image: data.imageBase64
                })
                if (response) {
                    resolve({
                        errCode: 0,
                        message: "ok"
                    })
                }
            }

        } catch (error) {
            reject(error);
        }
    })
}

let getAllSpecialty = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.specialtys.findAll();
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = Buffer.from(item.image, 'base64').toString('binary');
                    return item;
                })
            }
            resolve({
                errCode: 0,
                message: "ok",
                data: data
            })

        } catch (error) {
            reject(error)
        }
    })
}

let getDetailSpecialtyById = async (idData, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            if (!idData || !location) {
                resolve({
                    errCode: 1,
                    message: "Missing parameter"
                })
            }
            else {

                data = await db.specialtys.findOne({
                    where: {
                        id: idData
                    },
                    attributes: ['descriptionHtml', 'descriptionMarkdown']
                })
                if (data) {
                    let doctorSpecialty = [];
                    if (location === 'ALL') {
                        doctorSpecialty = await db.doctorinfor.findAll({
                            where: { specialtyid: idData },
                            attributes: ['doctorid', 'proviceid']
                        })
                    }
                    else {
                        doctorSpecialty = await db.doctorinfor.findAll({
                            where: { specialtyid: idData, proviceid: location },
                            attributes: ['doctorid', 'proviceid']
                        })
                    }
                    data.arrDoctor = doctorSpecialty
                }
                else {
                    data = {}
                }
                resolve({
                    errCode: 0,
                    message: "ok",
                    data: data
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
    getDetailSpecialtyById: getDetailSpecialtyById
}