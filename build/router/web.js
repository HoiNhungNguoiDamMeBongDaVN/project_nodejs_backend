"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _homeController = _interopRequireDefault(require("../controllers/homeController"));
var _userController = _interopRequireDefault(require("../controllers/userController"));
var _doctorController = _interopRequireDefault(require("../controllers/doctorController"));
var _patienController = _interopRequireDefault(require("../controllers/patienController"));
var _specialtyController = _interopRequireDefault(require("../controllers/specialtyController"));
var _clinicController = _interopRequireDefault(require("../controllers/clinicController"));
var _handbookController = _interopRequireDefault(require("../controllers/handbookController"));
var _countController = _interopRequireDefault(require("../controllers/countController"));
var _imageCloudController = _interopRequireDefault(require("../controllers/imageCloudController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
var initRoute = function initRoute(app) {
  router.get('/', _homeController["default"].homePage);
  router.get('/view-add-user', _homeController["default"].getListUser);
  router.post('/post-user', _homeController["default"].postUser);
  router.get('/get-all-user', _homeController["default"].getAllUser);
  router.get('/edit-user', _homeController["default"].getEditUser);
  router.post('/put-user', _homeController["default"].putUser);
  router.get('/delete-user', _homeController["default"].deleteUse);

  //create api
  //api change account
  router.post('/api/change_account', _userController["default"].handleChangeAccount);
  router.post('/api/change_passwordAccount', _userController["default"].handleChangePasswordAccount);
  //api check login account
  router.post('/api/login', _userController["default"].handleLogin);

  // CRUD user
  router.get('/api/get-all-user', _userController["default"].handleGetAllUser);
  router.post('/api/create-user', _userController["default"].handleCreateUser);
  router.put('/api/edit-user', _userController["default"].handleEditUser);
  router["delete"]('/api/delete-user', _userController["default"].handleDeleteUser);
  router.get('/api/get-allcodes', _userController["default"].handleGetAllCodes);

  //API page home doctor
  router.get('/api/top-doctor-home', _doctorController["default"].handleGetTopDoctor);
  router.get('/api/get-all-doctors', _doctorController["default"].handleGetAllDoctors);
  router.post('/api/save-infor-doctors', _doctorController["default"].handlePostInforDoctors);
  router.get('/api/get-infor-detail-doctor', _doctorController["default"].handleGetDetailDoctorInfor);
  router.post('/api/bulk-create-schedule', _doctorController["default"].bulkCreateSchedule);
  router.get('/api/schedule-doctor-by-date', _doctorController["default"].handleGetScheduleDoctorByDate);
  router.get('/api/get-extra-infor-doctor', _doctorController["default"].handleGetDoctorExtraInforById);
  router.get('/api/get-profile-doctor-by-id', _doctorController["default"].handleGetProfileDoctorById);

  //API booking
  router.post('/api/create-patient-book-appointment', _patienController["default"].handleCreatePatienBookAppointment);

  // API verify booking
  router.post('/api/verify-patient-book-appointment', _patienController["default"].handleVerifyPatienBookAppointment);

  //API specialty 
  router.post('/api/create-specialty', _specialtyController["default"].handleCreateSpecialty);
  router.get('/api/get-all-specialty', _specialtyController["default"].handleGetAllSpecialty);
  router.put('/api/edit-specialty', _specialtyController["default"].handleEditSpecialty);
  router.get('/api/get-detail-specialty-by-id', _specialtyController["default"].handleGetDetailSpecialtyById);
  router["delete"]('/api/delete-specialty-by-id', _specialtyController["default"].handleDeleteSpecialtyById);

  //API clinic 
  router.post('/api/create-clinic', _clinicController["default"].handleCreateclinic);
  router.get('/api/get-all-clinic', _clinicController["default"].handleGetAllClinic);
  router.put('/api/edit-clinic', _clinicController["default"].handleEditClinic);
  router.get('/api/get-detail-clinic-by-id', _clinicController["default"].handleGetDetailClinicById);
  router["delete"]('/api/delete-clinic-by-id', _clinicController["default"].handleDeleteClinic);

  //API manage patient
  router.get('/api/get-list-patient', _patienController["default"].handleGetListPatient);
  router.post('/api/send-remedy-patient', _patienController["default"].handleSendRemedyPatient);

  //API handbook
  router.post('/api/create-handbook', _handbookController["default"].handleCreateHandbook);
  router.get('/api/get-all-handbook', _handbookController["default"].handleGetHandbook);
  router.get('/api/get-handbook-by-id', _handbookController["default"].handleGetDetailByIdHandbook);
  router.put('/api/edit-handbook-by-id', _handbookController["default"].handleEditByIdHandbook);
  router["delete"]('/api/delete-handbook-by-id', _handbookController["default"].handleDeleteByIdHandbook);

  //API count sum doctor, patient, clinic, specialty
  router.get('/api/count-dashboard', _countController["default"].handleCountDashboard);

  //api get and upload image cloud
  router.post('/api/upload-image-clound-doctor-admin', _imageCloudController["default"].handlePostImageDoctorAdmin);
  router.post('/api/upload-image-clound-specialty', _imageCloudController["default"].handlePostImageSpecialty);
  router.post('/api/upload-image-clound-clinic', _imageCloudController["default"].handlePostImageClinic);
  router.post('/api/upload-image-clound-handbook', _imageCloudController["default"].handlePostImageHandbook);
  router.get('/api/get-image-clound', _imageCloudController["default"].getAllImage);
  return app.use('/', router);
};

// module.exports = initRoute;
var _default = initRoute;
exports["default"] = _default;