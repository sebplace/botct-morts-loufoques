/*!
 * Le Registre Macabre de Ravenswood Bluff
 * Tables de texte du générateur de récits de mort absurde.
 *
 * Convention d'accord en genre (se rapporte au personnage) :
 *   {e}   -> "" (masc.) / "e" (fém.)      {il} / {Il} -> il / elle
 *   {le}  -> le / la                      {un} -> un / une
 *   {lui} -> lui / elle
 * Entre crochets, l'accord se rapporte à la personne qui a fait exécuter :
 *   [e] -> "" / "e"                       [il] / [Il] -> il / elle
 */
(function (global) {
  "use strict";

  /* ------------------------------------------------------------------ */
  /*  IDENTITÉS DE SECOURS (si aucun prénom n'est saisi)                 */
  /* ------------------------------------------------------------------ */

  const PRENOMS_M = [
    "Aldric", "Ambroise", "Anselme", "Balthazar", "Barnabé", "Cornélius",
    "Corvus", "Dorian", "Edmond", "Eustache", "Faustin", "Grégoire",
    "Hector", "Ignace", "Jasper", "Killian", "Lucien", "Mortimer",
    "Nicodème", "Octave", "Prosper", "Quentin", "Roderick", "Séverin",
    "Silas", "Thaddée", "Ulric", "Valérien", "Wilfrid", "Zacharie"
  ];

  const PRENOMS_F = [
    "Agathe", "Anastasie", "Béatrix", "Bérénice", "Célestine", "Clémence",
    "Delphine", "Élisabeth", "Eudoxie", "Florine", "Gwendoline", "Hortense",
    "Isaure", "Joséphine", "Kassandre", "Léonore", "Marguerite", "Morgane",
    "Nerissa", "Ombeline", "Perpétue", "Philomène", "Rosemonde", "Sidonie",
    "Théodora", "Ursule", "Vespérine", "Wilhelmine", "Ysolde", "Zéphyrine"
  ];

  const EPITHETES_M = [
    "le Meunier", "le Fossoyeur", "le Sonneur de cloches", "le Ferblantier",
    "l'Apothicaire", "le Chandelier", "le Rémouleur", "le Tavernier",
    "le Sacristain", "le Bourrelier", "le Cordier", "le Charbonnier",
    "l'Horloger", "le Passeur", "le Boulanger", "le Bedeau",
    "le Chasse-corbeaux", "le Colporteur", "le Gardien du Puits",
    "le Marchand de bougies", "le Cureur de gouttières", "le Compteur d'heures",
    "le Graisseur d'engrenages", "le Veilleur de nuit"
  ];

  const EPITHETES_F = [
    "la Brodeuse", "la Fossoyeuse", "la Sonneuse de cloches", "la Tavernière",
    "l'Apothicairesse", "la Lavandière", "la Cartomancienne", "la Chandelière",
    "la Boulangère", "la Ravaudeuse", "la Gardienne du Puits",
    "la Marchande de bougies", "la Guérisseuse", "l'Herboriste", "la Fileuse",
    "la Passeuse", "la Verrière", "la Rebouteuse", "la Souffleuse de verre",
    "la Compteuse d'heures", "la Cireuse de cloches", "la Veilleuse de nuit",
    "la Dresseuse de chats", "la Trieuse de lentilles"
  ];

  /* ------------------------------------------------------------------ */
  /*  DÉCOR                                                              */
  /* ------------------------------------------------------------------ */

  const LIEUX = [
    "sur la place du village, à trois pas du puits",
    "dans la taverne du Fou Rieur, entre deux chaises renversées",
    "au pied du beffroi, sous l'aiguille des minutes",
    "dans l'escalier en colimaçon de l'horloge",
    "au fond du puits communal, à sec depuis 1622",
    "derrière l'échoppe de l'Apothicaire, parmi les bocaux",
    "dans la crypte des Fondateurs, porte close de l'intérieur",
    "au moulin, la roue tournant encore à contretemps",
    "dans la bibliothèque, section « poisons — usage domestique »",
    "sous le pont de pierre, côté aval",
    "dans le potager de la Mégère, entre les choux",
    "au cimetière, dans une tombe déjà occupée",
    "dans la grange à foin, à quatre mètres du sol",
    "sur le toit de la boulangerie, les bras en croix",
    "dans le clocher, coincé{e} entre deux cloches",
    "au lavoir, les pieds parfaitement secs",
    "dans la forge éteinte, l'enclume manquante",
    "au bord de l'étang aux grenouilles, désormais silencieux",
    "dans la charrette du Colporteur, sous les étoffes",
    "dans le cellier, derrière quatorze tonneaux",
    "au carrefour des Trois-Corbeaux",
    "dans le confessionnal, du mauvais côté de la grille",
    "au sommet de la colline, face au village, comme en observation",
    "dans le four à pain, heureusement froid",
    "sur le chemin du cimetière, à mi-parcours exactement",
    "dans la cage à poules, la porte fermée au loquet",
    "au milieu de la place, sans que personne n'ait rien entendu"
  ];

  const MOMENTS = [
    "juste avant l'aube",
    "entre le douzième et le treizième coup de l'horloge",
    "au crépuscule, à l'heure où les chauves-souris prennent le relais",
    "à l'instant précis où tout le monde regardait ailleurs",
    "pendant le troisième silence gênant de la journée",
    "au moment où quelqu'un venait de dire « bon, on récapitule »",
    "alors que le coq hésitait encore",
    "à la fin d'une dispute particulièrement mal argumentée",
    "juste après avoir affirmé n'avoir peur de rien",
    "au beau milieu d'une phrase dont la fin manque toujours",
    "à l'heure du bouillon",
    "dans le quart d'heure qui suit toujours les mauvaises décisions",
    "pendant la nuit la plus calme de la semaine",
    "au moment de rouvrir les yeux",
    "pendant la deuxième pluie de la nuit",
    "à l'heure où l'on ne compte plus les heures",
    "un mardi, ce qui n'arrange rien"
  ];

  /* ------------------------------------------------------------------ */
  /*  MORTS NOCTURNES — se placent après « On l'a retrouvé{e} … »        */
  /*  [description, titre de l'affaire]                                  */
  /* ------------------------------------------------------------------ */

  const MANIERES = {
    1: [
      ["parfaitement immobile, les yeux ouverts, sans une seule marque", "L'Affaire du Corps Sans Marque"],
      ["froid{e} depuis plusieurs heures alors qu'{il} parlait encore au dîner", "L'Affaire de l'Heure Manquante"],
      ["vidé{e} de tout son sang, le sol restant immaculé", "L'Affaire du Sol Immaculé"],
      ["avec une expression de compréhension très tardive sur le visage", "L'Affaire de la Révélation Trop Tardive"],
      ["la gorge serrée par une main invisible et fort soignée", "L'Affaire de la Main Absente"],
      ["assis{e} bien droit, comme si la mort avait été polie", "L'Affaire de la Mort Courtoise"],
      ["gelé{e} en plein mois d'août, givre compris", "L'Affaire du Givre d'Août"],
      ["le cœur arrêté net, à la seconde exacte du carillon", "L'Affaire du Carillon Exact"],
      ["couvert{e} d'une cendre tiède venue de nulle part", "L'Affaire de la Cendre Tiède"],
      ["endormi{e} pour de bon, un demi-sourire aux lèvres", "L'Affaire du Demi-Sourire"],
      ["étranglé{e} par son propre foulard, noué en triple nœud marin", "L'Affaire du Triple Nœud"],
      ["mort{e} de peur, littéralement, devant un mur parfaitement vide", "L'Affaire du Mur Vide"]
    ],
    2: [
      ["noyé{e} dans un tonneau de soupe à l'oignon encore tiède", "L'Affaire du Tonneau Tiède"],
      ["écrasé{e} par la cloche du beffroi, tombée pile au douzième coup", "L'Affaire du Douzième Coup"],
      ["empalé{e} sur la girouette, à onze mètres du sol, sans échelle à proximité", "L'Affaire de la Girouette"],
      ["asphyxié{e} par un nuage de farine d'une opacité inexplicable", "L'Affaire du Nuage de Farine"],
      ["piqué{e} par une unique abeille, manifestement rancunière", "L'Affaire de l'Abeille Rancunière"],
      ["enseveli{e} sous quatre cents bougies allumées une par une", "L'Affaire des Quatre Cents Bougies"],
      ["tombé{e} dans un escalier qui ne comptait que deux marches", "L'Affaire des Deux Marches"],
      ["mordu{e} par un chat que personne dans le village ne reconnaît", "L'Affaire du Chat Inconnu"],
      ["étouffé{e} par une miche de pain qu'{il} avait pourtant fait bénir", "L'Affaire de la Miche Bénie"],
      ["foudroyé{e} par un orage strictement local, d'un mètre carré", "L'Affaire de l'Orage Ponctuel"],
      ["retourné{e} comme une chaussette, chaussettes comprises", "L'Affaire des Chaussettes Retournées"],
      ["desséché{e} en une nuit, tel un abricot de très bonne qualité", "L'Affaire de l'Abricot"],
      ["coincé{e} dans les engrenages de l'horloge, désormais à l'heure", "L'Affaire de l'Horloge Enfin Juste"],
      ["victime d'une chute de tabouret d'une violence rare", "L'Affaire du Tabouret Vengeur"],
      ["enfermé{e} dans un coffre verrouillé de l'extérieur et de l'intérieur", "L'Affaire du Double Verrou"],
      ["pris{e} au piège d'une porte qui n'existait pas la veille", "L'Affaire de la Porte Neuve"],
      ["enroulé{e} dans un tapis qu'{il} avait pourtant refusé d'acheter", "L'Affaire du Tapis Insistant"]
    ],
    3: [
      ["battu{e} à mort lors d'un concours de regard fixe contre un corbeau", "L'Affaire du Concours de Regard"],
      ["écrasé{e} par une meule de fromage lancée à contresens dans une rue en pente", "L'Affaire de la Meule Fugueuse"],
      ["expiré{e} après avoir gagné un pari portant sur sa propre espérance de vie", "L'Affaire du Pari Gagné"],
      ["assailli{e} par un troupeau d'oies particulièrement bien organisé", "L'Affaire des Oies Syndiquées"],
      ["coincé{e} dans un troisième placard, après avoir disparu dans un premier et transité par un deuxième", "L'Affaire des Trois Placards"],
      ["mort{e} d'un fou rire déclenché par une remarque que personne n'a entendue", "L'Affaire du Fou Rire Solitaire"],
      ["remplacé{e} par une botte de foin très ressemblante, puis brûlé{e} par mégarde", "L'Affaire de la Botte Ressemblante"],
      ["assassiné{e} par son propre reflet, qui a ensuite pris son quart de garde", "L'Affaire du Reflet Consciencieux"],
      ["enseveli{e} sous une avalanche de lentilles dans un village sans montagne", "L'Affaire de l'Avalanche de Lentilles"],
      ["mort{e} en tentant de prouver qu'{il} tenait en équilibre sur une chèvre", "L'Affaire de la Chèvre d'Équilibre"],
      ["éteint{e} comme une bougie, avec la petite fumée et tout", "L'Affaire de la Petite Fumée"],
      ["dévoré{e} par un ragoût qu'{il} avait pourtant cuisiné {lui}-même", "L'Affaire du Ragoût Ingrat"],
      ["écrabouillé{e} par un piano, dans un village qui n'a jamais vu de piano", "L'Affaire du Piano Inexplicable"],
      ["changé{e} en statue de sel, puis utilisé{e} pour saler la soupe du lendemain", "L'Affaire de la Soupe Salée"],
      ["mort{e} de honte après une remarque d'une justesse insoutenable", "L'Affaire de la Honte Fatale"],
      ["percuté{e} de plein fouet par une porte de grange lâchée par le vent, deux fois", "L'Affaire de la Porte Récidiviste"],
      ["étouffé{e} sous les pétales d'un bouquet anonyme et curieusement volumineux", "L'Affaire du Bouquet Anonyme"],
      ["emporté{e} par un courant d'air qu'on entend encore certaines nuits", "L'Affaire du Courant d'Air Persistant"],
      ["mort{e} en expliquant pour la septième fois qu'{il} avait bien fermé la porte", "L'Affaire de la Septième Explication"],
      ["victime d'un accident de brouette d'une improbabilité mathématique", "L'Affaire de la Brouette Improbable"],
      ["piétiné{e} par un unique mouton, mais avec beaucoup de conviction", "L'Affaire du Mouton Convaincu"],
      ["tombé{e} du lit, d'une hauteur pourtant très raisonnable", "L'Affaire de la Chute Raisonnable"],
      ["enterré{e} sous une pile de linge propre, plié par ses soins", "L'Affaire du Linge Bien Plié"]
    ],
    4: [
      ["déclaré{e} mort{e} à main levée, puis contraint{e} de s'y conformer", "L'Affaire du Décès Démocratique"],
      ["supprimé{e} rétroactivement : {il} n'a jamais existé, mais {il} est quand même mort{e}", "L'Affaire de l'Inexistence Fatale"],
      ["écrasé{e} sous le poids d'une métaphore devenue soudainement littérale", "L'Affaire de la Métaphore Lourde"],
      ["mort{e} d'avoir lu sa propre notice nécrologique avec deux jours d'avance", "L'Affaire de la Nécrologie Prématurée"],
      ["dilué{e} dans un bain de camomille, pour des raisons qui demeurent obscures", "L'Affaire de la Camomille Corrosive"],
      ["cueilli{e} par une main immense descendue du plafond", "L'Affaire de la Main du Plafond"],
      ["replié{e} soigneusement en huit et rangé{e} dans un tiroir de la sacristie", "L'Affaire du Tiroir Bien Rangé"],
      ["remplacé{e} par un silence de la même taille et du même poids", "L'Affaire du Silence Équivalent"],
      ["mort{e} d'une cause si absurde que personne n'ose la prononcer à voix haute", "L'Affaire Innommable"],
      ["converti{e} en horaire : il est désormais 17 h 40 en permanence dans le village", "L'Affaire de Dix-Sept Heures Quarante"],
      ["aspiré{e} par le trou d'une serrure qu'{il} n'aurait jamais dû regarder", "L'Affaire de la Serrure Gourmande"],
      ["victime d'un malentendu grammatical aux conséquences irréversibles", "L'Affaire du Subjonctif Fatal"],
      ["éliminé{e} par un règlement intérieur affiché depuis toujours et jamais lu", "L'Affaire du Règlement Affiché"],
      ["mort{e} pendant la lecture de cette phrase, ce qui complique un peu l'enquête", "L'Affaire de la Phrase En Cours"],
      ["décomposé{e} en trois personnes distinctes, toutes décédées séparément", "L'Affaire de la Division en Trois"],
      ["renvoyé{e} à la fabrique, défaut de conception constaté beaucoup trop tard", "L'Affaire du Retour en Usine"],
      ["confondu{e} avec le mobilier, dépoussiéré{e}, puis vendu{e} aux enchères", "L'Affaire du Mobilier Vendu"],
      ["emporté{e} par une overdose de certitude", "L'Affaire de la Certitude Absolue"],
      ["effacé{e} du registre par une rature, puis du monde par cohérence", "L'Affaire de la Rature Zélée"],
      ["mort{e} d'une faute de frappe dans son propre nom", "L'Affaire de la Coquille Mortelle"]
    ]
  };

  /* ------------------------------------------------------------------ */
  /*  EXÉCUTIONS — se placent après « {Il} a fini … »                    */
  /* ------------------------------------------------------------------ */

  const MODES_EXECUTION = {
    1: [
      ["pendu{e} au vieux chêne, proprement, sans un mot de trop", "L'Exécution Impeccable"],
      ["pendu{e} à un chêne qui a vu passer quatre-vingts innocents et deux coupables", "L'Exécution du Chêne Statisticien"],
      ["exécuté{e} au gibet communal, à l'heure dite, selon la coutume", "L'Exécution Réglementaire"],
      ["exécuté{e} sur la foi d'une intuition et d'un regard légèrement fuyant", "L'Exécution du Regard Fuyant"],
      ["exécuté{e} pour avoir gardé le silence au pire moment possible", "L'Exécution du Silence Mal Placé"],
      ["précipité{e} du haut du beffroi, d'une poussée presque respectueuse", "L'Exécution du Beffroi"],
      ["exécuté{e} dans un silence si dense qu'on entendait la corde réfléchir", "L'Exécution Silencieuse"],
      ["exécuté{e} devant l'assemblée entière, qui a tenu à rester jusqu'au bout", "L'Exécution Assidue"],
      ["exécuté{e} au lever du soleil, tout le monde ayant tenu à faire les choses dignement", "L'Exécution à l'Aube"]
    ],
    2: [
      ["poussé{e} dans le puits communal, avec un « plouf » d'une banalité décevante", "L'Exécution du Plouf Décevant"],
      ["exécuté{e} après avoir crié « je n'ai rien fait ! » d'un ton un peu trop enthousiaste", "L'Exécution de l'Enthousiasme Suspect"],
      ["pendu{e} à une corde empruntée au Cordier, qui a exigé de la récupérer ensuite", "L'Exécution de la Corde Prêtée"],
      ["exécuté{e} à la troisième tentative, les deux premières ayant échoué pour raisons techniques", "L'Exécution en Trois Essais"],
      ["écrasé{e} sous la cloche du beffroi, descendue spécialement pour l'occasion", "L'Exécution sous la Cloche"],
      ["exécuté{e} par le Bourrelier, qui n'avait jamais fait ça et a beaucoup transpiré", "L'Exécution de l'Amateur"],
      ["enterré{e} sous les huées, avant même la fin de la procédure", "L'Exécution Anticipée"],
      ["exécuté{e} avec une solennité gâchée par un fou rire au premier rang", "L'Exécution Gâchée"],
      ["pendu{e} à une branche qui a cédé, puis à une autre, plus sérieuse", "L'Exécution de la Deuxième Branche"]
    ],
    3: [
      ["catapulté{e} par-dessus la colline à l'aide d'une charrette et d'un tas de foin", "L'Exécution Balistique"],
      ["noyé{e} dans le tonneau de soupe du banquet annuel, désormais annulé", "L'Exécution du Banquet Annulé"],
      ["piétiné{e} par la fanfare du village, entrée au mauvais moment", "L'Exécution en Fanfare"],
      ["exécuté{e} par une foule qui s'y est reprise à quinze, chacun tirant dans son sens", "L'Exécution Collective et Désordonnée"],
      ["enfermé{e} dans le four à pain avec une miche, dont la cuisson fut parfaite", "L'Exécution Boulangère"],
      ["poussé{e} du haut du moulin, puis ramené{e} par la roue, puis repoussé{e}", "L'Exécution en Boucle"],
      ["exécuté{e} par un jury d'oies, désignées à la courte paille", "L'Exécution Ansérine"],
      ["pendu{e} par les bretelles à la girouette, qui a tourné toute la nuit", "L'Exécution Girouette"],
      ["exécuté{e} sous une avalanche de choux lancés depuis le potager de la Mégère", "L'Exécution Maraîchère"],
      ["exécuté{e} à l'ancienne, c'est-à-dire d'une manière que plus personne ne sait reproduire", "L'Exécution à l'Ancienne"],
      ["écrasé{e} par le buste du Fondateur, descellé par l'enthousiasme général", "L'Exécution du Fondateur"],
      ["exécuté{e} deux fois, tout le monde ayant perdu le compte après la première", "L'Exécution en Double"]
    ],
    4: [
      ["exécuté{e} sans corde, sans arme et sans contact : la décision a suffi", "L'Exécution Purement Théorique"],
      ["rayé{e} du registre communal, ce qui s'est avéré parfaitement suffisant", "L'Exécution Administrative"],
      ["exécuté{e} rétroactivement à la nuit précédente, pour gagner du temps", "L'Exécution Rétroactive"],
      ["exécuté{e} en vertu d'un règlement rédigé le matin même et jamais relu depuis", "L'Exécution Réglementaire au Sens Strict"],
      ["plié{e} en quatre, tamponné{e}, et classé{e} au rayon des affaires closes", "L'Exécution Classée Sans Suite"],
      ["exécuté{e} par un accord si unanime que la réalité n'a pas osé contredire", "L'Exécution par Consensus"],
      ["exécuté{e} sur parole, tout le monde ayant décidé de se croire sur parole", "L'Exécution sur Parole"],
      ["remplacé{e} par une chaise vide, à laquelle chacun a continué de parler", "L'Exécution Mobilière"],
      ["exécuté{e} par une phrase prononcée au conditionnel passé, ce qui a suffi", "L'Exécution Grammaticale"],
      ["exécuté{e} après une annulation, une réinstauration et un très long débat de procédure", "L'Exécution par Acquit de Conscience"]
    ]
  };

  /* ------------------------------------------------------------------ */
  /*  LE DÉTAIL QUI CLÔT L'HISTOIRE                                      */
  /* ------------------------------------------------------------------ */

  const DETAILS = [
    "On a retrouvé ses chaussures à quatre cents mètres, soigneusement rangées et orientées plein nord.",
    "Toutes les bougies de la pièce étaient allumées. Il ne restait plus une seule allumette au village.",
    "L'horloge du beffroi indiquait la bonne heure pour la première fois depuis dix-sept ans.",
    "Un unique bouton de manchette manquait. {Il} n'en avait jamais porté.",
    "Les chats du village ont tous fixé le même mur pendant vingt minutes, puis ont repris leur journée.",
    "Le carnet du fossoyeur portait déjà son nom, écrit trois jours plus tôt, de sa propre main.",
    "On a compté treize couverts à table. Il y avait douze convives.",
    "Sa tasse était encore chaude. La théière, elle, était froide depuis la veille.",
    "Une empreinte de pied nu, parfaitement sèche, traversait la flaque de pluie.",
    "Le chien du Tavernier, qui aboie sur tout, n'a pas aboyé cette nuit-là.",
    "Quelqu'un avait replié sa couverture au carré, avec une précision toute militaire.",
    "Le miroir de sa chambre reflétait la pièce, mais pas la porte.",
    "Trois graines de tournesol formaient un triangle parfait à côté de sa main.",
    "Les cloches ont sonné un coup de trop. Personne n'a osé le mentionner à voix haute.",
    "Le vin de la cave avait tourné au vinaigre, sauf dans un seul tonneau, scellé.",
    "Sur la vitre embuée, on pouvait lire un mot dans une langue que personne ne parle ici.",
    "Sa montre s'est arrêtée à 3 h 33, comme celle des quatre précédents.",
    "Le pain du jour est sorti du four déjà rassis.",
    "Quatorze corbeaux étaient alignés sur le faîtage, parfaitement équidistants.",
    "Le sol sous le corps était parfaitement sec, alors qu'il pleuvait depuis l'aube.",
    "Sa main droite désignait quelqu'un. Ce quelqu'un a déménagé deux jours plus tard.",
    "Le registre paroissial comportait une page arrachée, à la date exacte de sa naissance.",
    "Toutes les portes de la maison étaient verrouillées de l'intérieur. Les clés étaient dans le puits.",
    "Une odeur de bougie éteinte flottait dans la pièce, alors qu'aucune n'avait été allumée.",
    "Son fauteuil était encore chaud, mais {il} est mort{e} debout, à trois mètres de là.",
    "Le sablier avait été retourné une dernière fois par une main très patiente.",
    "Sept grains de sel formaient une ligne devant le seuil. Le huitième manquait.",
    "Quelqu'un avait éteint la lanterne du perron, l'avait rallumée, puis avait renoncé.",
    "Le lendemain, la soupe avait un goût que personne n'a su nommer.",
    "Les grenouilles de l'étang se sont tues pendant exactement quarante minutes."
  ];

  /* ------------------------------------------------------------------ */
  /*  OUVERTURES                                                         */
  /*  {nom} = le prénom · {role} = « , le Fossoyeur, » · {acc} = l'autre  */
  /* ------------------------------------------------------------------ */

  const OUVERTURES_NUIT = [
    "{nom}{role} s'est couché{e} ce soir-là avec la satisfaction tranquille de qui croit avoir tout compris.",
    "Personne n'aurait parié sur {nom}{role} pour la mauvaise surprise de cette nuit-là.",
    "{nom}{role} avait passé la journée à parler. C'était, avec le recul, une stratégie discutable.",
    "La dernière personne à avoir vu {nom}{role} vivant{e} jure qu'{il} avait l'air parfaitement serein{e}.",
    "{nom}{role} a soufflé sa chandelle un peu plus tôt que d'habitude. On ne saura jamais pourquoi.",
    "Il faisait doux, ce soir-là, et {nom}{role} avait décidé de ne s'inquiéter de rien.",
    "{nom}{role} s'était fait une promesse : demain, {il} dirait enfin tout ce qu'{il} savait.",
    "Le village s'est endormi rassuré. {nom}{role} s'est endormi{e} tout court.",
    "{nom}{role} avait survécu à trois nuits et commençait à trouver ça facile.",
    "On raconte que {nom}{role} a entendu quelque chose, cette nuit-là, et a préféré se rendormir.",
    "{nom}{role} avait verrouillé sa porte, sa fenêtre et son coffre. Cela n'a servi à rien du tout.",
    "Tout allait bien pour {nom}{role} jusqu'à environ deux heures du matin."
  ];

  const OUVERTURES_JOUR = [
    "Le jour s'est levé sur un village d'humeur décisive. {acc} s'est levé[e] en même temps que lui, et a désigné {nom}{role}.",
    "Il aura fallu moins de deux minutes. {acc} s'est raclé la gorge, a montré {nom}{role} du doigt, et tout le monde a hoché la tête.",
    "{acc} avait préparé son petit discours la veille au soir. [Il] l'a servi avec la précision d'un notaire, et {nom}{role} n'a pas eu le temps de répondre.",
    "Personne ne voulait commencer. {acc} a fini par s'y résoudre, et c'est sur {nom}{role} que le doigt s'est arrêté.",
    "La journée avait pourtant bien commencé, jusqu'à ce que {acc} prononce le nom de {nom}{role} d'une voix un peu trop forte.",
    "{acc} a précisé qu'[il] ne le faisait pas de gaieté de cœur. Puis [il] a désigné {nom}{role} quand même.",
    "Le village tournait en rond depuis une heure. {acc} a tranché en montrant {nom}{role}, ce qui a eu le mérite de faire avancer la journée.",
    "On a d'abord cru à une plaisanterie. Puis {acc} a répété le nom de {nom}{role}, plus lentement, et plus personne n'a ri.",
    "{acc} n'avait aucune preuve, aucun argument et aucun doute. {nom}{role} a été désigné{e} avant même d'avoir posé sa tasse."
  ];

  /* ------------------------------------------------------------------ */
  /*  AMORCES POUR L'IDÉE DU JOUEUR                                      */
  /* ------------------------------------------------------------------ */

  const AMORCES_IDEE = [
    "Ce qu'{il} n'avait dit à personne :",
    "Il y avait une chose qu'{il} gardait pour {lui} :",
    "Un détail que le village ignorait :",
    "Restait ce point, que personne n'a pensé à vérifier :",
    "Et puis il y avait cela, qui change tout ou rien :",
    "Le dossier ne mentionne qu'une fois ce détail :",
    "Une dernière chose, notée en marge du registre :"
  ];

  const AMORCES_IDEE_JOUR = [
    "Tout est parti de là :",
    "Le village n'a retenu que cela :",
    "Un détail a beaucoup circulé ce jour-là :",
    "Il faut dire qu'il y avait ce précédent :",
    "Quelqu'un a rappelé, au pire moment :",
    "On lui a surtout reproché cela :"
  ];

  /** Suites de l'idée, pour enchaîner sans lourdeur. */
  const SUITES_IDEE = {
    nuit: [
      "Cela n'a servi strictement à rien.",
      "Personne n'a jamais su pourquoi.",
      "Le village n'en a rien su, et n'en saura jamais rien.",
      "Avec le recul, ce n'était peut-être pas une bonne idée.",
      "Ce détail n'a sauvé personne."
    ],
    jour: [
      "Le village en a fait tout un dossier.",
      "Cela a suffi.",
      "Personne n'a demandé de précisions.",
      "L'argument a paru excellent sur le moment.",
      "Il n'en fallait pas davantage."
    ]
  };

  /* ------------------------------------------------------------------ */
  /*  RÔLES — noms officiels, uniquement pour la liste déroulante         */
  /*  (traduction publiée par TPI : botc-translations, game/fr.json)      */
  /* ------------------------------------------------------------------ */

  const ROLES = [
    /* Trouble Brewing */
    { id: "lavandiere", nom: "Lavandière", art: "la", type: "village", script: "tb" },
    { id: "archiviste", nom: "Archiviste", art: "l'", type: "village", script: "tb" },
    { id: "detective", nom: "Détective", art: "le", type: "village", script: "tb" },
    { id: "cuisinier", nom: "Cuisinier", art: "le", type: "village", script: "tb" },
    { id: "empathe", nom: "Empathe", art: "l'", type: "village", script: "tb" },
    { id: "voyante", nom: "Voyante", art: "la", type: "village", script: "tb" },
    { id: "fossoyeur", nom: "Fossoyeur", art: "le", type: "village", script: "tb" },
    { id: "moine", nom: "Moine", art: "le", type: "village", script: "tb" },
    { id: "corneille", nom: "Corneille", art: "la", type: "village", script: "tb" },
    { id: "immaculee", nom: "Immaculée", art: "l'", type: "village", script: "tb" },
    { id: "pourfendeuse", nom: "Pourfendeuse", art: "la", type: "village", script: "tb" },
    { id: "soldat", nom: "Soldat", art: "le", type: "village", script: "tb" },
    { id: "maire", nom: "Maire", art: "le", type: "village", script: "tb" },
    { id: "majordome", nom: "Majordome", art: "le", type: "marginal", script: "tb" },
    { id: "ivrogne", nom: "Ivrogne", art: "l'", type: "marginal", script: "tb" },
    { id: "recluse", nom: "Recluse", art: "la", type: "marginal", script: "tb" },
    { id: "saint", nom: "Saint", art: "le", type: "marginal", script: "tb" },
    { id: "empoisonneur", nom: "Empoisonneur", art: "l'", type: "sbire", script: "tb" },
    { id: "espionne", nom: "Espionne", art: "l'", type: "sbire", script: "tb" },
    { id: "femme-ecarlate", nom: "Femme écarlate", art: "la", type: "sbire", script: "tb" },
    { id: "baron", nom: "Baron", art: "le", type: "sbire", script: "tb" },
    { id: "diablotin", nom: "Diablotin", art: "le", type: "demon", script: "tb" },

    /* Bad Moon Rising */
    { id: "grand-mere", nom: "Grand-mère", art: "la", type: "village", script: "bmr" },
    { id: "marin", nom: "Marin", art: "le", type: "village", script: "bmr" },
    { id: "femme-de-chambre", nom: "Femme de chambre", art: "la", type: "village", script: "bmr" },
    { id: "exorciste", nom: "Exorciste", art: "l'", type: "village", script: "bmr" },
    { id: "aubergiste", nom: "Aubergiste", art: "l'", type: "village", script: "bmr" },
    { id: "parieur", nom: "Parieur", art: "le", type: "village", script: "bmr" },
    { id: "commere", nom: "Commère", art: "la", type: "village", script: "bmr" },
    { id: "courtisan", nom: "Courtisan", art: "le", type: "village", script: "bmr" },
    { id: "professeur", nom: "Professeur", art: "le", type: "village", script: "bmr" },
    { id: "menestrel", nom: "Ménestrel", art: "le", type: "village", script: "bmr" },
    { id: "tisaniere", nom: "Tisanière", art: "la", type: "village", script: "bmr" },
    { id: "pacifiste", nom: "Pacifiste", art: "le", type: "village", script: "bmr" },
    { id: "fou-du-roi", nom: "Fou du roi", art: "le", type: "village", script: "bmr" },
    { id: "bricoleur", nom: "Bricoleur", art: "le", type: "marginal", script: "bmr" },
    { id: "selenite", nom: "Sélénite", art: "le", type: "marginal", script: "bmr" },
    { id: "gros-bras", nom: "Gros bras", art: "le", type: "marginal", script: "bmr" },
    { id: "lunatique", nom: "Lunatique", art: "le", type: "marginal", script: "bmr" },
    { id: "parrain", nom: "Parrain", art: "le", type: "sbire", script: "bmr" },
    { id: "avocat-du-diable", nom: "Avocat du diable", art: "l'", type: "sbire", script: "bmr" },
    { id: "assassin", nom: "Assassin", art: "l'", type: "sbire", script: "bmr" },
    { id: "conspirateur", nom: "Conspirateur", art: "le", type: "sbire", script: "bmr" },
    { id: "zombuul", nom: "Zombuul", art: "le", type: "demon", script: "bmr" },
    { id: "pukka", nom: "Pukka", art: "le", type: "demon", script: "bmr" },
    { id: "shabaloth", nom: "Shabaloth", art: "le", type: "demon", script: "bmr" },
    { id: "po", nom: "Po", art: "le", type: "demon", script: "bmr" },

    /* Sects & Violets */
    { id: "horloger", nom: "Horloger", art: "l'", type: "village", script: "sv" },
    { id: "reveur", nom: "Rêveur", art: "le", type: "village", script: "sv" },
    { id: "charmeur", nom: "Charmeur de serpents", art: "le", type: "village", script: "sv" },
    { id: "mathematicien", nom: "Mathématicien", art: "le", type: "village", script: "sv" },
    { id: "fleuriste", nom: "Fleuriste", art: "la", type: "village", script: "sv" },
    { id: "crieur", nom: "Crieur public", art: "le", type: "village", script: "sv" },
    { id: "oracle", nom: "Oracle", art: "l'", type: "village", script: "sv" },
    { id: "savant", nom: "Savant", art: "le", type: "village", script: "sv" },
    { id: "couturiere", nom: "Couturière", art: "la", type: "village", script: "sv" },
    { id: "philosophe", nom: "Philosophe", art: "le", type: "village", script: "sv" },
    { id: "artiste", nom: "Artiste", art: "l'", type: "village", script: "sv" },
    { id: "jongleur", nom: "Jongleur", art: "le", type: "village", script: "sv" },
    { id: "sage", nom: "Sage", art: "le", type: "village", script: "sv" },
    { id: "barbier", nom: "Barbier", art: "le", type: "marginal", script: "sv" },
    { id: "maladroit", nom: "Maladroit", art: "le", type: "marginal", script: "sv" },
    { id: "bete-de-foire", nom: "Bête de foire", art: "la", type: "marginal", script: "sv" },
    { id: "dulcinee", nom: "Dulcinée", art: "la", type: "marginal", script: "sv" },
    { id: "jumelle", nom: "Jumelle maléfique", art: "la", type: "sbire", script: "sv" },
    { id: "sorciere", nom: "Sorcière", art: "la", type: "sbire", script: "sv" },
    { id: "cerenovus", nom: "Cerenovus", art: "le", type: "sbire", script: "sv" },
    { id: "guenaude", nom: "Guenaude", art: "la", type: "sbire", script: "sv" },
    { id: "fang-gu", nom: "Fang Gu", art: "le", type: "demon", script: "sv" },
    { id: "vigormortis", nom: "Vigormortis", art: "le", type: "demon", script: "sv" },
    { id: "no-dashii", nom: "No Dashii", art: "le", type: "demon", script: "sv" },
    { id: "vortox", nom: "Vortox", art: "le", type: "demon", script: "sv" },

    /* Expérimental */
    { id: "golem", nom: "Golem", art: "le", type: "marginal", script: "exp" },
    { id: "demoiselle", nom: "Demoiselle", art: "la", type: "marginal", script: "exp" },
    { id: "politicien", nom: "Politicien", art: "le", type: "marginal", script: "exp" },
    { id: "heretique", nom: "Hérétique", art: "l'", type: "marginal", script: "exp" },
    { id: "psychopathe", nom: "Psychopathe", art: "le", type: "sbire", script: "exp" },
    { id: "legion", nom: "Légion", art: "la", type: "demon", script: "exp" },
    { id: "leviathan", nom: "Léviathan", art: "le", type: "demon", script: "exp" },
    { id: "emeute", nom: "Émeute", art: "l'", type: "demon", script: "exp" },
    { id: "al-hadikhia", nom: "Al-Hadikhia", art: "l'", type: "demon", script: "exp" },
    { id: "timonstre", nom: "Timonstre", art: "le", type: "demon", script: "exp" },
    { id: "kazali", nom: "Kazali", art: "le", type: "demon", script: "exp" },
    { id: "yaggablabla", nom: "Yaggablabla", art: "le", type: "demon", script: "exp" },
    { id: "ojo", nom: "Ojo", art: "l'", type: "demon", script: "exp" },
    { id: "parasyte", nom: "Parasyte", art: "le", type: "demon", script: "exp" },
    { id: "typhon", nom: "Seigneur de Typhon", art: "le", type: "demon", script: "exp" }
  ];

  const SCRIPTS = {
    tb: { nom: "Trouble Brewing", court: "TB" },
    bmr: { nom: "Bad Moon Rising", court: "BMR" },
    sv: { nom: "Sects & Violets", court: "S&V" },
    exp: { nom: "Expérimental", court: "EXP" }
  };

  const TYPES = {
    village: "Villageois",
    marginal: "Marginaux",
    sbire: "Sbires",
    demon: "Démons"
  };

  const CHAOS_LABELS = {
    1: "Gothique sobre",
    2: "Franchement étrange",
    3: "Complètement loufoque",
    4: "Absurdité totale"
  };

  global.LORE = {
    PRENOMS_M, PRENOMS_F, EPITHETES_M, EPITHETES_F,
    LIEUX, MOMENTS, MANIERES, MODES_EXECUTION, DETAILS,
    OUVERTURES_NUIT, OUVERTURES_JOUR,
    AMORCES_IDEE, AMORCES_IDEE_JOUR, SUITES_IDEE,
    ROLES, SCRIPTS, TYPES, CHAOS_LABELS
  };
})(window);
