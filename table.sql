create table utilisateur(
    id int primary key auto_increment,
    matricule varchar(255) ,
    nom varchar(255),
    prenom varchar(255),
    tel varchar(30),
    adresse varchar(255),
    email varchar(60) unique,
    password varchar(25),
    status varchar(20),
    role varchar(20),
    idProfil int(10),
    foreign key (idProfil) references(profil)
);

insert into utilisateur(
    matricule, 
    nom, 
    prenom,
    tel,
    adresse,
    email, 
    password, 
    status,
    role) values(
        'admin1',
        'admin',
        'ad',
        '698547522',
          'yaoundé-emana',
        'admin@gmail.com',
        'admin',
        'true',
        'admin',
        1
    );

    create table secteur(
        id int primary key auto_increment,
        code varchar(60),
        nomSecteur varchar(100),
        DescriptionSecteur varchar(255),
        idLocalite int,
        foreign key(idLocalite) references(Localite)
    );

    create table localite(
        id int primary key auto_increment,
        nomLocaliteF varchar(100),
        nomLocaliteA varchar(100)
    );

create table categorie(
    id int primary key auto_increment,
    nomCat varchar(90),
    descriptionCat varchar(100 ),
    idSecteur int(11),
    foreign key(idSecteur) references(secteur)
);

create table produit(
id int primary key auto_increment,
codeProd varchar(70),
nomProd varchar(50),
descriptionProd varchar(100),
quantiteProd double,
prixUnitaireProd double,
statusProd varchar(10),
mention varchar(50),
imageUrlP varchar(100),
imageUrlS1 varchar(100),
imageUrlS2 varchar(100),
imageUrlS3 varchar(100),
imageUrlS4 varchar(100)
);