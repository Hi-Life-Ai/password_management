const express = require ('express');
const assignedRoute = express.Router();

//Assigned Management 
const { getAllAssigned,addAssigned,getSingleAssigned,updateAssigned, deleteAssigned} = require('../controller/userassignment');
assignedRoute.route('/userassignments').get(getAllAssigned);
assignedRoute.route('/userassign/new').post(addAssigned);
assignedRoute.route('/userassign/:id').get(getSingleAssigned).put(updateAssigned).delete(deleteAssigned);

module.exports = assignedRoute;