const User = require('../model/user');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncError');
const bcrypt = require('bcryptjs');
const sendToken = require('../utils/jwttokentocookie');

// get All user => /api/users
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    let users;

    try{
        users = await User.find()
    }catch(err){
        console.log(err.message);
    }

    if(!users){
        return next(new ErrorHandler('Users not found', 400));
    }

    return res.status(200).json({users});
})

// register from user module => api/user/new
exports.regAuth = catchAsyncErrors( async (req, res, next) =>{

    let checkloc = await User.findOne({ username: req.body.username });

    if(checkloc){
        return next(new ErrorHandler('User name already exist!', 400));
    }
   

    const { username,emailid,password,userid,
        mobilenumber,othermobilenumber,
        profileimage,designation,remarks } = req.body;

    // encrypt password before saving
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt)
    
    let user = await User.create({
        emailid,
        password: hashPassword,
        username,
        userid,
        mobilenumber,othermobilenumber,
        profileimage,designation,remarks

    });  

    return res.status(200).json({ 
        // user,
        message: 'Successfully added!' 
    });

})

// Login user => api/userlogin
exports.loginAuth = catchAsyncErrors(async (req, res, next) =>{
    const { username, password } = req.body;

    // check if username & password entered by user
    if(!username || !password ){
        return next(new ErrorHandler('Please enter username and password', 400));
    }

    // Finding if user exists in database
    const user = await User.findOne({ username }).select('+password');

    if(!user){
        return next(new ErrorHandler('Invalid Username or Password', 401));
    }

    // If checks password is correct or not
    const isPwdMatched = await bcrypt.compare(password, user.password);

    if(!isPwdMatched){
        return next(new ErrorHandler('Invalid Password', 401));
    }

    sendToken(user, 200, res);
})

// Logout user => api/userout
exports.loginOut = catchAsyncErrors(async (req, res, next) =>{

    res.cookie('token', null,{
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out!'
    })

});

// get Signle user => /api/user/:id
exports.getSingleUser = catchAsyncErrors(async (req, res, next)=>{

    const suser = await User.findById(req.params.id);

    if (!suser) {
        return next(new ErrorHandler('User not found', 404));
    }

    return res.status(200).json({
        success: true,
        suser
    })
})

// update user by id => /api/userpw/:id
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;

    const { username,emailid,password,userid,
        mobilenumber,othermobilenumber,
        profileimage,designation,remarks} = req.body;

        
    // encrypt password before saving
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const upuser = await User.findByIdAndUpdate(id, { username,emailid,password:hashPassword,userid,
        mobilenumber,othermobilenumber,
        profileimage,designation,remarks});

    if (!upuser) {
        return next(new ErrorHandler('User not found', 404));
    }

    return res.status(200).json({ message: 'Updated successfully!'})
})

// update user by id => /api/user/:id
exports.updateUserPwd = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;

    const upuser = await User.findByIdAndUpdate(id, req.body);

    if (!upuser) {
        return next(new ErrorHandler('User not found', 404));
    }

    return res.status(200).json({ message: 'Updated successfully!'})
    
})

// delete user by id => /api/user/:id
exports.deleteUser = catchAsyncErrors(async (req, res, next)=>{
    const id = req.params.id;

    const duser = await User.findByIdAndRemove(id);

    if (!duser) {
        return next(new ErrorHandler('User not found', 404));
    }

    res.status(200).json({ message: 'Deleted successfully'})
})
