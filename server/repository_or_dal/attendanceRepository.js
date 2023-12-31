const { Attendance, Lecture, sequelize } = require("../models/index");
const { Op } = require("sequelize");
var Sequelize = require('sequelize');

const markAttendance = async (data) => {

    try {
        console.log("data at repo layer", data)
        const result = await Attendance.create({ lectureId: data.lectureId, studentId: data.studentId });
        // console.log(result);
        return result
    } catch (error) {
        console.log("error at Repository layer");
        console.log(error)
        throw error;
    }
}

const isAlreadyPresent = async ({ lectureId }) => {
    try {
        console.log(lectureId)
        const result = await Attendance.findAndCountAll({
            where: { lectureId }
        })
        return result.count;
    } catch (error) {
        console.log("error at Repo, isAlreadyPresent", error)
        throw error;
    }
}

const totalLectureCount = async (data) => {
    const { facultyId, subjectId, divisionId } = data
    
    try {
        const result = await Lecture.findAndCountAll({
            where: {
                facultyId,
                subjectId,
                divisionId
            }
        })
        const count = result.count;
        console.log('Total lecture count:', count);
        return count;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
const totalLectureAttend = async (data) => {
    try {
        const { studentId, lectureId } = data
        const query = `
          SELECT COUNT(*) AS count
          FROM attendances
          INNER JOIN lectures ON attendances.lectureId = lectures.id
          WHERE attendances.studentId = ${studentId} AND lectures.subjectId = ${lectureId};
        `;

        const [result] = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        
        const count = result.count+1;
        console.log('Attendance count:', count);
        return count;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}


module.exports = { markAttendance, isAlreadyPresent, totalLectureCount, totalLectureAttend }