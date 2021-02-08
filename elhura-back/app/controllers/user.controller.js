require('dotenv').config()
const db = require("../models");
const userService = require('../services/user');

exports.fetchUserRole = async (req, res) => {
    if (req.cookies.email === undefined) {
        return res.send({
            userRole : -1
        })
    }

    const admin = await userService.checkIfUserExistsBy("email", req.cookies.email, 0);
    if (admin.length !== 0) {
        return res.send({
            userRole : 0
        })
    }

    const client = await userService.checkIfUserExistsBy("email", req.cookies.email, 1);
    if (client.length !== 0) {
        return res.send({
            userRole : 1
        })
    }

    const company = await userService.checkIfUserExistsBy("email", req.cookies.email, 2);
    if (company.length !== 0) {
        return res.send({
            userRole : 2
        })
    }
}