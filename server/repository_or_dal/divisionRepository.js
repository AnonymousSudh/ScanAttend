const { Division } = require("../models/index")


const addDivision = async (data) => {

    try {
        console.log("data at repo layer addDivision", data)

        const result = await Division.create(data);
        console.log(result);
        return result
    } catch (error) {
        console.log("error at Repository layer");
        console.log(error)
        throw error;
    }
}

// function to get Semester according to division
const getSemester = async (data) => {
    console.log(data, "get semester")
    try {
        console.log(data, "divisionId getSemester")
        const semester = await Division.findAll({
            where: {
                id: data,
            }
        })
        console.log(semester.dataValues, "semester")
        return semester.dataValues
    } catch (error) {
        console.log("Error at getting Semester", error);
        return { success: false, error }
    }
}


module.exports = { addDivision, getSemester }