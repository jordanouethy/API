const express = require('express');
const connection = require('../connection');
const router = express.Router();

router.post('/addPanier',(req, res) => {
    let panier = req.body;
    console.log(panier);
    panier.uiid= "PAN"+""+panier.idUser;
    console.log(panier.idProduit);
    console.log(panier.uiid);

         query = "call psPanier_Insert(?,?,?,?,?,?)";

            connection.query(query,[0,panier.idProduit, panier.quantitePanier,panier.prixTotalPanier,panier.uiid,panier.idUser],(err,results)=>{
                if(!err){
                    return res.status(200).json({message:"produit enregistré avec succès dans le Panier"});
                }else{
                    return res.status(500).json(err);
                }
            }) 
           
    })

 
    router.get('/getPanier',(req,res)=>{
        var query="call psPanier_List()";
        connection.query(query,(err,results)=>{
            if(!err){
                return res.status(200).json(results)
            }else{
                return res.status(400).json(err);
            }
        })
    })

    router.get('/getPanier/:idUser',(req,res)=>{
        let panieridUser = req.params.idUser;
        console.log(panieridUser);
        var query="call psPanierById(?)";
        connection.query(query,[panieridUser],(err,results)=>{
            if(!err){
                return res.status(200).json(results)
            }else{
                return res.status(400).json(err);
            }
        })
    })

    router.post('/getPanierFiltre',(req,res)=>{
        user = req.body;
        var query = "call psPanierFiltreByEmail(?)";
        connection.query(query,[user],(err,results)=>{
            if(!err){
                return res.status(200).json(results)
            }else{
                return res.status(400).json(err);
            }
    
        })
    })

    router.delete('/deletePanier/:id',(req, res)=>{
        const idPanier= req.params.id;
        var query = "call psPanier_Delete(?)";
        connection.query(query,[idPanier],(err,results)=>{
            if(!err){
                if(results.affectedRows == 0){
                    return res.status(400).json({message:"Panier introuvable!"});
                }
                return res.status(200).json({message:"Panier spprimé avec succès"});
            }
            else{
                return res.status(500).json(err);
            }
        })
    })

  
module.exports = router;