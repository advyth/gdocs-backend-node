var messages = require("../utils/developer_messages");
var user = require("../models/user");
const e = require("express");

const cleanUpService = (req, res) =>{
    user.cleanUsers((status)=>{
        if(status){
            let body = {
                message : "success"
            }
            res.send(JSON.stringify());
        }
        else
        {
            let body = {
                message : "failed"
            }
            res.send(JSON.stringify());
        }
    })
}

module.exports = {
    cleanUpService
}