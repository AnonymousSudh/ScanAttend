// this layer is for getting the data from the frontend and call service layer. 

const studentService = require("../service/studentService")

const createStudent = async (req, res) => {
    try {
        const newUserData = req.body
        console.log(req.body)
        const result = await studentService.createStudent(newUserData);
        console.log(result);
        res.data(result)
        res.send(result);
    } catch (error) {
        console.log("Error at controller layer")
        throw error;
    }

}


const updateStudent = async (req, res) => {
    try {
        console.log(req.body)
        const {id,userName} = req.body
        const result = await studentService.updateStudent(id,userName);
        console.log(result);
        res.send(result);
    } catch (error) {
        console.log("Error at controller layer")
        throw error;
    }

}

module.exports = { createStudent,updateStudent }