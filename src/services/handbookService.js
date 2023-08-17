import db from "../models/index";


let createHandbook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name_handbook || !data.image || !data.contentHTML || !data.contentMarkdown) {
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
                    image: data.image
                    // contentHTML: "ok",
                    // contentMarkdown: "ok",
                    // image: "ok"
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
                if (data && data.length > 0) {
                    data.map(item => {
                        item.image = Buffer.from(item.image, 'base64').toString('binary');
                        return item;
                    })
                }
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
    getHandbook: getHandbook
}