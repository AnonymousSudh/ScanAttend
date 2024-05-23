const subjectRepo = require('../repository_or_dal/subjectRepository')

const addSubject = async (data) => {
    try {
        // console.log("data","data")
        // const { name, subjectCode, totalHours, courseId, semester, course } = data
        console.log("data at addsubject ", data)
        const subjectData = await subjectRepo.addSubject(data);
        console.log("subjectData", subjectData)
        return subjectData
    } catch (error) {
        console.log("error at service layer");
        console.log(error)
        throw error;
    }
}
// isSubjectPresent
const isSubjectPresent = async (data) => {
    try {
        console.log("isSubjectPresent")
        console.log(data, "data")
        // const { name, subjectCode, totalHours, courseId, semester, course } = data
        const subjectData = await subjectRepo.isSubjectPresent(data);
        console.log("isSubjectPresent", subjectData)
        if (!subjectData) {
            addSubject(data)
        } else {
            throw Error(`Subject Already Present in Course`)
        }
        return subjectData
    } catch (error) {
        console.log("error at service layer");
        console.log(error)
        throw error;
    }
}


const getSubjectandDivionOfCourse = async (data) => {
    try {
        console.log(data,"data at service layer")
        data.courseId = Number(data.courseId)
        // data.semester = Number(data.semester)
        const result = await subjectRepo.getSubjectandDivionOfCourse(data);
        const subjectData = result.result.map((val) => ({ id: val.id, name: val.name }))
        const divisionData = result.distinctDivisions.map((val) => ({ id: val.id, division: val.division, }))
        console.log("subjectData",subjectData)
        console.log("divisionData",divisionData)
        return { subjectData, divisionData }
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
        const subjectData = result.map((val) => ({ semester: Number(val.semester) }))
        return subjectData
    } catch (error) {
        console.log("error at service layer");
        console.log(error)
        throw error;
    }
}

const getSubjectOfStudents = async (data) => {
    try {
        // console.log(data)
        // data = Number(data.course);
        const result = await subjectRepo.getSubjectOfStudents(data);
        const subjectData = result.map((val) => (val.dataValues.name))
        console.log(subjectData)
        return subjectData
    } catch (error) {
        console.log("error at service layer");
        console.log(error)
        throw error;
    }
}
module.exports = { addSubject, getSubjectandDivionOfCourse, getSemesterOfCourse, getSubjectOfStudents, isSubjectPresent }