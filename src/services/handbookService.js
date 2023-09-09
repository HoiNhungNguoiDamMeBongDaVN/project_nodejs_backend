import db from "../models/index";


let createHandbook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name_handbook || !data.imageCloud || !data.idImageCloud || !data.contentHTML || !data.contentMarkdown || !data.descriptionHTML || !data.descriptionMarkdown) {
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
                    descriptionhtml: data.descriptionHTML,
                    descriptionmarkdown: data.descriptionMarkdown
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

module.exports = {
    createHandbook: createHandbook,
    getHandbook: getHandbook, getDetailByIdHandbook
}