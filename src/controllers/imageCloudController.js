
import upload_image_cloundService from '../services/upload_image_clound';
const { cloudinary } = require('../utils/cloudinary');

let handlePostImageDoctorAdmin = async (req, res) => {
    try {
        let response = await upload_image_cloundService.postImageDoctorAdmin(req.body.data);
        return res.status(200).json(response);

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let handlePostImageSpecialty = async (req, res) => {
    try {
        let response = await upload_image_cloundService.postImageSpecialty(req.body.data);
        return res.status(200).json(response);

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let handlePostImageClinic = async (req, res) => {
    try {
        let response = await upload_image_cloundService.postImageClinic(req.body.data);
        return res.status(200).json(response);

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let getAllImage = (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { resources } = await cloudinary.search
                .expression('folder:image_doctor_admin')
                .sort_by('public_id', 'desc').max_results(30).execute();
            const publicIds = resources.map((file) => file.public_id);
            res.send(resources);
            if (publicIds) {
                resolve({
                    errCode: 0,
                    mesage: "ok",
                    data: publicIds.url
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

module.exports = { handlePostImageDoctorAdmin, getAllImage, handlePostImageSpecialty, handlePostImageClinic }