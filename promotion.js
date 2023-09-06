const express = require('express');
const connection = require('../connection');
const router = express.Router();



const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'public/images')
        },
        filename: (req, file, cb)=>{
            cb(null, file.fieldname + "" + Date.now() + path.extname(file.originalname));
        }
})


 const upload = multer({
    storage: storage,
})

router.post('/addPromotion',upload.single('image'),(req, res) => {
    let promotion = req.body;
console.log(promotion.id);
console.log(promotion);
    if(promotion.id===undefined){
    const imagePro = req.file.filename;
  console.log(imagePro);

    query = "call psPromotion_Insert(?,?,?,?,?,?,?,?)";

    connection.query(query,[0,promotion.idProduit,promotion.dateDebut,promotion.dateFin,promotion.prixPromtion,promotion.nomPromo,promotion.descriptionPromo,imagePro],(err,results)=>{
        if(!err){
            return res.status(200).json({message:"Promotion entegistré avec succès"});
        }else{
            return res.status(500).json(err);
        }
    })

}else{
    const promotionid = req.params.id;
    console.log(promotionid);
/* 
    query = "call psPromotion_Insert(?,?,?,?,?,?,?,?)";

    connection.query(query,[promotion.id,promotion.idProduit,promotion.dateDebut,promotion.dateFin,promotion.prixPromtion,promotion.nomPromo,promotion.descriptionPromo,promotion.imagePro],(err,results)=>{
        if(!err){
            return res.status(200).json({message:"Promotion modifiée avec succès"});
        }else{
            return res.status(500).json(err);
        }
    }) */
}
    })



/*     
const multipleUpload = upload.fields([{ name: 'image'},{ name: 'image1'},{name:'image2'},{name:'image3'},{name:'image4'}])

router.post('/addProduit',multipleUpload,(req, res)=>{
    let Produit = req.body;
    const imageUrlP = req.files.image[0].filename;
     const image1 = req.files.image1[0].filename;
    const image2 = req.files.image2[0].filename;
    const image3 = req.files.image3[0].filename;
    const image4 = req.files.image4[0].filename; 
    if(req.files){
        console.log("files uploaded")
      //  console.log(req.files)
  console.log(req.files.image[0].filename)
        console.log(req.files.image1[0].filename)
        console.log(req.files.image2[0].filename)
        console.log(req.files.image3[0].filename)
        console.log(req.files.image4[0].filename)
       console.log(Produit);

        query = "call psProduit_Insert(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

        connection.query(query,[0,Produit.codeProd,Produit.nomProd,Produit.descriptionProd,Produit.quantiteProd,Produit.prixUnitaireProd,Produit.statusProd,Produit.mention,Produit.idCategorie,imageUrlP,image1,image2,image3,image4],(err,results)=>{
            if(!err){
                return res.status(200).json({message:"Produit entegistré avec succès"});
            }else{
                return res.status(500).json(err);
            }
      
        })
    }
}) */

    // route pour tous les récupérer

router.get('/getPromotion',(req, res)=>{
    var query = "    SELECT `promotion`.`id`, `promotion`.`idProduit`, `promotion`.`dateDebut`, `promotion`.`dateFin`, `promotion`.`prixPromtion`, `promotion`.`nomPromo`, `promotion`.`descriptionPromo`, `promotion`.`imagePro`,p.nomProd FROM `test`.`promotion`, test.produit p where test.promotion.idProduit = p.id";
    
    connection.query(query,(err,results)=>{
        if(!err){
            
            return res.status(200).json(results);
        }else{
            return res.status(500).json(err);
        }
    })
})




router.delete('/deletePromotion/:id',(req, res)=>{
    const idProduit = req.params.id;
    var query = "call psPromotion_Delete(?)";
    connection.query(query,[idProduit],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(400).json({message:"Promotion introuvable!"});
            }
            return res.status(200).json({message:"Promotion spprimé avec succès"});
        }
        else{
            return res.status(500).json(err);
        }
    })
})


module.exports = router;