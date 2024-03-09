const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const SECRETKEY = process.env.SECRET_KEY;
const facultyRepository = require("../repository_or_dal/facultyRepository")

const createFaculty = async (data) => {
    try {
        // Check if the email is already registered
        console.log("data at create Faculty service",data)
        const existingUser = await facultyRepository.findFaculty(data);
        if (existingUser) {
            console.log("user alredy exist")
            return {
                data: null,
                error: 'Email already exists'
            };
        }
        const { firstName, lastName, email, mobile, type } = data

        // Hash the password
        const hashedPassword = await bcrypt.hash(data.password, 10);
        console.log("This is hased password", hashedPassword)

        // Create a new user with the hashed password
        const newFaculty = await facultyRepository.createFaculty({ firstName, lastName, email, mobile, type, password: hashedPassword });

        return {
            data: newFaculty,
            error: null // No error if successful
        };
    } catch (error) {
        console.log("error at service c layer");

        console.log(error)
        throw error;
    }
}
const loginFaculty = async (data) => {
    try {
        console.log("data at service layer")
        console.log(data)

        const user = await facultyRepository.findFaculty(data);
        // console.log(data)
        if (!user) {
            throw new Error('User not found');
        }
        const planePassword = data.password
        const hashedPassword = user.password
        // console.log("Both password")
        // console.log(planePassword,hashedPassword)

        const isPasswordValid = await bcrypt.compare(planePassword, hashedPassword);
        console.log(isPasswordValid)
        if (!isPasswordValid) {
            throw new Error('Invalid  password');
        }

        const token = jwt.sign({ userId: user.id }, SECRETKEY, { expiresIn: '1h' });

        return {
            data: user,
            token: token,
            error: null // No error if successful
        };
    } catch (error) {
        console.log("error at service layer -> login Faculty");
        console.log(error)
        throw error;
    }
}

const getAllFaculty = async () => {
    try {
        const result = await facultyRepository.getAllFaculty();
        const facultyList = result.map((faculty) => ({
            id: faculty.id,
            Name: faculty.firstName+" "+faculty.lastName,
            // lastName: faculty.lastName,
            email: faculty.email,
            mobile: faculty.mobile,
        }));
        console.log("allllll")
        console.log(facultyList)
        return facultyList
    } catch (error) {
        console.log("error at service in getAllFaculty");
        console.log(error)
        throw error;
    }
}
module.exports = { createFaculty, loginFaculty, getAllFaculty }