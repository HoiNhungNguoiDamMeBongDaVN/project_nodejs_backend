import allcode from "../models/allcode";
import db from "../models/index";
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (emailUser, passwordUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let existEmail = await checkEmailExist(emailUser);
            if (existEmail) {
                let user = await db.user.findOne({
                    where: { email: emailUser },
                    attributes: ['email', 'password', 'roleid', 'positionid', 'image', 'firstName', 'lastName'],

                });
                if (user) {
                    let checkPassword = bcrypt.compareSync(passwordUser, user.password);
                    if (checkPassword) {
                        userData.errorCode = 0;
                        userData.errorMessage = ``;
                        delete user.password;
                        userData.user = user;
                    }
                    else {
                        userData.errorCode = 3;
                        userData.errorMessage = `Wrong password`;
                    }
                }
                else {
                    userData.errorCode = 2;
                    userData.errorMessage = `User not found`;
                }
            }
            else {
                userData.status = 500;
                userData.errorCode = 1;
                userData.errorMessage = `Your email isn't in your system. Please try other email!`;
            }
            resolve(userData);
        } catch (error) {
            reject(error);
        }
    })
}


let checkEmailExist = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.user.findOne({ where: { email: userEmail } });
            if (user) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        } catch (error) {
            reject(error)
        }
    })
}

let checkUserExist = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.user.findOne({ where: { id: userId } });
            if (user) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getAllUser = (idUser) => {
    return new Promise(async (resole, reject) => {
        try {
            let users = {};
            if (idUser === 'All') {
                users = await db.user.findAll({
                    attributes: { exclude: 'password' },
                })
            }
            if (idUser && idUser !== 'All') {
                users = await db.user.findOne({
                    where: { id: idUser },
                    attributes: { exclude: 'password' },
                    

                })
            }
            resole(users)
        } catch (error) {
            reject(error);
        }
    })
}

let createUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email) {
                resolve({
                    errCode: 2,
                    message: 'Email empty'
                });
            }
            else {
                let checkEmail = await checkEmailExist(data.email);
                if (checkEmail === true) {
                    resolve({
                        errCode: 1,
                        message: 'Account already exist'
                    });
                }
                else if (checkEmail === false) {
                    let hashPasswordBcrypt = await hashPassword(data.password);
                    await db.user.create({
                        email: data.email,
                        password: hashPasswordBcrypt,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        phonenumber: data.phonenumber,
                        address: data.address,
                        gender: data.gender,
                        roleid: data.roleid,
                        positionid: data.positionid,
                        image: data.image
                    });
                    resolve({
                        errCode: 0,
                        message: 'Created user'
                    });
                }
            }
        } catch (error) {
            reject(error);
        }
    })
}

let hashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);

        } catch (error) {
            reject(error)
        }
    })
};

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let data = await db.user.findOne({
            where: { id: userId },
            raw: false
        });
        if (!data) {
            resolve({
                errCode: 2,
                message: `User ins't user`
            })
        }
        else {
            await data.destroy();
            resolve({
                errCode: 0,
                message: `User deleted`
            })
        }
    })
}


let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkData = await checkUserExist(data.id);
            if (!checkData || !data.roleid || !data.gender || !data.positionid) {
                resolve({
                    errCode: 2,
                    message: 'User not found'
                });
            }
            else {
                let updatedRows = await db.user.update(
                    {
                        // email: data.email,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        phonenumber: data.phonenumber,
                        address: data.address,
                        gender: data.gender,
                        roleid: data.roleid,
                        positionid: data.positionid,
                        image: data.image
                    },
                    {
                        where: { id: data.id }
                    }
                );
                if (!updatedRows) {
                    resolve({
                        errCode: 2,
                        message: 'User not found'
                    });
                } else {
                    resolve({
                        errCode: 0,
                        message: 'Updated user'
                    });
                }
            }
        } catch (error) {
            reject(error);
        }
    })
}


let getAllCodesService = (typeAllcode) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeAllcode) {
                resolve({
                    errCode: 1,
                    message: "Missing required parameters!"
                })
            }
            else {
                let response = {};
                let dataAllCode = await db.allcodes.findAll({
                    where: { type: typeAllcode }
                });
                response.errCode = 0;
                response.data = dataAllCode;
                resolve(response)
            }
        } catch (error) {
            reject(e)
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUser: getAllUser,
    createUser: createUser,
    deleteUser: deleteUser,
    updateUser: updateUser,
    getAllCodesService: getAllCodesService
}