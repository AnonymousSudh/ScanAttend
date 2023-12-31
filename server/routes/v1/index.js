const express = require("express");
const router = express.Router();
const studentController = require("../../controller_or_api/studentController")
const facultyController = require('../../controller_or_api/facultyController')
const courseController = require('../../controller_or_api/courseController');
const divisionController = require('../../controller_or_api/divisionController')
const subjectController = require("../../controller_or_api/subjectController")
const lectureController = require("../../controller_or_api/lectureController");
const attendanceController = require("../../controller_or_api/attendanceController")

//  App routes
router.post("/createStudent", studentController.createStudent);
router.post("/updateStudent", studentController.updateStudent);
router.post("/loginStudent", studentController.loginStudent)
router.post("/getattendancePercentage", attendanceController.attendancePercentage)



 
// admin routes

router.post('/signUpFaculty', facultyController.createFaculty);
router.post('/loginFaculty', facultyController.loginFaculty);
router.post('/markAttendance',attendanceController.markAttendance)




//course routes
router.post('/addCourse', courseController.addCourse);
router.get('/getCourse', courseController.getCourse);
router.get('/getAllCourse', courseController.getAllCourses);
router.post('/getSubject', courseController.getSubject);
router.post('/addDivision', divisionController.addDivision);


// subject routes
router.post('/addCourseAndSubject', subjectController.addSubject);
router.post('/getSubjectandDivisonOfCourse', subjectController.getSubjectandDivionOfCourse);
router.post('/getSemesterOfCourse', subjectController.getSemesterOfCourse);


// lecture routes

router.post('/createLecture', lectureController.createLecture)


// React App routes

module.exports = router