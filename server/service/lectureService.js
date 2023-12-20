const lectureRepo = require("../repository_or_dal/lectureRepository")

const createLecture = async (data) => {
    try {
        const result = await lectureRepo.createLecture(data);
        // console.log(result)
        // const courseData = result.map((course) => course.name);
        console.log(result)
        return result
    } catch (error) {
        console.log("error at service layer");
        console.log(error)
        throw error;
    }
}

module.exports ={createLecture}