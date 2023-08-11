const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

require('../db/conn.js');

const User=require("../models/userSchema.js");
 


router.get('/', (req,res) => {
    res.send(`Hello World from the server router app.js`);
});


// using async and await we will create post method
router.post('/register', async (req,res)=> {

    const {name,email,phone,work,password,cpassword}=req.body;

    // here we are checking if user has not enterned any field
    if(!name || !email || !phone || !work || !password ||!cpassword){

        return res.status(422).json({error:"please fill the field properly"});

    }
    //here we are checking user is entering existing email
    //left side email is of database and right side of email is of user which he is filling 
    //if email matches from database to which user filling, that means email is already existing

    try {

        const userExist =await User.findOne({email:email});

        if (userExist){
            return res.status(422).json({error:"Email already exist"});
        }else if(password != cpassword){
            return res.status(422).json({error:"password not matching"});
        }else {
            //get the data of user 
            const user=new User({name,email,phone,work,password,cpassword});

            //save the data of user
            await user.save();

            res.status(201).json({message:"User registered successfully"});

        }
        
       

    } catch(err){
        console.log(err);
    }

});


//login route
 
router.post('/signin', async (req,res) => {
    
    try {
        let token;
        const {email,password}=req.body;
        if (!email || !password){
            return res.status(400).json({error:"Please fill the data"});
        }

        //verifying email if user has entered right or wrong
        const userLogin= await User.findOne({email:email});
        // console.log(userLogin);
        if (userLogin){

            const isMatch=await bcrypt.compare(password,userLogin.password);

            // for unique identification user we use jwt token

            const token=userLogin.generateAuthToken();
            // console.log(token);
            // res.cookie("jwtoken", token,{
            //     expires:new Date(Date.now() + 25892000000),
            //     httpOnly:true
            // });

            if(!isMatch){
                res.status(400).json({error:"Invalid credentials"});
    
            }else{
                res.json({message:"user signin success"});
        }

    }else{
        res.status(400).json({error:"Invalid credentials"});
    }

        // const isMatch=await bcrypt.compare(password,userLogin.password);



    //     if(!isMatch){
    //         res.status(400).json({error:"Invalid credentials"});

    //     }else{
    //         res.json({message:"user signin success"});
    // }



    } catch(err){
        console.log(err);
    }

})








//using promises we create post method
// router.post('/register', (req,res)=> {

//     const {name,email,phone,work,password,cpassword}=req.body;

//     if(!name || !email || !phone || !work || !password ||!cpassword){

//         return res.status(422).json({error:"please fill the field properly"});

//     }

//     //left side email is of database and right side of email is of user which he is filling 
//     //if email matches from database to while user filling, we will get response in then() promise
//     User.findOne({email:email}).then((userExist) =>{
//         if (userExist){
//             return res.status(422).json({error:"Email already exist"});
//         }

//         const user=new User({name,email,phone,work,password,cpassword});
//         user.save().then(() =>{
//             res.status(201).json({message:"User registered successfully"});
//         }).catch((err) => res.status(500).json({error:"Failed to registered"}));

//     }).catch(err => console.log(err));




    // console.log(name);
    // console.log(email);
    // res.json({message:req.body});
    // res,send("Registration page");
// });



module.exports=router;