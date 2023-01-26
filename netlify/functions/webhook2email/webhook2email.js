const querystring = require('querystring');
const axios = require('axios');

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
            return err;
        });

    if (resp instanceof Error) {
        return {
            statusCode: 501,
            body: JSON.stringify(error),
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Sent to " + data.to }),
        };

  };
