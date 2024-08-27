
const projects = require('../model/projectModel');
const users = require('../model/userModel');


exports.addProjectController = async(req,res)=>{
    console.log('inside addProjectController');

    const userId =req.payload
    console.log(userId);
    // console.log(req.body);
    
    const {title , language , github , website , overview}=req.body
    console.log(title , language , github , website , overview);
    const projectimg = req.file.filename
    console.log(projectimg);

    try {
     const existingProject =await projects.findOne({github})
     if(existingProject){
        res.status(406).json("project already exist")
     }
     else{
       const newProject = new projects({
        title,
        language,
        github,
        website,
        overview,
        projectImage:projectimg,
        userId
       })
       await newProject.save()
       res.status(200).json(newProject)
     }
        
    } catch (error) {
        res.status(401).json(error)
    }
    
    
    
}

//get all project
exports.getAllProjectController = async(req,res)=>{

  const searchKey = req.query.search
  console.log(searchKey);
  const query = {
    language:{
      //remove case sensitivity
      $regex:searchKey,$options:'i'
    }
  }
  
  try {
      const allProject =await projects.find(query)
      res.status(200).json(allProject)
  } catch (error) {
      res.status(401).json(error)
      
  }
}

//get home project

exports.getHomeProjectController = async(req,res)=>{
  try {
      const homeProject =await projects.find().limit(3)
      res.status(200).json(homeProject)
  } catch (error) {
      res.status(401).json(error)
      
  }
}
//get user project

exports.getUserProjectController = async(req,res)=>{
  const userId = req.payload
  try {
    const userProject = await projects.find({userId})
    res.status(200).json(userProject)
    
  } catch (error) {
    res.status(401).json(error)
  }
}

//delete project
exports.deleteUserProjectController= async(req,res)=>{
  const {id} =req.params
  try {
    const item =await projects.findByIdAndDelete({_id:id})
    res.status(200).json('deleted successfully')
  } catch (error) {
    res.status(401).json(error)
    
  }
}
// edit project controller
// exports.editUserProjectController=async(req,res)=>{
//   const {title , language ,website,overview,projectImg}=req.body
//   console.log(title , language ,website,overview,projectImg);
  
//   const projectimage = req.file?req.file.filename:projectImg
//   console.log(projectimage);
//   const {id}= req.params
//   console.log(id);
//   const userId=req.payload
//   console.log(userId);
  
//   try {
//     console.log('inside try block');
    
//     const existingProject = await projects.findByIdAndUpdate({_id:id},{
//       title,
//       language,
//       github,
//       website,
//       overview,
//       projectImage:projectimage,
//       userId
//     },{new:true})
//     console.log(existingProject);
    
//     await existingProject.save()
//     res.status(200).json(existingProject)
    
//   } catch (error) {
//     console.log('inside catch block');
    
//     res.status(401).json(error)
    
    
//   }
  
  


// }

exports.editUserProjectController=async(req,res)=>{
  const{title,language,github,website,overview,projectImg}=req.body

  const projectimage=req.file?req.file.filename:projectImg
  console.log(projectImg);

  const {id}=req.params
  console.log(id);
  const userId=req.payload

  try {
    const existingProject=await projects.findByIdAndUpdate({_id:id},{
      title,
      language,
      github,
      website,
      overview,
      projectImage:projectimage,
      userId
    },{new:true})
    await existingProject.save()
    res.status(200).json(existingProject)
  } catch (error) {
    res.status(401).json(error)
  }
  
  
}

