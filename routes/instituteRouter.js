const express = require("express");
const instituteController = require("../Controller/intituteController");
const route = express.Router();

route.get("/",instituteController.getInstitute)

route.get("/:id",instituteController.getInstituteId)

route.post("/",instituteController.postInstitute)

route.put("/:id",instituteController.putInstitute)

route.delete("/:id",instituteController.deleteInstitute)

module.exports = route;