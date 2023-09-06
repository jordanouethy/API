const express = require('express');
const connection = require('../connection');
const router = express.Router();



const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "" + Date.now() + path.extname(file.originalname));
    }
})


const upload = multer({
    storage: storage,
})
/*
router.post('/addProduit',upload.single('image'),(req, res) => {
    let Produit = req.body;
    const imageUrlP = req.file.filename;
    console.log(Produit);
    console.log(imageUrlP);

    query = "call psProduit_Insert(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

    connection.query(query,[0,Produit.codeProd,Produit.nomProd,Produit.descriptionProd,Produit.quantiteProd,Produit.prixUnitaireProd,Produit.statusProd,Produit.mention,Produit.idCategorie,imageUrlP,Produit.imageUrlS1,Produit.imageUrlS2,Produit.imageUrlS3,Produit.imageUrlS4],(err,results)=>{
        if(!err){
            return res.status(200).json({message:"Produit entegistré avec succès"});
        }else{
            return res.status(500).json(err);
        }
    })
    }) */




const multipleUpload = upload.fields([{ name: 'image' }, { name: 'image1' }, { name: 'image2' }, { name: 'image3' }, { name: 'image4' }])

router.post('/addProduit', multipleUpload, (req, res) => {
    let Produit = req.body;
    const imageUrlP = req.files.image[0].filename;
    const image1 = req.files.image1[0].filename;
    const image2 = req.files.image2[0].filename;
    const image3 = req.files.image3[0].filename;
    const image4 = req.files.image4[0].filename;
    if (req.files) {
        console.log("files uploaded")
        //  console.log(req.files)
        console.log(req.files.image[0].filename)
        console.log(req.files.image1[0].filename)
        console.log(req.files.image2[0].filename)
        console.log(req.files.image3[0].filename)
        console.log(req.files.image4[0].filename)
        console.log(Produit);

        query = "call psProduit_Insert(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

        connection.query(query, [0, Produit.codeProd, Produit.nomProd, Produit.descriptionProd, Produit.quantiteProd, Produit.prixUnitaireProd, Produit.statusProd, Produit.mention, Produit.idCategorie, imageUrlP, image1, image2, image3, image4], (err, results) => {
            if (!err) {
                return res.status(200).json({ message: "Produit entegistré avec succès" });
            } else {
                return res.status(500).json(err);
            }

        })
    }
})

// route pour tous les récupérer

router.get('/getProduit', (req, res) => {
    var query = "call psProduit_List()";

    connection.query(query, (err, results) => {
        if (!err) {

            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    })
})

router.get('/getProduitById/:id', (req, res) => {
    const produit = req.params.id;

    var query = "SELECT `produit`.`id`, `produit`.`codeProd`, `produit`.`nomProd`, `produit`.`descriptionProd`, `produit`.`quantiteProd`, `produit`.`prixUnitaireProd`, `produit`.`statusProd`, `produit`.`mention`, `produit`.`idCategorie`, `produit`.`imageUrlP`, `produit`.`imageUrlS1`, `produit`.`imageUrlS2`, `produit`.`imageUrlS3`, `produit`.`imageUrlS4` FROM `test`.`produit` WHERE produit.id = ?";

    connection.query(query, [produit], (err, results) => {
        if (!err) {

            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    })
})

router.get('/getProduitByPro', (req, res) => {

    var query = "SELECT `produit`.`id`, `produit`.`codeProd`, `produit`.`nomProd`, `produit`.`descriptionProd`, `produit`.`quantiteProd`, `produit`.`prixUnitaireProd`, `produit`.`statusProd`, `produit`.`mention`, `produit`.`idCategorie`, `produit`.`imageUrlP`, `produit`.`imageUrlS1`, `produit`.`imageUrlS2`, `produit`.`imageUrlS3`, `produit`.`imageUrlS4`, p.prixPromtion FROM `test`.`produit`, test.promotion p where produit.id = p.idProduit;";
 
    connection.query(query, (err, results) => {
        if (!err) {

            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    })
})

router.get('/getProduitByCat/:id', (req, res) => {
 const produit = req.params.id;
  console.log(produit);
    var query = "SELECT `produit`.`id`,`produit`.`codeProd`,`produit`.`nomProd`,`produit`.`descriptionProd`,`produit`.`quantiteProd`,`produit`.`prixUnitaireProd`,`produit`.`prixPromo`,`produit`.`note`,`produit`.`statusProd`,`produit`.`mention`,`produit`.`idCategorie`,`produit`.`imageUrlP`,`produit`.`imageUrlS1`,`produit`.`imageUrlS2`,`produit`.`imageUrlS3`,`produit`.`imageUrlS4`FROM `test`.`produit` where produit.idCategorie =?";
    connection.query(query,[produit], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                console.log(results);
                return res.status(400).json({ message: "Produit introuvable!" });
            }
              
            return res.status(200).json(results);
           
        } else {
            return res.status(500).json(err);
        }
    })
})

router.delete('/deleteProduit/:id', (req, res) => {
    const idProduit = req.params.id;
    var query = "call psProduit_Delete(?)";
    connection.query(query, [idProduit], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(400).json({ message: "Produit introuvable!" });
            }
            return res.status(200).json({ message: "Produit spprimé avec succès" });
        }
        else {
            return res.status(500).json(err);
        }
    })
})


module.exports = router;