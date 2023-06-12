const express = require("express");
const route = express.Router();
const studentController = require("../Controller/studentcontroller");

route.get("/",studentController.getStudent);

route.get("/search",studentController.SearchStudent);

route.post("searchStd",studentController.searchPagination);

route.get("/:id",studentController.getStudentId);

route.post("/",studentController.postStudent);

route.put("/:id",studentController.putStudent);

route.delete("/:id",studentController.deleteStudent);

module.exports = route;
