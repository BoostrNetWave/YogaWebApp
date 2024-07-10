import Nodemailer from "nodemailer";
import paymentTableCol from "../Models/paymentModel.mjs";
import { generateDate } from "./generateDate.mjs";

const transporter = Nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.SENDER_EMAIL_ACCOUNT,
        pass: process.env.APP_PASSWORD
    }
})

export const sendMail = (username, mailId, phno, image, contentDetails) => {
    const mailOptions = {
        from: {
            name: "YOGAWITHMANOJ",
            address: "khageswarsahoo12@gmail.com"
        },
        to: "khageswarsahoo12@gmail.com",
        subject: "Payment Verification",
        html: `
        <h1>EmailId : ${mailId}</h1>
        <h1>WhatsApp Number : ${phno}</h1>
        <h1>Premium Name : ${contentDetails.premiumName}</h1>
        <h1>Premium Price : ${contentDetails.premiumPrice}</h1>
        
        `,
        attachments: [
            {
                fileName: "image",
                path: `${image}`
            }
        ]
    }

    transporter.sendMail(mailOptions, async function (error, info) {
        if (error) {
            console.error(`Server Error : mail couldn't be sent--> ${error}`);
        } else {
            const data = new paymentTableCol({
                username,
                userEmail: mailId,
                dateOfPayment: generateDate(),
                item: contentDetails.premiumName,
                paymentImage: image
            })
            await data.save()
        }
    });

}

export const sendOTP_to_mail = (mailId, OTP) => {

    const mailOptions = {
        from: {
            name: "YOGAWITHMANOJ",
            address: "khageswarsahoo12@gmail.com"
        },
        to: mailId,
        subject: "OTP Verification",
        html: `<h2>Validate Your Mail Address</h2>
        <h4>Your 6-character OTP is : ${OTP}</h4>`,
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error(`Server Error : mail couldn't be sent--> ${error}`);
        } else {
        }
    });

}