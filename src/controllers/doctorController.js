import doctorService from '../services/doctorService';

let handleGetTopDoctor = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await doctorService.getTopDoctorHome(limit);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let handleGetAllDoctors = async (req, res) => {
    try {
        let doctors = await doctorService.getAllDoctors();
        return res.status(200).json(doctors);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: "Error form server"
        })
    }
}

let handlePostInforDoctors = async (req, res) => {
    try {
        let respone = await doctorService.saveInforDoctor(req.body);
        return res.status(200).json(respone);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: "Error form server"
        })
    }
}

let handleGetDetailDoctorInfor = async (req, res) => {
    try {
        let infor = await doctorService.getDetailInforDoctor(req.query.id);
        return res.status(200).json(infor)
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: "Error form server"
        })
    }
}

let bulkCreateSchedule = async (req, res) => {
    try {
        let infor = await doctorService.bulkCreateScheduleDoctor(req.body);
        return res.status(200).json(infor)
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: "Error form server"
        })
    }
}

let handleGetScheduleDoctorByDate = async (req, res) => {
    try {
        let data = await doctorService.getScheduleDoctorByDate(req.query.doctorid, req.query.date);
        return res.status(200).json(data)
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: "Error form server"
        })
    }
}

module.exports = {
    handleGetTopDoctor: handleGetTopDoctor,
    handleGetAllDoctors: handleGetAllDoctors,
    handlePostInforDoctors: handlePostInforDoctors,
    handleGetDetailDoctorInfor: handleGetDetailDoctorInfor,
    bulkCreateSchedule: bulkCreateSchedule,
    handleGetScheduleDoctorByDate: handleGetScheduleDoctorByDate
}