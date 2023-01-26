const sgMail = require('@sendgrid/mail')

exports.handler = async (event, context) => {

    const apiKey = process.env.sgapikey;

    const from = process.env.from;
    const to = process.env.toemail;
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: to, // Change to your recipient
      from: from, // Change to your verified sender
      subject: 'Sending with SendGrid is Fun',
      text: JSON.stringify(event),
    }
    return sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent to ' + msg.to)
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Sent to " + msg.to }),
            };    
      })
      .catch((error) => {
        console.error(error)
        return {
            statusCode: 501,
            body: JSON.stringify(error),
        };
      })

    const data = {
        from: process.env.from,
        to: process.env.toemail,
        subject: 'Webhook Received',
        text: 
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

    }

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Sent to " + data.to }),
        };

  };



