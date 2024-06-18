const { Faculty, Lecture, sequelize } = require("../models/index");
var Sequelize = require('sequelize');
const createLecture = async (data) => {
    console.log(new Date());

    data.lectureDate = new Date();
    // console.log("data",data)
    // return
    try {
        const newLecture = await Lecture.create(data);
        return newLecture
    } catch (error) {
        console.log(error)
        throw error;
    }
}

const totalLectureCount = async (data) => {
    const { facultyId, subjectId, divisionId } = data

    try {
        const result = await Lecture.findAndCountAll({
            where: {
                subjectId,
                divisionId
            }
        })
        const count = result.count;
        console.log('Attendance count:', count);
        return count;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

const getMyLectures = async (data) => {
    const { FacultyId, Date } = data

    try {
        // const lectures = await Lecture.findAll({ facultyId: FacultyId, lectureDate: Date });

        const lectures = await sequelize.query(
            `select 
            courses.name AS course_name,
            divisions.division,
            subjects.name AS subject_name,
            subjects.subjectCode,
            lectures.lectureDate
                from lectures
                inner join courses on lectures.courseId = courses.id
                inner join divisions on lectures.divisionId = divisions.id
                inner join subjects on lectures.subjectId = subjects.id
                where lectures.facultyId = ${FacultyId} AND DATE(lectures.lectureDate) = '${Date}'`,
            { type: sequelize.QueryTypes.SELECT }
        );
        console.log(lectures, "lectures")
        return lectures;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// this Function Get all the lecture for a Specific Course
const getLectureDataAndCount = async (data) => {
    try {
        console.log(data, "data at repo")
        const { courseId } = data;
        console.log(courseId)
        const lectureDataAndCount = await sequelize.query(
            `select count(*) as count,name,subjectId,faculties.firstName,faculties.lastName,subjects.subjectCode
            from lectures 
            inner join subjects on lectures.subjectId = subjects.id 
            inner join faculties on lectures.facultyId = faculties.id 
            where lectures.courseId=${courseId} group by subjectId;`,
            { type: sequelize.QueryTypes.SELECT }
        );
        console.log(lectureDataAndCount, "lectureDataAndCount")
        return lectureDataAndCount
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}


const getAttendCount = async (data) => {
    try {
        console.log(data, "data at repo")
        const { studentId } = data;
        console.log(studentId)
        // return
        const attendCount = await sequelize.query(
            `select count(*) as count,subjects.name,subjects.subjectCode,subjects.id from attendances 
            inner join lectures on attendances.lectureId= lectures.id 
            inner join subjects on lectures.subjectId = subjects.id
            where studentId=${studentId}
            group by  lectures.subjectId;`,
            { type: sequelize.QueryTypes.SELECT }
        );
        console.log(attendCount, "attendCount")
        return attendCount
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
module.exports = { createLecture, totalLectureCount, getMyLectures, getLectureDataAndCount, getAttendCount }