# Product Gym — Charte design & UI Kit

**Version 1.0 · Référence pour Codex · MVP statique**  
Objectif : une interface calme qui rend la réflexion centrale. Ce document est la source de vérité pour l'UI du MVP.

## 1. Direction artistique

**Territoire :** carnet de travail éditorial × outil numérique précis.  
**Personnalité :** mature, calme, rigoureuse, humaine, sans effet de mode.  
**Principe :** le contenu et la décision sont l'interface. Le design disparaît au profit de la pensée.

**À faire :** typographie nette ; hiérarchie forte ; alignements précis ; surfaces blanches ; blancs généreux ; séparateurs fins ; micro-interactions utiles ; langage direct.  
**À éviter absolument :** gradients, glassmorphism, glow, ombres de cartes, emojis décoratifs, illustrations de mascottes, gamification, couleurs par compétence, dashboards de KPI, badges partout, micro-animations gratuites, plus d'un CTA primaire à la fois.

### Règles structurantes
1. **Une intention dominante par écran.** Une seule action primaire visible dans la zone principale.
2. **Moins de conteneurs.** Grouper avec espace et typographie avant de dessiner une carte.
3. **Pas de score décoratif.** Montrer exercices faits, décisions enregistrées et compétences travaillées, sans prétendre mesurer automatiquement une expertise.
4. **Aucune surprise.** Les données restent sur cet appareil ; l'ouverture de ChatGPT se fait explicitement.
5. **Pas de dark mode en V1.** Une seule apparence maîtrisée.

## 2. Identité

- **Nom** : `Product Gym` ; logotype textuel uniquement, capitalisation normale.
- **Signature facultative** : « Le jugement produit se pratique. »
- **Logo** : aucun pictogramme obligatoire ; le nom est la marque.
- **Iconographie** : Lucide en 18 ou 20 px, trait fin de 1.75 px, uniquement quand l'icône clarifie une action. Pas d'icône à chaque titre.
- **Ton** : direct, posé, adulte. « Reprendre l'exercice », « Formuler ma décision », « Voir l'objection », « Écrire mon bilan ». Éviter « Bravo champion », « XP », « Niveau débloqué ».

## 3. Tokens visuels

Tous les tokens CSS sont déclarés dans `tokens.css`. Ne pas créer de variantes de gris supplémentaires sans besoin démontré.

### Palette

| Token | Hex | Usage |
|---|---|---|
| `--pg-bg` | `#F8F8F5` | Fond de page, très légèrement chaud |
| `--pg-surface` | `#FFFFFF` | Zone de rédaction et surfaces utiles |
| `--pg-text` | `#151715` | Texte principal, bouton primaire |
| `--pg-muted` | `#5C625D` | Texte secondaire et métadonnées |
| `--pg-border` | `#E2E6E1` | Séparateurs discrets |
| `--pg-border-strong` | `#B9C2B9` | Champs / zones interactives |
| `--pg-accent` | `#18664F` | Focus, progression et états « terminé » |
| `--pg-accent-soft` | `#E9F3ED` | Fond de feedback léger / focus |
| `--pg-danger` | `#AD382D` | Destruction / erreur uniquement |
| `--pg-hover` | `#F1F2EF` | Survol neutre |

**Contraste vérifié** : texte principal sur blanc ≈ 18:1 ; texte secondaire sur blanc ≈ 6,25:1 ; accent sur blanc ≈ 6,88:1 (WCAG AA pour texte courant). Les états désactivés ne transmettent jamais une information essentielle par la couleur seule.

### Typographie

Police principale : `Geist` si disponible, avec fallback `Inter → system-ui`. Ne pas imposer de dépendance à une police externe pour afficher correctement l'app. Police monospace uniquement pour les numéros d'étapes et rares données structurées.

