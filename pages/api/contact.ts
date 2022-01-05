import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer, { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';


export default async function sendEmail(req: NextApiRequest, res: NextApiResponse) {

    const { email, subject, message, name } = req.body
    let transporter: Transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });
    const msg = {
        from: `${name} <${email}>`,
        to: process.env.EMAIL,
        subject,
        html: `<span>User: ${name}</span><br/>
        <span>Email:  ${email}</span>
        <br/>
        <p>Message: ${message}</p>`
    };

    try {
        let result: SMTPTransport.SentMessageInfo = await transporter.sendMail(msg);
        res.json({ message: `Email has been sent` })
    } catch (error) {
        res.status(500).json({ error: 'Error sending email' })
    }
}