import User from "../model/User.js";
import bcrypt from "bcryptjs";

export const getAllUser = async(req,res,next) =>{
    let users;
    try {
      users= await User.find();
        
    } catch (err) {
        console.log(err);
    }
    if(!users){
        return res.status(404).json({message : "No user found"});
    }
    return res.status(200).json({users});

};

export const signup = async(req,res,next)=>{
    const{name,email,password}=req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({email});
        
    } catch (err) {
       return console.log(err);   
    }
    if(existingUser){
        return res.status(400).json({message:"User Already Exists! Login Instead"});
    }
    const hashedPassword = bcrypt.hashSync(password);

    const user=new User({
        name,
        email,
        password:hashedPassword,
        blogs:[],
    });
    
    try{
       user.save();//method inside mongoose to save data in the database
    }catch(err){
       return console.log(err);
    }

    return res.status(201).json({user});
};

export const login= async(res,req,next) =>{
    const{ email , password }=req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({email});
        
    } catch (err) {
       return console.log(err);   
    }
    if(existingUser){
        return res.status(404).json({message:"Couldn't find user by this id"});
    }

    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message:"Invalid Password!"});
    }
    return res.status(200).json({message:"Login Successfull"});

};