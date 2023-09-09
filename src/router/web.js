import express from "express";

import homeController from "../controllers/homeController";
import userController from '../controllers/userController';
import doctorController from '../controllers/doctorController';
import patienController from '../controllers/patienController';
import specialtyController from '../controllers/specialtyController';
import clinicController from '../controllers/clinicController';
import handbookController from '../controllers/handbookController';
import handcountController from '../controllers/countController';
import imageCloudController from "../controllers/imageCloudController";

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
    //api change account
    router.post('/api/change_account', userController.handleChangeAccount);
    router.post('/api/change_passwordAccount', userController.handleChangePasswordAccount);
    //api check login account
    router.post('/api/login', userController.handleLogin);

    // CRUD user
    router.get('/api/get-all-user', userController.handleGetAllUser);
    router.post('/api/create-user', userController.handleCreateUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);

    router.get('/api/get-allcodes', userController.handleGetAllCodes);

    //API page home doctor
    router.get('/api/top-doctor-home', doctorController.handleGetTopDoctor);

    router.get('/api/get-all-doctors', doctorController.handleGetAllDoctors);
    router.post('/api/save-infor-doctors', doctorController.handlePostInforDoctors);

    router.get('/api/get-infor-detail-doctor', doctorController.handleGetDetailDoctorInfor);

    router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule);

    router.get('/api/schedule-doctor-by-date', doctorController.handleGetScheduleDoctorByDate);
    router.get('/api/get-extra-infor-doctor', doctorController.handleGetDoctorExtraInforById);

    router.get('/api/get-profile-doctor-by-id', doctorController.handleGetProfileDoctorById);

    //API booking
    router.post('/api/create-patient-book-appointment', patienController.handleCreatePatienBookAppointment);

    // API verify booking
    router.post('/api/verify-patient-book-appointment', patienController.handleVerifyPatienBookAppointment);


    //API specialty 
    router.post('/api/create-specialty', specialtyController.handleCreateSpecialty);
    router.get('/api/get-all-specialty', specialtyController.handleGetAllSpecialty);
    router.put('/api/edit-specialty', specialtyController.handleEditSpecialty);
    router.get('/api/get-detail-specialty-by-id', specialtyController.handleGetDetailSpecialtyById);
    router.delete('/api/delete-specialty-by-id', specialtyController.handleDeleteSpecialtyById);



    //API clinic 
    router.post('/api/create-clinic', clinicController.handleCreateclinic);
    router.get('/api/get-all-clinic', clinicController.handleGetAllClinic);
    router.put('/api/edit-clinic', clinicController.handleEditClinic);
    router.get('/api/get-detail-clinic-by-id', clinicController.handleGetDetailClinicById);
    router.delete('/api/delete-clinic-by-id',clinicController.handleDeleteClinic)

    //API manage patient
    router.get('/api/get-list-patient', patienController.handleGetListPatient);
    router.post('/api/send-remedy-patient', patienController.handleSendRemedyPatient);

    //API handbook
    router.post('/api/create-handbook', handbookController.handleCreateHandbook);
    router.get('/api/get-all-handbook', handbookController.handleGetHandbook);
    router.get('/api/get-handbook-by-id', handbookController.handleGetDetailByIdHandbook);

    //API count sum doctor, patient, clinic, specialty
    router.get('/api/count-dashboard', handcountController.handleCountDashboard);


    //api get and upload image cloud
    router.post('/api/upload-image-clound-doctor-admin', imageCloudController.handlePostImageDoctorAdmin);
    router.post('/api/upload-image-clound-specialty', imageCloudController.handlePostImageSpecialty);
    router.post('/api/upload-image-clound-clinic', imageCloudController.handlePostImageClinic);
    router.post('/api/upload-image-clound-handbook', imageCloudController.handlePostImageHandbook);

    router.get('/api/get-image-clound', imageCloudController.getAllImage);



    return app.use('/', router);
}

// module.exports = initRoute;

export default initRoute;