import nodemailer, { SendMailOptions } from 'nodemailer'

export async function sendMail(mailOptions:SendMailOptions){
// create transporter
    const transporter = nodemailer.createTransport({
    
        host:'smtp.gmail.com',
        port:587,
        auth:{
             user:'yehiaahmedd632@gmail.com',
            pass: "tpej zsef hcri gxpa"
        }
    })
    mailOptions.from = "'saraha app'<yehiaahmedd109@gmail.com>"
    await transporter.sendMail(mailOptions)
}
