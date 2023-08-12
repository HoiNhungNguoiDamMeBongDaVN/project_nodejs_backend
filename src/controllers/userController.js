
import userService from '../services/userService';

//function handle login
let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing input parameter!"
        });
    }
    let userData = await userService.handleUserLogin(email, password);
    return res.status(200).json({
        status: userData.status,
        errCode: userData.errorCode,
        message: userData.errorMessage,
        user: userData.user ? userData.user : {}
    });
}

//function get account
let handleChangeAccount = async (req, res) => {
    // console.log(req.body, "hmmm");
    // return;
    let email = req.body.email;
    if (!email) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing input parameter!"
        });
    }
    let userData = await userService.changeAccount(req.body);
    return res.status(200).json({
        errCode: 0,
        message: "ok",
        // user: userData.user ? userData.user : {}
    });
}

// function change account password
let handleChangePasswordAccount = async (req, res) => {
    try {
        let data = await userService.changePasswordAccount(req.body);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

//function get all user
let handleGetAllUser = async (req, res) => {
    let id = req.query.id;
    let user = await userService.getAllUser(id);
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            message: "Missing require parameter"
        })
    }
    else {
        return res.status(200).json({
            errCode: 0,
            message: "OK",
            user
        })
    }
}

// function create user
let handleCreateUser = async (req, res) => {
    let message = await userService.createUser(req.body);
    return res.status(200).json(message);
}

// function edit user
let handleEditUser = async (req, res) => {
    let data = req.body;
    if (data) {
        let message = await userService.updateUser(data);
        return res.status(200).json(message);
    }
    else {
        return res.status(200).json({
            errCode: 1,
            message: "Missing required parameters"
        })

    }
}

// function delete user
let handleDeleteUser = async (req, res) => {
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message);
}


let handleGetAllCodes = async (req, res) => {
    try {
        let type = req.query.type;
        let data = await userService.getAllCodesService(type);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}



module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
    handleCreateUser: handleCreateUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    handleGetAllCodes: handleGetAllCodes,
    handleChangeAccount: handleChangeAccount,
    handleChangePasswordAccount: handleChangePasswordAccount
}