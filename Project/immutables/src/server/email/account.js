const sgMail = require('@sendgrid/mail')

sgMail.setApiKey("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")

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