// this layer is only for logic developmet not for backend call
const studentRepo = require("../repository_or_dal/studentRepository");

const createStudent = async (studentData) => {
    try {
        console.log(studentData)
        const existingUser = await studentRepo.findByRollNumber(studentData.rollNumber);
        if (existingUser) {
            throw new Error('Roll number already exists');
        }
        const result = await studentRepo.createStudent(studentData);
        return result;
    } catch (error) {
        throw error;

    }

}

const loginStudent = async (studentCredential) => {
    try {
        const { deviceAddress, userName } = studentCredential;
        const existingUser = await studentRepo.findByUserName(userName); // checking valid rollNumber
        if (existingUser) { // 
            const data = await studentRepo.checkUniqueDevice({ deviceAddress, userName }); //checking unique device
            if (data.count) { // if user again login in same device
                // const result = await studentRepo.createStudent(studentData);
                const user = await studentRepo.loginStudent(studentCredential);
                console.log("user", user);
                if (user) {
                    return user
                } else {
                    throw new Error("Incorrect Password")
                }

            }
            else {
                throw new Error("Already Login SomeWhere");
            }
        }
        else {
            throw new Error("User Not Found");

        }

        console.log(uniqueDevice)

        // console.log(studentData)
        // const existingUser = await studentRepo.findByRollNumber(studentData.rollNumber);
        // if (existingUser) {
        //     throw new Error('Roll number already exists');
        //   }
        // const result = await studentRepo.createStudent(studentData);
        // return result;
    } catch (error) {
        console.log(error)
        throw error;

    }

}
const updateStudent = async (id, updatedData) => {
    try {

        const result = await studentRepo.updateStudent(id, updatedData);
        return result;
    } catch (error) {
        console.log("Error at Service layer");
        throw error
    }

}




module.exports = { createStudent, updateStudent, loginStudent }