| Style | Taille desktop | Mobile | Poids | Interligne |
|---|---:|---:|---:|---:|
| Hero | 48 px | 36 px | 600 | 1.08 |
| Titre de page | 32 px | 28 px | 600 | 1.15 |
| Titre de section | 20 px | 20 px | 600 | 1.25 |
| Corps | 16 px | 16 px | 400 | 1.6 |
| Supporting UI | 14 px | 14 px | 400/600 | 1.45 |
| Métadonnée | 13 px | 13 px | 600 | 1.35 |

- Paragraphes : largeur idéale 55–75 caractères ; jamais de texte courant à 12 px.
- Sémantique typographique : un seul `h1` par vue, ordre logique des titres.
- Pas de tout-capitales hors très courts labels de catégorie.

### Espacement et formes

- Espacement : échelle `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64` px.
- Rayon : `6 px` petits contrôles, `10 px` boutons/champs, `14 px` rares panneaux. Aucun rayon 24+ px.
- Bordures : `1 px` ; **aucune ombre** en V1.
- Largeur page `1120 px` max ; zone de lecture `720 px` max.
- Desktop : marge latérale 40 px ; mobile : 20 px, à partir de 360 px de viewport.
- Taille cible interactive : minimum `44 × 44 px` quand pertinent ; espaces entre actions.

## 4. UI Kit — composants à créer

Limiter le kit à ces 10 composants. D'abord réutiliser les primitives shadcn/ui lorsqu'elles rendent bien le même comportement ; ne pas installer 3 bibliothèques différentes.

| Composant | Variantes / états | Règle UX |
|---|---|---|
| **Button** | Primary, Secondary, Quiet ; default, hover, focus, disabled, pending | Un seul primaire par écran ou étape ; hauteur 44 px |
| **TextArea** | Empty, writing, saved, error ; auto-save discret | Min. 220 px sur le parcours ; label explicite, aide optionnelle |
| **Input** | Default, focus, error, disabled | Uniquement pour import/export ou filtres si nécessaire |
| **FilterChip** | Rest, selected, focus | Sélection explicite avec `aria-pressed` ; filtres simples |
| **NavLink** | Default, active, focus | Navigation textuelle ; 3 entrées max |
| **ExerciseRow** | Not started, in progress, completed | Une ligne cliquable avec titre, compétence, temps, statut ; pas de card grid |
| **StepProgress** | 1 à 4, current | Nombre + ligne fine, pas de score ni de timer |
| **BriefPanel** | Collapsed/expanded on mobile | Contexte toujours accessible sans perdre la réponse |
| **FeedbackPanel** | Objection / note / success | Titre clair et bordure discrète ; aucune couleur seule |
| **Dialog / Toast** | Confirm delete, import error, saved | Dialog avec focus management ; toast ponctuel non intrusif |

### Spécification de comportement

**Button** : `Primary` fond noir + texte blanc ; `Secondary` contour gris et fond blanc ; `Quiet` sans bordure ni fond. Même ordre d'actions : secondaire à gauche, primaire à droite. L'état de chargement empêche le double déclenchement.

**TextArea** : texte 16 px, hauteur min. 220 px, resize vertical ; sauvegarde locale après modification via debounce court (ex. 400 ms) + au changement d'étape. Afficher « Enregistré sur cet appareil » après succès. Aucun faux état « Synchronisé ».

**ExerciseRow** : préférer une liste séparée par des lignes fines : index/compétence, titre, durée, état (ex. « À commencer », « En cours », « Terminé »). L'ensemble de la ligne est activable au clavier et au clic.

**StepProgress** : libellé « Étape 2 sur 4 · Décider », puis une ligne de progression 3 px. Ne pas mettre d'étape « Félicitations » obligatoire ; terminer sur une réflexion utile.

**BriefPanel** : sur desktop, zone de contexte latérale ou panneau au-dessus du champ ; sur mobile, accordéon « Relire le contexte », accessible sans quitter l'exercice.

**FeedbackPanel** : ne révéler l'objection qu'après une première réponse ; permettre de modifier la décision après confrontation et de garder une trace du bilan.

## 5. Écrans et grilles

### A. Accueil

