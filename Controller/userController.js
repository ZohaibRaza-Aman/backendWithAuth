const { sendResponse } = require("../Helper/helper");
const signModel = require("../models/signModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const StudentModel = require("../models/studentModel");

const userController = {
  getUsers: async (req, res) => {
    try {
      const Response = await StudentModel.find();
      if (!Response) {
        res.send(sendResponse(false, null, "No Data Found")).status(404);
      } else {
        res
          .send(sendResponse(true, Response, "Get Data Successfully"))
          .status(200);
      }
    } catch (error) {
      res.send(sendResponse(false)).status(400);
    }
  },
  getUsersId: async (req, res) => {
    try {
      const id = req.params.id;
      let Result = await StudentModel.findById(id);
      if (!Result) {
        res.send(sendResponse(false, null, "No Data On This ID")).status(400);
      } else {
        res.send(sendResponse(true, Result, "Get ID Successfully")).status(200);
      }
    } catch (e) {
      res.send(sendResponse(false)).status(404);
    }
  },
  postUsers: async (req, res) => {
    const { id, name, email } = req.body;
    try {
      let errArrey = [];
      if (!name) {
        errArrey.push("Required : Name");
      }
      if (!email) {
        errArrey.push("Required : Email");
      }
      if (errArrey.length > 0) {
        res
          .send(sendResponse(false, errArrey, null, "Required All Fields"))
          .status(400);
        return;
      } else {
        let Obj = { id, name, email };
        let User = new StudentModel(Obj);
        await User.save();
        if (!User) {
          res
            .send(sendResponse(false, null, "Internal Server Error"))
            .status(400);
        } else {
          res
            .send(sendResponse(true, User, "Data Save SuccessFully"))
            .status(200);
        }
      }
    } catch (e) {
      res.send(sendResponse(false, null, "Internal Seever ERROR")).status(404);
    }
  },
  putUsers: async (req, res) => {
    try {
      const id = req.params.id;
      const Result = await StudentModel.findById(id);
      if (!Result) {
        res.send(sendResponse(false, null, "No Data Found")).status(400);
      } else {
        let Updated = await signModel.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        if (!Updated) {
          res.send(sendResponse(false, null, "Error")).status(404);
        } else {
          res
            .send(sendResponse(true, Updated, "Updated Successfully"))
            .status(200);
        }
      }
    } catch (e) {
      res.send(sendResponse(false)).status(400);
    }
  },
  deleteUsers: async (req, res) => {
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
  signUp: async (req, res) => {
    const { userName, email, password } = req.body;
    let obj = { userName, email, password };

    let requiredArr = ["userName", "email", "password"];
    let errArr = [];
    requiredArr.forEach((x) => {
      if (!obj[x]) {
        errArr.push(x);
      }
    });

    if (errArr.length > 0) {
      res
        .send(sendResponse(false, null, "Some Fields Are Missing", errArr))
        .status(400);
      return;
    } else {
      // if data send successfull use bcrypt sencronese
      let hasspassword = await bcrypt.hash(obj.password, 10);
      obj.password = hasspassword;

      const existingUser = await signModel.findOne({ email });
      if (existingUser) {
        res
          .send(sendResponse(false, null, "This Email Already Is Exist"))
          .status(403);
      } else {
        signModel
          .create(obj)
          .then((result) => {
            res
              .send(sendResponse(true, result, "User Save Successfully"))
              .status(200);
          })
          .catch((err) => {
            res
              .send(sendResponse(false, err, "Internel Server Error"))
              .status(400);
          });
      }
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    const obj = { email, password };
    signModel
      .findOne({ email })
      .then(async (user) => {
        let isConform = await bcrypt.compare(obj.password, user.password);
        console.log(isConform);
        if (isConform) {
          let token = jwt.sign({...user}, process.env.SECURE_KEY,
            {
              expiresIn:"24h",
            });
          res.send(sendResponse(true, { user, token }, "Login Successfully"));
        } else {
          res.send(sendResponse(false, null, "Credential Error"));
        }
      })
      .catch((err) => {
        res.send(sendResponse(false, err, "User Does Not Exist"));
      });
  },
};

module.exports = userController;
