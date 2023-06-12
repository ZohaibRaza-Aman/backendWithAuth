const { sendResponse } = require("../Helper/helper");
const StudentModel = require("../models/studentModel");

const studentController = {
  getStudent:  async (req, res) => {
    try {
      const result = await StudentModel.find();
      if (!result) {
        res.send(sendResponse(false, null, "No Data Found")).status(404);
      } else {
        res.send(sendResponse(true, result)).status(200);
      }
    } catch (e) {
      console.log(e);
      res.send(sendResponse(false)).status(400);
    }
  },
  SearchStudent:async (req, res) => {
    try {
      let { firstName, lastName } = req.body;
      if (firstName) {
        let result = await StudentModel.find({
          firstName: firstName,
          lastName: lastName,
        });
        if (!result) {
          res.send(sendResponse(false, null, "No Data Found")).status(404);
        } else {
          res.send(sendResponse(true, result)).status(200);
        }
      }
    } catch (e) {
      console.log(e);
      res.send(sendResponse(false, null, "Internal Server Erorr")).status(400);
    }
  },
  searchPagination: async (req, res) => {
    try {
      let { pageNo, pageSize, searchEntity, searchVal } = req.body;
      let result = await StudentModel.find({ [searchEntity]: searchVal })
        .skip((pageNo - 1) * pageSize)
        .limit(pageSize);
      if (result) {
        let count = await StudentModel.countDocuments();
        req.headers.recCount = count;
        res.send({ ...sendResponse(true, result), count: count }).status(200);
      } else {
        res.send(sendResponse(false, null, "No Data Found")).status(404);
      }
    } catch (error) {
      console.log(error).status(400);
    }
  },
  getStudentId:async (req, res) => {
    try {
      let id = req.params.id;
      const result = await StudentModel.findById(id);
      if (!result) {
        res.send(sendResponse(false, null, "No Data Found")).status(404);
      } else {
        res.send(sendResponse(true, result)).status(200);
      }
    } catch (error) {
      console.log(error);
      res.send(sendResponse(false, null, "Internal Server Erorr")).status(400);
    }
  },
  postStudent:async (req, res) => {
    let { firstName, lastName, contact, course } = req.body;
    try {
      let errArr = [];
      if (!firstName) {
        errArr.push("Required : FirstName");
      }
      if (!contact) {
        errArr.push("Required : Contact");
      }
      if (!course) {
        errArr.push("Required : Course");
      }
      if (errArr.length > 0) {
        res
          .send(sendResponse(false, errArr, null, "Required All Field"))
          .status(400);
        return;
      } else {
        let Obj = {
          firstName,
          lastName,
          contact,
          course,
        };
        let student = new StudentModel(Obj);
        await student.save();
        if (!student) {
          res
            .send(sendResponse(false, null, "Internel Server Error"))
            .status(400);
        } else {
          res.send(sendResponse(true, student, "Saved Successfully")).status(200);
        }
      }
    } catch (e) {
      res.send(sendResponse(false, null, "Internel Server Error")).status(404);
    }
  },
  putStudent:async (req, res) => {
    try {
      let id = req.params.id;
      const result = await StudentModel.findById(id);
      if (!result) {
        res.send(sendResponse(false, null, "No Data Found")).status(400);
      } else {
        let updateResult = await StudentModel.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        if (!updateResult) {
          res.send(sendResponse(false, null, "Internel Error")).status(404);
        } else {
          res
            .send(sendResponse(true, updateResult, "Updated Successfully"))
            .status(200);
        }
      }
    } catch (e) {
      res.send(sendResponse(false, null, "Error")).status(404);
    }
  },
  deleteStudent: async (req, res) => {
    try {
      let id = req.params.id;
      let result = await StudentModel.findById(id);
      if (!result) {
        res.send(sendResponse(false, null, "No Data On This ID")).status(400);
      } else {
        res
          .send(sendResponse(false, result, "Delete Id Successfully"))
          .status(200);
      }
    } catch (e) {
      res.send(sendResponse(false, null, "Error")).status(404);
    }
  },
};

module.exports = studentController;
