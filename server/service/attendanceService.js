const attendanceRepository = require("../repository_or_dal/attendanceRepository");

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
        const toalLecture = await attendanceRepository.totalLectureCount({ facultyId, subjectId, divisionId });
        const totalAttend = await attendanceRepository.totalLectureAttend({ studentId, lectureId });
        const attendancePercentage = (totalAttend/toalLecture)*100
        console.log("attendancePercentage",attendancePercentage)
        return {attendancePercentage};

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


module.exports = { markAttendance, attendancePercentage }