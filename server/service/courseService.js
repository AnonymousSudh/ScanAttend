const courseRepository = require("../repository_or_dal/courseRepository");

const addCourse = async (data) => {
    try {
        const courseData = await courseRepository.addCourse(data);
        return courseData
    } catch (error) {
        console.log("error at service layer");
        console.log(error)
        throw error;
    }
}


const getCourse = async () => {
    try {
        const result = await courseRepository.getCourse();
        const courseData = result.map((course) => ({id: course.id,name: course.name}));
        return courseData
    } catch (error) {
        console.log("error at service layer");
        console.log(error)
        throw error;
    }
}
const getSubject = async (data) => {
    try {
        const result = await courseRepository.getSubject(data);
        console.log(result.distinctDivision)
        // return
        const courseData = result.distinctSubject.map((course) => course.name);
        const divisonData = result.distinctDivision.map((division) => division.division);
        // console.log(courseData)
        // console.log("---------")
        // console.log(divisonData)
        return { courseData, divisonData }
    } catch (error) {
        console.log("error at service layer");
        console.log(error)
        throw error;
    }
}
const getAllCourses = async () => {
    try {
        const result = await courseRepository.getAllCourses();
        const courseData = result.map(course => ({ id: course.id, name: course.name }));
        return courseData
    } catch (error) {
        console.log("error at service layer");
        console.log(error)
        throw error;
    }
}

module.exports = { addCourse, getCourse, getSubject, getAllCourses }