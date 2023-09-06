
"codeProd":"",
 "nomProd":"",
 "descriptionProd":"",
 "quantiteProd":"",
 "prixUnitaireProd":"",
 "statusProd":"",
 "mention":"",
 "idCategorie":"",
 "imageUrlP":"",
 "imageUrlS1":"",
 "imageUrlS2":"",
 "imageUrlS3":"",
 "imageUrlS4":""
'6', 'prod7', 'produit7', 'description du produit 7', '100', '500', NULL, NULL, '2', 'C:\\fakepath\\accueilcli.png', NULL, NULL, NULL, NULL


router.post('/addProduit',(req, res) => {
    let Produit = req.body;

                query = "call psProduit_Insert(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

                connection.query(query,[6,Produit.codeProd,Produit.nomProd,Produit.descriptionProd,Produit.quantiteProd,Produit.prixUnitaireProd,Produit.statusProd,Produit.mention,Produit.idCategorie,Produit.imageUrlP,Produit.imageUrlS1,Produit.imageUrlS2,Produit.imageUrlS3,Produit.imageUrlS4],(err,results)=>{
                    if(!err){
                        return res.status(200).json({message:"Produit entegistré avec succès"});
                    }else{
                        return res.status(500).json(err);
                    }
                })

       
    })




    INSERT INTO `test`.`panier` (`idProduit`, `quantitePanier`, `prixTotalPanier`) VALUES (?, ?, ?);

    SELECT `promotion`.`id`, `promotion`.`idProduit`, `promotion`.`dateDebut`, `promotion`.`dateFin`, `promotion`.`prixPromtion`, `promotion`.`nomPromo`, `promotion`.`descriptionPromo`, `promotion`.`imagePro`,p.nomProd FROM `test`.`promotion`, test.produit p where test.promotion.idProduit = p.id;






SELECT `produit`.`id`,`produit`.`codeProd`,`produit`.`nomProd`,`produit`.`descriptionProd`,`produit`.`quantiteProd`,`produit`.`prixUnitaireProd`,`produit`.`statusProd`,`produit`.`mention`,`produit`.`idCategorie`,`produit`.`imageUrlP`,`produit`.`imageUrlS1`,`produit`.`imageUrlS2`,`produit`.`imageUrlS3`,`produit`.`imageUrlS4`FROM `test`.`produit` where produit.idCategorie =