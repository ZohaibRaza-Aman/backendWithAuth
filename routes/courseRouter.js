const express = require("express");
const route = express.Router();
const courseController = require("../Controller/courseController");

route.get("/", courseController.getCourse);
route.get("/:id", courseController.getCourseId);
route.post("/", courseController.postCourse);
route.put("/:id", courseController.putCourse);
route.delete("/:id", courseController.deleteCourse);

module.exports = route;
