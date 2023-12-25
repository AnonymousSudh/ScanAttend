// this layer is for getting the data from the frontend and call service layer. 

const studentService = require("../service/studentService")

const createStudent = async (req, res) => {
    try {
        const studentData = req.body
        // console.log(req.body)
        const result = await studentService.createStudent(studentData);
        res.status(201).json({
            data: result,
            success: true,
            msg: "Account Created Successfully.",
            error: null
        });
    } catch (error) {
        res.status(400).json({
            data: null,
            success: false,
            msg: "Not able to Create Account",
            error: error.message,
        });
    }

}

const loginStudent = async(req,res)=>{
    try {
        const studentCredential = req.body
        console.log(studentCredential)
        // console.log(req.body)
        const result = await studentService.loginStudent(studentCredential);
        res.status(201).json({
            data: result,
            success: true,
            msg: "Login Successfully.",
            error: null
        });
    } catch (error) {
        res.status(400).json({
            data: null,
            success: false,
            msg: "Unable To Login",
            error: error.message,
        });
    }
};

const updateStudent = async (req, res) => {
    try {
        console.log(req.body)
        const { id, userName } = req.body
        const result = await studentService.updateStudent(id, userName);
        console.log(result);
        res.send(result);
    } catch (error) {
        console.log("Error at controller layer")
        throw error;
    }

}

module.exports = { createStudent, updateStudent ,loginStudent}