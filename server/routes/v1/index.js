const express = require("express");
const router = express.Router();
const studentController = require("../../controller_or_api/studentController")
const facultyController = require('../../controller_or_api/facultyController')
const courseController = require('../../controller_or_api/courseController');
const divisionController = require('../../controller_or_api/divisionController')
const subjectController = require("../../controller_or_api/subjectController")
const lectureController = require("../../controller_or_api/lectureController");
const attendanceController = require("../../controller_or_api/attendanceController")
const facultyDivisionController = require("../../controller_or_api/facultyDivisionController")




const Todo = require("../../controller_or_api/Todo")



//  App routes
router.post("/createStudent", studentController.createStudent);
router.post("/updateStudent", studentController.updateStudent);
router.post("/loginStudent", studentController.loginStudent)
router.post("/getattendancePercentageOfSubjectSubject", attendanceController.attendancePercentage)
router.post("/getAllAttendanceDetails", attendanceController.getAllAttendanceDetails)
router.post("/getAllLectureCountOfDivis", attendanceController.getAllLectureCountOfDivis)

// getAllLectureCountOfDivis



// admin routes
// setFacultyToSubject
router.post('/signUpFaculty', facultyController.createFaculty);
router.post('/loginFaculty', facultyController.loginFaculty);
router.post('/markAttendance',attendanceController.markAttendance)
router.get('/getAllFaculty', facultyController.getAllFaculty);
// Main Admin routes
router.post('/setFacultyToSubject', facultyDivisionController.setFacultyToSubject);





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
router.post('/getSubjectOfStudents', subjectController.getSubjectOfStudents);



// 
// lecture routes

router.post('/createLecture', lectureController.createLecture)
















// Todo App delete me
router.get('/FetchTodo', Todo.FetchTodo)
router.post('/addTodo', Todo.addTodo)


// React App routes

module.exports = router