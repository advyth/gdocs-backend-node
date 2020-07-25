var user = require("../models/user");
var messages = require("../utils/developer_messages");

const loginService = (req, res) => {
    messages.log("/login HIT");

    user.verifyUser(req.body, (status)=>{
        if(status)
        {
            let body = {
                message : "success"
            }
            res.send(JSON.stringify(body));
        }
        else
        {
            let body = {
                message : "failed"
            }
            res.send(JSON.stringify(body));
        }
    });
};

exports.loginService = loginService;