- Header : logo textuel à gauche, `S'entraîner · Bibliothèque · Historique` à droite.
- Grand titre simple, deux lignes max, intro courte.
- Une zone « Continuer / Commencer » dominante : catégorie, durée, titre, CTA.
- En dessous : bibliothèque condensée + derniers entraînements en liste.
- Pas de jauges de compétence inventées ; afficher seulement activité factuelle.

### B. Bibliothèque

- Titre + une phrase de contexte.
- Filtre par les 4 compétences et par difficulté si nécessaire.
- Liste `ExerciseRow` avec séparation fine, pas de grille de cartes.
- État vide clair : « Aucun exercice pour ce filtre. » + « Effacer les filtres ».

### C. Exercice

- Retour, métadonnées, `StepProgress`, `h1`.
- Contenu principal dans colonne de lecture 720 px max.
- Étape 1 : contexte ; étape 2 : réponse libre ; étape 3 : objection / ChatGPT externe ; étape 4 : bilan.
- CTA primaire unique en bas de l'étape ; jamais deux chemins concurrents mis au même niveau.
- Sauvegarde locale automatique et message explicite avant ouverture de ChatGPT.

### D. Historique

- Liste datée des exercices travaillés, avec compétence et statut.
- Lecture intégrale du texte rédigé et du bilan, possibilité de reprendre.
- Actions `Exporter mes données` et `Importer mes données` en bas, pas au premier plan.

## 6. Responsive, accessibilité et motion

- Viewport 360–640 : une colonne, marges 20 px, boutons pleine largeur dans les formulaires, navigation compacte textuelle.
- 641–1023 : une colonne de lecture centrée ; pas de panneau latéral obligatoire.
- ≥ 1024 : composition plus aérée, panneau de contexte possible sans dépasser 1120 px.
- Clavier : tabulation logique, focus visible d'au moins 2 px contrasté, `Escape` ferme dialogs, retour du focus au déclencheur.
- Compatibilité lecteur d'écran : labels réels ; notifications autosave avec `role="status"` non envahissant ; `aria-pressed` sur filtres.
- Motion : transitions discrètes de 120–160 ms uniquement sur couleurs et surfaces ; respecter `prefers-reduced-motion`.
- Pas de timer qui tourne, d'animation d'accomplissement ou de score de compétence simulé.

## 7. Microcopy — ton de référence

| À privilégier | À éviter |
|---|---|
| « Formuler ma décision » | « Je passe à l'action ! » |
| « Voir l'objection » | « Découvre le challenge ultime » |
| « Enregistré sur cet appareil » | « Synchronisé dans le cloud » |
| « Reprendre l'exercice » | « Rejouer pour gagner des points » |
| « Ce que je retiens » | « Mon super score » |

## 8. Critères d'acceptation pour Codex

1. En ouvrant la V1, le prochain exercice est identifiable en moins de 5 secondes.
2. L'utilisateur peut commencer, écrire, quitter, revenir et retrouver sa réponse.
3. Un parcours complet tient sur mobile sans débordement horizontal à 360 px.
4. Tous les contrôles sont utilisables au clavier ; l'ordre du focus est compréhensible.
5. Les CTA ont des libellés d'action concrets et les états de stockage disent la vérité.
6. Les quatre étapes sont visuellement cohérentes ; aucune page n'introduit de nouveaux motifs arbitraires.
7. Aucune base de données, aucun compte, aucun outil analytics ou appel d'API IA n'a été ajouté.

## 9. Instruction courte à coller dans Codex

> Implémente l'interface Product Gym en prenant `DESIGN_SYSTEM.md` comme source de vérité et `tokens.css` comme base de tokens. Utilise l'aperçu `ui-kit.html` comme référence visuelle — pas comme architecture applicative. Priorité : lisibilité, hiérarchie éditoriale, accessibilité, simplicité et cohérence responsive. Ne crée pas de nouvelles variantes, d'effets, de couleurs ou de composants avant d'avoir vérifié si le kit existant couvre le besoin. Commence par la vue d'entraînement et une première boucle complète ; ne code pas toute la bibliothèque d'un coup.
