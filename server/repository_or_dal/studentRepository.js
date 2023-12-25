const { Student } = require("../models/index");

const createStudent = async (studentData) => {
    // try {
    console.log(studentData)

    const result = await Student.create(studentData);
    return result

}

const loginStudent = async (studentCredential) => {
    console.log("studentCredential",studentCredential)
    try {
        const result = await Student.findOne({
            where: {
                userName: studentCredential.userName,
                password: studentCredential.password

            }
        })
        return result;
    } catch (error) {
        console.log(error);
        return error
    }

}
const findByRollNumber = async (rollNumber) => {
    try {
        return await Student.findOne({ where: { rollNumber } });

    } catch (error) {
        console.log(error)
        return error;
    }
};
const findByUserName = async (userName) => {
    try {
        return await Student.findOne({ where: { userName } });

    } catch (error) {
        console.log(error)
        return error
    }
};


const updateStudent = async (id, updatedData) => {
    try {
        console.log(updatedData)
        // const result = await Student.create(updatedData);
        const result = await Student.update({ userName: updatedData }, {
            where: {
                id: id
            }

        })
        console.log(result)
        return { success: true, data: result, message: "Student created successfully" };
    } catch (error) {
        console.error("Error creating student:", error);
        return { success: false, error: "Failed to create student" };
    }
}
const checkUniqueDevice = async (deviceData) => {
    try {
        console.log("unique device---------")
        const result = await Student.findAndCountAll({
            where: {
                deviceAddress: deviceData.deviceAddress,
                userName: deviceData.userName
            }
        })
        console.log(result.count);
        return result
        // if (result.count) {
        //     return { success: true ,error:""}
        // }
        // console.log("----------")
        // return { success: false, error:  }
    } catch (error) {
        console.log("Error at checking uniqueDevice", error);
        return { success: false, error }
    }

}
module.exports = { createStudent, updateStudent, checkUniqueDevice, findByRollNumber, findByUserName, loginStudent }