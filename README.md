# Authentification de documents

## Cas étudié : Diplôme d’école

## DE SOUSA Jordan / CAZENAVE Louis


Projet Annuel 4A IBC



## 1. Avertissements

Ce document ne constitue pas de conseils en investissement ou une invitation à
investir dans tout titre ou instrument financier de toute nature que ce soit.
Aucune des informations ou analyses décrites dans ce document ne vise à fournir une
base pour une décision d'investissement et aucune recommandation spécifique n'est
faite.
Ce document ne constitue pas ou ne fait pas partie et ne doit pas être interprété
comme une offre de vente ou souscription, ou une invitation à acheter ou à souscrire
des titres ou des instruments financiers.



## 2. Introduction

Mise à disposition d’une application d’authentification de documents, et dans notre cas
d’étude, de diplômes plus précisément. Les écoles pourront authentifier les diplômes
de leurs étudiants, les étudiants et les entreprises pourront visualiser les diplômes
certifiés sur la chaîne de blocs Bitcoin.



## 3. Problème

Il y a des problèmes majeurs rencontrés dans le domaine de l’emploi : la falsification de
diplômes, les soucis de bureaucratie ainsi que le vol d'identité.
Notre solution vise à résoudre ce manque de confiance (asymétrie d’information) en
certifiant les diplômes d’étudiants sur le registre distribué Bitcoin. Cela permet de
faciliter l’accès à l’information, de réduire les coûts de certifications et de traitement
des diplômes tout en assurant la validité de l’identité du diplômé.
L’état a commencé à créer une plateforme afin d’entrer ses informations liées à France
connect visant à recenser les diplômes majeurs des jeunes étudiants. Cependant la
plateforme est très limitée puisqu’elle ne concerne que les établissements publics.


### 3. 1. Solutions existantes :

#### 3. 1. 1. Ark Education
Ark Education est une solution basée sur la certification de diplômes, d’attestations
académiques et d’Open Badges, via la plateforme BCdiploma.com, qui a pour
l’occasion déployé sa « dapp » (application distribuée) sur cette nouvelle blockchain.
Leur plateforme est cependant exclusive à une certification de diplôme. Nous avons
pour projet de viser un public plus large en certifiant tout type de documents.
#### 3. 1. 2. Woleet
Solution basée sur du timestamping et la signature électronique. Aspect trop général
de certification de fichier. Notre but étant de lier l’aspect purement technique avec
l’interface idéale pour une école. L’application web sera donc parfaitement adaptée
pour ce cas d’usage.
Ce sont des solutions directement liées à l’éducation. Notre solution vise en premier
lieu à certifier des pdf et non uniquement des diplômes. Nous avons juste pris cet
exemple afin d’obtenir une vision plus aisé de notre système.




## 4. But

### 4. 1. Principe

Notre but est de fournir une application web qui permet pour une école de certifier
les diplômes de ses étudiants, pour un étudiant de visualiser son diplôme certifié par
son école et pour une entreprise de visualiser le diplôme certifié de son futur
employé.
Ils pourront vérifier les résultats sans passer par un tiers de confiance. Les résultats
seront immuables car inscrit dans le registre distribué Bitcoin et vérifiable par tous
sans passer par notre application (via un block explorer par exemple).
Nous proposons un outil le plus simple et transparent pour une école sans aucune
connaissance vis à vis du protocole Bitcoin, lui permettant ainsi de certifier les
diplômes de ses étudiants.
Notre plateforme fera le maximum pour respecter au mieux la vie privée, la
confidentialité, la liberté ainsi que l’intégrité des données qui transitent par la
plateforme.

### 4. 2. Fonctionnalités principales

L’école dispose d’un parcours fermé et ergonomique pour ajouter ses étudiants,
ajouter les diplômes obtenus par ses étudiants et enregistrer le hash des diplômes
sur le réseau distribué Bitcoin.
L’étudiant dispose d’un parcours fermé et ergonomique pour visualiser les
informations de son diplôme certifié par son école.
L’entreprise dispose d’un parcours fermé et ergonomique pour visualiser les
informations du diplôme de son futur employé.


