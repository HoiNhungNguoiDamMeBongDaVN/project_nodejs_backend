import clinicService from '../services/clinicService';


let handleCreateclinic = async (req, res) => {
    try {
        let dataClinic = await clinicService.createClinic(req.body);
        return res.status(200).json(dataClinic);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let handleGetAllClinic = async (req, res) => {
    try {
        let data = await clinicService.getAllClinic();
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let handleGetDetailClinicById = async (req, res) => {
    try {
        let data = await clinicService.getDetailClinicById(req.query.id);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}


module.exports = {
    handleCreateclinic: handleCreateclinic,
    handleGetAllClinic: handleGetAllClinic,
    handleGetDetailClinicById: handleGetDetailClinicById
}