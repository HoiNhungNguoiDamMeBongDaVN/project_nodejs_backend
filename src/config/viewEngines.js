import express from "express";

const configViewEngine = (app)=>{
    app.use(express.static('./src/public'))//noi set quyen truy cap cho trinh duyet co the xem
    app.set("view engine","ejs");
    app.set("views","./src/views")
}

export default configViewEngine;