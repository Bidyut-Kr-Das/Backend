import {User} from "../models/userSchema.js";
import {catchAsyncErrors} from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken";


export const  isAdminAutenticated = catchAsyncErrors(async(req,res,next)=>{
const token = req.cookies.adminToken;
if(!token){
    return next(new ErrorHandler("Admin Not Autenticated!",400));
}
const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
req.user = await User.findById(decoded.id);
if(req.user.role !== "Admin"){
    return next(new ErrorHandler(`${req.user.role} not autorised for this resouces!`,
    403
)
    );
}
next();
});

export const  isPatientAutenticated = catchAsyncErrors(async(req,res,next)=>{
    const token = req.cookies.patientToken;
    if(!token){
        return next(new ErrorHandler("Patient Not Autenticated!",400));
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if(req.user.role !== "Patient"){
        return next(new ErrorHandler(`${req.user.role} not autorised for this resouces!`,
        403
    )
        );
    }
    next();
    });