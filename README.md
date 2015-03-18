# Retour sur la journée OpenDataDay à Nantes

Dans le cadre de l'OpenData Day, nous étions réunis à l'initiative de Claire Gallon de l'association LiberTIC pour participer à l'OpenDataDay.

Plusieurs choix étaient envisageables. En effet, cette journée n'a pas particulièrement de règles imposées.

Cela vous permet de rencontrer des gens intéressés à l'ouverture des données, chacun ayant ses propres centres d'intérêt.

## Les participants

Sans que les catégories s'excluent, on avait parmi les participants :

* Des citoyens curieux
* Des chantres de l'OpenData
* Des informaticiens
* Des cartographes
* ...

## Agriculture en ville, ébauche pour concentrer les données nantaises

Les personnes présentes n'avaient pas vraiment de projets précis. Nous avons ainsi convenu d'anticiper sur le [Hackgriculture](http://cantine.atlantic2.org/evenements/hackgriculture-les-technologies-au-service-de-la-production-agricole-en-milieu-urbain/), un événement prévu le 21 Mars se présentant comme "les technologies au service de la production agricole en milieu urbain".

Nous sommes partis de deux constats:

* Il faut trouver des données pouvant servir à la thématique "Agriculture en ville"
* Il va falloir s'organiser au cours de la journée entre ceux qui vont plutôt se concentrer sur des idées ou sur de la mise en oeuvre technique

Ainsi deux équipes s'étaient formées pour travailler sur la même thématique.

### Phase 1 commune:

Un premier défrichage des données est effectué tous ensemble sinon l'équipe sur les idées d'usages liés à l'agriculture urbaine ne pourront pas faire de propositions concrètes pendant que ceux à la technique vont travailler pour concentrer des données. Par extension du côté "Agriculture en ville", le côté "Environnement en ville" a été amené: on peut avoir des arbres fruitiers en ville par exemple et op peut considérer les jardins publics comme un premier lieu de sensibilisation à la nature mais aussi à la culture agricole, même sommaire.

En revenant au jeu de données disponibles, il ressort principalement que:

* des données sur les jardins collectifs sont en ligne sur le site http://data.nantes.fr
* des données sur les arbres de la ville sont présentes mais toutes les données ne sont pas mises à disposition par le SEVE (services Espaces Verts de la ville de Nantes) (voir <http://data.nantes.fr/donnees/?keywords=seve>)

Pour les jardins, on a récupéré les [Jardins familiaux de la ville de Nantes](http://data.nantes.fr/donnees/detail/jardins-familiaux-de-la-ville-de-nantes/)
On a aussi trouvé les [Localisation et caractéristiques des parcs et jardins de Nantes](http://data.nantes.fr/donnees/detail/localisation-et-caracteristiques-des-parcs-et-jardins-de-nantes/) définit comme ci-dessous:

> Référencement géographique des emplacements des parcs et jardins dans Nantes. Cette liste est accompagnée d'un inventaire des équipements qui les compose (ex : sanitaires, jeux pour enfants, points d'eau, etc).

Pour les arbres, il a semblé intéressant d'inspecter le contenu du [patrimoine arboré de la ville de Nantes](http://data.nantes.fr/donnees/detail/patrimoine-arbore-de-la-ville-de-nantes/). On avait aussi les arbres du "Jardin des Plantes" (celui en face de la sortie Nord de la gare de Nantes)

### Phase 2:

Le groupe 1 se concentrant sur les usages commence à analyser les données à disposition (informations disponibles).

Le groupe 2 plutôt technique fait le choix de faire du "webscrapping". Cette technique consiste à récupérer et à consolider des données à partir d'un site web en se faisant passer pour un internaute alors qu'il s'agit en réalité d'une machine. Le but dans notre cas est de libérer des données du site SEVE qui référence tous les arbres de la ville de Nantes.

Pourquoi ce besoin? De nombreuses données du SEVE ne sont pas sur le portail OpenData de Nantes mais leur site est bien fourni et ces données pourrait servir en particulier avec [l'inventaire des arbres](http://www.jardins.nantes.fr/N/Arbre/Carte/ArbreSaisieAdresse.asp)

### Résultats:

**Jeu de donnée sur les arbres**

Deux approches aux cours de l'OpenDataDay pour récupérer les données

* *A partir d'un parc ou square*
* *A partir de son essence*

L'approche par *A partir d'un parc ou square* donne de plus nombreux résultats : de nombreux arbres sont identifiés sans qu'on dispose de leur essence.

Pour la cas "Parc", on a 41685 arbres
Pour le cas "Essence", on a 38571 arbres

Cela est à mettre en rapport avec le total officiel du site <http://www.jardins.nantes.fr>

> L'inventaire des arbres est en cours, actuellement, 53442 arbres sont cartographiés et 31486 fiches sont renseignées

En fait, l'approche par essence oublie les essences non renseignés et celle par parcs et squares néglige les alignements d'arbres intra-urbains. Nous allons revenir un peu plus loin dessus ce problème.

Nous avions aussi pour projet de faire le lien entre les essences et les arbres. Ceci est partiellement fait sur le site de SEVE. Pour cela, la question était de travailler soit avec un lien vers Wikipédia soit les inventaires du MNHN (Muséum National d'Histoire Naturel)

En dehors de la reprise de données arbres, des cartes ont été produites en travaillant sur une thématique soulevée au cours de la journée OpenDataDay: essayer de corréler les arbres avec les allergènes car cette information est renseignées dans l'inventaire du patrimoine arboré.

Ne disposant pas du temps et des connaissances, nous avions commencé juste à produire des cartes montrant les arbres et les orthophotos de la ville de Nantes, certains étant des spécialistes de la cartographie, en mettant en avant les allergènes.

## Après l'OpenDataDay, une reprise sur les données arbres

En dehors de l'OpenDataDay, nous avons depuis pris une autre approche, celle de la géolocalisation: en construisant une grille de points puis en la passant dans l'URL les coordonnées, nous avons été à même de couvrir et récupérer les coordonnées des 53442 arbres.

Nous avons ensuite importé les fichiers du patrimoine arboré venant du site data.nantes.fr et notre fichier avec les emplacements des arbres en utilisant un utilitaire en ligne de commande nommé [CSVKit](http://csvkit.readthedocs.org/) dans une base de données, plus souple pour manipuler des fichiers tabulaires.

    csvsql --db 'sqlite:////home/thomas/opendataday/recherche_par_grille/arbres.sqlite' --insert -d ';' -e 'utf-8' patrimoine_arbore_nantes.csv

    csvsql --db 'sqlite:////home/thomas/opendataday/recherche_par_grille/arbres.sqlite' --insert -e 'utf-8' arbres_nantes.txt

En utilisant, [SQLite Manager](https://addons.mozilla.org/fr/firefox/addon/sqlite-manager/), un addon pour le navigateur Web Mozilla permettant de manipuler des bases de données SQLite.

Ainsi, nous avons fait une jointure, en terme non technique une correspondance entre les champs des deux fichiers (ou tables si on parle de base de données) car en inspectant les deux sources nous avons vu qu'elles avaient un identifiant commun. Le but est de concentrer l'information, chaque fichier présentant des données spécifiques.

    CREATE TABLE arbres_seve_nantes AS SELECT * FROM arbres_nantes LEFT JOIN patrimoine_arbore_nantes
    ON arbres_nantes.identifiant = patrimoine_arbore_nantes.id_map_info;

Nous avons ensuite fait une analyse sur les classes de hauteur

    select DISTINCT hauteur_totale FROM arbres_seve_nantes ORDER BY hauteur_totale asc;

Nous avons constaté que les champs genre et espece n'était pas toujours resneigné et les avons mis à jour avec :

    UPDATE arbres_seve_nantes SET genre = "genre:1" WHERE "genre:1" <> '' AND genre IS NULL;

    UPDATE arbres_seve_nantes SET epithete = espece WHERE espece <> '' AND epithete IS NULL;

Des anomalies sont ressorties

Dans certains cas, le champ `cultivar` est similaire à celui de `contenu nom_spec`
On a quelques cas vides dans `nom_spec` alors que `cultivar` est renseigné.
La `variete` a un contenu similaire à un `cultivar` (à la première majuscule près)

En croisant les trois requêtes SQL

    SELECT DISTINCT variete FROM arbres_seve_nantes ORDER BY variete asc;

    SELECT DISTINCT cultivar FROM arbres_seve_nantes ORDER BY cultivar asc;

    SELECT DISTINCT nom_spec FROM arbres_seve_nantes ORDER BY nom_spec asc;

On constate par exemple, des points commun entre `variete` et `cultivar`

    Fastigiata
    Latifolia
    Purpurea
    Pyramidalis
    Variegata
    Inermis

On a aussi le cas du champ `cultivar` avec une valeur à "vide"

Pour comparer les cas, vous pouvez utiliser la requête suivante:

    SELECT nom_spec, variete, cultivar FROM arbres_seve_nantes
    WHERE nom_spec <> '' OR variete  <> '' OR cultivar <> '';

Nous avons aussi rencontré un problème, deux données prennent les mêmes valeurs alors que dans un cas c'est sensé être la circonférence et dans l'autre le diamètre. Le problème est que le diamètre n'est pas la circonférence car `Circonférence = PI * diamètre`.

On a compté les arbres par quartiers en utilisant les contours quartiers d'OpenStreetMap (script basé sur Node et la bibliothèque Turf.js):

    node points_in_polygons_arbres_quartiers.js

En ouvrant QGIS (un logiciel de cartographie), nous avons constaté que certains arbres ne sont pas dans l'emprise de la ville. On en a 52287 à l'intérieur, 1155 en dehors.

    cut -d ';' -f2 arbres_par_quartiers.txt|awk '{s+=$1} END {print s}'

Le jeu de données final le plus complet est `arbres_seve_nantes.geojson`.

Si vous ne savez pas comment exploiter ce fichier avec les données géographiques, regardez du côté du fichier CSV `arbres_seve_nantes.csv`

## Reste à faire/trancher sur le jeu de données

* Faire un choix sur les  champs `variete`, `cultivar` et `epithete` (issu du scraping donc le nom du champ n'est pas vraiment le "bon") car c'est inconsistant.
* Trancher avec du terrain ou une autre information complémentaire sur le fait qu'une mesure d'un arbre concerne un diamètre ou une circonférence.
