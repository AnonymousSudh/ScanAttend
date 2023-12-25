const { Attendance } = require("../models/index");
const { Op } = require("sequelize");
var Sequelize = require('sequelize');

const markAttendance = async (data) => {

    try {
        console.log("data at repo layer", data)
        // return
        const result = await Attendance.create(data);
        console.log(result);
        return result
    } catch (error) {
        console.log("error at Repository layer");
        console.log(error)
        throw error;
    }
}

module.exports = { markAttendance }