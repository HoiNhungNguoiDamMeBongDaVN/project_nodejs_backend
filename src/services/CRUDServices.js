import bcrypt from 'bcryptjs';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);



let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordBcrypt = await hashPassword(data.password);
            await db.user.create({
                email: data.email,
                password: hashPasswordBcrypt,
                firstname: data.firstname,
                lastName: data.lastName,
                phonenumber: data.phonenumber,
                address: data.address,
                gender: data.gender === '1' ? true : false,
                roleid: data.roleid
            });
            let allUser = await db.user.findAll();
            resolve(allUser);
        } catch (error) {
            reject(error);
        }
    });

}

let hashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);

        } catch (error) {
            reject(e)
        }
    })
};

let getAllUserCRUD = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.user.findAll({ raw: true });
            resolve(users);
        } catch (error) {
            reject(error);
        }
    })
}

let getUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.user.findOne({
                where: { id: userId },
                raw: true
            });
            if (user) {
                resolve(user);
            } else {
                resolve([]);
            }
        } catch (error) {
            reject(error);
        }
    })
}

let updatUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let updatedRows = await db.user.update(
                {
                    firstname: data.firstname,
                    lastName: data.lastName,
                    address: data.address
                },
                {
                    where: { id: data.id }
                }
            );
            if (updatedRows) {
                let allUser = await db.user.findAll();
                resolve(allUser);
            } else {
                resolve();
            }
        } catch (error) {
            reject(error);
        }
    });
}

let deleteById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.user.findOne({ where: { id: userId } });
            if (user) {
                await user.destroy();
                let allUser = await db.user.findAll();
                resolve(allUser);
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUserCRUD: getAllUserCRUD,
    getUserById: getUserById,
    updatUser: updatUser,
    deleteById: deleteById
}