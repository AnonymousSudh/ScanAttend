const attendanceRepository = require("../repository_or_dal/attendanceRepository");

const markAttendance = async (data) => {
    try {
        const courseData = await attendanceRepository.markAttendance(data);
        return courseData
    } catch (error) {
        console.log("error at service layer");
        console.log(error)
        throw error;
    }
}

module.exports = {markAttendance}