const nodemailer = require('nodemailer');


exports.handler = async (event, context) => {
    const from = process.env.from;
    const to = process.env.toemail;
     const msg = {
         to: to,
         from: from,
         subject: 'Webhook triggered',
         text: JSON.stringify(event)
     };
 
     const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    });
 
     try {
        console.log('sending email');
         const resp = await transporter.sendMail(msg);
         if (resp) {
            console.log(resp);
            return { statusCode: 200, body: 'Message successfully sent to' + to };
        } else {
            console.error(resp);
            return { statusCode: 501, body: error };
        }

     } catch (e) {
        console.error(e);
         return ({ statusCode: e.code, body: e });
     }

 };