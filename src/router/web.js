import express from "express";

import homeController from "../controllers/homeController";
import userController from '../controllers/userController';
import doctorController from '../controllers/doctorController';
import patienController from '../controllers/patienController';
import specialtyController from '../controllers/specialtyController'



let router = express.Router();


const initRoute = (app) => {
    router.get('/', homeController.homePage);

    router.get('/view-add-user', homeController.getListUser);
    router.post('/post-user', homeController.postUser);

    router.get('/get-all-user', homeController.getAllUser);

    router.get('/edit-user', homeController.getEditUser);
    router.post('/put-user', homeController.putUser);

    router.get('/delete-user', homeController.deleteUse);

    //create api
    //api check login account
    router.post('/api/login', userController.handleLogin);

    // CRUD user
    router.get('/api/get-all-user', userController.handleGetAllUser);
    router.post('/api/create-user', userController.handleCreateUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);

    router.get('/api/get-allcodes',userController.handleGetAllCodes);

    //API page home doctor
    router.get('/api/top-doctor-home',doctorController.handleGetTopDoctor);

    router.get('/api/get-all-doctors',doctorController.handleGetAllDoctors);
    router.post('/api/save-infor-doctors',doctorController.handlePostInforDoctors);

    router.get('/api/get-infor-detail-doctor',doctorController.handleGetDetailDoctorInfor);

    router.post('/api/bulk-create-schedule',doctorController.bulkCreateSchedule);

    router.get('/api/schedule-doctor-by-date',doctorController.handleGetScheduleDoctorByDate);
    router.get('/api/get-extra-infor-doctor',doctorController.handleGetDoctorExtraInforById);

    router.get('/api/get-profile-doctor-by-id',doctorController.handleGetProfileDoctorById);

    //API booking
    router.post('/api/create-patient-book-appointment',patienController.handleCreatePatienBookAppointment);

    // API verify booking
    router.post('/api/verify-patient-book-appointment',patienController.handleVerifyPatienBookAppointment);


    //API specialty 
    router.post('/api/create-specialty',specialtyController.handleCreateSpecialty);
    router.get('/api/get-all-specialty',specialtyController.handleGetAllSpecialty);
    router.get('/api/get-detail-specialty-by-id',specialtyController.handleGetDetailSpecialtyById);



    



    return app.use('/', router);
}

// module.exports = initRoute;

export default initRoute;