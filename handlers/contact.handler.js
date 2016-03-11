var nodemailer = require("nodemailer")
var config = require("../config/" + process.env.name)

try {
    var transport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'companynametest80@gmail.com',
            pass: 'companynametest99'
        }
    })
}
catch(e) {
    console.log(e.stack)
}

exports.contact = function(req, res, next) {
    try {
        console.log('contact form: ' + JSON.stringify(req.body) + ' under ' + config.company.name)

        var options = {
            from: req.body.email,
            to: 'companynametest80@gmail.com',
            subject: 'Contact request from ' + config.company.name,
            text: '+1 for ' + config.company.name + '\n' + req.body.email
        }

        transport.sendMail(options, function(err, mailRes) {
            if(err) {
                console.log('error sending email: %s', err)
                res.sendStatus(500)
            }
            else {
                console.log('Contact email successfully sent')
                res.sendStatus(200)
            }
        })
    }
    catch(e) {
        console.log(e.stack)
        res.sendStatus(500)
    }
};
