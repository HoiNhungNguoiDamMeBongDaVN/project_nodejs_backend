
import db from "../models/index";
import CRUDservice from '../services/CRUDServices';
let homePage = async (req, res) => {
    try {
        let data = await db.user.findAll();
        return res.render('index.ejs', { data: data });
    } catch (error) {
        console.log(error)
    }

}

let getListUser = async (req, res) => {
    try {
        return res.render('createUser.ejs')
    } catch (error) {
        console.log(error)
    }
}

let postUser = async (req, res) => {
    let allUser = await CRUDservice.createNewUser(req.body);
    return res.render("viewUser.ejs", { data: allUser });
}

let getAllUser = async (req, res) => {
    let listUser = await CRUDservice.getAllUserCRUD();
    return res.render('viewUser.ejs', { data: listUser });
}

let getEditUser = async (req, res) => {
    let id = req.query.id;
    if (id) {
        let user = await CRUDservice.getUserById(id);
        return res.render("editUser.ejs", { data: user })
    }
    else {
        return res.send("undefined id")
    }
}

let putUser = async (req, res) => {
    let data = req.body;
    let allUser = await CRUDservice.updatUser(data);
    if (allUser) {
        return res.render("viewUser.ejs", { data: allUser });
    }
    else {
        return res.send("undefined id")
    }
}

let deleteUse = async (req, res) => {
    let id = req.query.id;
    if (id) {
        let allUser = await CRUDservice.deleteById(id);
        return res.render("viewUser.ejs", { data: allUser })
    }
    else {
        return res.send("no");
    }
}

module.exports = {
    homePage: homePage,
    getListUser: getListUser,
    postUser: postUser,
    getAllUser: getAllUser,
    getEditUser: getEditUser,
    putUser: putUser,
    deleteUse: deleteUse
}