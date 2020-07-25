var user = require("../models/user");
var messages = require("../utils/developer_messages");

const getFileUserService = (req, res) =>{
    user.getFileUsers(req.body,(userlist)=>{
        let body = {
            users : userlist
        }
        res.send(JSON.stringify(userlist));
    })
}

module.exports ={
    getFileUserService
}