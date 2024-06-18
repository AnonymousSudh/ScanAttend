const divisionRepo = require("../repository_or_dal/divisionRepository")

const addDivision = async (data) => {
    try {
        const result = await divisionRepo.addDivision(data);
        // console.log(result)
        // const courseData = result.map((course) => course.name);
        console.log(result)
        return result
    } catch (error) {
        console.log("error at service layer");
        console.log(error)
        throw error;
    }
}

// function to get Semester according to division
const getSemester = async (data) => {
    try {
        console.log(data, "divisionId getSemester")
        const result = await divisionRepo.getSemester(data.divisionId)
        // console.log(result)
        return result
    } catch (error) {
        console.log("Error at getting getSemester", error);
        return { success: false, error }
    }
}

module.exports = { addDivision, getSemester }