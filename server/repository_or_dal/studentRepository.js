const { Student } = require("../models/index");

const createStudent = async (newUserData) => {
    try {
        console.log(newUserData)
        const result = await Student.create(newUserData);
        console.log(result)
        return { success: true, data: result, message: "Student created successfully" };
    } catch (error) {
        console.error("Error creating student:", error);
        return { success: false, error: "Failed to create student" };
    }
}

const updateStudent = async (id,updatedData) => {
    try {
        console.log(updatedData)
        // const result = await Student.create(updatedData);
        const result = await Student.update({userName:updatedData},{
            where:{
                id:id
            }

        })
        console.log(result)
        return { success: true, data: result, message: "Student created successfully" };
    } catch (error) {
        console.error("Error creating student:", error);
        return { success: false, error: "Failed to create student" };
    }
}

module.exports = { createStudent,updateStudent }