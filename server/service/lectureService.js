const lectureRepo = require("../repository_or_dal/lectureRepository")

const createLecture = async (data) => {
    try {
        const result = await lectureRepo.createLecture(data);
        // console.log(result)
        // const courseData = result.map((course) => course.name);
        console.log(result.dataValues)
        return result.dataValues
    } catch (error) {
        console.log("error at service layer");
        console.log(error)
        throw error;
    }
}
const getMyLectures = async (data) => {
    try {
        const result = await lectureRepo.getMyLectures(data);
        console.log("result  ---")
        console.log(result)
        // const lectureData = result.map((lecture) => lecture);
        // console.log(lectureData, "lectureData")
        return result
    } catch (error) {
        console.log("error at service layer");
        console.log(error)
        throw error;
    }
}


const getLectureDataAndCount = async (data) => {
    try {
        console.log(data, "data at service")
        const result = await lectureRepo.getLectureDataAndCount({ courseId: data.courseId })
        return result
    } catch (error) {
        console.log("error at service layer, getLectureDataAndCount");
        console.log(error)
        throw error;
    }
}
const getAttendCount = async (data) => {
    try {
        console.log(data, "data at service")
        const result = await lectureRepo.getAttendCount({ studentId: data.studentId })
        return result
    } catch (error) {
        console.log("error at service layer, getAttendCount");
        console.log(error)
        throw error;
    }
}
module.exports = { createLecture, getMyLectures, getLectureDataAndCount, getAttendCount }