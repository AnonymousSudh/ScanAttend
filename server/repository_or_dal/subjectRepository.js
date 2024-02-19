const { Subject, Course, sequelize,Division } = require('../models/index')
var Sequelize = require('sequelize');
// const db = require('../config/config.json')

const addSubject = async (data) => {

    try {
        console.log("data at repo layer", data)
        const result = await Subject.create(data);
        console.log(result);
        return result
    } catch (error) {
        console.log("error at Repository layer");
        console.log(error)
        throw error;
    }
}
const getSubjectandDivionOfCourse = async (data) => {
    try {
        // console.log("getSubjectandDivionOfCourse called")
        console.log("data at repo layer", data)
        // return
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
        return {result,distinctDivisions}
    } catch (error) {
        console.log("error at Repository layer");
        console.log(error)
        throw error;
    }
}

const getSemesterOfCourse = async (data) => {

    try {
        console.log("data at repo layer", data)
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
        console.log(error)
        throw error;
    }
}

const getSubjectOfStudents = async (data) => {

    try {
        console.log("data at repo layer", data)
        const result = await Subject.findAll({
            where: {
                courseId: data.courseId,
                semester: data.semester
            }
        });
        // console.log(result)
      
        return result;
    } catch (error) {
        console.log("error at Repository layer");
        console.log(error)
        throw error;
    }
}


module.exports = { addSubject, getSubjectandDivionOfCourse, getSemesterOfCourse,getSubjectOfStudents }