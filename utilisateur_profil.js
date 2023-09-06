const express = require('express');
const connection = require('../connection');
const router = express.Router();

router.post('/addUtlisateurProfil',(req, res) => {
    let utilisateurProfil = req.body;

                query = "call psUtilisateuProfil_Insert(?,?,?)";

                connection.query(query,[0,utilisateurProfil.idUtilisateur,utilisateurProfil.idProfil],(err,results)=>{
                    if(!err){
                        return res.status(200).json({message:"profil attribué  avec succès"});
                    }else{
                        return res.status(500).json(err);
                    }
                })

       
    })

    router.get('/getUtilisateurProfil',(req,res)=>{
        var query = "call psUtilisateurProfil_List()";
        connection.query(query,(err,results)=>{
            if(!err){
                res.status(200).json(results);
            }else{
                res.status(400).json(err);
            }
        })
    })

    router.delete('/deleteUtilisateurProfil/:id',(req,res)=>{
        const idProfil = req.params.id;
        var query = "call psProfil_Delete(?)";
        connection.query(query,[idProfil],(err, results)=>{
            if(!err){
                res.status(200).json({message:"Profil"+idProfil+"supprimé avec succès"})
            }else{
                res.status(400).json(err);
            }
        })
    })

   
module.exports = router;