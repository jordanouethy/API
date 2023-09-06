const express = require('express');
const connection = require('../connection');
const router = express.Router();

router.post('/addCat',(req, res) => {
    let categorie = req.body;
console.log(categorie)
                query = "call psCategorie_Insert(?,?,?,?)";

                connection.query(query,[0,categorie.nomCat,categorie.descriptionCat,categorie.idSecteur],(err,results)=>{
                    if(!err){
                        return res.status(200).json({message:"Catégorie entegistré avec succès"});
                    }else{
                        return res.status(500).json(err);
                    }
                })

       
    })

    // route pour tous les récupérer

router.get('/getCat',(req, res)=>{
    var query = "SELECT categorie.id,categorie.nomCat, `categorie`.`descriptionCat`,`categorie`.`idSecteur`, secteur.nomSecteur FROM `test`.`categorie`, test.secteur where test.categorie.idSecteur= test.secteur.id";
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }else{
            return res.status(500).json(err);
        }
    })
})

router.delete('/deleteCat/:id',(req, res)=>{
    const idSecteur = req.params.id;
    var query = "call psCategorie_Delete(?)";
    connection.query(query,[idSecteur],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(400).json({message:"Categorie introuvable!"});
            }
            return res.status(200).json({message:"Categorie spprimé avec succès"});
        }
        else{
            return res.status(500).json(err);
        }
    })
})


module.exports = router;