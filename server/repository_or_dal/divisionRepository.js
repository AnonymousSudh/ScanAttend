const {Division} = require("../models/index")


const addDivision = async (data) => {

    try {
        console.log("data at repo layer addDivision", data)

        const result = await Division.create(data);
        console.log(result);
        return result
    } catch (error) {
        console.log("error at Repository layer");
        console.log(error)
        throw error;
    }
}

module.exports  ={addDivision}