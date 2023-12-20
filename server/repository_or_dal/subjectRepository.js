const {Subject,Course,sequelize} = require('../models/index')
// var sequelize = require('sequelize');
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
const getSubjectOfCourse = async (data) => {

    try {
        console.log("data at repo layer", data)
        // return
        const result = await Subject.findAll({
            where:{
                courseId:data.courseId,
                semester:data.semester
            }
        });
        console.log(result);
        return result
    } catch (error) {
        console.log("error at Repository layer");
        console.log(error)
        throw error;
    }
}

const getSemesterOfCourse = async (data) => {

    try {
        console.log("data at repo layer", data)
        const distinctSemesterAndSubject = await sequelize.query(
            `SELECT DISTINCT subjects.semester
            FROM subjects
            INNER JOIN courses ON subjects.courseId = courses.id
            WHERE courses.id = ${data}`,
            { type: sequelize.QueryTypes.SELECT }
          );
      
          console.log(distinctSemesterAndSubject);
          return distinctSemesterAndSubject;
    } catch (error) {
        console.log("error at Repository layer");
        console.log(error)
        throw error;
    }
}


module.exports = {addSubject,getSubjectOfCourse,getSemesterOfCourse}