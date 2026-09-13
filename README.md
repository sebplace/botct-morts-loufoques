# 🕯️ Raconte ta mort

**Le village vient de te pendre, le Conteur te demande de raconter comment tu meurs,
et tu n'as aucune idée de quoi dire.**

Chez nous, quand quelqu'un est exécuté à [Blood on the Clocktower](https://bloodontheclocktower.com/),
il doit raconter sa mort de façon drôle. Tout le monde n'a pas l'imagination qu'il faut à
14 heures un dimanche. Cette app te donne une réplique : tu choisis ton rôle, tu tires, tu lis à
voix haute.

👉 **[Ouvrir l'app](https://sebplace.github.io/botct-morts-loufoques/)**

![Aperçu de Raconte ta mort](docs/capture.png)

---

## Ce que ça donne

**Voyante**

> « J'ai vu la corde. J'ai vu le chêne. J'ai vu l'heure. J'ai pas vu que c'était pour moi. »

**Fossoyeur**

> « Je creuse les tombes du village. La mienne était prête depuis mardi, bien droite, bien profonde. Ils m'ont jeté dans le puits. Trente ans de métier, même pas capables de m'enterrer correctement. »

**Ivrogne**

> « Je monte à l'échafaud en répétant que je suis la Voyante. Le bourreau me dit que non. Je lui dis que si. On discute. Il avait raison. Je l'apprends la corde au cou. »

**Saint**

> « Ils me pendent. Ils comprennent tout de suite. Ils s'excusent. Je pardonne, c'est mon métier. Mais franchement, quelle bande d'abrutis. »

**Jongleur**

> « Je jongle pour ma défense. Cinq balles. Ils applaudissent. Ils me pendent. Dans cet ordre. »

**Fou du roi**

> « Ils me pendent. Je me relève, j'époussette ma veste, je demande si ça compte. Ils disent non. Ils recommencent. Là, ça compte. »

**Sans rôle précisé**

> « Ils me pendent au vieux chêne. La branche casse. Ils recommencent avec une plus solide. Elle tient. Moi non. »

---

## Ce qu'il y a dedans

| | |
|---|---|
| 🎭 **Une mort écrite pour chacun des 87 rôles** | Chaque personnage a sa propre blague, tirée de ce qu'il est dans le jeu. Le Fossoyeur creuse, la Voyante n'a rien vu venir, le Fou du roi se relève, le Marin est trop ivre pour mourir, le Zombuul y passe deux fois. |
| 🗣️ **Fait pour être dit à voix haute** | Deux à quatre phrases, une chute. Tu lis, ou tu t'en sers comme point de départ et tu brodes. |
| 🎚️ **Niveau de délire** | De *sobre* (la branche casse, on recommence, elle tient, toi non) à *surréaliste* (on te raye du registre communal à la règle et tu cesses d'exister en pleine phrase). |
| ⚖️🌙 **Exécution ou mort nocturne** | Les morts sur mesure sont écrites pour l'exécution — c'est le moment où on te demande de raconter. 56 morts génériques couvrent les deux cas. |
| 💬 **Ton détail perso** | Tu peux glisser une réplique à toi, citée telle quelle à la fin. |
| 🖥️ **Tout sur un écran** | Les réglages sont au-dessus, la réplique en dessous. Tu changes de rôle et tu retires sans jamais scroller. |
| ✍️ **Accord en genre** | Automatique, pour toi comme pour la personne qui t'a fait pendre. |
| 🔗 **Permalien** | Pour renvoyer ta mort dans la conversation de groupe après la partie. |
| 🗃️ **Tes dix dernières** | Gardées dans ton navigateur. |

**Raccourcis :** <kbd>Espace</kbd> une autre mort · <kbd>C</kbd> copier · <kbd>P</kbd> permalien.
Cliquer sur la réplique en tire une autre.

---

## Installation

Aucune. Page statique, sans dépendance, sans build, sans réseau.

```bash
git clone https://github.com/sebplace/botct-morts-loufoques.git
cd botct-morts-loufoques
# ouvre index.html, ou :
python -m http.server 8000
```

Tout est généré dans le navigateur : **aucune donnée ne sort de ta machine.**

---

## Ajouter tes propres morts

Tout est dans [`data/lore.js`](data/lore.js).

**Une mort pour un rôle** — dans `MORTS_ROLE`, la clé est l'`id` du rôle :

```js
fossoyeur: "J'avais creusé ma tombe trois jours à l'avance, par habitude professionnelle. Le village me jette dans le puits. Ma tombe est toujours là, vide, impeccable. Personne ne l'a jamais utilisée.",
```

**Une mort générique** — dans `MORTS.jour` ou `MORTS.nuit`, rangée par niveau de délire (`1` à `4`) :

```js
3: [
  "On me pend dans un silence parfait. Puis quelqu'un éternue. Puis tout le monde éternue. Je meurs au milieu d'une épidémie d'éternuements, et ça a beaucoup gâché la solennité."
]
```

Trois règles :

1. **Première personne, présent, registre parlé.** C'est toi qui parles, debout, devant la table.
   On avale les « ne » (*j'ai pas vu*, *ils osent pas*), on dit *du coup*, *voilà*, *bref*.
2. **Deux à quatre phrases, une chute sèche.** Si ça ne tient pas en dix secondes à voix haute,
   c'est trop long. La dernière phrase doit être la plus courte.
3. **La blague vient du rôle ou du village**, pas de la mécanique. On peut parler du Démon, du
   chêne, du bourreau, du beffroi. On ne parle pas de votes, de camps ni de capacités.

Et une interdiction, parce que c'est le piège principal : **pas de commentaire rapporté en fin de
phrase**. Le « …, ce qui est assez vexant pour un professionnel » est un calque d'anglais
(*which is, frankly, …*) : ça explique la blague au lieu de la faire. On coupe et on met un point.

| ❌ | ✅ |
|---|---|
| On me pend assis, ce qui n'a aucune dignité. | Ils ont fini par me pendre assis. Aucune dignité. |
| Le village est bien pire : il est nombreux. | Le village, c'est pire : ils sont quinze. |
| Je m'évanouis, ce qui est plus confortable. | Ils me pendent évanoui. Franchement, c'est la bonne méthode. |

Un lint vérifie ces tics : `, ce qui est`, `tout compte fait`, `je note les noms`,
`c'est ça, un …`. Il passe sur les 149 textes.

Marqueurs disponibles :

| Marqueur | Se rapporte à | Masculin | Féminin |
|---|---|---|---|
| `{e}` | toi | *(rien)* | `e` |
| `[e]` | qui t'a fait pendre | *(rien)* | `e` |
| `[il]` / `[Il]` | qui t'a fait pendre | il / Il | elle / Elle |
| `{acc}` | — | *(son prénom)* | |

Sers-toi de `{acc}` : c'est ce qui rend le champ « qui t'a fait pendre » utile. Il apparaît
aujourd'hui dans 14 des 32 répliques d'exécution génériques.

⚠️ N'utilise `{e}` que sur un mot dont le féminin s'obtient bien en ajoutant un « e ».
Pas de `furieux{e}`, pas de `professionnel{e}` — reformule.

---

## Terminologie française

Les noms des rôles suivent la traduction française publiée par The Pandemonium Institute pour son
application officielle :
[`ThePandemoniumInstitute/botc-translations`](https://github.com/ThePandemoniumInstitute/botc-translations),
fichier `game/fr.json`. TPI précise dans ce même fichier que la traduction est l'œuvre de bénévoles
non affiliés — c'est néanmoins celle que voient les joueurs francophones dans le produit officiel.
Il n'existe à ce jour aucune édition française commerciale du jeu.

---

## Licence & mentions

Code et textes sous licence [MIT](LICENSE).

Projet de fan, **non officiel**, sans aucun lien avec The Pandemonium Institute.
*Blood on the Clocktower* et les noms de rôles cités sont la propriété de leurs ayants droit ;
aucun texte de règles n'est reproduit ici.

Bonne nuit, tout le monde. 🕯️
