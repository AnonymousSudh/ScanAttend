const { Subject, Course, sequelize, Division } = require("../models/index");
var Sequelize = require("sequelize");
// const db = require('../config/config.json')

const addSubject = async (data) => {
    try {
        console.log("data at repo layer addSubject", data);
        const result = await Subject.create(data);
        console.log("result", result);
        return result;
    } catch (error) {
        console.log("error at Repository layer");
        console.log(error);
        throw error;
    }
};
const isSubjectPresent = async (data) => {
    try {
        console.log("data at repo layer isSubjectPresent", data);
        const result = await Subject.findOne({
            where: {
                name: data.name,
                courseId: data.courseId,
            },
        });
        console.log(result);
        // return
        return result;
    } catch (error) {
        console.log("error at Repository layer");
        console.log(error);
        throw error;
    }
};
const getSubjectandDivionOfCourse = async (data) => {
    try {
        // console.log("getSubjectandDivionOfCourse called")
        console.log("data at repo layer getSubjectandDivionOfCourse", data);
        // return
        const result = await sequelize.query(`
            select subjects.name,subjects.subjectCode,subjects.semester,divisions.division,subjects.id,divisions.id as divisionId from subjects
            inner join faculty_divisions on subjects.id = faculty_divisions.subjectId
            inner join divisions on divisions.id = faculty_divisions.divisionId
            where subjects.courseId = ${data.courseId}
            and faculty_divisions.facultyId = ${data.facultyId}`);

        console.log(result[0], "result");
        return result[0];
    } catch (error) {
        console.log("error at Repository layer");
        console.log(error);
        throw error;
    }
};
const getAllSubjectandDivion = async (data) => {
    try {
        console.log("data at repo layer getSubjectandDivionOfCourse", data)
        const result = await Subject.findAll({
            where: {
                courseId: data.courseId,
                semester: data.semester
            }
        });


        const distinctDivisions = await Division.findAll({
            attributes: ['division', 'id'],
            where: {
                courseId: data.courseId,
                semester: data.semester
            },
            distinct: true
            // attributes: [
            //     [sequelize.fn('DISTINCT', sequelize.col('division')), 'division']
            // ],
            // where: {
            //     courseId: data.courseId ,
            //     semester:data.semester
            // }
        });
        console.log(" ---distinctDivisions----")
        console.log(distinctDivisions)
        console.log("------------")

        // console.log(distinctSemesterOfCourse);
        console.log(result);
        return { result, distinctDivisions }
    } catch (error) {
        console.log("error at Repository layer");
        console.log(error)
        throw error;
    }
};
const getSemesterOfCourse = async (data) => {
    try {
        console.log("data at repo layer getSemesterOfCourse", data);
        const distinctSemesterOfCourse = await sequelize.query(
            `SELECT DISTINCT subjects.semester
            FROM subjects
            INNER JOIN courses ON subjects.courseId = courses.id
            WHERE courses.id = ${data}`,
            { type: sequelize.QueryTypes.SELECT }
        );

        return distinctSemesterOfCourse;
    } catch (error) {
        console.log("error at Repository layer");
        console.log(error);
        throw error;
    }
};

const getSubjectOfStudents = async (data) => {
    try {
        console.log("data at repo layer getSubjectOfStudents", data);
        const result = await Subject.findAll({
            where: {
                courseId: data.courseId,
                semester: data.semester,
            },
        });
        // console.log(result)

        return result;
    } catch (error) {
        console.log("error at Repository layer");
        console.log(error);
        throw error;
    }
};

module.exports = {
    addSubject,
    getSubjectandDivionOfCourse,
    getSemesterOfCourse,
    getSubjectOfStudents,
    isSubjectPresent,
    getAllSubjectandDivion
};
