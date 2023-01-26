const querystring = require('querystring');
const axios = require('axios');
const { chown } = require('fs');

exports.handler = async (event, context) => {

    const apiKey = process.env.mgapikey;
    const domain = "sandboxdf9da5ee163d428f84539d4f489e1398.mailgun.org";

    const data = {
        from: process.env.from,
        to: process.env.toemail,
        subject: 'Webhook Received',
        text: JSON.stringify(event)
    };

    const resp = await axios({
            method: 'POST',
            url: `https://api.mailgun.net/v3/${domain}/messages`,
            auth: { username: "api", password: apiKey },
            data: querystring.stringify(data),
            headers: {'content-type': 'application/x-www-form-urlencoded;charset=utf-8'}
        }).catch(function (err) {
            console.log(err);
            return err;
        });

    if (resp instanceof Error) {
        return {
            statusCode: 501,
            body: JSON.stringify(resp),
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Sent to " + data.to }),
        };

  };


  curl -s --user 'api:4287421da7c0adcdfe21506e41361619-c9746cf8-1d489da7' \
    https://api.mailgun.net/v3/sandboxdf9da5ee163d428f84539d4f489e1398.mailgun.org/messages \
    -F from='postmaster@sandboxdf9da5ee163d428f84539d4f489e1398.mailgun.org' \
    -F to=kenny@chown.my \
    -F subject='Hello' \
    -F text='Testing some Mailgun awesomeness!'