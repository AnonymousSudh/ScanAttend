// this layer is only for logic developmet not for backend call
const studentRepo = require("../repository_or_dal/studentRepository");

const createStudent = async (newUserData) => {
    try {
        const result = await studentRepo.createStudent(newUserData);
        console.log("")
        console.log("result",result)
        return result;
    } catch (error) {
        console.log("Error at Service layer");
        throw error
    }

}

const updateStudent = async (id,updatedData) => {
    try {
        const result = await studentRepo.updateStudent(id,updatedData);
        return result;
    } catch (error) {
        console.log("Error at Service layer");
        throw error
    }

}



module.exports = { createStudent,updateStudent }