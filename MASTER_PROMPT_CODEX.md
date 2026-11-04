# MASTER PROMPT — Product Gym MVP / première implémentation

Tu es un binôme **Senior Frontend Engineer + Product Designer**. Tu vas construire Product Gym dans ce dépôt. Lis d'abord `AGENTS.md`, `design/DESIGN_SYSTEM.md`, `design/tokens.css`, `schemas/exercise.schema.json` et l'exercice `src/content/exercises/demo-01.json`. Considère `design/ui-kit.html` comme une **référence de style**, pas comme un code applicatif à recopier.

## Vision

Product Gym est un espace d'entraînement **sobre, adulte, non gamifié** pour développer le jugement produit par la pratique. L'utilisateur lit une situation réaliste, prend position, découvre une contradiction, puis écrit ce qu'il retient. Nous visons une expérience réellement utile en 10–15 minutes, pas une plateforme de e-learning.

## Contraintes absolues

- **100 % application statique** : React + TypeScript + Vite, Tailwind et composants accessibles (shadcn/ui seulement si pertinent).
- Aucune base de données, aucun backend/serverless, aucun login, aucun paiement, aucune API d'IA, aucun SDK analytics.
- Données pédagogiques en JSON locaux ; réponses, statut et bilan persistés sur ce navigateur (localStorage avec schéma versionné).
- Export **et import** d'un fichier JSON utilisateur avec validation, erreur claire et confirmation avant remplacement. Ne jamais importer / exporter les notes éditoriales.
- Mobile et desktop ; clavier utilisable ; contrastes/focus/labels corrects ; respects de `prefers-reduced-motion`.
- Style : éditorial, calme, très peu de surfaces encadrées ; fond #F8F8F5, texte #151715, accent #18664F ; une action primaire par étape. Ne pas inventer de nouveau design system.
- Jamais de réponse-type imposée ni de notation automatique d'expertise. Les champs « décisions possibles » sont absents de la donnée publique.

## Livrable de CETTE première passe

Construis une app navigable avec **seulement le contenu de `demo-01.json`** et trois espaces :

1. **Accueil / bibliothèque compacte** : un exercice disponible ; statut À commencer / En cours / Terminé ; accès direct.
2. **Parcours d'entraînement en quatre étapes** :
   - Lire : contexte, signaux, contraintes, question.
   - Décider : réponse libre conservée ; ne pas révéler l'objection avant qu'une réponse non vide soit soumise.
   - Se confronter : montrer l'objection préécrite, permettre de préciser sa décision ; proposer « Me challenger avec ChatGPT ».
   - Faire le bilan : 2–3 questions de réflexion, réponse libre, terminer. Relire l'historique ensuite.
3. **Historique simple** : exercices travaillés, dernière date, réponse initiale, éventuelle révision, bilan, reprise possible ; export/import des données.

### ChatGPT externe (important)

Sur clic explicite « Me challenger avec ChatGPT » :
- Construire un texte en français avec contexte de l'exercice, réponse de l'utilisateur et consigne de **contradicteur exigeant** (pas de solution instantanée, une objection à la fois, distinguer faits/hypothèses/choix, accepter plusieurs décisions valables).
- Le proposer en zone copiable / bouton « Copier le prompt » et ouvrir `https://chatgpt.com/` dans un nouvel onglet via action explicite. Si la copie est refusée, laisser le texte visible pour copie manuelle.
- **Ne pas** envoyer les données à ChatGPT via URL, requête réseau, API ou paramètre de recherche. Ne pas prétendre récupérer la discussion à son retour. Informer l'utilisateur qu'il devra coller le prompt dans ChatGPT puis revenir rédiger son bilan.
- Avertir discrètement de ne pas copier d'informations professionnelles confidentielles.

### Persistance

- Clés localStorage préfixées `product-gym:` et versionnées.
- Autosave de chaque texte ; sauvegarde immédiate en changeant d'étape ; reprise après reload.
- Ne pas écraser une réponse suite à un échec de stockage. Prévoir un état d'erreur actionnable.
- L'import valide le format, la version, les types, les identifiants d'exercice connus et la taille raisonnable des champs ; demande confirmation avant remplacement.
- Pas de synchronisation multi-appareil ; expliquer cette limite dans l'UI.

## Méthode de travail attendue

1. Évalue la structure initiale du dépôt, puis propose un plan d'implémentation court (composants, états, fichiers), **sans lancer de brainstorming produit**.
2. Scaffold le projet en préservant les documents existants.
3. Implémente **une boucle complète** avec le seul exercice de démonstration. Ne génère pas 12 nouveaux exercices.
4. Ajoute des vérifications automatiques réalistes : typecheck, build, validation du JSON, et tests unitaires ciblés si l'environnement le permet.
5. Effectue une revue QA : clavier, mobile 360 px, reload après saisie, objection verrouillée avant réponse, export/import, état localStorage indisponible, copie/prompt ChatGPT. Signale explicitement ce que tu n'as pas pu tester.
6. Termine par un résumé concis : fichiers ajoutés, commandes pour lancer l'app, scénarios testés, limites et **prochaine itération conseillée**.

**STOP après ce premier parcours.** Je veux le tester avant toute extension du contenu, du dashboard ou de la navigation.
