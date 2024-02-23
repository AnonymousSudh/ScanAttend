const courseService = require("../service/courseService");

const addCourse = async (req, res) => {
    try {
        const credentials = req.body;
        console.log("addcourse");
        const result = await courseService.checkIsAleadyCourse(credentials);
        console.log("---")
        console.log(result)
        console.log("-----")
        // if (result.error) {
        //     // If there's an error during login, respond with an error status and message
        //     return res.status(401).json({ error: result.error });
        // }
        return res.status(200).json({
            data: result,
            success: true,
            msg: "successfully Added a Course",
            error: null
        })

    } catch (error) {
        console.log("error at controller layer addCourse ");
        console.log(error.message)
        console.log(error.message)
        return res.status(402).json({
            data: null,
            success: false,
            msg: "Not able to add course",
            error:error.message
        })
    }
}

const getCourse = async (req, res) => {
    try {
        const result = await courseService.getCourse();
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
            msg: "successfully Added a Course",
            error: null
        })

    } catch (error) {
        console.log("error at controller layer");
        console.log(error);
        return res.status(500).json({
            data: null,
            success: false,
            msg: "Not able to add course",
            error: error
        })
    }
}

const getSubject = async (req, res) => {
    try {
        const credentials = req.body;
        console.log(credentials);
        const result = await courseService.getSubject(credentials);
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
            msg: "successfully Added a Course",
            error: null
        })

    } catch (error) {
        console.log("error at controller layer");
        console.log(error);
        return res.status(500).json({
            data: null,
            success: false,
            msg: "Not able to add course",
            error: error
        })
    }
}

const getAllCourses = async (req, res) => {
    try {
        const result = await courseService.getAllCourses();
        console.log("---")
        console.log(result)
        console.log("-----")
        if (result.error) {
            return res.status(401).json({ error: result.error });
        }
        return res.status(200).json({
            data: result,
            success: true,
            msg: "successfully Added a Course",
            error: null
        })

    } catch (error) {
        console.log("error at controller layer");
        console.log(error);
        return res.status(500).json({
            data: null,
            success: false,
            msg: "Not able to add course",
            error: error
        })
    }
}



module.exports = { addCourse, getCourse, getSubject,getAllCourses }