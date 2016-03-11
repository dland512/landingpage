var nodemailer = require("nodemailer")
var config = require("../config/" + process.env.name)

var COMMENT_MAX_LEN = 1500

try {
    var transport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: config.contact.username,
            pass: config.contact.password
        }
    })
}
catch(e) {
    console.log(e.stack)
}

exports.contact = function(req, res, next) {
    try {
        console.log('rsvp form: ' + JSON.stringify(req.body))

        var comments = req.body.comments

        //truncate comments to max allowed
        if(comments && comments.length > COMMENT_MAX_LEN)
            comments = comments.substring(0, COMMENT_MAX_LEN)

        var text = 'Peoples: ' + req.body.names + '\n' +
                   'Contact Infos: ' + req.body.contact + "\n" +
                   'Comments: ' + req.body.comments

        var options = {
            from: config.contact.username,
            to: config.contact.to,
            subject: 'Wedding RSVP',
            text: text
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
