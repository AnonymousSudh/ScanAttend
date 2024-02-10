const { Faculty } = require("../models/index");

const createFaculty = async (data) => {
    console.log("data",data)
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
        // console.log("data at repo layer" , data)
        const result = await Faculty.findOne({ where: { email:data.email } });
        console.log(result);
        return result
    } catch (error) {
        console.log("error at Repository layer");
        console.log(error)
        throw error;
    }
}

module.exports = { createFaculty, findFaculty }