const express = require('express');
const connection = require('../connection');

const router = express.Router();

router.post('/addPayement',(req,res)=>{
payement = req.body;
var query ="call psPayement_Insert(?,?,?,?,?)";
connection.query(query,[0,payement.montant,payement.uiidReservation,payement.idUser,'now()'],(err,results)=>{
    if(!err){
        return res.status(200).json({message:"payement enregistré avec succès"});
    }else{
        return res.status(400).json(err);
    }
})

})

router.get('/getPayementByUiid/:uiidReservation',(req,res)=>{
    payement = req.params.uiidReservation;
    console.log(payement);
    var query = "call psPayementByUiid(?)";
    connection.query(query,[payement],(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }else{
            return res.status(400).json(err);

        }
    })
})



module.exports = router;