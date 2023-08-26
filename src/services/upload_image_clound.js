const { cloudinary } = require('../utils/cloudinary');
let postImageDoctorAdmin = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log(req.body.data);
            let flieImage = data;
            const resUploadCloud = await cloudinary.uploader.upload(flieImage, {
                
                // use localhost
                // upload_preset: 'image_bookingCare'
                //deploy production
                folder: 'image_doctor_admin'
            })
            if (resUploadCloud) {
                resolve({
                    errCode: 0,
                    mesage: "ok",
                    data: resUploadCloud
                })
            }
            else {
                resolve({
                    errCode: 1,
                    mesage: "not found"
                })
            }
        } catch (error) {
            reject({
                error: error,
                errCode: 1,
                mesage: "not found"
            })
        }
    })
}

let postImageSpecialty = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log(req.body.data);
            let flieImage = data;
            const resUploadCloud = await cloudinary.uploader.upload(flieImage, {
                // use localhost
                // upload_preset: 'image_bookingCare'
                //deploy production
                folder: 'image_specialty'
            })
            if (resUploadCloud) {
                resolve({
                    errCode: 0,
                    mesage: "ok",
                    data: resUploadCloud
                })
            }
            else {
                resolve({
                    errCode: 2,
                    mesage: "Can't create image"
                })
            }
        } catch (error) {
            reject({
                error: error,
                errCode: 1,
                mesage: "not found"
            })
        }
    })
}

module.exports = {
    postImageDoctorAdmin,postImageSpecialty
}