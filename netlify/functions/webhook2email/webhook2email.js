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
 
         host: process.env.MAIL_HOST,
         port: 465,
         secure: false,
         auth: {
             user: process.env.MAIL_USERNAME,
             pass: process.env.MAIL_PASSWORD
         },
 
     });
 
     try {
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