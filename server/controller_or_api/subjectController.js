const subjectService = require("../service/subjectService");

const addSubject = async (req, res) => {
    try {
        const credentials = req.body;
        console.log(credentials);
        const result = await subjectService.addSubject(credentials);
        console.log("---")
        console.log(result)
        console.log("-----")
        if (result.error) {
            // If there's an error during login, respond with an error status and message
            return res.status(401).json({ error: result.error });
        }
        return res.status(200).json({
            data: result,
            success: true,
            msg: "successfully Added a Subject",
            error: null
        })

    } catch (error) {
        console.log("error at controller layer");
        console.log(error);
        return res.status(500).json({
            data: null,
            success: false,
            msg: "Not able to add Subject",
            error: error
        })
    }
}

const getSubjectOfCourse = async (req, res) => {
    try {
        const credentials = req.body;
        console.log(credentials);
        const result = await subjectService.getSubjectOfCourse(credentials);
        console.log("---")
        console.log(result)
        console.log("-----")
        if (result.error) {
            // If there's an error during login, respond with an error status and message
            return res.status(401).json({ error: result.error });
        }
        return res.status(200).json({
            data: result,
            success: true,
            msg: "successfully Added a Subject",
            error: null
        })

    } catch (error) {
        console.log("error at controller layer");
        console.log(error);
        return res.status(500).json({
            data: null,
            success: false,
            msg: "Not able to add Subject",
            error: error
        })
    }
}

const getSemesterOfCourse = async (req, res) => {
    try {
        const credentials = req.body;
        console.log(credentials);
        const result = await subjectService.getSemesterOfCourse(credentials);
        console.log("---")
        console.log(result)
        console.log("-----")
        if (result.error) {
            // If there's an error during login, respond with an error status and message
            return res.status(401).json({ error: result.error });
        }
        return res.status(200).json({
            data: result,
            success: true,
            msg: "successfully Added a Subject",
            error: null
        })

    } catch (error) {
        console.log("error at controller layer");
        console.log(error);
        return res.status(500).json({
            data: null,
            success: false,
            msg: "Not able to add Subject",
            error: error
        })
    }
}



module.exports = { addSubject ,getSubjectOfCourse,getSemesterOfCourse}