const express = require("express");
const router = express.Router();
const studentController = require("../../controller_or_api/studentController")
const facultyController = require('../../controller_or_api/facultyController')

router.post("/create",studentController.createStudent);
router.post("/update",studentController.updateStudent);



// admin routes

router.post('/signUpFaculty',facultyController.createFaculty);
router.post('/loginFaculty',facultyController.loginFaculty);


module.exports = router