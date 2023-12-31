const attendanceService = require("../service/attendanceService.js")

const markAttendance = async (req, res) => {
    try {
        const credentials = req.body;
        console.log("--------- Attendance Started ------");
        console.log(credentials);
        const result = await attendanceService.markAttendance(credentials);
        // console.log("---")
        // console.log(result)
        // console.log("-----")
        res.status(200).json({
            data: result,
            success: true,
            msg: "Attendance Marked Successfully",
            error: null
        })
    } catch (err) {
        // console.log("error at controller layer");
        console.log(err);
        res.status(400).json({
            data: null,
            success: false,
            msg: "Not Able To mark Present",
            error: err
        })
    }
}

const attendancePercentage = async (req, res) => {
    try {
        console.log("--------- Attendance Percentage ------");

        const credentials = req.body;
        console.log("Attendance Data",credentials);
        
        const result = await attendanceService.attendancePercentage(credentials);
 
        res.status(200).json({
            data: result,
            success: true,
            msg: "Attendance Marked Successfully",
            error: null
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            data: null,
            success: false,
            msg: "Not Able To mark Present",
            error: err
        })
    }
}


module.exports = { markAttendance, attendancePercentage }