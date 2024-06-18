const { Faculty,Lecture } = require("../models/index");

const createFaculty = async (data) => {
    console.log("data", data)
    try {
        const newFaculty = await Faculty.create(data);
        return newFaculty
    } catch (error) {
        console.log(error)
        throw error;
    }
}

const findFaculty = async (data) => {
    try {
        console.log("data at repo layer findFaculty", data)
        const result = await Faculty.findOne({
            where: {
                email: data?.email,
                type: data?.type
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
const getAllFaculty = async (data) => {

    try {
        console.log("data at repo layer getAllFaculty", data)
        const facultyList = await Faculty.findAll({ where: { type: "faculty" } });
        console.log("facultyList")
        // console.log(facultyList)
        return facultyList;
    } catch (error) {
        console.log("error at Repository in getAllFaculty");
        console.log(error)
        throw error;
    }
}

// function to get last lecture of a particular Faculty
const getLastClass = async (data) => {
    try {
        console.log("data at repo layer getAllFaculty", data)
        const lastClass = await Lecture.findOne({
            where: { facultyId: data.facultyId }
        });
        console.log("facultyList")
        console.log(lastClass.dataValues)
        return lastClass.dataValues;
    } catch (error) {
        console.log("error at Repository in getAllFaculty");
        console.log(error)
        throw error;
    }
}
module.exports = { createFaculty, findFaculty, getAllFaculty, getLastClass }