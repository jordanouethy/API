const express = require('express');
const bodyParser = require("body-parser");

var cors = require('cors');
const connection = require('./connection');
const userRoute = require('./routes/user');
const secteurRoute = require('./routes/secteur');
const categorieRoute = require('./routes/categorie');
const localiteRoute = require('./routes/localite');
const produitRoute = require('./routes/produit');
const filtreRoute = require('./routes/filtre');

const reservationRoute = require('./routes/reservation');
const payementRoute = require('./routes/payement');

const imageRoute = require('./routes/image');
const panierRoute = require('./routes/panier');
const promotionRoute = require('./routes/promotion');
const profilRoute = require('./routes/profil');
const utilisateurprofilRoute = require('./routes/utilisateur_profil');
const app = express();
const path = require('path');



/* lui aussu marche */
/* 
app.use(express.static(path.join(__dirname, 'frontend/dist/audit-ccaa')));


 app.get('', function(req, res) {
res.sendFile(path.join(__dirname, 'frontend/dist/audit-ccaa/index.html'));
})  */


/* 
//tout ce code marche bien
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
  };
  
  app.use(cors(corsOptions)); 

  // Servir les fichiers statiques de l'application Angular
const angularAppPath = path.join(__dirname, 'frontend/dist/audit-ccaa');
app.use(express.static(angularAppPath));

// Rediriger toutes les autres requêtes vers l'index.html
app.get('', (req, res) => {
  //  res.sendFile(path.join(__dirname, 'frontend/dist/audit-ccaa/index.html'));

  res.sendFile(path.join(angularAppPath, 'frontend/dist/audit-ccaa/index.html'));
});
 */



app.use('/public/images', express.static(path.join(__dirname, "public/images")));

app.use(cors('*'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/user',userRoute);
app.use('/secteur',secteurRoute);
app.use('/categorie',categorieRoute);
app.use('/localite',localiteRoute);
app.use('/produit',produitRoute);
app.use('/reservation',reservationRoute);
app.use('/payement',payementRoute);
app.use('/filtre',filtreRoute);
app.use('/image',imageRoute);
app.use('/panier',panierRoute);
app.use('/promotion',promotionRoute);
app.use('/profil',profilRoute);
app.use('/utilisateur_profil',utilisateurprofilRoute);




module.exports = app;