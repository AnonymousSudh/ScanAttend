const attendanceRepository = require("../repository_or_dal/attendanceRepository");


function mergeArrays(array1, array2) {
    let mergedArray = [];

    array1.forEach(item1 => {
        let matchingItem = array2.find(item2 => item2.name === item1.name);
        console.log("matchingItem", matchingItem)
        if (matchingItem) {
            const percentage = ((item1.count / matchingItem.lectureCount) * 100).toFixed(2);
            mergedArray.push({ ...item1, ...matchingItem, percentage });
        }
    });

    return mergedArray;
}
const markAttendance = async (data) => {
    try {
        const isPresent = await attendanceRepository.isAlreadyPresent({ lectureId: data.lectureId })
        // console.log("isPresent", isPresent)
        if (isPresent) {
            throw new Error("Already Marked Present");
        } else {
            // console.log("executing else part")
            const courseData = await attendanceRepository.markAttendance(data);
            console.log(courseData);
            return courseData
        }
        // return courseData
    } catch (error) {
        // console.log("error at service layer");
        // console.log(error)
        throw error;
    }
}

const attendancePercentage = async (data) => {
    try {
        var { lectureId, studentId, courseId, subjectId, facultyId, divisionId } = data
        lectureId = Number(lectureId)
        studentId = Number(studentId)
        courseId = Number(courseId)
        subjectId = Number(subjectId)
        facultyId = Number(facultyId)
        divisionId = Number(divisionId)
        const toalLecture = await attendanceRepository.totalLectureCount({ facultyId, subjectId, divisionId, courseId });
        const totalAttend = await attendanceRepository.totalLectureAttend({ studentId, subjectId });
        console.log("toalLecture", toalLecture, "totalAttend", totalAttend)
        const attendancePercentage = (totalAttend / toalLecture) * 100
        console.log("attendancePercentage", attendancePercentage)
        return { attendancePercentage };

    } catch (error) {

        throw error;
    }
}
const getAllAttendanceDetails = async (data) => {
    try {
        var { lectureId, studentId, courseId, subjectId, facultyId, divisionId } = data
        lectureId = Number(lectureId)
        studentId = Number(studentId)
        courseId = Number(courseId)
        subjectId = Number(subjectId)
        facultyId = Number(facultyId)
        divisionId = Number(divisionId)
        console.log("called from service layer")

        const attendanceReport = await attendanceRepository.getAllAttendanceDetails({ studentId, lectureId, divisionId, courseId });
        const lectureCountReport = await attendanceRepository.getAllLectureCountOfDivis({ studentId, lectureId, divisionId, courseId });

        console.log("attendanceReport", attendanceReport)
        console.log("lectureCountReport", lectureCountReport)

        const mergedArray = mergeArrays(attendanceReport, lectureCountReport);
        console.log(mergedArray)
        // const attendancePercentage = (totalAttend/toalLecture)*100
        // console.log("attendancePercentage",attendancePercentage)
        return { mergedArray };

    } catch (error) {

        throw error;
    }
}

const getAllLectureCountOfDivis = async (data) => {
    try {
        var { lectureId, studentId, courseId, subjectId, facultyId, divisionId } = data
        lectureId = Number(lectureId)
        studentId = Number(studentId)
        courseId = Number(courseId)
        subjectId = Number(subjectId)
        facultyId = Number(facultyId)
        divisionId = Number(divisionId)
        // const toalLecture = await attendanceRepository.totalLectureCount({ facultyId, subjectId, divisionId });
        console.log("called from service layer")
        const lectureCountReport = await attendanceRepository.getAllLectureCountOfDivis({ studentId, lectureId, divisionId, courseId });
        // console.log("lectureCountReport", lectureCountReport)

        // const attendancePercentage = (totalAttend/toalLecture)*100
        // console.log("attendancePercentage",attendancePercentage)
        return { lectureCountReport };

    } catch (error) {

        throw error;
    }
}
// const totalLectureCount = async (data) => {
//     try {
//         const result = await attendanceRepository.totalLectureCount();
//     } catch (error) {

//         throw error;
//     }
// }


module.exports = { markAttendance, attendancePercentage, getAllAttendanceDetails, getAllLectureCountOfDivis }