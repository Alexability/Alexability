//pdf maker
var fs = require('fs');
var pdf = require('html-pdf');

module.exports = {
	htmlToPdf: function(obj) {
		var html = fs.readFileSync('/Users/e050909/Desktop/CompanyChallenge/EchoSkill-Resume/alexa-app-server/examples/apps/jobseek/hello.html', 'utf8');
		var options = { format: 'Letter' };
		pdf.create(html, options).toFile('./businesscard.pdf', function(err, res) {
	 	 if (err) return console.log(err);
	  	console.log(res);
		});
	}
}
