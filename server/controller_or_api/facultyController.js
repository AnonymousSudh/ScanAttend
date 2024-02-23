// const facultyRepository = require("../repository_or_dal/facultyRepository")
const facultyService = require("../service/facultyService")

const createFaculty = async (req, res) => {
    try {
        const teacherData = req.body;
        console.log(teacherData)
        const result = await facultyService.createFaculty(teacherData);
        console.log("-------")
        console.log(result)
        if (result.error) {
            console.log(result.error);
            return res.status(400).send({
                data: null,
                success: false,
                msg: "Email already exist",
                error: result.error
            })
        }

        return res.status(200).json({
            data: result.data,
            success: true,
            msg: "successfully created a Faculty",
            err: {}
        })

    } catch (error) {
        console.log("error at controller layer");
        console.log(error);
        return res.status(550).json({
            data: null,
            success: false,
            msg: "Not able to create a Faculty",
            err: error
        })

    }
}
const loginFaculty = async (req, res) => {
    try {
        const credentials = req.body;
        console.log(credentials);
        const result = await facultyService.loginFaculty(credentials);
        console.log("- login result --")
        console.log(result)
        console.log("-----")
        if (result.error) {
            // If there's an error during login, respond with an error status and message
            return res.status(401).json({ error: result.error });
        }

        // If login is successful, extract the user data and token from the result
        const { data: user, token, type } = result;

        return res.status(200).json({
            data: { user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, token, type: user.type } },
            success: true,
            msg: "successfully created a Faculty",
            error: null
        })

    } catch (error) {
        console.log("error at controller layer");
        console.log(error);
        return res.status(500).json({
            data: null,
            success: false,
            msg: "Not able to create a city",
            error: error
        })
    }
}

const getAllFaculty = async (req, res) => {
    try {
        const result = await facultyService.getAllFaculty();
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
            msg: "successfully fetched all Faculty",
            error: null
        })

    } catch (error) {
        console.log("error at fetching all Faculty");
        console.log(error);
        return res.status(500).json({
            data: null,
            success: false,
            msg: "Not able fetch Faculty",
            error: error
        })
    }
}



const setFacultyToSubject = async (req, res) => {
    try {
        const result = await facultyService.getAllFaculty();
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
            msg: "successfully fetched all Faculty",
            error: null
        })

    } catch (error) {
        console.log("error at fetching all Faculty");
        console.log(error);
        return res.status(500).json({
            data: null,
            success: false,
            msg: "Not able fetch Faculty",
            error: error
        })
    }
}






module.exports = { createFaculty, loginFaculty, getAllFaculty, setFacultyToSubject }