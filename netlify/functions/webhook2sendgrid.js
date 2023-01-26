const sgMail = require('@sendgrid/mail')

exports.handler = async (event, context) => {

    const apiKey = process.env.sgapikey;

    const from = process.env.from;
    const to = process.env.toemail;
    sgMail.setApiKey(apiKey)
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

  };



