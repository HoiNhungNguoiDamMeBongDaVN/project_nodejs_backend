import db from "../models/index";


let createHandbook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name_handbook || !data.imageCloud || !data.idImageCloud || !data.contentHTML || !data.contentMarkdown || !data.descriptionhtml || !data.descriptionmarkdown) {
                resolve({
                    errCode: 1,
                    message: "Missing parameter"
                });
            }
            else {
                await db.handbook.create({
                    name_handbook: data.name_handbook,
                    contentHTML: data.contentHTML,
                    contentMarkdown: data.contentMarkdown,
                    image: data.imageCloud,
                    idimage: data.idImageCloud,
                    descriptionhtml: data.descriptionhtml,
                    descriptionmarkdown: data.descriptionmarkdown
                })
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

let getHandbook = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.handbook.findAll();
            if (data) {
                // if (data && data.length > 0) {
                //     data.map(item => {
                //         item.image = Buffer.from(item.image, 'base64').toString('binary');
                //         return item;
                //     })
                // }
                resolve({
                    errCode: 0,
                    message: "OK",
                    data
                })
            }
            else {
                resolve({
                    errCode: 1,
                    message: "Not found data"
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getDetailByIdHandbook = (handbookID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.handbook.findOne(
                {
                    where: { id: handbookID }
                }
            );
            if (data) {
                // if (data && data.length > 0) {
                //     data.map(item => {
                //         item.image = Buffer.from(item.image, 'base64').toString('binary');
                //         return item;
                //     })
                // }
                resolve({
                    errCode: 0,
                    message: "OK",
                    data
                })
            }
            else {
                resolve({
                    errCode: 1,
                    message: "Not found data"
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}


let editByIdHandbook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name_handbook || !data.imageCloud || !data.contentHTML || !data.contentMarkdown || !data.descriptionhtml || !data.descriptionmarkdown) {
                resolve({
                    errCode: 1,
                    message: "Missing parameter"
                });
            }
            else {
                let updatedRows = await db.handbook.update(
                    {
                        name_handbook: data.name_handbook,
                        contentHTML: data.contentHTML,
                        contentMarkdown: data.contentMarkdown,
                        descriptionhtml: data.descriptionhtml,
                        descriptionmarkdown: data.descriptionmarkdown,
                        image: data.imageCloud,
                        idimage: data.idImageCloud
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


let deleteByIdHandbook = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.handbook.findOne({
                where: { id: id },
                raw: false
            });
            if (!data) {
                resolve({
                    errCode: 2,
                    message: `Handbook ins't Handbook`
                })
            }
            else {
                await data.destroy();
                resolve({
                    errCode: 0,
                    message: `Handbook deleted`
                })
            }
        } catch (error) {
            reject(error);
        }

    })
}

module.exports = {
    createHandbook: createHandbook,
    getHandbook: getHandbook, getDetailByIdHandbook, editByIdHandbook, deleteByIdHandbook
}