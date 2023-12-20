const { Faculty,Lecture } = require("../models/index");

const createLecture = async (data) => {
    console.log(new Date());
    
    data.lectureDate = new Date();
    console.log("data",data)
    // return
    try {
        const newLecture = await Lecture.create(data);
        return newLecture
    } catch (error) {
        console.log(error)
        throw error;
    }
}

module.exports= {createLecture}