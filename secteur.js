const express = require('express');
const connection = require('../connection');
const router = express.Router();

router.post('/addSecteur',(req, res) => {
    let secteur = req.body;

                query = "call psSecteur_Insert(?,?,?,?,?)";

                    if( secteur.id == undefined){    
                      /*   console.log("id null");
                        console.log(secteur.id); */
                        secteur.id = 0;
                        connection.query(query,[secteur.id,secteur.codeSecteur,secteur.nomSecteur,secteur.DescriptionSecteur,secteur.idLocalite],(err,results)=>{
                            if(!err){
                                return res.status(200).json({message:"secteur entegistré avec succès"});
                            }else{
                                return res.status(500).json(err);
                            }
                        })
                        
                    }else{
/*                         console.log('id non null');
 */                        connection.query(query,[secteur.id,secteur.codeSecteur,secteur.nomSecteur,secteur.DescriptionSecteur,secteur.idLocalite],(err,results)=>{
                            if(!err){
                                return res.status(200).json({message:"secteur modifié avec succès"});
                            }else{
                                return res.status(500).json(err);
                            }
                        })
                    }
              

       
    })

    // route pour tous les récupérer

router.get('/getSecteur',(req, res)=>{
    var query = "select test.secteur.id,codeSecteur,nomSecteur,DescriptionSecteur,l.nomLocaliteF from test.secteur, test.localite l where test.secteur.idLocalite=l.id";
    
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