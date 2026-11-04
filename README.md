# Product Gym

Première boucle statique, uniquement avec `demo-01` : lire, décider, se confronter, faire le bilan. React 19, TypeScript, Vite 7 et Tailwind 4 ; Node 24 et Python 3 ont été utilisés pour la validation.

## Développement

```sh
npm ci
npm run dev
```

Dans l’environnement cloud, conserver le proxy et la vérification TLS. Les opérations réseau, l’exécution d’esbuild et l’écoute du serveur peuvent nécessiter une autorisation d’exécution élargie du runner. Ne pas désactiver les vérifications pour contourner une erreur EPERM.

```sh
npm run typecheck
npm test
npm run validate:content
npm run build
npm run preview
```

Le build statique est dans `dist/`. Les notes `editorial/` et les références de design ne sont pas importées dans l’application. Publier uniquement `dist/`, jamais la racine du dépôt.

## Données

Les textes sont enregistrés dans `product-gym:v1` sur le navigateur courant. L’export/import JSON ne contient que les données utilisateur ; un import valide nécessite une confirmation avant remplacement. En cas d’échec de stockage, garder la page ouverte et exporter avant de quitter. Une erreur de lecture empêche l’écrasement automatique du stockage existant. Revenir avant la confrontation conserve la décision initiale ; les précisions sont saisies séparément.

ChatGPT s’ouvre uniquement depuis le lien explicite. Le prompt reste copiable manuellement, aucune réponse n’est envoyée par URL ou API. L’utilisateur doit revenir rédiger son bilan.

## Vérification navigateur facultative

Installer Playwright dans un dossier de QA séparé puis utiliser le Chromium du système :

```sh
npm install --prefix /tmp/product-gym-qa playwright@1.56.1
PLAYWRIGHT_MODULE=/tmp/product-gym-qa/node_modules/playwright/index.mjs node tests/browser.mjs
```

Le serveur doit être lancé auparavant. `TEST_URL` (par défaut le serveur Vite sur le port 5173) et `CHROMIUM_PATH` sont configurables. Les tests couvrent la boucle, la reprise, l’objection, l’historique, l’import/export, l’annulation clavier, le stockage indisponible/corrompu, le refus du presse-papiers et les tailles 360/1280 px. L’ouverture de ChatGPT est interceptée localement pour éviter toute requête réelle. Captures de QA : `/tmp/product-gym-mobile.png` et `/tmp/product-gym-desktop.png`.

Les contrôles automatiques ne remplacent pas une validation humaine au clavier et avec lecteur d’écran.
