

import patientService from '../services/patientService';

let handleCreatePatienBookAppointment = async (req, res) => {
    try {
        let dataPatien = await patientService.createPatienBookAppointment(req.body);
        return res.status(200).json(dataPatien);
        console.log(req.body, "hu");
    } catch (error) {
        console.log(error, "cc");
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }

}

let handleVerifyPatienBookAppointment = async (req, res) => {
    try {
        let dataVerify = await patientService.verifyPatienBookAppointment(req.body);
        return res.status(200).json(dataVerify);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let handleGetListPatient = async (req, res) => {
    try {
        let dataPatient = await patientService.getListPatient(req.query.doctorid, req.query.date);
        return res.status(200).json(dataPatient);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let handleSendRemedyPatient =async (req, res) => {
    try {
        let dataPatient = await patientService.sendRemedyPatient(req.body);
        return res.status(200).json(dataPatient);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

module.exports = {
    handleCreatePatienBookAppointment: handleCreatePatienBookAppointment,
    handleVerifyPatienBookAppointment: handleVerifyPatienBookAppointment,
    handleGetListPatient: handleGetListPatient, handleSendRemedyPatient: handleSendRemedyPatient

}