import { getCookie, hasCookie,getCookies } from "cookies-next";


import connect from "./database";
import jwt from "jsonwebtoken";
import User from "../models/User";

// auth middleware

 export const authMiddleware = async (req, res, next) => {

    try{
        //find token from cookie

        connect();

      //  const token = hasCookie('token');
      const token = getCookie('token', { req, res });
      console.log("token is --->🚧🚧🚧", token);
        if (!token || !token.length || token === 'undefined') 
        {
            console.log("no token  🧪 🧪 🧪");
            res.status(401).send("No token found");
       
        }

        else{
            console.log("token is 📣📣📣 ", token);

            const verified = await jwt.verify(token, process.env.JWT_SECRET);
            const obj = await User.findOne({ _id: verified.id });
          //  console.log("obj user in AUTHMIDDLEWARE 🔵🔵🔵---->", obj);
          next();
        }


    }
    catch(err){
        console.log("err in authMiddleware 🚧🚧🚧", err);
        throw err;
    }

 }


 export const hello = async (req, res) => {


    res.status(200).json({
        message: "hello world"
    });
 }