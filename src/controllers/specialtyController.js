import specialtyService from '../services/specialtyService';


let handleCreateSpecialty = async (req, res) => {
    try {
        let dataPatien = await specialtyService.createSpecialty(req.body);
        return res.status(200).json(dataPatien);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let handleGetAllSpecialty = async (req, res) => {
    try {
        let data = await specialtyService.getAllSpecialty();
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let handleGetDetailSpecialtyById = async (req, res) => {
    try {
        let data = await specialtyService.getDetailSpecialtyById(req.query.id, req.query.location);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}


let handleEditSpecialty = async (req, res) => {
    try {
        let data = await specialtyService.editSpecialty(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let handleDeleteSpecialtyById = async (req, res) => {
    try {
        let message = await specialtyService.deleteSpecialty(req.body.id);
        return res.status(200).json(message);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

module.exports = {
    handleCreateSpecialty: handleCreateSpecialty,
    handleGetAllSpecialty: handleGetAllSpecialty,
    handleGetDetailSpecialtyById: handleGetDetailSpecialtyById, handleEditSpecialty, handleDeleteSpecialtyById
}