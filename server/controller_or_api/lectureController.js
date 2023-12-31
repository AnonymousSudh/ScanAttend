const lectureService = require("../service/lectureService")

const createLecture = async (req, res) => {
    try {
        const credentials = req.body;
        console.log("at controller ",credentials);
        const result = await lectureService.createLecture(credentials);
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
            msg: "successfully created a lecture",
            error: null
        })

    } catch (error) {
        console.log("error at controller layer");
        console.log(error);
        return res.status(500).json({
            data: null,
            success: false,
            msg: "Lecture Not created",
            error: error
        })
    }
}

module.exports = {createLecture}