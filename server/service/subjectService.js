const subjectRepo = require('../repository_or_dal/subjectRepository')

const addSubject = async (data) => {
    try {
        console.log(data)
        // const { name, subjectCode, totalHours, courseId, semester, course } = data
        const subjectData = await subjectRepo.addSubject(data);
        console.log(subjectData)
        return subjectData
    } catch (error) {
        console.log("error at service layer");
        console.log(error)
        throw error;
    }
}

const getSubjectOfCourse = async (data) => {
    try {
        // console.log(data)
        data.courseId = Number(data.courseId)
        // data.semester = Number(data.semester)
        const result = await subjectRepo.getSubjectOfCourse(data);
        const subjectData = result.map((val) =>({id:val.id,name:val.name}))
        console.log(subjectData)
        return subjectData
    } catch (error) {
        console.log("error at service layer");
        console.log(error)
        throw error;
    }
}
const getSemesterOfCourse = async (data) => {
    try {
        // console.log(data)
        data = Number(data.course);
        const result = await subjectRepo.getSemesterOfCourse(data);
        const subjectData = result.map((val) =>({name:val.name,semester:Number(val.semester)}))
        return subjectData
    } catch (error) {
        console.log("error at service layer");
        console.log(error)
        throw error;
    }
}
module.exports = { addSubject ,getSubjectOfCourse,getSemesterOfCourse}