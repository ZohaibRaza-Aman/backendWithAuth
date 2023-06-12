const express = require("express");
const route = express.Router();
const userController = require("../Controller/userController");
const AuthController = require("../Controller/authController");

route.get("/test", AuthController.Protected,(req,res)=>{
  res.send("/User Valid");
});

route.get("/", userController.getUsers);

route.get("/:id", userController.getUsersId);

route.post("/signup",userController.signUp);

route.post("/login",userController.login)

route.post("/", userController.postUsers);

route.put("/:id", userController.putUsers);

route.delete("/:id", userController.deleteUsers);

module.exports = route;