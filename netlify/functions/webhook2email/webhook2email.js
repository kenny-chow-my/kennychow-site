const mailgun = require('mailgun-js');

exports.handler = function(event, context, callback) 
{
    const mg = mailgun({
        apiKey: process.env.mgapikey, 
        domain: "sandboxdf9da5ee163d428f84539d4f489e1398.mailgun.org"
    });

    const data = {
        from: 'PostMaster <' + process.env.from + '>',
    to: process.env.toemail,
    subject: 'SUBJECT',
    text: JSON.stringify(event)
    };

   mg.messages().send(data, (error, body) => 
   {
        if (error)
        {
            return console.log(error);
        }

        callback(null, {
            statusCode: 200,
            body: "Mail sent"
        });
   });
}