import db from "../models/index";


let createClinic = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name_clinic || !data.address || !data.imageBase64 || !data.description || !data.descriptionHtml || !data.descriptionHtmlShort || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    message: "Missing parameter"
                });
            }
            else {
                let response = await db.clinics.create({
                    name: data.name_clinic,
                    address: data.address,
                    description: data.description,
                    descriptionHtmlShort: data.descriptionHtmlShort,
                    descriptionHTML: data.descriptionHtml,
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

let getAllClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.clinics.findAll();
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

let getDetailClinicById = async (idData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            if (!idData) {
                resolve({
                    errCode: 1,
                    message: "Missing parameter"
                })
            }
            else {

                data = await db.clinics.findOne({
                    where: {
                        id: idData
                    },
                    // attributes: ['name','address','description', 'descriptionHtmlShort', 'descriptionHtml', 'descriptionMarkdown']
                    attributes: ['name','address','description', 'descriptionHtmlShort','descriptionMarkdown']
                })
                if (data) {
                    let doctorClinic = [];
                    doctorClinic = await db.doctorinfor.findAll({
                        where: { clinicid: idData },
                        attributes: ['doctorid', 'proviceid']
                    })

                    data.arrClinic = doctorClinic
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
    createClinic: createClinic,
    getAllClinic: getAllClinic,
    getDetailClinicById: getDetailClinicById
}