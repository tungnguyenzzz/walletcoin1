const nodemailer = require("nodemailer");
import { OAuth2Client } from 'google-auth-library'
require('dotenv').config()

// const myOAuth2Client = new OAuth2Client(
//     GOOGLE_MAILER_CLIENT_ID,
//     GOOGLE_MAILER_CLIENT_SECRET
//   )

//   myOAuth2Client.setCredentials({
//     refresh_token: GOOGLE_MAILER_REFRESH_TOKEN
//   })

//   const myAccessTokenObject = await myOAuth2Client.getAccessToken()
//   const myAccessToken = myAccessTokenObject?.token
module.exports = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: Number(process.env.EMAIL_PORT),

            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text,
            html: "<b>Hello world?</b>",
        });
        console.log("email sent successfully");
    } catch (error) {
        console.log("email not sent!");
        console.log(error);
        return error;
    }
};
// export const sendMail = () => new Promise(async (resolve, reject) => {

//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//         host: 'smtp.office365.com',
//         port: '587',
//         auth: {
//             user: "tung2607d@outlook.com", // generated ethereal user
//             pass: "Tung2607", // generated ethereal password
//         },
//     });

//     // send mail with defined transport object
//     await transporter.sendMail(
//         {
//             from: "tung2607d@outlook.com", // sender address
//             to: `tungnguyen2607d@gmail.com`, // list of receivers
//             subject: "Hello ✔", // Subject line
//             text: "Hello world?", // plain text body
//             html: "<b>Hello world?</b>", // html body
//         },
//         (err) => {
//             if (err) {
//                 console.log(err)
//                 resolve({
//                     mes: 'loi khong gui duoc email'
//                 })
//             }
//             resolve({
//                 mes: 'gui email thanh cong den tai khoan ...'
//             })


//         })
// })