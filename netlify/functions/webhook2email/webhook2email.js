const querystring = require('nodemailer');


  exports.handler = async (event, context, callback) => {
    const from = process.env.from;
    const to = process.env.toemail;
     const msg = {
         to: to,
         from: from,
         subject: 'Webhook triggered',
         text: JSON.stringify(event)
     };
 
     const transporter = nodemailer.createTransport({
 
         host: process.env.MAIL_HOST,
         port: 465,
         secure: false,
 
         auth: {
             user: process.env.MAIL_USERNAME,
             pass: process.env.MAIL_PASSWORD
         },
 
     });
 
     try {
         await transporter.sendMail(msg, (error) => {
             if (!error) {
                 callback(null, { statusCode: 200, body: 'Message successfully sent to' + to });
             } else {
                 callback(null, { statusCode: 501, body: error });
             }
 
         });
 
     } catch (e) {
 
         callback({ statusCode: e.code, body: e });
     }
 
 };