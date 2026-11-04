# Instructions permanentes — Product Gym

Product Gym est une petite application statique d'entraînement au jugement produit pour Product Designers confirmés/seniors. Respecter `MASTER_PROMPT_CODEX.md` pour le travail initial ; `design/DESIGN_SYSTEM.md` est la source de vérité UI.

## Contraintes non négociables

- React + TypeScript + Vite ; Tailwind CSS et composants accessibles, shadcn/ui si utile. Pas de backend, DB, authentification, API LLM, trackers ni analytics tiers.
- Fichiers `src/content/exercises/*.json` comme source de contenu ; respecter `schemas/exercise.schema.json`. Les notes `editorial/` sont internes et ne sont jamais servies par l'app.
- Sauvegarder les réponses / bilans / statuts en local avec versionnement des données et validation des imports. Indiquer honnêtement « enregistré sur cet appareil ». Prévoir export/import JSON. Gérer erreurs et navigateur privé / stockage inaccessible sans perte silencieuse.
- N'ouvrir ChatGPT **que sur action explicite** ; préparer un texte copiable, sans données privées transmises automatiquement, sans clé API ni URL contenant la réponse en clair.
- Aucune « bonne réponse » suggérée avant l'engagement de l'utilisateur. L'objection et le débrief ne se dévoilent qu'aux moments prévus par la progression.
- Une action primaire par étape ; respect du système de design fourni. Interface desktop/mobile, focus visibles, formulaires étiquetés, clavier, préférences de mouvement réduit.
- Ne pas confondre progression d'activité et score de compétence. Pas de pourcentage de maîtrise inventé, XP, badges ou streaks.

## Méthode de réalisation

1. Inspecter l'existant, énoncer brièvement l'approche et les hypothèses techniques.
2. Construire **un parcours complet avec `demo-01.json`**, pas 12 exercices d'un coup.
3. Vérifier build, typage, validations JSON et les parcours clés (reprise, retour, export/import, ouverture externe, erreurs).
4. Faire une courte revue finale : réalisé / testé / limites ; demander l'itération suivante seulement après le premier parcours.
5. Pour créer ou auditer des exercices, utiliser le skill local `$product-gym-exercise-architect`. Ne jamais écrire du contenu pédagogique de masse sans audit.

Privilégier la solution la plus simple qui fonctionne ; documenter toute décision qui sort des contraintes.
