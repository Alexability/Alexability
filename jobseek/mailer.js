'use strict';
module.change_code = 1;
var nodemailer = require('nodemailer');

module.exports = {

	emailResume: function(obj) {
	console.log("I am at MailerHelper")
	//var transporter = nodemailer.createTransport('smtps://jobseekCT%40gmail.com:jobs33kCT@smtp.gmail.com');
	var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
	    user: 'jobseekCT@gmail.com',
	    pass: 'jobs33kCT'
	}
	});
	var mailOptions = {
	    from: '"Job Seek Cornell Tech" <jobseekCT@gmail.com>', // sender address
	    to: 'prashannaprabal@gmail.com', // list of receivers
	    subject: 'Resume for Martin Alonzo', // Subject line
	    text: 'Attached is your resume', // plaintext body
	    html: 'Attached is your resume', // html body
	    attachments: [ 
	      { 
	        filename:'resume.pdf',
	        //path: '/Users/e050909/Desktop/resume.txt'
	        path: 'https://raw.github.com/nodemailer/nodemailer/master/LICENSE'
	      }
	      ]
	};

	transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log("ERRORROROROROR")
            return console.log(error);
            //return "Martin sucks"
        }
        console.log('Message sent: ' + info.response);
    });
}
}