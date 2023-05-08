const Designation = require('../model/designation');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncError');

// get All Designation => /api/designations
exports.getAllDesignation = catchAsyncErrors(async (req, res, next) => {
    let designations;

    try{
        designations = await Designation.find()
    }catch(err){
        console.log(err.message);
    }

    if(!designations){
        return next(new ErrorHandler('Data not found!', 400));
    }

    return res.status(200).json({
        designations
    });
})

// Create new Designation => /api/designation/new
exports.addnewDesignation = catchAsyncErrors(async (req, res, next) =>{

    let checkloc = await Designation.findOne({ designationid: req.body.designationid });

    if(checkloc){
        return next(new ErrorHandler('Id already exist!', 400));
    }

    let checkloc1 = await Designation.findOne({ designationname: req.body.designationname });

    if(checkloc1){
        return next(new ErrorHandler('Name already exist!', 400));
    }
    
    adddesignation = await Designation.create(req.body);

    return res.status(200).json({ 
        message: 'Successfully added!'
     });
})

// get Signle Designation => /api/designation/:id
exports.getSingleDesignation = catchAsyncErrors(async (req, res, next)=>{
    const id = req.params.id;

    let sdesignation = await Designation.findById(id);

    if(!sdesignation){
        return next(new ErrorHandler('Data not found!', 400));
    }

    return res.status(200).json({
        sdesignation
    })
})

// update Designation by id => /api/designation/:id
exports.updateDesignation = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;

    let updesignation = await Designation.findByIdAndUpdate(id, req.body);

    if (!updesignation) {
      return next(new ErrorHandler('Data not found!', 400));
    }
    return res.status(200).json({ 
        message: 'Updated Successfully!'
     });
})

// delete Designation by id => /api/designation/:id
exports.deleteDesignation = catchAsyncErrors(async (req, res, next)=>{
    const id = req.params.id;

    let ddesignation = await Designation.findByIdAndRemove(id);

    if(!ddesignation){
        return next(new ErrorHandler('Data not found!', 400));
    }
    
    return res.status(200).json({
        message: 'Deleted Successfully!'
    });
})