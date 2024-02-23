const { Attendance, Lecture, Subject, sequelize } = require("../models/index");
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
    const { facultyId, subjectId, divisionId ,courseId} = data

    try {
        const result = await Lecture.findAndCountAll({
            where: {
                facultyId,
                subjectId,
                divisionId,
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
        const { studentId, subjectId } = data
        const query = `
          SELECT COUNT(*) AS count
          FROM attendances
          INNER JOIN lectures ON attendances.lectureId = lectures.id
          WHERE studentId = ${studentId} AND lectures.subjectId = ${subjectId};
        `;

        const [result] = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

        const count = result.count;
        console.log('Attendance count:', count);
        return count;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

const getAllAttendanceDetails = async (data) => {
    try {
        console.log("called from repo ")
        const { studentId, lectureId, divisionId, courseId } = data
        const query = `
          select count(*) AS count,subjects.name,subjects.subjectCode,faculties.firstName ,faculties.lastName from attendances inner join lectures on attendances.lectureId = lectures.id inner join subjects on lectures.subjectId= subjects.id inner join faculties on lectures.facultyId = faculties.id where attendances.studentId =${studentId} and lectures.courseId=${courseId} and  lectures.divisionId=${divisionId} group by subjects.name,subjects.subjectCode,faculties.firstName ,faculties.lastName ;
        `;

        const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        console.log("shffi")
        console.log(result)

        const count = result;
        console.log('Attendance count:', count);
        return count;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }

}

const getAllLectureCountOfDivis = async (data) => {
    try {
        console.log("called from repo ")
        const { studentId, lectureId, divisionId, courseId } = data
        const query = `
        select count(*) as lectureCount,subjects.name from lectures inner join subjects on lectures.subjectId = subjects.id where lectures.divisionId= ${divisionId} group by subjects.name;
        ;
        `;

        const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        console.log("shffi")
        console.log(result)

        const count = result;
        console.log('Total lecture count:', count);
        return count;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }

}

module.exports = { markAttendance, isAlreadyPresent, totalLectureCount, totalLectureAttend, getAllAttendanceDetails, getAllLectureCountOfDivis }











// Attendance.findAll({
//     attributes: [
//       [sequelize.fn('COUNT', sequelize.col('*')), 'count'],
//       [sequelize.col('subject.name'), 'subjectName']
//     ],
//     include: [
//       {
//         model: Lecture,
//         attributes: [],
//         where: {
//           courseId: 2,
//           divisionId: 11
//         },
//         include: [
//           {
//             model: Subject,
//             attributes: [],
//             as: 'subject'
//           }
//         ]
//       }
//     ],
//     where: {
//       studentId: 1
//     },
//     group: ['subject.name']
//   })
//   .then(results => {
//     console.log(results);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });