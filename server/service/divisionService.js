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

module.exports ={addDivision}