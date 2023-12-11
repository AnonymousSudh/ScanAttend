const express = require("express");
const router = express.Router();
const studentController = require("../../controller_or_api/studentController")

router.post("/create",studentController.createStudent) 
router.post("/update",studentController.updateStudent) 

module.exports = router