const { Faculty,Lecture } = require("../models/index");

const createLecture = async (data) => {
    console.log(new Date());
    
    data.lectureDate = new Date();
    // console.log("data",data)
    // return
    try {
        const newLecture = await Lecture.create(data);
        return newLecture
    } catch (error) {
        console.log(error)
        throw error;
    }
}

const totalLectureCount = async (data) => {
    const { facultyId, subjectId, divisionId } = data
    
    try {
        const result = await Lecture.findAndCountAll({
            where: {
                subjectId,
                divisionId
            }
        })
        const count = result.count;
        console.log('Attendance count:', count);
        return count;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
module.exports= {createLecture,totalLectureCount}