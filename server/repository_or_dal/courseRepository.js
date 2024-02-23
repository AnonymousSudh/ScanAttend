const { Course, Division } = require("../models/index");
const { Op } = require("sequelize");
var Sequelize = require('sequelize');

const addCourse = async (data) => {

    try {
        console.log("data at repo layer", data)
        const result = await Course.create(data);
        // console.log(result);
        return result
    } catch (error) {
        console.log("error at Repository layer");
        console.log(error)
        throw error;
    }
}

const checkIsAleadyCourse = async (data) => {

    try {
        console.log("data at repo layer", data)
        const result = await Course.findOne({
            where:{
                name:data.name
            }
        });
        // console.log("result checkIsAleadyCourse",result)
        // console.log(result);
        return result
    } catch (error) {
        console.log("error at Repository layer");
        console.log(error)
        throw error;
    }
}



// checkIsAleadyCourse

const getCourse = async () => {

    try {
        console.log("data at repo layer getCourse")
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
        console.log("data at repo layer getSubject", data)
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
        return { distinctSubject, distinctDivision }
    } catch (error) {
        console.log("error at Repository layer");
        console.log(error)
        throw error;
    }
}

const getAllCourses = async () => {

    try {
        console.log("data at repo layer getAllCourses");
        const allCourses = await Course.findAll();
        console.log(allCourses);
        return allCourses;
    } catch (error) {
        console.log("error at Repository layer")
        console.log(error);
        throw error;
    }
}


module.exports = { addCourse, getCourse, getSubject, getAllCourses, checkIsAleadyCourse }