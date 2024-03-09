const { Todo } = require("../models/index");
const { Op } = require("sequelize");
var Sequelize = require('sequelize');

const FetchTodo = async (req, res) => {
    try {
        const result = await Todo.findAll();
        // console.log(result)
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
            error: error.message
        })
    }
}


const addTodo = async (data) => {

    try {
        console.log("data at repo layer", data)
        // console.log("data at repo layer", data.body.work)
        const result = await Todo.create(data.body);
        // console.log(result);
        return result
    } catch (error) {
        console.log("error at Repository layer");
        console.log(error)
        throw error;
    }
}


module.exports = { FetchTodo,addTodo }