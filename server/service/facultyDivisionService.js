const facultyDivisisonRepository = require("../repository_or_dal/facultyDivisisonRepository")

const setFacultyToSubject = async (data) => {
    try {
        const result = await facultyDivisisonRepository.setFacultyToSubject(data);
        console.log("result")
        console.log(result)
        return result
    } catch (error) {
        console.log("error at service layer");
        console.log(error)
        throw error;
    }
}

module.exports ={setFacultyToSubject}