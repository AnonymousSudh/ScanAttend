const express = require("express");
const router = express.Router();
const studentController = require("../../controller_or_api/studentController")
const facultyController = require('../../controller_or_api/facultyController')
const courseController = require('../../controller_or_api/courseController');
const divisionController = require('../../controller_or_api/divisionController')
const subjectController = require("../../controller_or_api/subjectController")

router.post("/create",studentController.createStudent);
router.post("/update",studentController.updateStudent);



// admin routes

router.post('/signUpFaculty',facultyController.createFaculty);
router.post('/loginFaculty',facultyController.loginFaculty);


//course routes
router.post('/addCourse',courseController.addCourse);
router.get('/getCourse',courseController.getCourse);
router.get('/getAllCourse',courseController.getAllCourses);
router.post('/getSubject',courseController.getSubject); 
router.post('/addDivision',divisionController.addDivision); 


// subject routes
router.post('/addCourseAndSubject',subjectController.addSubject);
router.post('/getSubjectOfCourse',subjectController.getSubjectOfCourse);
router.post('/getSemesterOfCourse',subjectController.getSemesterOfCourse);


module.exports = router