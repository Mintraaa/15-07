const config = require("../config/auth.config");
const db = require("../models");
const User = db.User;
const Role = db.Role
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt.js");
const {Op} = require("sequelize");


//Register a new user
exports.signup = async (req, res) => {
    const {username,emall,password} = req.body;
    if  (!username || !emall ||  !password) {
        res.status(400).send({
            massage: " Please provind all required filelds",
        });
        return;
    }


    //Prepare user data
    const newUser = {
        username:username,
        emall:emall,
        password:bcrypt.hashSync(password,)
    };
    
    //Save user in the database
    await User.create(newUser).then((user)=>{
        if(req.body.roles){
            Role.findAll({
                where:{
                    name: { [Op.or]: req.body.roles },
                },
            }). then((roles)=>{
                user.setRoles(roles).then(()=>{
                    res.send({
                        massage: "User registered successfully!",
                    })
                })
            });
        }else{
            //Set  defautl role to "user" id=1
            user.setRoles([1]).then(() => {
            res.send({
                 massage: "User registered successfully!",
                });
            });
        }
    }).catch((error)=>{
        res.status(500).send({
            massage: error.massage || "Something error accured while registering a new user",
        });
    });


};