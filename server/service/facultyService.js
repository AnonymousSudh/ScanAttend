const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRETKEY = process.env.SECRET_KEY;
const facultyRepository = require("../repository_or_dal/facultyRepository")

const createFaculty = async (data) => {
    try {
        // Check if the email is already registered
        const existingUser = await facultyRepository.findFaculty(data);

        if (existingUser) {
            console.log("user alredy exist")
            return {
                data: null,
                error: 'Email already exists'
            };
        }
        const { firstName,lastName,email,mobile} = data

        // Hash the password
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Create a new user with the hashed password
        const newFaculty = await facultyRepository.createFaculty({firstName,lastName,email,mobile,password:hashedPassword});

        return {
            data: newFaculty,
            error: null // No error if successful
        };
    } catch (error) {
        console.log("error at service layer");

        console.log(error)
        throw error;
    }
}
const loginFaculty = async (data) => {
    try {
        const user = await facultyRepository.findFaculty(data);
        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);

        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        const token = jwt.sign({ userId: user.id }, SECRETKEY, { expiresIn: '1h' });

        return {
            data: user,
            token: token,
            error: null // No error if successful
        };
    } catch (error) {
        console.log("error at service layer");
        console.log(error)
        throw error;
    }
}


module.exports = { createFaculty, loginFaculty }