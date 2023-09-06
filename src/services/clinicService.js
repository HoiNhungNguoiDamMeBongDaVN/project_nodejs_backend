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
                    image: data.imageClound,
                    idimage: data.idimageClound
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
            // if (data && data.length > 0) {
            //     data.map(item => {
            //         item.image = Buffer.from(item.image, 'base64').toString('binary');
            //         return item;
            //     })
            // }
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
                    attributes: ['name', 'address', 'description', 'descriptionHtmlShort', 'descriptionHTML', 'descriptionMarkdown']
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

let editClinic = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let updatedRows = await db.clinics.update(
                {
                    name: data.name_clinic,
                    address: data.address,
                    description: data.description,
                    descriptionHtmlShort: data.descriptionHtmlShort,
                    descriptionHTML: data.descriptionHtml,
                    descriptionMarkdown: data.descriptionMarkdown,
                    image: data.imageClound,
                    idimage: data.idimageClound
                },
                {
                    where: { id: data.id }
                }
            );
            if (!updatedRows) {
                resolve({
                    errCode: 2,
                    message: `Cand't Update `
                });
            } else {
                resolve({
                    errCode: 0,
                    message: 'Updated clinic success'
                });
            }

            resolve({
                errCode: 1,
                message: "Missing parameter"
            });

        } catch (error) {
            reject(error);
        }
    })
}


let deleteClinic = async (idClinic) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.clinics.findOne({
                where: { id: idClinic },
                raw: false
            });
            if (!data) {
                resolve({
                    errCode: 2,
                    message: `User ins't user`
                })
            }
            else {
                await data.destroy();
                resolve({
                    errCode: 0,
                    message: `Clinic deleted success`
                })
            }
        } catch (error) {
            reject(error);
        }

    })
}

module.exports = {
    createClinic: createClinic,
    getAllClinic: getAllClinic,
    getDetailClinicById: getDetailClinicById,
    editClinic, deleteClinic
}