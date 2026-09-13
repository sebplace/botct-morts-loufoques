/*!
 * Le Registre Macabre de Ravenswood Bluff — Raconte ta mort
 *
 * Chaque mort est une scène écrite de bout en bout : « avant » pose la situation,
 * « mort » raconte l'enchaînement, le mécanisme et ce qu'on a retrouvé.
 *
 * Accords qui se rapportent au personnage, entre accolades :
 *   {e} -> "" / "e"      {il} / {Il} -> il / elle
 *   {le} -> le / la      {un} -> un / une        {lui} -> lui / elle
 * Accords qui se rapportent à la personne qui l'a fait exécuter, entre crochets :
 *   [e] -> "" / "e"      [il] / [Il] -> il / elle
 *
 * {nom} est remplacé par le prénom ; la première occurrence porte le rôle.
 * {acc} est remplacé par le nom de l'accusateur.
 */
(function (global) {
  "use strict";

  /* ------------------------------------------------------------------ */
  /*  PRÉNOMS DE SECOURS                                                 */
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

  /* ================================================================== */
  /*  MORTS NOCTURNES                                                    */
  /* ================================================================== */

  const NUIT = [
    /* ---------------------- niveau 1 : sobre ---------------------- */
    {
      titre: "L'Affaire de la Chandelle",
      niveau: 1,
      avant: "{nom} a soufflé sa chandelle à dix heures, comme chaque soir depuis vingt-deux ans.",
      mort: "À dix heures et une minute, la chandelle s'est rallumée toute seule. À dix heures deux, elle s'est éteinte de nouveau, et {nom} avec elle. Au matin, la mèche était encore tiède et {le} propriétaire tout à fait froid{e} — dans cet ordre, d'après l'apothicaire, ce qui n'arrange rien."
    },
    {
      titre: "L'Affaire du Miroir du Couloir",
      niveau: 1,
      avant: "{nom} s'est levé{e} vers trois heures pour boire un verre d'eau et s'est arrêté{e} devant le miroir du couloir.",
      mort: "Le miroir reflétait le couloir, la lanterne, la porte du fond : tout, sauf {lui}. {Il} a eu le temps de se retourner pour vérifier qu'{il} était bien là. {Il} n'y était déjà plus. Le verre d'eau était encore plein le lendemain, posé sur la console, sans une trace de doigt."
    },
    {
      titre: "L'Affaire du Givre d'Août",
      niveau: 1,
      avant: "La nuit du 14 août a été la plus chaude de l'année, et {nom} avait laissé sa fenêtre grande ouverte.",
      mort: "Au matin, la chambre était couverte de trois centimètres de givre et {nom} assis{e} au milieu, dans son fauteuil, les mains posées bien à plat sur les accoudoirs. Le givre s'arrêtait net au seuil de la porte, en ligne droite. Il a fondu à midi, la chambre était sèche à une heure, et il n'est rien resté à montrer à personne."
    },
    {
      titre: "L'Affaire du Treizième Coup",
      niveau: 1,
      avant: "{nom} réglait sa montre sur l'horloge du beffroi tous les soirs, avec un sérieux qui faisait sourire le village.",
      mort: "Cette nuit-là, l'horloge a sonné ses douze coups habituels, puis un treizième. {nom} s'est arrêté{e} au treizième : le cœur, la montre et la respiration ensemble. Les trois indiquaient exactement la même heure, et on n'a jamais pu remonter la montre depuis."
    },
    {
      titre: "L'Affaire de la Porte Verrouillée",
      niveau: 1,
      avant: "Le Tavernier a entendu {nom} tousser à travers la cloison, vers deux heures. Puis plus rien du tout.",
      mort: "On a défoncé la porte au matin. {nom} était assis{e} sur son lit, avec la marque de cinq doigts sur la gorge, très nette, presque soignée. La porte était verrouillée de l'intérieur, la clé encore dans la serrure, et la fenêtre bloquée par la peinture depuis l'automne. On a reposé la porte le soir même, faute de mieux à faire."
    },
    {
      titre: "L'Affaire du Mur Vide",
      niveau: 1,
      avant: "Un bruit dans la cloison a réveillé {nom} vers une heure. {Il} a fait ce que tout le monde fait : {il} a allumé une bougie et regardé le mur.",
      mort: "Le mur était vide. Parfaitement vide, parfaitement lisse, parfaitement ordinaire. {Il} est mort{e} de peur devant, debout, sans une marque, la bougie encore à la main. Personne n'a jamais su ce qu'{il} avait vu dedans, et personne n'a proposé d'aller regarder."
    },
    {
      titre: "L'Affaire de la Seconde Tasse",
      niveau: 1,
      avant: "{nom} attendait quelqu'un ce soir-là : deux tasses sorties, deux chaises tirées, la théière préparée à l'avance.",
      mort: "On l'a trouvé{e} assis{e} bien droit, la tasse à mi-hauteur, un sourire poli figé sur le visage. La seconde tasse était vide et encore chaude. Personne au village ne se souvient d'avoir été invité, et les deux chaises étaient rangées sous la table."
    },

    /* ---------------------- niveau 2 : étrange -------------------- */
    {
      titre: "L'Affaire du Tonneau Tiède",
      niveau: 2,
      avant: "Vers minuit, {nom} est descendu{e} à la cave vérifier un bruit qu'{il} était seul{e} à avoir entendu.",
      mort: "L'escalier n'avait plus que deux marches sur sept, la lanterne s'est éteinte à la troisième absente, et le tonneau de soupe à l'oignon du banquet de dimanche était resté ouvert, encore tiède. {nom} savait nager. Cela n'a servi à rien : on ne nage pas dans la soupe, on s'y enfonce. On l'a repêché{e} au matin, parfaitement assaisonné{e}."
    },
    {
      titre: "L'Affaire du Douzième Coup",
      niveau: 2,
      avant: "{nom} rentrait par la place, comme tous les soirs, en passant sous le beffroi.",
      mort: "La grosse cloche s'est décrochée pile au douzième coup — pas avant, pas après. Elle est tombée droit, sans érafler un seul pavé autour. Il a fallu six hommes et deux mules pour la soulever, et {nom} était dessous, avec une expression de très grande surprise."
    },
    {
      titre: "L'Affaire de la Girouette",
      niveau: 2,
      avant: "Personne ne sait ce que {nom} faisait sur le toit de l'église à quatre heures du matin. {Il} n'avait pas d'échelle.",
      mort: "{Il} est retombé{e} de onze mètres, exactement sur la girouette, qui l'a traversé{e} de part en part sans cesser de tourner. Le vent était faible cette nuit-là. Elle a tourné quand même, jusqu'au matin, avec {lui} dessus, et personne n'a osé la décrocher avant l'arrivée du Bedeau."
    },
    {
      titre: "L'Affaire du Nuage de Farine",
      niveau: 2,
      avant: "{nom} s'était levé{e} avant le jour pour aider à la boulangerie, ce qu'{il} faisait deux fois par semaine sans jamais se plaindre.",
      mort: "Un sac de farine s'est éventré au-dessus du pétrin. Un seul sac. Le nuage a rempli la pièce comme l'eau remplit un seau et a mis quatre heures à retomber. Quand on a pu entrer, {nom} était couvert{e} de blanc des cheveux aux souliers, debout contre le four, et tout à fait mort{e}."
    },
    {
      titre: "L'Affaire de l'Abeille Rancunière",
      niveau: 2,
      avant: "En août, {nom} avait enfumé un nid d'abeilles sous l'avant-toit. Une seule avait survécu.",
      mort: "Elle a attendu novembre. Elle est entrée par la cheminée, a traversé deux pièces, et l'a piqué{e} une fois, au creux du cou, pendant son sommeil. On l'a retrouvée morte à côté, sur l'oreiller, les pattes repliées, l'air de quelqu'un qui a fini sa journée."
    },
    {
      titre: "L'Affaire des Quatre Cents Bougies",
      niveau: 2,
      avant: "{nom} avait peur du noir depuis l'enfance et gardait toujours une bougie allumée près du lit.",
      mort: "Cette nuit-là il y en avait quatre cents, alignées sur le plancher, les meubles et le rebord des fenêtres, allumées une par une. {Il} n'en possédait pas dix. Aucune n'a mis le feu à quoi que ce soit : elles ont simplement brûlé jusqu'au bout, autour de {lui}, jusqu'à ce qu'il ne reste plus de cire, plus d'air, et plus personne."
    },
    {
      titre: "L'Affaire des Deux Marches",
      niveau: 2,
      avant: "L'escalier de cave de {nom} compte deux marches. Deux. Tout le village peut en témoigner.",
      mort: "{Il} est tombé{e} dedans pendant onze minutes, d'après le Sonneur de cloches qui l'a entendu{e} rebondir depuis la rue. On l'a récupéré{e} tout au fond, quatre mètres plus bas que la cave elle-même, dans un trou que personne n'a su expliquer. On a rebouché le trou. L'escalier compte toujours deux marches."
    },
    {
      titre: "L'Affaire du Chat Inconnu",
      niveau: 2,
      avant: "Un chat gris, très propre, que personne au village n'a jamais vu, est entré chez {nom} par la fenêtre de la cuisine vers une heure.",
      mort: "{Il} lui a donné du lait, évidemment. Le chat l'a mordu{e} une fois à la main, puis est ressorti par où il était venu. La morsure faisait deux millimètres. {nom} est mort{e} avant l'aube. Le lait est resté dans la soucoupe trois jours sans jamais tourner."
    },
    {
      titre: "L'Affaire de la Miche Bénie",
      niveau: 2,
      avant: "{nom} avait fait bénir son pain, par précaution, parce que la semaine avait été étrange.",
      mort: "{Il} s'est étouffé{e} avec, seul{e}, à sa table, un mardi soir, sur un morceau de la taille d'une noix. La bénédiction avait été faite le matin même, en bonne et due forme. Le Bedeau, interrogé, a préféré ne faire aucun commentaire."
    },
    {
      titre: "L'Affaire de l'Orage d'un Mètre Carré",
      niveau: 2,
      avant: "Il n'avait pas plu de la semaine. Ciel dégagé, lune pleine, et {nom} qui rentrait par le chemin du lavoir.",
      mort: "Un nuage d'environ un mètre carré s'est formé à trois mètres au-dessus de {lui} et l'a foudroyé{e} une fois, proprement. Le nuage s'est dissipé aussitôt après. L'herbe tout autour était parfaitement sèche, ses semelles avaient fondu, et sa casquette a été retrouvée dans un arbre à deux cents mètres de là."
    },
    {
      titre: "L'Affaire du Double Verrou",
      niveau: 2,
      avant: "{nom} gardait ses économies dans un coffre de chêne, au pied de son lit, et vérifiait le cadenas chaque soir.",
      mort: "On l'a retrouvé{e} à l'intérieur, plié{e} en deux, le couvercle rabattu. Le coffre était verrouillé de l'extérieur, ce qui se comprend, et de l'intérieur, ce qui se comprend beaucoup moins. Les deux clés étaient dans sa poche. Les économies, elles, avaient disparu."
    },

    /* ---------------------- niveau 3 : loufoque ------------------- */
    {
      titre: "L'Affaire de la Meule Fugueuse",
      niveau: 3,
      avant: "La rue du Four descend sec. Le Fromager y avait laissé une meule de quarante kilos calée par une pierre plate.",
      mort: "La pierre a glissé vers minuit. La meule est partie, a pris de la vitesse sur deux cents mètres, puis a tourné à gauche — ce qu'aucune meule ne fait — pour rattraper {nom} devant sa propre porte. On l'a retrouvé{e} plat{e} comme une galette, et la meule adossée au mur, bien calée, comme si elle attendait la suite."
    },
    {
      titre: "L'Affaire des Oies Syndiquées",
      niveau: 3,
      avant: "{nom} traversait le pré des oies pour gagner dix minutes, comme tous les soirs depuis des années.",
      mort: "Cette nuit-là, les quatorze oies l'attendaient en demi-cercle à l'entrée du pré, parfaitement immobiles. Elles se sont refermées sur {lui} dans un ordre qui n'avait rien d'improvisé, et l'affaire a duré moins d'une minute. Au matin, elles étaient toutes rentrées au poulailler et le portail était refermé au loquet, de l'extérieur."
    },
    {
      titre: "L'Affaire du Concours de Regard",
      niveau: 3,
      avant: "{nom} avait parié une tournée qu'{il} tiendrait plus longtemps qu'un corbeau à un concours de regard fixe.",
      mort: "Le corbeau s'est posé sur la barrière à onze heures du soir. {nom} a tenu six heures. Le corbeau a tenu six heures et un quart. On les a séparés au matin : l'oiseau est reparti tranquillement vers le clocher, et {nom} avait perdu le pari, la tournée et la vie, exactement dans cet ordre."
    },
    {
      titre: "L'Affaire du Reflet Consciencieux",
      niveau: 3,
      avant: "{nom} s'est rasé{e} devant sa glace ce soir-là, en se parlant à {lui}-même comme {il} en avait l'habitude.",
      mort: "Le reflet a fini de se raser avant {lui}, a reposé le rasoir et est sorti du cadre. Ce qui s'est passé ensuite dans la chambre n'a pas de témoin. Ce qu'on sait, c'est que quelqu'un a pris son quart de garde au beffroi cette nuit-là, à sa place, et que ce quelqu'un était d'une politesse remarquable."
    },
    {
      titre: "L'Affaire de l'Avalanche de Lentilles",
      niveau: 3,
      avant: "Il n'y a pas de montagne à Ravenswood Bluff. Il y a en revanche, chez {nom}, trois cents kilos de lentilles au grenier.",
      mort: "Le plancher a cédé à deux heures du matin. Tout est descendu d'un coup, dans un bruit de pluie battante, et a rempli la chambre jusqu'au plafond. Il a fallu deux jours pour vider la pièce à la pelle. On a retrouvé {nom} tout au fond, dans son lit, les couvertures soigneusement remontées."
    },
    {
      titre: "L'Affaire de la Chèvre d'Équilibre",
      niveau: 3,
      avant: "{nom} soutenait depuis des semaines qu'{il} pouvait tenir debout sur une chèvre. Personne au village ne voulait le croire.",
      mort: "{Il} a voulu le prouver de nuit, seul{e}, sans témoin, ce qui enlève une bonne partie de l'intérêt à la démonstration. La chèvre va très bien. Elle est rentrée à l'étable toute seule vers quatre heures, et c'est à ce moment-là qu'on a compris qu'il fallait aller voir dans le pré."
    },
    {
      titre: "L'Affaire du Ragoût Ingrat",
      niveau: 3,
      avant: "{nom} avait passé l'après-midi sur un ragoût dont {il} était, de son propre aveu, extrêmement fier.",
      mort: "Le ragoût a mis six heures à mijoter et environ quatre secondes à le dévorer. Au matin, la marmite était vide et propre, le couvercle remis, la cuillère posée à côté. Le Tavernier a goûté le fond par curiosité et a dit que c'était, très honnêtement, le meilleur ragoût du village."
    },
    {
      titre: "L'Affaire du Piano Inexplicable",
      niveau: 3,
      avant: "Il n'y a jamais eu de piano à Ravenswood Bluff. Il faut retenir ce point pour la suite.",
      mort: "{nom} rentrait par la ruelle du Puits quand un piano droit, en noyer, est tombé sur {lui} d'une hauteur d'environ quatre étages. La ruelle en compte deux. L'instrument était parfaitement accordé, et il l'est resté : on s'en sert aujourd'hui à la taverne, sans jamais jouer ce morceau-là."
    },
    {
      titre: "L'Affaire du Fou Rire Solitaire",
      niveau: 3,
      avant: "{nom} dînait seul{e} quand quelque chose, dans la pièce vide, lui a manifestement dit quelque chose de très drôle.",
      mort: "Les voisins l'ont entendu{e} rire quarante minutes sans reprendre son souffle une seule fois. Puis le rire s'est arrêté net, sans diminuer, d'un coup. On l'a retrouvé{e} le lendemain, encore souriant{e}, la serviette autour du cou. Personne n'a jamais su la blague."
    },
    {
      titre: "L'Affaire de la Brouette Improbable",
      niveau: 3,
      avant: "La brouette du Charbonnier était rangée contre un mur, à l'envers, vide, depuis le mois de mars.",
      mort: "On ne saura jamais par quelle suite de circonstances elle s'est retrouvée à dévaler la côte du cimetière, chargée à ras bord, à trois heures du matin. {nom} n'a pas eu le temps de s'écarter. La brouette est arrivée en bas intacte et s'est renversée proprement, comme quelqu'un qui a terminé son travail."
    },
    {
      titre: "L'Affaire du Mouton Convaincu",
      niveau: 3,
      avant: "Un mouton. Un seul. Le plus petit du troupeau, de l'avis général et du sien.",
      mort: "Il a coincé {nom} contre la barrière du pré vers une heure du matin, et il a poussé. Avec une régularité et une conviction qui forcent l'admiration. Cela a pris la nuit entière. Au matin, le mouton broutait à trois mètres de là, l'air de rien, et la barrière n'avait pas une égratignure."
    },
    {
      titre: "L'Affaire de la Porte Récidiviste",
      niveau: 3,
      avant: "La porte de la grange à foin claque quand il y a du vent. Cette nuit-là, il n'y avait pas de vent.",
      mort: "Elle a frappé {nom} une première fois, à pleine volée, ce qui aurait amplement suffi. Puis elle est revenue en arrière, a marqué un temps d'arrêt d'environ deux secondes, et a frappé une seconde fois. Le loquet est en parfait état ; on l'a fait vérifier trois fois depuis."
    },
    {
      titre: "L'Affaire du Bouquet Anonyme",
      niveau: 3,
      avant: "Quelqu'un a déposé un bouquet devant la porte de {nom} vers le soir. Sans mot, sans nom, sans explication.",
      mort: "Il a doublé de volume pendant la nuit. Puis encore. Puis encore. Au matin, la maison était pleine de pétales du plancher au plafond et il en sortait par les fenêtres comme une mousse. {nom} était au milieu, sous environ deux mètres de fleurs, et l'odeur, de l'avis de tous, était absolument délicieuse."
    },

    /* ---------------------- niveau 4 : absurde -------------------- */
    {
      titre: "L'Affaire du Décès Démocratique",
      niveau: 4,
      avant: "Une réunion s'est tenue sans {nom}, un jeudi soir, sur un ordre du jour qui ne le concernait en rien.",
      mort: "Un point divers a été ajouté en fin de séance et le décès de {nom} a été voté à main levée, à une large majorité. {Il} n'a appris la décision que le lendemain matin, par affichage sur la porte de la mairie. {Il} s'y est conformé{e} dans l'après-midi, par respect pour la procédure."
    },
    {
      titre: "L'Affaire de la Rature Zélée",
      niveau: 4,
      avant: "Le secrétaire de mairie a fait une rature sur le registre communal, à la ligne de {nom}, un mardi, sans raison particulière.",
      mort: "Il a voulu corriger, s'est trompé de ligne, a raturé une deuxième fois, puis a renoncé et refermé le registre. {nom} est mort{e} à cet instant précis, par simple cohérence administrative. Le registre est consultable aux heures d'ouverture : la rature est très nette."
    },
    {
      titre: "L'Affaire de la Coquille Mortelle",
      niveau: 4,
      avant: "Sur l'acte de naissance de {nom}, le graveur avait fait une faute. Une seule lettre, jamais corrigée en quarante ans.",
      mort: "Quelqu'un a fini par lire le nom tel qu'il était écrit, à voix haute, pour vérifier quelque chose. La personne que ce nom désignait n'existait pas. {nom} non plus, à partir de cet instant. On a retrouvé ses vêtements soigneusement pliés sur la chaise, et rien d'autre."
    },
    {
      titre: "L'Affaire du Tiroir Bien Rangé",
      niveau: 4,
      avant: "Le Sacristain range tout. C'est sa grande qualité et, depuis cette nuit, son principal problème.",
      mort: "Il a trouvé {nom} endormi{e} dans la sacristie, l'a plié{e} soigneusement en huit, et l'a rangé{e} dans le tiroir du bas, avec les nappes d'autel. Il jure ne pas avoir réfléchi une seconde. Le tiroir ferme parfaitement, ce qui reste le détail le plus troublant de l'affaire."
    },
    {
      titre: "L'Affaire de la Serrure Gourmande",
      niveau: 4,
      avant: "{nom} a regardé par le trou de la serrure de la porte du fond, celle qui ne s'ouvre jamais.",
      mort: "Ce qu'{il} a vu n'est pas documenté. Ce qui l'est, c'est qu'{il} y est passé{e} en entier, par un trou de huit millimètres, en trois secondes environ, et dans cet ordre : l'œil, la tête, le reste. La porte est toujours fermée à clé. On a bouché la serrure avec de la cire, faute d'une meilleure idée."
    },
    {
      titre: "L'Affaire de Dix-Sept Heures Quarante",
      niveau: 4,
      avant: "{nom} regardait beaucoup trop souvent l'horloge. Tout le monde le lui faisait remarquer.",
      mort: "À dix-sept heures quarante, un jeudi, {il} a cessé d'être une personne pour devenir une heure. Depuis, il est dix-sept heures quarante en permanence dans le village : les cloches, les montres, le soleil, tout. On s'y fait assez bien. Le boulanger, lui, ne s'y fait pas du tout."
    },
    {
      titre: "L'Affaire du Mobilier Vendu",
      niveau: 4,
      avant: "{nom} s'est assis{e} dans le fauteuil du salon et n'a plus bougé pendant deux jours, ce que personne n'a trouvé anormal.",
      mort: "On l'a dépoussiéré{e}, ciré{e}, puis inscrit{e} au catalogue de la vente de printemps sous le numéro 47, rubrique « sièges divers ». {Il} est parti{e} pour quatorze pièces d'argent à une famille de Blackthorn, qui s'en déclare très satisfaite. L'erreur n'a été découverte qu'au moment du transport, et il était trop tard pour revenir dessus."
    },
    {
      titre: "L'Affaire de la Métaphore Lourde",
      niveau: 4,
      avant: "Quelqu'un a dit de {nom} qu'{il} portait tout le village sur ses épaules. C'était une façon de parler.",
      mort: "Cela a cessé d'être une façon de parler vers trois heures du matin. Le poids est arrivé d'un coup, entier, avec les maisons, le beffroi et les habitants dedans. On a tout remis en place avant midi. Presque tout : il manque une grange et deux mètres de chemin."
    },
    {
      titre: "L'Affaire de la Nécrologie Prématurée",
      niveau: 4,
      avant: "Le Colporteur vend un journal de la ville voisine, avec deux jours de retard. Ou d'avance, selon les semaines.",
      mort: "{nom} y a lu sa propre notice nécrologique, fort élogieuse, datée du surlendemain. {Il} a haussé les épaules, replié le journal et attendu. Le surlendemain, {il} est mort{e} exactement comme annoncé, et la notice s'est révélée d'une précision remarquable jusque dans le choix des adjectifs."
    },
    {
      titre: "L'Affaire du Silence Équivalent",
      niveau: 4,
      avant: "{nom} parlait beaucoup. C'était une qualité, jusqu'à un certain point, et ce point a été atteint un mercredi.",
      mort: "Pendant la nuit, {il} a été remplacé{e} par un silence de la même taille et du même poids, à la place exacte où {il} se tenait. Le silence est toujours là. Il tient parfaitement la conversation, à condition de ne pas attendre de réponse."
    }
  ];

  /* ================================================================== */
  /*  EXÉCUTIONS                                                         */
  /* ================================================================== */

  const JOUR = [
    /* ---------------------- niveau 1 ------------------------------ */
    {
      titre: "L'Exécution du Vieux Chêne",
      niveau: 1,
      avant: "{acc} a désigné {nom} un peu après midi, sans élever la voix, et personne n'a trouvé d'objection à formuler.",
      mort: "On a sorti la corde du vieux chêne, celle qui sert depuis quatre-vingts ans et qu'on range dans la sacristie. Cela a été fait proprement, sans discours, en moins d'un quart d'heure. Les branches de ce chêne ne repoussent plus du côté où l'on attache, et cela fait quatre-vingts ans que personne n'en parle."
    },
    {
      titre: "L'Exécution Réglementaire",
      niveau: 1,
      avant: "{acc} avait apporté le registre des usages, ouvert à la bonne page, et a lu à voix haute l'article qui concernait {nom}.",
      mort: "Le gibet communal a été monté en une heure vingt, ce qui reste le record du village. Tout s'est déroulé dans l'ordre prévu, à la minute près, avec les deux témoins requis. Le procès-verbal est irréprochable. C'est même, à la relecture, le principal problème de cette affaire."
    },
    {
      titre: "L'Exécution du Regard Fuyant",
      niveau: 1,
      avant: "{acc} n'avait aucune preuve. [Il] avait seulement remarqué que {nom} regardait un peu trop souvent vers la gauche.",
      mort: "Cela a suffi. On l'a mené{e} au chêne dans un silence gêné, et plusieurs personnes ont regardé vers la gauche pendant tout le trajet, sans parvenir à s'en empêcher. Trois habitants avaient quitté le village avant le lendemain midi."
    },
    {
      titre: "L'Exécution du Silence Mal Placé",
      niveau: 1,
      avant: "On a demandé à {nom} de s'expliquer. {Il} n'a rien dit. On a redemandé. {Il} n'a rien dit non plus.",
      mort: "{acc} a conclu que ce silence valait aveu, et le village a suivi, parce qu'il fallait bien conclure quelque chose avant la nuit. {nom} n'a pas davantage parlé sur le chemin, ni sous le chêne, ni après. Certains pensent encore qu'{il} avait une excellente raison de se taire."
    },
    {
      titre: "L'Exécution du Beffroi",
      niveau: 1,
      avant: "Pour le cas de {nom}, {acc} a proposé le beffroi plutôt que le chêne, histoire de changer un peu, et l'idée a beaucoup plu.",
      mort: "On a monté les cent douze marches en procession, ce qui a pris un temps considérable et refroidi l'enthousiasme de plusieurs participants. En haut, la poussée a été presque respectueuse. En bas, on avait eu la délicatesse de dégager les pavés et d'écarter les enfants."
    },

    /* ---------------------- niveau 2 ------------------------------ */
    {
      titre: "L'Exécution du Plouf Décevant",
      niveau: 2,
      avant: "{acc} a désigné {nom} en montrant le puits communal du menton, ce qui, au village, vaut proposition formelle.",
      mort: "Le puits est à sec depuis 1622, ce que tout le monde savait et que personne n'a jugé utile de rappeler. {nom} est tombé{e} de onze mètres sur de la pierre sèche, avec un bruit que les témoins s'accordent à décrire comme « décevant ». On a remis la margelle en place et la journée a repris son cours."
    },
    {
      titre: "L'Exécution de la Corde Prêtée",
      niveau: 2,
      avant: "Le village n'avait plus de corde le jour où {acc} a désigné {nom}. [Il] est allé[e] en emprunter une chez le Cordier, qui a exigé de la récupérer ensuite.",
      mort: "La corde était neuve, un peu raide, et a beaucoup glissé. Il a fallu s'y reprendre, ce qui a gâché la solennité de l'ensemble et agacé les premiers rangs. Le Cordier a récupéré son bien le soir même, l'a examiné très longuement à la lanterne, et a refusé de le revendre à quiconque."
    },
    {
      titre: "L'Exécution en Trois Essais",
      niveau: 2,
      avant: "{acc} avait tout organisé pour trois heures de l'après-midi, avec un soin qui méritait mieux.",
      mort: "La première tentative a échoué pour un problème de nœud. La deuxième, pour un problème de branche. La troisième a fonctionné, mais plus personne ne regardait vraiment, et {nom} avait eu le temps de formuler trois remarques désobligeantes sur l'organisation générale."
    },
    {
      titre: "L'Exécution sous la Cloche",
      niveau: 2,
      avant: "{acc} a estimé que le cas de {nom} méritait quelque chose de mémorable, et l'assemblée a applaudi l'intention.",
      mort: "On a descendu la grosse cloche du beffroi avec un palan et huit hommes, ce qui a occupé toute la matinée. On l'a ensuite laissée tomber d'un mètre cinquante, ce qui a largement suffi. Elle sonne faux depuis ce jour-là, et personne n'ose la remonter pour vérifier pourquoi."
    },
    {
      titre: "L'Exécution de l'Amateur",
      niveau: 2,
      avant: "Personne ne voulait s'en charger. {acc} a fini par désigner le Bourrelier, qui n'avait jamais fait ça de sa vie.",
      mort: "Le Bourrelier a beaucoup transpiré, s'est excusé deux fois auprès de {nom}, et a fini par demander si le nœud était bien celui-là. {nom} lui a répondu que oui, ce qui était généreux vu les circonstances. Le Bourrelier a fermé son atelier la semaine suivante et personne ne l'a revu."
    },
    {
      titre: "L'Exécution de la Deuxième Branche",
      niveau: 2,
      avant: "{acc} avait choisi la branche basse du chêne, celle qui est commode et à hauteur d'homme.",
      mort: "Elle a cédé immédiatement, ce qui a fait rire tout le monde, y compris {nom}. On a recommencé avec celle du dessus, nettement plus sérieuse, et là plus personne n'a ri. La branche basse a été sciée dès le lendemain, par précaution et par gêne."
    },

    /* ---------------------- niveau 3 ------------------------------ */
    {
      titre: "L'Exécution Balistique",
      niveau: 3,
      avant: "{acc} a eu l'idée de la charrette et du tas de foin, et l'a présentée à l'assemblée avec beaucoup de conviction.",
      mort: "Le principe était simple : la charrette bascule, le foin fait ressort, et {nom} passe par-dessus la colline. Les deux premières parties du raisonnement ont parfaitement fonctionné. {nom} a effectivement franchi la colline, ainsi qu'une bonne partie de la suivante. On ne l'a jamais retrouvé{e}."
    },
    {
      titre: "L'Exécution du Banquet Annulé",
      niveau: 3,
      avant: "Le banquet annuel était prévu ce jour-là. {acc} a désigné {nom} entre le potage et le rôti.",
      mort: "On a utilisé le tonneau de soupe, qui était là, tiède et disponible, et il a bien fallu annuler le banquet dans la foulée. Personne n'a osé finir son assiette. Le village a mangé du pain sec pendant trois jours, par principe, et la recette n'a plus jamais été refaite."
    },
    {
      titre: "L'Exécution en Fanfare",
      niveau: 3,
      avant: "La fanfare répétait sur la place quand {acc} a désigné {nom}. Elle n'était au courant de rien.",
      mort: "Elle est entrée sur la place au pas redoublé, en jouant une marche particulièrement joyeuse, exactement au mauvais moment et exactement au mauvais endroit. Quatorze musiciens, deux grosses caisses. {nom} était au milieu. La fanfare a terminé le morceau, parce qu'on ne s'arrête pas au milieu d'un morceau."
    },
    {
      titre: "L'Exécution Boulangère",
      niveau: 3,
      avant: "{acc} a fait observer que le four du boulanger était déjà chaud et qu'il serait dommage de gaspiller la chauffe.",
      mort: "On a enfourné {nom} avec une miche, pour ne pas perdre la place. La miche est ressortie parfaite : croûte dorée, mie aérée, la meilleure de l'année de l'avis unanime. Personne n'a voulu la manger. Elle est toujours sur le comptoir, et le boulanger refuse qu'on y touche."
    },
    {
      titre: "L'Exécution en Boucle",
      niveau: 3,
      avant: "{acc} a proposé le moulin. On a donc poussé {nom} du haut du moulin.",
      mort: "La roue l'a rattrapé{e} en bas, remonté{e} de l'autre côté et redéposé{e} en haut, ce que personne n'avait envisagé. On a recommencé. La roue aussi. Cela a duré jusqu'à ce que le meunier coupe l'eau, vers le soir, et tout le monde était alors extrêmement fatigué."
    },
    {
      titre: "L'Exécution Ansérine",
      niveau: 3,
      avant: "Personne ne voulait s'en occuper. {acc} a tiré à la courte paille et c'est le troupeau d'oies qui a gagné.",
      mort: "On a ouvert le portail du pré, fait entrer {nom}, et refermé derrière. Les oies ont procédé avec une méthode et une patience qui ont sincèrement impressionné les témoins. Le village a mangé de l'oie tout l'hiver, mais sans entrain, et en évitant de croiser leur regard."
    },
    {
      titre: "L'Exécution Girouette",
      niveau: 3,
      avant: "{acc} a désigné {nom} puis a ajouté, imprudemment, qu'il fallait « faire les choses en grand ».",
      mort: "On l'a accroché{e} par les bretelles à la girouette du clocher, à onze mètres, en se disant qu'on redescendrait tout ça plus tard. Le vent s'est levé à la nuit tombée. La girouette a tourné jusqu'au matin et indique depuis le sud-ouest en permanence, quel que soit le temps qu'il fait."
    },
    {
      titre: "L'Exécution Maraîchère",
      niveau: 3,
      avant: "{acc} a désigné {nom} juste devant le potager de la Mégère, qui n'avait rien demandé à personne.",
      mort: "Le premier chou est parti de la deuxième rangée. Les autres ont suivi. On parle de quatre cents kilos de légumes en une demi-heure, soit la totalité de la récolte d'automne. La Mégère a envoyé la note au village, qui l'a payée sans discuter et sans relever les yeux."
    },
    {
      titre: "L'Exécution du Fondateur",
      niveau: 3,
      avant: "{acc} a fait son discours depuis le socle du buste du Fondateur, pour être vu[e] de tous.",
      mort: "Le socle a été descellé par l'enthousiasme général et le Fondateur est parti en avant, de tout son poids de bronze. {nom} se tenait juste en dessous, ce qui était, il faut le reconnaître, la place prévue pour {lui}. Le buste est resté où il est tombé. On a fini par rebâtir le socle autour."
    },

    /* ---------------------- niveau 4 ------------------------------ */
    {
      titre: "L'Exécution Administrative",
      niveau: 4,
      avant: "{acc} n'a pas crié, n'a rien jeté et n'a touché personne. [Il] est allé[e] à la mairie.",
      mort: "Le nom de {nom} a été rayé du registre communal à l'encre noire, à la règle, très proprement. {Il} a cessé d'exister dans l'heure qui a suivi, sans bruit, au milieu d'une conversation. La radiation est définitive : on a essayé de réécrire le nom en dessous, cela n'a rien donné du tout."
    },
    {
      titre: "L'Exécution Rétroactive",
      niveau: 4,
      avant: "{acc} a fait observer qu'on gagnerait beaucoup de temps en exécutant {nom} la veille plutôt que le jour même.",
      mort: "L'idée a paru excellente à tout le monde. On a donc exécuté {nom} le mardi pour le lundi, avec effet immédiat et rétroactif. Le résultat, c'est que le lundi n'a jamais eu lieu : cela arrange une partie du village et en contrarie une autre, notamment ceux qui s'étaient mariés ce jour-là."
    },
    {
      titre: "L'Exécution Classée Sans Suite",
      niveau: 4,
      avant: "{acc} a transmis le cas de {nom} au secrétariat, avec la mention « urgent » soulignée deux fois.",
      mort: "{nom} a été plié{e} en quatre, tamponné{e} deux fois, et classé{e} au rayon des affaires closes, entre un litige de mitoyenneté de 1604 et une vieille histoire de chèvre. Le classement est parfaitement correct. C'est même, de l'avis du secrétaire, un travail remarquablement propre."
    },
    {
      titre: "L'Exécution Mobilière",
      niveau: 4,
      avant: "{acc} a désigné {nom} au milieu d'une phrase, sans s'interrompre ni changer de ton.",
      mort: "À la fin de la phrase, il y avait une chaise vide à sa place. Personne ne se souvient de l'avoir vu{e} partir, ni d'avoir entendu quoi que ce soit. Le village a continué de s'adresser à la chaise pendant trois semaines, par politesse, puis a cessé. C'est ce moment-là qui a été le plus dur."
    },
    {
      titre: "L'Exécution Grammaticale",
      niveau: 4,
      avant: "{acc} a prononcé à propos de {nom} une phrase au conditionnel passé, très correctement construite.",
      mort: "La phrase disait ce qui aurait pu arriver à {nom} si les choses avaient été un peu différentes. Les choses ont immédiatement été un peu différentes. Il n'y a rien eu d'autre à faire, et le village évite désormais ce temps-là dans toutes les discussions importantes."
    },
    {
      titre: "L'Exécution au Sens Strict",
      niveau: 4,
      avant: "{acc} a rédigé le règlement le matin même, l'a affiché à onze heures, et l'a appliqué à {nom} à midi.",
      mort: "L'article 4 était parfaitement clair et {nom} y contrevenait depuis sa naissance, sans le savoir et sans possibilité d'y remédier. La sanction prévue était celle-là, sans aménagement possible. Le règlement est toujours affiché sur la porte de la mairie. Personne ne l'a relu depuis, ce qui est peut-être imprudent."
    }
  ];

  /* ------------------------------------------------------------------ */
  /*  L'IDÉE DU JOUEUR, GLISSÉE ENTRE LA MISE EN PLACE ET LA MORT        */
  /* ------------------------------------------------------------------ */

  const AMORCES_IDEE = [
    "Il faut préciser un détail que personne ne connaissait :",
    "Il y avait une chose qu'{il} gardait pour {lui} :",
    "Le dossier ne mentionne qu'une seule fois ce point :",
    "Restait ce détail, que personne n'a pensé à vérifier :",
    "On notera, pour l'histoire, ceci :",
    "Une chose, notée en marge du registre :"
  ];

  const AMORCES_IDEE_JOUR = [
    "Tout est parti de là :",
    "Le village n'a retenu que cela :",
    "{acc} a rappelé, au passage, ce point :",
    "On lui a surtout reproché ceci :",
    "Un détail avait beaucoup circulé ce matin-là :",
    "L'accusation tenait à peu près à cela :"
  ];

  const SUITES_IDEE = {
    nuit: [
      "Cela n'a rien changé à ce qui a suivi.",
      "Personne n'a fait le lien. Il n'y en avait peut-être aucun.",
      "C'est sans doute sans rapport. Sans doute.",
      "Retenez ce détail : il ne servira à rien.",
      "La suite ne s'explique pas mieux pour autant."
    ],
    jour: [
      "L'argument a porté.",
      "Cela a suffi à emporter la décision.",
      "Personne n'a demandé de précisions.",
      "Le village a trouvé cela très convaincant.",
      "On n'a pas cherché plus loin."
    ]
  };

  /* ------------------------------------------------------------------ */
  /*  RÔLES — noms officiels, pour la liste déroulante                   */
  /*  (traduction publiée par TPI : botc-translations, game/fr.json)     */
  /* ------------------------------------------------------------------ */

  const ROLES = [
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
    PRENOMS_M, PRENOMS_F,
    NUIT, JOUR,
    AMORCES_IDEE, AMORCES_IDEE_JOUR, SUITES_IDEE,
    ROLES, SCRIPTS, TYPES, CHAOS_LABELS
  };
})(window);
