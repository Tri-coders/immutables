const sgMail = require('@sendgrid/mail')

sgMail.setApiKey("")

const sendWelcomeEmail = async (email, name, msg)=>{
    console.log("Ala")
    try{
        await sgMail.send({
            to: 'prabodh.shewalkar@gmail.com',
            from: 'prabodh.shewalkar@gmail.com',
            subject: `Query from ${name} ${email}`,
            text: `${msg}`
        })
    } catch(e){
        console.log(e)
    }
    
}


module.exports = {
    sendWelcomeEmail
}