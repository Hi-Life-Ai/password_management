const express = require('express');
const designationRoute = express.Router();
//usernew login
const { getAllDesignation, addnewDesignation, getSingleDesignation, updateDesignation, deleteDesignation } = require('../controller/designation');

designationRoute.route('/designations').get(getAllDesignation);
designationRoute.route('/designation/new').post(addnewDesignation);
designationRoute.route('/designation/:id').get(getSingleDesignation).put(updateDesignation).delete(deleteDesignation);

module.exports = designationRoute;
