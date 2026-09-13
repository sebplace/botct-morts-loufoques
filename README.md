# 🕯️ Raconte ta mort

**Tu viens de mourir en pleine partie de [Blood on the Clocktower](https://bloodontheclocktower.com/) ?
Dis-nous qui tu étais, on s'occupe de la version officielle.**

Tu donnes ton prénom, ton rôle, comment tu es mort et éventuellement une idée à toi.
L'app en tire une **brève histoire de mort parfaitement absurde**, à Ravenswood Bluff, en deux ou
trois paragraphes. C'est tout. C'est le seul but de cette application.

👉 **[Ouvrir le générateur](https://sebplace.github.io/botct-morts-loufoques/)**

![Aperçu de Raconte ta mort](docs/capture.png)

---

## Un exemple

Prénom *Sébastien*, rôle *Fossoyeur*, mort *pendant la nuit*,
idée *« j'avais caché un fromage sous mon siège »* :

> On raconte que **Sébastien**, le Fossoyeur, a entendu quelque chose, cette nuit-là, et a préféré se rendormir.
>
> Une dernière chose, notée en marge du registre : *« j'avais caché un fromage sous mon siège »*. Personne n'a jamais su pourquoi.
>
> On l'a retrouvé écrasé par une meule de fromage lancée à contresens dans une rue en pente, dans le clocher, coincé entre deux cloches, au moment où quelqu'un venait de dire « bon, on récapitule ». Les grenouilles de l'étang se sont tues pendant exactement quarante minutes.

Et pour une exécution, avec *Marguerite* comme accusatrice :

> La journée avait pourtant bien commencé, jusqu'à ce que **Marguerite** prononce le nom de **Sébastien**, le Fossoyeur, d'une voix un peu trop forte.
>
> Il a fini écrasé par le buste du Fondateur, descellé par l'enthousiasme général, juste après avoir affirmé n'avoir peur de rien. Son fauteuil était encore chaud, mais il est mort debout, à trois mètres de là.

---

## Ce qu'il y a dedans

| | |
|---|---|
| ✍️ **Deux ou trois paragraphes, pas plus** | Une ouverture, ton idée si tu en donnes une, puis la mort elle-même avec un dernier détail inquiétant. Pas de commentaire, pas de morale, pas de règles. |
| 🌙⚖️ **Mort nocturne ou exécution** | 72 façons absurdes de mourir dans son lit, 40 façons absurdes d'être exécuté par le village. |
| 🎚️ **Niveau d'absurdité** | De « gothique sobre » (mort sans une marque, cœur arrêté au carillon) à « absurdité totale » (rayé du registre communal, ce qui s'est avéré parfaitement suffisant). |
| 🎭 **Ton rôle, si tu veux** | Les 87 rôles officiels sont dans la liste ; le tien sert simplement à te nommer dans l'histoire — « Sébastien, le Fossoyeur ». Tu peux aussi ne rien dire. |
| ✍️ **Accord en genre automatique** | « On l'a retrouvé**e** noyé**e** » / « On l'a retrouvé noyé », pour toi comme pour la personne qui t'a fait exécuter. |
| ⟳ **Un clic sur un paragraphe le réécrit** | Sans toucher aux autres. |
| 🔗 **Permalien reproductible** | L'URL rejoue exactement le même récit, tes réponses comprises. |
| 🗃️ **Tes douze derniers récits** | Conservés dans ton navigateur, rejouables d'un clic. |

**Raccourcis :** <kbd>Espace</kbd> nouveau récit · <kbd>C</kbd> copier · <kbd>P</kbd> permalien.

---

## Installation

Aucune. C'est une page statique, sans dépendance, sans build, sans réseau.

```bash
git clone https://github.com/sebplace/botct-morts-loufoques.git
cd botct-morts-loufoques
# ouvre index.html dans un navigateur, ou :
python -m http.server 8000
```

Tout est généré dans le navigateur : **aucune donnée ne sort de ta machine.**

---

## Structure

```
index.html      le formulaire et le parchemin
styles.css      thème gothique (clocher animé, parchemin, sceau de cire)
app.js          moteur : hasard reproductible, accord en genre, rendu, permaliens
data/lore.js    toutes les tables de texte — c'est ici qu'on écrit
```

---

## Écrire tes propres morts

Tout le contenu vit dans [`data/lore.js`](data/lore.js). Une façon de mourir est un couple
`[description, titre de l'affaire]` :

```js
// dans MANIERES — se place après « On l'a retrouvé{e} … »
["noyé{e} dans un tonneau de soupe à l'oignon encore tiède", "L'Affaire du Tonneau Tiède"]

// dans MODES_EXECUTION — se place après « {Il} a fini … »
["pendu{e} par les bretelles à la girouette, qui a tourné toute la nuit", "L'Exécution Girouette"]
```

Les deux tables sont rangées par niveau d'absurdité, de `1` (sobre) à `4` (absurde).

Marqueurs d'accord, qui se rapportent au personnage :

| Marqueur | Masculin | Féminin |
|---|---|---|
| `{e}` | *(rien)* | `e` |
| `{il}` / `{Il}` | il / Il | elle / Elle |
| `{le}` | le | la |
| `{un}` | un | une |
| `{lui}` | lui | elle |

Entre crochets — `[e]`, `[il]`, `[Il]` — l'accord se rapporte à la personne qui a fait exécuter.
Ces marqueurs-là ne servent que dans `OUVERTURES_JOUR`.

Les autres tables : `OUVERTURES_NUIT` et `OUVERTURES_JOUR` (la première phrase),
`AMORCES_IDEE` / `AMORCES_IDEE_JOUR` et `SUITES_IDEE` (l'enrobage de ton idée),
`LIEUX`, `MOMENTS` et `DETAILS` (le décor et la chute), `ROLES` (la liste déroulante).

Une seule règle d'écriture : **pas de mécanique de jeu**. Pas de vote, pas de camp, pas de
capacité, pas de Conteur. Juste des gens qui meurent bêtement dans un village.

---

## Terminologie française

Les noms des rôles suivent la traduction française publiée par The Pandemonium Institute pour son
application officielle :
[`ThePandemoniumInstitute/botc-translations`](https://github.com/ThePandemoniumInstitute/botc-translations),
fichier `game/fr.json`.

⚠️ TPI précise dans ce même fichier que la traduction est l'œuvre de bénévoles non affiliés. C'est
néanmoins la terminologie que voient les joueurs francophones dans le produit officiel — donc celle
qu'utilise ce projet. Il n'existe à ce jour aucune édition française commerciale du jeu.

**Ravenswood Bluff** n'est pas traduit, conformément à cette même version française : le texte de
règles officiel s'ouvre sur *« Dans la paisible bourgade de Ravenswood Bluff, au cœur d'une nuit
d'orage, un cri retentit à minuit pile… »*

---

## Licence & mentions

Code et textes sous licence [MIT](LICENSE).

Projet de fan, **non officiel**, sans aucun lien avec The Pandemonium Institute.
*Blood on the Clocktower* et les noms de rôles cités sont la propriété de leurs ayants droit ;
aucun texte de règles n'est reproduit ici. Cette app ne fait qu'inventer des façons ridicules
de mourir à Ravenswood Bluff.

Bonne nuit, tout le monde. 🕯️
