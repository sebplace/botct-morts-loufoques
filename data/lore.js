/*!
 * Raconte ta mort — Ravenswood Bluff
 *
 * Le village vient de t'exécuter et le Conteur te demande de raconter ta mort.
 * Chaque entrée est une réplique à dire À VOIX HAUTE, à la première personne,
 * en deux à quatre phrases, avec une chute.
 *
 * Accords qui se rapportent à toi :  {e} -> "" / "e"
 * Accord de la personne qui t'a fait pendre : [e] -> "" / "e"
 * {acc} est remplacé par son prénom.
 */
(function (global) {
  "use strict";

  const PRENOMS_M = [
    "Aldric", "Barnabé", "Cornélius", "Edmond", "Eustache", "Grégoire", "Hector",
    "Jasper", "Lucien", "Mortimer", "Octave", "Prosper", "Roderick", "Séverin",
    "Silas", "Thaddée", "Ulric", "Valérien", "Wilfrid", "Zacharie"
  ];

  const PRENOMS_F = [
    "Agathe", "Béatrix", "Bérénice", "Célestine", "Delphine", "Eudoxie", "Florine",
    "Hortense", "Isaure", "Léonore", "Marguerite", "Nerissa", "Ombeline", "Perpétue",
    "Rosemonde", "Sidonie", "Théodora", "Ursule", "Vespérine", "Wilhelmine"
  ];

  /* ================================================================== */
  /*  UNE MORT SUR MESURE POUR CHAQUE RÔLE (exécution par le village)    */
  /* ================================================================== */

  const MORTS_ROLE = {
    /* ---------------------------- Trouble Brewing ---------------------------- */
    lavandiere: "Je passe ma vie à laver le linge des autres. Le village me pend avec ma propre corde à linge, la plus solide, celle du fond. En tombant, je remarque que les draps du Bedeau sont mal essorés. C'est ma dernière pensée et je l'assume.",
    archiviste: "Faute de corde disponible, le village pousse ma propre bibliothèque sur moi. Trois cent douze volumes. Celui qui m'achève est un traité de botanique que je n'avais jamais ouvert.",
    detective: "Je demande cinq minutes pour une dernière enquête. On me les accorde. Au bout de quatre, je désigne triomphalement le coupable : c'est moi. Le village, qui le disait depuis le matin, me pend sans commentaire.",
    cuisinier: "Je propose de préparer mon dernier repas moi-même. Le village accepte, par correction. Je m'étouffe avec, devant tout le monde, avant même qu'on ait sorti la corde. C'était pourtant très bon.",
    empathe: "Mes deux voisins sont bons, je le sens dans mes os. Ce sont aussi les deux premiers à lever la main contre moi. On peut être bon et lâche : j'ai eu toute la descente vers le chêne pour y réfléchir.",
    voyante: "Je vois tout. J'ai vu la corde, j'ai vu le chêne, j'ai vu l'heure exacte. Je n'ai simplement pas vu que c'était pour moi. Le métier a ses limites.",
    fossoyeur: "J'avais creusé ma tombe trois jours à l'avance, par habitude professionnelle. Le village me jette dans le puits. Ma tombe est toujours là, vide, impeccable. Personne ne l'a jamais utilisée.",
    moine: "J'ai passé mes nuits à protéger les autres du Démon. La dernière, j'ai protégé le Tavernier. Le lendemain matin, c'est le Tavernier qui a apporté la corde. Je ne regrette rien, mais je constate.",
    corneille: "Mes corbeaux me suivent partout. Ils suivent le cortège, se posent sur la branche, et regardent. Au dernier moment ils s'envolent tous ensemble, ce qui casse la branche et me tue avant la corde. Même mes oiseaux ne savent pas faire simple.",
    immaculee: "Le village me pend. Par précaution, le village pend aussi les trois personnes qui m'ont adressé la parole dans la semaine. On n'est jamais trop prudent, paraît-il.",
    pourfendeuse: "Je tends le doigt et je hurle : « JE SUIS LA POURFENDEUSE ! ». Il ne se passe rien. Je recommence, plus fort, avec le bras bien tendu. Il ne se passe toujours rien. On me pend pendant que j'essaie une troisième fois.",
    soldat: "Aucun Démon ne peut me tuer. Aucun. Je le répète pendant tout le trajet jusqu'au chêne. Le village n'est pas un Démon. Le village est bien pire : il est nombreux.",
    maire: "On me pend sur la place, sous mon propre portrait officiel. Le portrait tombe en pleine cérémonie et assomme le bourreau. Il a fallu attendre qu'il se réveille pour finir. J'ai trouvé ça très long.",
    majordome: "Mon maître lève la main contre moi. Je lève la main aussi, par pur réflexe professionnel. Le village compte une voix de plus que prévu et me pend séance tenante. Le service, c'est le service.",
    ivrogne: "Je monte sur l'échafaud en expliquant très calmement que je suis la Voyante. Le bourreau me dit que non. Je lui dis que si. Il avait raison. J'apprends toute ma vie en trois secondes, puis plus rien.",
    recluse: "Je n'ai parlé à personne depuis onze ans. Le village trouve ça suspect. J'essaie d'expliquer que c'est juste mon caractère. Ça sort très mal, parce que je n'ai pas parlé depuis onze ans. On me pend.",
    saint: "Le village me pend. Le village s'aperçoit immédiatement de son erreur. Le village s'excuse. J'accepte les excuses, parce que je suis le Saint. Mais entre nous : quels imbéciles.",
    empoisonneur: "On me pend sans savoir que j'avais déjà versé quelque chose dans la soupe de midi. Je meurs en regardant quinze personnes se tenir le ventre exactement en même temps. C'est un très beau souvenir.",
    espionne: "Je connais le rôle de chacun ici. De chacun. Je le dis au moment où la corde se tend, mais avec une corde autour du cou on articule mal, et personne ne comprend un traître mot. Dommage.",
    "femme-ecarlate": "Je meurs en robe rouge, ce qui était prévu, et sur la place du village, ce qui l'était beaucoup moins. J'avais pourtant attendu toute la partie que quelqu'un d'autre meure à ma place.",
    baron: "On me pend en grande pompe. J'exige un dernier mot. Je fais observer que ce village compte beaucoup trop de gens bizarres cette année, et que ce n'est pas normal. Personne ne relève. Ils relèveront demain.",
    diablotin: "C'est moi. C'était moi depuis le début. Le village me pend au vieux chêne dans un silence de mort, si j'ose dire. Puis quelqu'un, au troisième rang, sourit. Bonne chance à tous.",

    /* ---------------------------- Bad Moon Rising ---------------------------- */
    "grand-mere": "Mon petit-fils est dans la foule. Il lève la main. Je lui fais signe que ce n'est pas grave. Il croit que je l'encourage et lève l'autre main. On me pend avec deux voix de ma propre famille.",
    marin: "Je ne peux pas mourir, je suis bien trop ivre pour ça, c'est scientifique. Le village s'y reprend à six fois. À la septième je meurs de fatigue, ce qui est complètement différent, et je tiens à ce que ce soit noté.",
    "femme-de-chambre": "Je sais qui se lève la nuit. Je sais tout. Je sais même qui a mis le drap sale dans le panier du Bedeau. On me pend avant que j'aie pu m'en servir, et c'est bien dommage pour le Bedeau.",
    exorciste: "J'avais empêché le Démon de travailler trois nuits d'affilée. Il assiste à mon exécution au premier rang. Il applaudit. Poliment, mais il applaudit.",
    aubergiste: "J'ai sauvé la moitié du village dans mon auberge. C'est cette moitié-là qui vient me pendre — l'autre était déjà morte. On m'exécute avec la nappe des grandes occasions.",
    parieur: "Je parie une tournée que le village n'osera pas. Le village ose. Je meurs en devant une tournée à quatorze personnes, ce qui, tout bien pesé, reste une bonne affaire.",
    commere: "Je lâche une dernière vérité bien sentie sur la belle-sœur du meunier. Quelqu'un s'évanouit dans la foule. On me pend au milieu du brouhaha et personne ne regarde : tout le monde parle de la belle-sœur du meunier.",
    courtisan: "J'avais rendu le Démon ivre mort pendant trois jours. Il a dessoûlé exactement le matin de mon exécution. Il m'a fait un petit signe de la main. Je n'ai pas pu répondre, j'avais les poignets attachés.",
    professeur: "Je peux ressusciter un mort par partie. Je propose de me ressusciter moi-même juste après. Le village trouve l'argument intéressant, mais me pend quand même, pour voir. Ça n'a pas marché.",
    menestrel: "Je demande à jouer un dernier air. On me l'accorde. Je joue quarante minutes. Au bout de quarante minutes, on me pend sans la moindre hésitation, et plus personne n'a jamais reparlé de musique dans ce village.",
    tisaniere: "Mes deux voisins ne pouvaient pas mourir tant que j'étais là. Ils l'ont appris très exactement une seconde après ma pendaison. Leur tête valait largement le déplacement.",
    pacifiste: "Je suis contre les exécutions. Je le dis. Je le redis. Je le crie. On m'exécute. L'ironie ne m'a pas échappé : j'ai eu toute la montée pour y penser.",
    "fou-du-roi": "On me pend une première fois. Je me relève, j'époussette ma veste et je demande si ça compte. Le village répond que non et recommence. Cette fois, ça compte.",
    bricoleur: "Je meurs pendu{e} à une poulie de mon invention, censée rendre l'exécution plus confortable pour tout le monde. Elle fonctionne parfaitement. C'est ma plus belle réussite et je n'en profiterai pas.",
    selenite: "En mourant, je désigne quelqu'un du doigt, comme le veut ma nature. Je désigne le Boulanger. Le Boulanger n'avait rien fait. Le Boulanger meurt quand même. Désolé{e}.",
    "gros-bras": "Le premier qui me touche le regrette. Le bourreau me touche. Le bourreau devient très bizarre. On finit par me pendre avec une perche, à distance, comme un animal dangereux.",
    lunatique: "Je monte sur l'échafaud en rugissant que je suis le Démon et que je reviendrai. Le vrai Démon, dans la foule, rit à s'en tenir les côtes. Je meurs très en colère et complètement à côté de la plaque.",
    parrain: "On me pend. Je note les noms. Tous les noms. Je n'aurai pas le temps de m'en servir, mais quelque part, un jour, quelqu'un lira ma liste.",
    "avocat-du-diable": "J'ai sauvé trois condamnés de la corde en plaidant brillamment. Le quatrième dossier, c'est le mien. Je plaide. Je plaide très bien. Je perds pour la première fois de ma carrière, et définitivement.",
    assassin: "Je garde mon unique coup pour le bon moment. Le bon moment n'est jamais venu. On me pend avec mon poignard encore propre à la ceinture, ce qui est humiliant pour un professionnel.",
    conspirateur: "J'avais tout prévu, y compris ceci. Enfin, presque ceci : j'avais prévu que ce serait quelqu'un d'autre. Le plan tient toujours, il lui manque simplement moi.",
    zombuul: "Je suis déjà mort une fois. On me pend. Je me relève. On me repend. Le village finit par me clouer dans un cercueil et poser une pierre dessus, ce qui est la seule idée intelligente de la journée.",
    pukka: "Mon poison met une nuit entière à agir. On me pend le matin. Quelque part dans cette foule, quelqu'un a encore une nuit à vivre et l'ignore complètement. Je meurs avec ce petit plaisir.",
    shabaloth: "Je mange par deux. On me pend, c'est de bonne guerre. Ce que le village n'avait pas anticipé, c'est que j'avais déjà avalé le bourreau la veille. Il a fallu en trouver un autre. Ça a pris la matinée.",
    po: "Je jeûne des nuits entières pour mieux me rattraper ensuite. On me pend la veille du grand rattrapage. Je meurs le ventre vide, et c'est ma seule vraie tristesse.",

    /* ---------------------------- Sects & Violets ---------------------------- */
    horloger: "Je meurs à l'heure exacte que j'avais calculée, à la seconde près. Mon horloge le confirme. Personne dans ce village ne comprendra jamais à quel point c'était impressionnant.",
    reveur: "Je m'endors sur l'échafaud, par habitude. On me pend en plein rêve. Dans le rêve, tout allait très bien et j'étais parfaitement innocent{e}.",
    charmeur: "Il me suffisait de toucher le Démon pour prendre sa place. J'ai touché quatorze personnes. Aucune n'était la bonne. À la quinzième, on m'a attrapé les mains et pendu{e}.",
    mathematicien: "Je calcule la probabilité que le village se trompe : quatre-vingt-onze pour cent. Je l'annonce à voix haute, avec le détail du calcul. On me pend dans les quatre-vingt-onze pour cent.",
    fleuriste: "On me pend avec une guirlande de fleurs, parce que je suis la Fleuriste et que le village a le sens du détail. La guirlande casse. On recommence avec de la corde, comme tout le monde. J'étais très vexée.",
    crieur: "J'annonce ma propre exécution sur la place, à midi, avec la cloche, comme le veut ma fonction. Belle annonce. Bonne affluence. Je suis resté{e} d'un professionnalisme exemplaire jusqu'au bout.",
    oracle: "Je sais compter les morts maléfiques. Ma mort ne fait pas monter le chiffre d'un seul point, et j'aurais vraiment aimé que quelqu'un le remarque.",
    savant: "On me dit chaque jour deux choses : une vraie, une fausse. Ce matin-là, on m'a dit que j'allais mourir et que tout allait bien. J'ai parié sur la mauvaise.",
    couturiere: "On me pend avec un nœud coulant absolument déplorable. Je demande à le refaire — c'est mon métier. On me laisse faire. Le résultat est impeccable. J'en suis morte, mais proprement.",
    philosophe: "Je meurs en démontrant que la mort n'existe pas. La démonstration était solide. Le village est resté sur sa position. Moi aussi, mais couché{e}.",
    artiste: "J'avais droit à une seule vraie question dans toute ma vie et je l'ai gardée trop longtemps. Je meurs sans l'avoir posée. Elle était excellente, croyez-moi.",
    jongleur: "Je jongle pour ma défense. Cinq balles. Très belle prestation. Le village applaudit, puis me pend, dans cet ordre, ce qui est cruel mais poli.",
    sage: "Si le Démon m'avait tué{e}, j'aurais su qui c'était. Le village a été plus rapide. Je meurs bête, ce qui, pour un Sage, est une fin particulièrement mal choisie.",
    barbier: "On me pend. Dans la nuit qui suit, deux personnes se réveillent avec la vie de l'autre. Ce n'est pas ma faute : c'est mon métier qui déteint.",
    maladroit: "Je trébuche sur la première marche de l'échafaud et je meurs sur le coup. Le bourreau, qui avait préparé tout un discours, est resté la corde à la main pendant deux bonnes minutes.",
    "bete-de-foire": "On m'avait dit de ne surtout pas parler de ce que je suis. J'en ai parlé. Deux fois. La deuxième avec des gestes. On m'a pendu{e} avant la troisième.",
    dulcinee: "Tout le monde m'adore. Tout le monde me pend quand même, en pleurant beaucoup. En mourant, je rends quelqu'un définitivement ivre, et c'est tout ce que je peux faire pour vous.",
    jumelle: "Mon jumeau est dans la foule et me ressemble trait pour trait. On me pend. Le village réalise trois secondes trop tard qu'il ne sait absolument plus lequel des deux il vient de pendre.",
    sorciere: "J'avais maudit trois personnes. On me pend avant qu'aucune n'ait bougé. Les malédictions, elles, tiennent encore. Elles tiennent toujours. Bonne nuit.",
    cerenovus: "Quatre personnes dans cette foule croient dur comme fer être quelqu'un d'autre, et c'est mon œuvre. On me pend sans jamais l'avoir compris. Elles ne le comprendront pas davantage.",
    guenaude: "Je change les gens pendant leur sommeil, c'est mon petit plaisir. On me pend. Dans la foule, quelqu'un se demande depuis quand il sait faire ça.",
    "fang-gu": "On me pend. Je saute dans le corps du voisin le plus proche avant même que la corde ne se tende. Le village enterre une coquille vide avec beaucoup de dignité, et je regarde la cérémonie depuis le troisième rang.",
    vigormortis: "On me pend. Mes serviteurs morts continuent de travailler pendant l'enterrement, ce qui gâche un peu l'ambiance. Personne n'ose leur dire de s'arrêter.",
    "no-dashii": "On me pend, et mes deux voisins de corde se sentent immédiatement beaucoup mieux. Ils ne l'ont jamais dit à voix haute, mais ça se voyait.",
    vortox: "On me pend. C'est la seule chose vraie qui se soit produite dans ce village depuis trois jours. Profitez-en, il n'y en aura pas d'autre.",

    /* ---------------------------- Expérimental ------------------------------ */
    golem: "Je suis en terre cuite. La corde casse net. La branche casse aussi. On finit par me pousser du haut du beffroi et je me brise en quatorze morceaux sur les pavés. On en a fait des pots de fleurs.",
    demoiselle: "Personne ne savait qui j'étais, et c'était tout l'intérêt. On me pend au hasard, au petit bonheur. Quelque part dans la foule, quelqu'un se mord les doigts de ne pas l'avoir deviné avant.",
    politicien: "On me pend. Je change de camp pendant la chute. Je meurs du bon côté, ce qui est, tout compte fait, un très beau résultat de carrière.",
    heretique: "On me pend. Le camp qui gagnera cette partie perdra à cause de moi. Je ne sais pas encore lequel c'est et, franchement, ça m'est complètement égal.",
    psychopathe: "Je propose un duel avant l'exécution, comme d'habitude. Le village refuse, pour la première fois. On me pend à quatorze contre un, ce qui est exactement ce que je reprochais aux autres.",
    legion: "On me pend. La moitié de la foule se sent immédiatement très mal. L'autre moitié aussi, mais pour une raison différente.",
    leviathan: "On me pend le cinquième jour, à midi pile, avec trois heures d'avance sur mon programme. Je trouve ça un peu précipité, mais je n'ai pas mon mot à dire.",
    emeute: "On me pend. Tout le monde se pend un peu en même temps, par contagion. Ça a été une journée très chargée.",
    "al-hadikhia": "On me demande si je préfère vivre ou mourir. Je réponds « vivre ». On me pend quand même. C'est exactement ce que je fais subir aux autres chaque nuit, et je trouve que ça manque d'originalité.",
    timonstre: "On me pend. Je fais à peu près la taille d'un nourrisson, donc la corde est trop grande, donc il faut la refaire, donc ça prend un temps fou. Tout le monde a trouvé la scène très gênante.",
    kazali: "On me pend. Trois personnes très respectables, dans la foule, savent parfaitement qu'elles travaillaient pour moi et n'osent pas se regarder.",
    yaggablabla: "On me pend en me demandant d'arrêter de répéter cette phrase. J'arrête. Le village ne saura jamais laquelle c'était, et c'est ce qui me fait le plus plaisir.",
    ojo: "On me pend en visant quelqu'un d'autre. Cela m'arrive toutes les nuits, en réalité. Je trouve ça presque touchant.",
    parasyte: "On me pend. Mon hôte, dans la foule, s'effondre exactement en même temps que moi sans comprendre pourquoi. Nous étions très proches.",
    typhon: "On me pend entre mes deux gardes du corps, qui n'ont rien vu venir parce qu'ils regardaient chacun de l'autre côté. C'était pourtant leur unique fonction."
  };

  /* ================================================================== */
  /*  MORTS GÉNÉRIQUES — par niveau de délire                            */
  /* ================================================================== */

  const MORTS = {
    jour: {
      1: [
        "On me pend au vieux chêne. La branche casse. On recommence avec une branche plus solide. Elle tient. Moi non.",
        "{acc} me désigne. Je demande un dernier mot. Je dis : « vous allez vous sentir très bêtes demain matin ». On me pend. Le lendemain matin, personne ne s'est senti bête. C'est ça qui m'a le plus déçu{e}.",
        "{acc} lève la main avant tout le monde. Quatorze autres suivent. Je n'ai jamais été aussi populaire de ma vie, et jamais aussi brièvement.",
        "On me pend dans un silence total. Le bourreau s'excuse trois fois. Je lui dis que ce n'est pas grave. Il pleure. Je finis par le consoler, la corde au cou. {acc} aussi a beaucoup pleuré.",
        "Je meurs étranglé{e} par mon propre foulard, que j'avais noué trop serré ce matin-là pour avoir l'air digne. J'ai eu l'air digne.",
        "On me pend sous l'horloge, à midi. L'horloge sonne treize coups. Tout le monde fait semblant de n'avoir rien remarqué, y compris moi, et pourtant je suis mort{e}.",
        "Le village me pend. Trois minutes plus tard, {acc} dit : « bon… et si on s'était trompés ? ». [Il] s'était trompé[e].",
        "Je monte sur l'échafaud, je regarde la foule, et je reconnais absolument tout le monde, à commencer par {acc}. C'est ça, un village. On m'a pendu{e} entre gens de connaissance."
      ],
      2: [
        "On me pend, mais la corde est trop longue et je touche le sol. On recommence sur un tabouret. Le tabouret casse. On finit par me pendre assis{e}, ce qui n'a aucune dignité.",
        "{acc} propose le puits. Le puits est à sec depuis 1622. Personne n'avait pensé à vérifier, moi non plus, ce qui nous met à égalité.",
        "Je m'évanouis de peur avant l'exécution. On me pend évanoui{e}, ce qui est nettement plus confortable, et je me réveille mort{e}. Je recommande.",
        "On me pend avec une corde empruntée au Cordier. Le Cordier assiste à toute la scène en fixant sa corde, uniquement sa corde. Il l'a récupérée le soir même.",
        "Mes derniers mots sont : « attendez, j'ai une info capitale ». Je n'avais aucune info. Je voulais gagner trente secondes. J'en ai gagné douze.",
        "{acc} me reproche d'avoir gardé le silence au mauvais moment. J'avais simplement la bouche pleine. Personne ne m'a laissé le temps d'avaler.",
        "On me pend avec beaucoup de sérieux, beaucoup de dignité, et une corde de rideau. C'est le détail que ma famille n'a jamais pardonné.",
        "{acc} me désigne d'un geste du menton. Je demande si c'est bien à moi qu'[il] parle. [Il] confirme du menton. On ne discute pas avec un menton pareil."
      ],
      3: [
        "Je glisse sur la première marche de l'échafaud et je meurs de la chute, avant la corde. Le bourreau a trouvé ça d'un manque de respect total.",
        "{acc} tient à ce qu'on fasse les choses en grand : on me pend à la girouette du clocher. Le vent se lève. J'ai tourné toute la nuit, et la girouette indique le sud-ouest depuis.",
        "On me pend dans un silence parfait. Puis quelqu'un éternue. Puis tout le monde éternue. Je meurs au milieu d'une épidémie d'éternuements, et ça a beaucoup gâché la solennité.",
        "Un corbeau se pose sur mon épaule pendant la cérémonie et refuse de bouger. On l'a enterré avec moi. Il n'a jamais voulu partir.",
        "{acc} fait remarquer que le four du boulanger est déjà chaud et qu'il ne faut pas gaspiller la chauffe. On m'y enfourne avec une miche. La miche est ressortie parfaite. Personne n'a voulu la manger.",
        "{acc} a une idée : une charrette, un tas de foin, et moi par-dessus la colline. La partie « charrette » fonctionne. La partie « colline » aussi. On ne m'a jamais retrouvé{e}.",
        "On m'exécute pendant que la fanfare répète sur la place. Elle n'était au courant de rien. Quatorze musiciens, deux grosses caisses, et un morceau qu'il a bien fallu terminer.",
        "On me pousse du haut du moulin. La roue me rattrape en bas, me remonte, et me redépose en haut. On a recommencé trois fois avant que le meunier ne coupe l'eau."
      ],
      4: [
        "{acc} ne crie pas et n'accuse personne : [il] va à la mairie et me raye du registre communal à l'encre noire, à la règle. Je cesse d'exister dans l'heure, en pleine phrase.",
        "On me plie en quatre, on me tamponne deux fois, et on me classe au rayon des affaires closes, entre un litige de 1604 et une vieille histoire de chèvre.",
        "{acc} fait observer qu'on gagnerait un temps fou en me pendant mardi dernier. On me pend donc rétroactivement, et je meurs avant d'être arrivé{e} à cette semaine.",
        "Le village décide que je suis mort{e}. Je ne suis pas d'accord. Le village insiste. À la longue, il faut bien se ranger à l'avis général.",
        "On me remplace par une chaise vide. Les gens ont continué de me parler pendant trois semaines, par politesse. Puis ils ont arrêté. C'est ça qui m'a fait le plus mal.",
        "Je meurs d'une faute d'orthographe dans mon propre nom, découverte beaucoup trop tard. On a retrouvé mes vêtements soigneusement pliés sur la chaise.",
        "{acc} me tue avec une phrase. Une vraie phrase, au conditionnel passé, parfaitement construite. Depuis, le village évite ce temps-là dans les conversations importantes.",
        "On me pend. Je continue la conversation. Ça met tout le monde très mal à l'aise, mais j'avais encore des choses à dire."
      ]
    },

    nuit: {
      1: [
        "Je me couche tranquille. Je me réveille mort{e}. Entre les deux, quelque chose a manifestement eu lieu, mais je n'étais pas invité{e}.",
        "Je meurs dans mon sommeil, poliment, sans une seule marque. Au matin, on me retrouve assis{e} bien droit, souriant{e}, parfaitement mort{e}. J'ai toujours eu de la tenue.",
        "Je meurs à minuit pile, en même temps que l'horloge, ce qui est d'une élégance folle et absolument pas de mon fait.",
        "Le chien du Tavernier aboie sur tout, absolument tout. Cette nuit-là, il n'a pas aboyé une seule fois. On aurait dû s'inquiéter. Je dis ça pour vous.",
        "Quelque chose s'assied au bord de mon lit vers trois heures. Je ne me retourne pas. C'est la dernière décision de ma vie et je maintiens que c'était la bonne.",
        "On me retrouve au matin dans une pièce fermée de l'intérieur, la clé encore dans la serrure et la fenêtre bloquée depuis l'automne. J'aimerais beaucoup savoir, moi aussi."
      ],
      2: [
        "J'entends un bruit dans le mur. J'allume une bougie. Je regarde le mur. Le mur me regarde. Fin de l'histoire.",
        "Je souffle ma chandelle. Elle se rallume. Je la souffle encore. Elle se rallume encore. La troisième fois, c'est moi qu'on souffle.",
        "Quelque chose entre par la fenêtre. Je me dis : « c'est le chat ». Ce n'était pas le chat. Le chat, d'ailleurs, avait déménagé la veille.",
        "Je descends à la cave vérifier un bruit. Ça, c'est déjà une erreur. Tout le reste n'est que la conséquence logique de cette erreur.",
        "Je me lève pour boire un verre d'eau. Je passe devant le miroir du couloir. Le miroir ne me renvoie rien du tout. Je n'ai jamais bu ce verre d'eau.",
        "Je meurs gelé{e} en plein mois d'août, dans une chambre à trente degrés. Le givre s'arrêtait net au seuil de la porte, comme s'il savait où il avait le droit d'aller."
      ],
      3: [
        "Je me noie dans le tonneau de soupe à l'oignon de la cave. Je savais nager. Ça ne sert à rien : on ne nage pas dans la soupe, on s'y enfonce.",
        "Je fais un cauchemar dans lequel je meurs. Je me réveille en sursaut, soulagé{e}. Puis je meurs pour de bon. C'était donc une répétition.",
        "Une meule de fromage part toute seule dans la rue en pente, prend de la vitesse, tourne à gauche — ce qu'aucune meule ne fait — et me rattrape devant ma propre porte.",
        "Le plancher du grenier cède sous trois cents kilos de lentilles. Il a fallu deux jours pour vider la chambre à la pelle. J'étais tout au fond, dans mon lit, bien bordé{e}.",
        "Je meurs d'un fou rire déclenché par une remarque que personne d'autre n'a entendue. Quarante minutes sans reprendre mon souffle. On n'a jamais su la blague.",
        "Un piano tombe sur moi dans une ruelle de deux étages, depuis une hauteur de quatre étages, dans un village qui n'a jamais possédé de piano. Il était parfaitement accordé."
      ],
      4: [
        "Je deviens une heure. Il est dix-sept heures quarante en permanence dans ce village depuis, et le boulanger ne s'en remet pas.",
        "Je regarde par le trou de la serrure de la porte du fond. J'y passe en entier. Dans l'ordre : l'œil, la tête, le reste.",
        "Quelqu'un dit que je porte tout le village sur mes épaules. Vers trois heures du matin, ça cesse d'être une image.",
        "Le Sacristain me trouve endormi{e}, me plie soigneusement en huit, et me range dans le tiroir avec les nappes d'autel. Il jure ne pas avoir réfléchi.",
        "Je lis ma propre notice nécrologique dans le journal du surlendemain. Elle était très élogieuse et d'une précision remarquable.",
        "Je suis remplacé{e} pendant la nuit par un silence de la même taille et du même poids. Il tient très bien la conversation, à condition de ne pas attendre de réponse."
      ]
    }
  };

  /* ------------------------------------------------------------------ */
  /*  GREFFE DE L'IDÉE DU JOUEUR                                         */
  /* ------------------------------------------------------------------ */

  const GREFFES = [
    "Et pour mémoire : « {idee} ». Personne n'a voulu en tenir compte.",
    "J'avais pourtant prévenu : « {idee} ».",
    "Détail que j'emporte avec moi : « {idee} ».",
    "Ah, et : « {idee} ». Voilà, c'est dit.",
    "Je précise, tant que j'y suis : « {idee} ». Faites-en ce que vous voulez.",
    "Une dernière chose : « {idee} ». Vous comprendrez plus tard. Ou pas."
  ];

  /* ------------------------------------------------------------------ */
  /*  RÔLES — noms officiels (botc-translations, game/fr.json)           */
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
    1: "Sobre",
    2: "Drôle",
    3: "Loufoque",
    4: "Surréaliste"
  };

  global.LORE = {
    PRENOMS_M, PRENOMS_F,
    MORTS_ROLE, MORTS, GREFFES,
    ROLES, SCRIPTS, TYPES, CHAOS_LABELS
  };
})(window);
