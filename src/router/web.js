import express from "express";

import homeController from "../controllers/homeController";
import userController from '../controllers/userController';
import doctorController from '../controllers/doctorController';

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

    //API page home
    router.get('/api/top-doctor-home',doctorController.handleGetTopDoctor);

    router.get('/api/get-all-doctors',doctorController.handleGetAllDoctors);
    router.post('/api/save-infor-doctors',doctorController.handlePostInforDoctors);

    router.get('/api/get-infor-detail-doctor',doctorController.handleGetDetailDoctorInfor)

    return app.use('/', router);
}

// module.exports = initRoute;

export default initRoute;