const mailgun = require('mailgun-js');

exports.handler = function(event, context, callback) 
{
    const mg = mailgun({
        apiKey: "4287421da7c0adcdfe21506e41361619-c9746cf8-1d489da7", 
        domain: "sandboxdf9da5ee163d428f84539d4f489e1398.mailgun.org"
    });

    const data = {
        from: 'PostMaster <postmaster@sandboxdf9da5ee163d428f84539d4f489e1398.mailgun.org>',
    to: 'gg-api-webhook-testin-aaaairo2spxhiczipnqlvc6hpe@grab.org.slack.com',
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
