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
            // if (data && data.length > 0) {
            //     data.map(item => {
            //         item.image = Buffer.from(item.image, 'base64').toString('binary');
            //         return item;
            //     })
            // }
            if(data){
                resolve({
                    errCode: 0,
                    message: "ok",
                    data: data
                })
            }
            else{
                resolve({
                    errCode: 1,
                    message: "Not found data!",
                    data: data
                })
            }

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

let editSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let updatedRows = await db.specialtys.update(
                {
                    namespecialty: data.namespecialty,
                    descriptionHtml: data.descriptionHtml,
                    descriptionMarkdown: data.descriptionMarkdown,
                    image: data.imageBase64,
                    idimage: data.idimage
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
                    message: 'Updated user'
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

let deleteSpecialty=(idSpecialty)=>{
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.specialtys.findOne({
                where: { id: idSpecialty },
                raw: false
            });
            if (!data) {
                resolve({
                    errCode: 2,
                    message: `specialty ins't specialty`
                })
            }
            else {
                await data.destroy();
                resolve({
                    errCode: 0,
                    message: `specialty deleted`
                })
            }
        } catch (error) {
            reject(error);
        }

    })
}

module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
    getDetailSpecialtyById: getDetailSpecialtyById,
    editSpecialty,deleteSpecialty
}