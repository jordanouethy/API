const express = require('express');
const connection = require('../connection');
const router = express.Router();

router.post('/addProfil',(req, res) => {
    let profil = req.body;

                query = "call psProfil_Insert(?,?,?)";

                connection.query(query,[0,profil.nomProfil,profil.descriptionProfil],(err,results)=>{
                    if(!err){
                        return res.status(200).json({message:"secteur entegistré avec succès"});
                    }else{
                        return res.status(500).json(err);
                    }
                })

       
    })

    router.get('/getProfil',(req,res)=>{
        var query = "call psProfil_List()";
        connection.query(query,(err,results)=>{
            if(!err){
                res.status(200).json(results);
            }else{
                res.status(400).json(err);
            }
        })
    })

    router.get('/getProfilByIdUser/:id',(req,res)=>{
        var idUser = req.params.id;
        var query = "SELECT p.nomProfil FROM utilisateur_profil up,utilisateur u,profil p where up.idUtilisateur =u.id and up.idProfil=p.id and u.id=? ";
        connection.query(query,[idUser],(err,results)=>{
            if(!err){
                res.status(200).json(results);
            }else{
                res.status(400).json(err);
            }
        })
    })

    router.delete('/deleteProfil/:id',(req,res)=>{
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