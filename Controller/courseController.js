const { sendResponse } = require("../Helper/helper");
const CourseModel = require("../models/courseModel");

const courseController = {
    getCourse:async(req,res)=>{
        try{
        const Respons = await CourseModel.find();
        if(!Respons){
            res.send(sendResponse(false,null,"No Data Found")).status(404);
        }else{
            res.send(sendResponse(true,Respons,"Get Data Successfully"))
        }
        }catch(e){
            console.log(e)
            res.send(sendResponse(false)).status(400)
        }
    },
    getCourseId:async(req,res)=>{
        try{
            let id = req.params.id;
            let result = await StudentModel.findById(id);
            if(!result){
              res.send(sendResponse(false,null,"No Data On This ID")).status(404)
            }
            else{
              res.send(sendResponse(true,result,"Get Id Successfully")).status(200)
            }
          }
          catch(e){
            res.send(sendResponse(false,null,"Error")).status(400)
          }
    },
    postCourse:async(req,res)=>{
        const {name,duration,fees,shortName} = req.body
        try{
            let errArrey = []
            if(!name){
                errArrey.push("Required : Name")
            }
            if(!duration){
                errArrey.push("Required : Duration")
            }
            if(!fees){
                errArrey.push("Required : Fees")
            }
            if(errArrey.length > 0){
                res.send(sendResponse(false,errArrey,null,"Required All Fields")).status(400);
                return;
            }
            else{
                let Obj = {name,duration,fees,shortName}
                let Course = new CourseModel(Obj)
                await Course.save()
                if(!Course){
                    res.send(sendResponse(false,null,"Internal Server Error")).status(400)
                }
                else{
                    res.send(sendResponse(true,Course,"Data Save SuccessFully")).status(200)
                }
            }
        }
        catch(e){
            res.send(sendResponse(false,null,"Internal Seever ERROR")).status(404)
        }
    },
    putCourse:async(req,res)=>{
        res.send("Edit Course Data")
    },
    deleteCourse:async(req,res)=>{
        try{
            let id = req.params.id;
            let result = await StudentModel.findById(id);
            if(!result){
              res.send(sendResponse(false,null,"No Data On This ID")).status(404)
            }
            else{
              res.send(sendResponse(false,result,"Delete Id Successfully")).status(200)
            }
          }
          catch(e){
            res.send(sendResponse(false,null,"Error")).status(400)
          }
    }
}

module.exports = courseController;