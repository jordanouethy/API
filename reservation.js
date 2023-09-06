const express = require('express');
const connection = require('../connection');
const shortid = require('shortid');

const router = express.Router();

router.post('/addReservation',(req, res) => {

const uniqueId = shortid.generate();
console.log('le numero unique',uniqueId);

    let tab=[]= req.body;

    var query = "call psReservation_Insert(?,?,?,?,?,?,?)"; 
    
    let i
for(i=0;i<tab.length;i++){
    tab[i].uiid= uniqueId+tab[i].idUser;
    console.log(tab[i]);

    connection.query(query,[0,tab[i].idProduit,'now()',tab[i].uiid,tab[i].idUser,tab[i].quantitePanier,tab[i].prixTotalPanier],(err,results)=>{

        if(!err){
            console.log('Reservation effectué avec succès');
            
        }else{
            return res.status(500).json(err);
        }
    })

}
  
    })

    // route pour tous les récupérer

router.get('/getReservationByIdUser/:idUser',(req, res)=>{
     idUser = req.params.idUser;
    var query = "call psReservationNum(?)";
    
    connection.query(query,[idUser],(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }else{
            return res.status(500).json(err);
        }
    })
})


router.get('/getReservationUiid/:uiid',(req, res)=>{
    uiid = req.params.uiid;
   var query = "call psReservation_Uiid(?)";
   
   connection.query(query,[uiid],(err,results)=>{
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

router.patch('/updateReservation',(req,res)=>{
    reservation=[] = req.body;
    var query = "call psReservation_UpadatePrixTotal(?,?,?)";
    connection.query(query,[reservation[0],reservation[1],reservation[2]],(err,results)=>{
        if(!err){
            return res.status(200).json(results)
        }else{
            return res.status(400).json(err);
        }

    })
})

router.patch('/updateReservationValidation',(req,res)=>{
    reservation = req.body;
    var query = "call psReservation_Validation(?,?)";
    connection.query(query,[reservation.etat,reservation.uiid],(err,results)=>{
        if(!err){
            return res.status(200).json(results)
        }else{
            return res.status(400).json(err);
        }

    })
})

router.delete('/deleteReservation/:uiid',(req,res)=>{
    uiid = req.params.uiid;
    var query = "call psReservation_Delete(?)";
    connection.query(query,[uiid],(err,results)=>{
        if(!err){
            return res.status(200).json({message:"commande supprimée avec succès"})
        }else{
            return res.status(400).json(err);
        }
    })
    
})



module.exports = router;