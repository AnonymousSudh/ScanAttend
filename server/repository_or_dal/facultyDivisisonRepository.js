const { Faculty_Division, Subject_Division } = require("../models/index")


const setFacultyToSubject = async (data) => {

    try {
        console.log("data at repo layer setFacultyToSubject", data)

        // return
        const facultyDivision = await Faculty_Division.create(data);
        // const subjectDivision = await Subject_Division.create(data);
        console.log("subjectDivision");
        console.log(facultyDivision);
        // console.log(subjectDivision);
        return { facultyDivision }
    } catch (error) {
        console.log("error at Repository layer");
        console.log(error)
        throw error;
    }
}

module.exports = { setFacultyToSubject }