### 4. 3. Déroulement

#### 4. 3. 1. Parcours école


L’école contacte notre plateforme puis nous vérifions qu’elle est conforme.
Nous lui créons ensuite son espace et lui communiquons ses identifiants
pour se connecter à notre plateforme.
L’école peut ensuite insérer ses étudiants en renseignant toutes leurs
informations et leurs diplômes puis notre plateforme enregistre le hash du
diplôme sur la blockchain Bitcoin.
Notre plateforme envoie ensuite le pdf du diplôme à chaque étudiant par
mail (via les mails renseignés par l’école).
L’école peut également retrouver les détails liés à ses étudiants à tout
moment via l’affichage de ses informations.
Elle pourra y retrouver le hash du pdf, le numéro de transaction et toutes
les informations associées.


#### 4. 3. 2. Parcours étudiant

L’étudiant reçoit par mail le pdf de son diplôme certifié par Bitcoin via
notre plateforme.
Il peut ensuite aller sur notre plateforme pour vérifier et visualiser sa
transaction Bitcoin qui correspond à son diplôme.
L’étudiant peut envoyer le pdf de son diplôme à son employeur pour que
celui-ci puisse également vérifier sa certification via le même procédé.


#### 4. 3. 3. Parcours entreprise

L’entreprise reçoit par le biais de son futur employé le pdf du diplôme
certifié puis peut ensuite se rendre sur Diploom afin de visualiser les
informations de transactions correspondantes et vérifier que le diplôme
existe et est bien certifié.




## 5. Considérations techniques

### 5. 1. Technique

```
Application Web Blockchain Base de données
Front End :​ HTML/CSS &
Angular (Javascript)
Back End :​ NodeJS
Bitcoin :
Commandes RPC depuis
un noeud
Firebase :
Authentification des
écoles et stockages des
informations des
utilisateurs
```
### 5. 2. Choix du réseau distribué

Notre plateforme fonctionnera sur Bitcoin qui dispose de l’avantage d’être un réseau
de transaction distribué sécurisé et sans autorité centrale, et enregistrera le hash des
diplômes des étudiants dans une transaction réalisée avec les commandes RPC.

### 5. 3. Hash du PDF
Le hash du pdf sera effectué avec la librairie sha256-file sur NodeJS.
Le principe est le suivant :
OPCODE Utilisés :
- OP_CODE de type : nulldata ou le Hash est le OP_RETURN


### 5. 4. UI (User Interface)

Liste des pages que comporte notre plateforme :

- Accueil (recherche du hash d’un diplôme)
- Contact (Pour permettre aux écoles d’être ajoutées à notre plateforme)
En plus de ces deux pages, l’école aura :
- Ecole :
- Login
- Ajout étudiants + diplôme
- Liste des étudiants diplômés

### 5. 5. KYC (Know Your Customer)

Nous allons conserver uniquement les données que l’école souhaite nous
transmettre.
L’école étant détentrice des données de ses étudiants, nous ne serons en aucun cas
responsables des données transmises.
Nous allons donc conserver :

- Le nom et prénom, email de l’étudiant
- La promotion et filière de l’étudiant
- Le PDF du diplôme
- Le Hash du pdf (après traitement du pdf sur notre plateforme)
- L’ID de transaction Bitcoin ou réside le hash du diplôme de l’étudiant
Dès le succès de la transaction Bitcoin obtenu, nous enverrons le PDF du diplôme à
l’étudiant diplômé par mail ainsi que ses informations personnelles.




## 6. Modèle économique

Dans le cadre de la certification de diplôme le modèle économique est un modèle
gratuit basé sur le testnet du réseau Bitcoin.

### 6. 1 Token

Le token utilisé sera le BTC.



## 7. Equipe

CAZENAVE Louis
DE SOUSA Jordan



## 8. Solution marché

Voici la liste d’améliorations qui peuvent être implémentés pour améliorer le système :

- Déployer l’application sur le réseau mainnet de Bitcoin.
- Etablir un plus large panel d’administration du compte Ecole avec un ajout de
    diplômes simplifié


