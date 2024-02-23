const facultyDivisionService = require("../service/facultyDivisionService.js")

const setFacultyToSubject = async (req, res) => {
    try {
        const credentials = req.body;
     
        const result = await facultyDivisionService.setFacultyToSubject(credentials);
        res.status(200).json({
            data: result,
            success: true,
            msg: "Faculty Division set",
            error: null
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            data: null,
            success: false,
            msg: "Not able to set Faculty Division",
            error: err
        })
    }
}



module.exports = { setFacultyToSubject,  }