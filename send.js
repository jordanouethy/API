const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: "jordanouethynana@gmail.com",
        pass: "qsgqhpduyfubkdbv"
    }
});

const mailOptions = {
    from: "jordanouethynana@gmail.com",
    to: "drogondenver@gmail.com",
    subject: 'password by immo',
    html: '<p><b>Your login details for immo</b><br><b>Email:</b><br><b>Password:</b><br><a href="http://192.168.0.108:4200/">click here to login</a></p>'

}; 
transporter.sendMail(mailOptions, function(error,info){
    if(error){
        console.log(error);
    }
    else{
        console.log('Email sent:'+ info.response);
    }
});
