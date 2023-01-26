const mailgun = require('mailgun-js');



exports.handler = async function (event, context) {

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
            return {
                statusCode: 501,
                body: JSON.stringify(error),
            };
        }
        else{
            return {
                statusCode: 200,
                body: JSON.stringify({ message: "OK" }),
              };
        }
   });
  };
