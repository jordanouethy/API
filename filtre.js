const express = require('express');
const connection = require('../connection');
const router = express.Router();



    // route pour tous les récupérer

router.post('/getHotelFiltre',(req, res)=>{
    var produit = req.body;
    console.log(produit);
    var query = "SELECT * FROM produit where produit.nombreSalon=? and produit.nombreChambre=? and (? between dateDebut and dateFin) or (?  between dateDebut and dateFin)";
   // var query = "select * from produit where  produit.nombreSalon=? and produit.nombreChambre=? and produit.ville =? and dateDebut=? and dateFin=?";
    
    connection.query(query,[produit.RnombreSalon,produit.RnombreChambre,produit.Rville,produit.RdateDebut,produit.RdateFin],(err,results)=>{
        if(!err){
            return res.status(200).json(results);
          
        }else{
            return res.status(500).json(err);
        }
    })
})




module.exports = router;