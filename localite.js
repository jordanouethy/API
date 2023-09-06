const express = require('express');
const connection = require('../connection');
const router = express.Router();

router.post('/addSecteur',(req, res) => {
    let secteur = req.body;

                query = "call psSecteur_Insert(?,?,?,?,?)";

                connection.query(query,[0,secteur.codeSecteur,secteur.nomSecteur,secteur.DescriptionSecteur,secteur.idLocalite],(err,results)=>{
                    if(!err){
                        return res.status(200).json({message:"secteur entegistré avec succès"});
                    }else{
                        return res.status(500).json(err);
                    }
                })

       
    })

    // route pour tous les récupérer

router.get('/getLocalite',(req, res)=>{
    var query = "select * from localite";
    
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }else{
            return res.status(500).json(err);
        }
    })
})

router.delete('/deleteSecteur/:id',(req, res)=>{
    const idSecteur = req.params.id;
    var query = "call psSecteur_Delete(?)";
    connection.query(query,[idSecteur],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(400).json({message:"Secteur introuvable!"});
            }
            return res.status(200).json({message:"Secteur spprimé avec succès"});
        }
        else{
            return res.status(500).json(err);
        }
    })
})


module.exports = router;