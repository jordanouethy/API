const express = require('express');
const connection = require('../connection');
const router = express.Router();

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

//route pour l'insertion d'un utilisateur
router.post('/userSignup',(req, res) => {
    let user = req.body;
    console.log(user);
    query = "select email,password,role,status from utilisateur where email =?";
    connection.query(query,[user.email],(err, results)=>{
        if(!err){
            if(results.length <= 0 ){
                query = "call psUtilisateur_Insert(?,?,?,?,?,?,?,?,?,?,?,?)";

                connection.query(query,[0,user.nom,user.prenom,user.tel,user.adresse,user.email,user.password,user.status,user.role,user.idProfil,user.sexe,user.age],(err,results)=>{
                    if(!err){
                        console.log(user.email);
                        var mailOptions = {
                            from: process.env.EMAIL,
                            to: user.email,
                            subject: 'password by immo',
                            html: '<p><b>Activer votre compte sur immo</b><br><a href="http://localhost:8081/user/confirmation/'+user.email+'">Cliquez pour activer</a></p>'
        
                        }; 
                        transporter.sendMail(mailOptions, function(error,info){
                            if(error){
                                console.log(error);
                            }
                            else{
                                console.log('Email sent:'+ info.response);
                            }
                        });
                        return res.status(200).json({message:"successfully registered"});
                    }else{
                        return res.status(500).json(err);
                    }
                })
            }else{
                return res.status(400).json({message:"email already exists"});
            }

        }else{
            return res.status(500).json(err);
        }
    })
   
})

//route pour le login
router.post('/userLogin',(req, res) => {
    const user = req.body;
    query = "select id, email, password, role, status from utilisateur where email=?";
    connection.query(query,[user.email],(err, results) => {
        if(!err) {
            if(results.length <=0 || results[0].password != user.password) {
                return res.status(401).json({message:"Incorrect username or password."});
            }
            else if(results[0].status === 'false'){
                return res.status(401).json({message:"Wait for Admin Approval"});

            }
            else if(results[0].password == user.password){
                const response = { email: results[0].email, role: results[0].role, id:results[0].id}
                const accessToken = jwt.sign(response,process.env.ACCESS_TOKEN,{expiresIn: '8h'})

                res.status(200).json({token:accessToken});
                // res.status(200).json(results)

            }else{
                return res.status(400).json({message:"Something went wrong.Please try again later"}); 
            }
        }
        else{
            return res.status(500).json(err);
        }
    })
})

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

router.post('/userForgotPassword',(req, res) => {
    const user = req.body;
    console.log(user.email);

    query= "select email, password from utilisateur where email=?";
    connection.query(query,[user.email],(err, results) => {
        if(!err){
            if(results.length <= 0){
                return res.status(200).json({message:"Utilisateur introuvable."});
            }
            else{
                console.log('adresse qui recoit le message',results[0].email)
                var mailOptions = {
                    from: process.env.EMAIL,
                    to: results[0].email,
                    subject: 'password by immo',
                    html: '<p><b>Your login details for immo</b><br><b>Email:</b>'+results[0].email+'<br><b>Password:</b>'+results[0].password+'<br><a href="http://192.168.0.108:4200/">click here to login</a></p>'

                }; 
                transporter.sendMail(mailOptions, function(error,info){
                    if(error){
                        console.log(error);
                    }
                    else{
                        console.log('Email sent:'+ info.response);
                    }
                });
                return res.status(200).json({message:"password sent successfully to your email."});

            }
        }
       
    })
})

// route pour tous les récupérer

router.get('/get',(req, res)=>{
    var query = "call psUtilisateur_List()";
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }else{
            return res.status(500).json(err);
        }
    })
})

router.get('/getUserByEmail/:email',(req, res)=>{
    const emailUser = req.params.email;
    console.log(emailUser);
    var query = "select * from utilisateur where email=?";
    connection.query(query,[emailUser],(err,results)=>{
        if(!err){
            console.log(results);
            return res.status(200).json(results);
        }else{
            return res.status(500).json(err);
        }
    })
})

router.delete('/userDelete/:id',(req, res)=>{
    const iduser = req.params.id;
    var query = "call psUtilisateur_Delete(?)";
    connection.query(query,[iduser],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(400).json({message:"utilisateur introuvable!"});
            }
            return res.status(200).json({message:"utilisateur spprimé avec succès"});
        }
        else{
            return res.status(500).json(err);
        }
    })
})

router.get('/confirmation/:email', (req, res)=>{
    const emailUser = req.params.email;
    var query = " update utilisateur set status='true' where email=?";
    connection.query(query,[emailUser],(err, results)=>{
        if(!err){
            res.redirect('http://localhost:4200/home2/confirm')
          //  return res.status(200).json({message:"Compte activé avec succès"});
           

        }else{
            return res.status(500).json(err);
        }
    })

})

module.exports = router;