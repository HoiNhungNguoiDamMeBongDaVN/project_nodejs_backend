import db from "../models/index";


// let countDashboard = async (data) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             if (!data.id) {
//                 resolve({
//                     errCode: 1,
//                     message: "Missing parameter"
//                 })
//             }
//             else {
//                 if (data.id === 'DOCTOR') {
//                     let data = await db.user.count({
//                         where: {
//                             roleid: 'R2',
//                         },
//                     });
//                     if (data) {
//                         resolve({
//                             error: 0,
//                             message: "OK",
//                             data
//                         })
//                     }
//                 }
//                 else if (data.id === 'PATIENT') {
//                     let data = await db.user.count({
//                         where: {
//                             roleid: 'R3',
//                         },
//                     });
//                     if (data) {
//                         resolve({
//                             error: 0,
//                             message: "OK",
//                             data
//                         })
//                     }
//                 }
//                 else if (data.id === 'CLINIC') {
//                     let data = await db.clinics.count();
//                     if (data) {
//                         resolve({
//                             error: 0,
//                             message: "OK",
//                             data
//                         })
//                     }
//                 }
//                 else {
//                     let data = await db.specialtys.count();
//                     if (data) {
//                         resolve({
//                             error: 0,
//                             message: "OK",
//                             data
//                         })
//                     }
//                 }
//             }
//         } catch (error) {
//             reject(error);
//         }
//     })
// }

let countDashboard = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = [];
            let datadoctor = await db.user.count({
                where: {
                    roleid: 'R2',
                },
            });
            if (datadoctor) {
                let doctor = { count: datadoctor, nameVi: 'TỔNG SỐ BỆNH NHÂN', nameEn: "TOTAL PATIENTS" }
                data.push(doctor);

            }
            let datapatient = await db.user.count({
                where: {
                    roleid: 'R3',
                },
            });
            if (datapatient) {
                let patient = { count: datapatient, nameVi: 'TỔNG SỐ BÁC SĨ', nameEn: 'TOTAL DOCTOR' }
                data.push(patient);

            }

            let dataclinics = await db.clinics.count();
            if (dataclinics) {
                let clinic = { count: dataclinics, nameVi: 'TỔNG CÁC CƠ SỞ Y TẾ', nameEn: 'TOTAL HEALTH FACILITIES' };
                data.push(clinic);

            }

            let dataspecialtys = await db.specialtys.count();
            if (dataspecialtys) {
                let specialty = { count: dataspecialtys, nameVi: 'TỔNG CÁC CHUYÊN KHOA', nameEn: 'TOTAL SPECIALISTS' };
                data.push(specialty);
            }
            if (data.length > 0) {
                resolve({
                    errCode: 0,
                    message: "OK",
                    data
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    countDashboard
}