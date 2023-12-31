const { Course,Division} = require("../models/index");
const { Op } = require("sequelize");
var Sequelize = require('sequelize');

const addCourse = async (data) => {

    try {
        console.log("data at repo layer", data)
        const result = await Course.create(data);
        console.log(result);
        return result
    } catch (error) {
        console.log("error at Repository layer");
        console.log(error)
        throw error;
    }
}





const getCourse = async () => {

    try {
        console.log("data at repo layer")
        const allCourse = await Course.findAll();

        // console.log(allCourse);

        return allCourse
    } catch (error) {
        console.log("error at Repository layer");
        console.log(error)
        throw error;
    }
}

const getSubject = async (data) => {

    try {
        console.log("data at repo layer", data)
        const distinctSubject = await Course.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('name')), 'name']
            ],
            where: {
                stream: data.course
            }
        });
        const distinctDivision = await Division.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('division')), 'division']
            ],
            where: {
                stream: data.course
            }
        });

        // console.log(distinctSubject);
        return {distinctSubject,distinctDivision}
    } catch (error) {
        console.log("error at Repository layer");
        console.log(error)
        throw error;
    }
}

const getAllCourses = async () => {

    try {
        console.log("data at repo layer");
        console.log("1234t ")
        const allCourses = await Course.findAll();
        console.log(allCourses);
        return allCourses;
    } catch (error) {
        console.log("error at Repository layer")
        console.log(error);
        throw error;
    }
}


module.exports = { addCourse, getCourse, getSubject ,getAllCourses}