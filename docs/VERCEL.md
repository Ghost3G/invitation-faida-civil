# Déploiement Vercel — Invitation Faida

## Modèle

- **Invitation** → Vercel (ce projet)
- **3Gevents** → Render (API + dashboard + Postgres)
- Chaque client = une invitation Vercel séparée (Option A)

## Déployer

```bash
# Depuis ce dossier
npx vercel
# Production
npx vercel --prod
```

Ou : importer le repo GitHub sur [vercel.com/new](https://vercel.com/new).

## Variables d'environnement (Vercel → Settings → Environment Variables)

| Variable | Exemple | Notes |
|----------|---------|--------|
| `THREEG_API_URL` | `https://3gevents-api.onrender.com/api/v1` | À renseigner **après** le déploiement API Render |
| `THREEG_TENANT_SLUG` | `mariage-lumiere-faida` | |
| `THREEG_EVENT_SLUG` | `mariage-civil` | |
| `NEXT_PUBLIC_INVITATION_URL` | `https://….vercel.app` | URL du déploiement |
| `RSVP_ADMIN_SECRET` | (secret fort) | Optionnel |

Sans `THREEG_API_URL`, l'invitation s'affiche mais les RSVP **ne partent pas** vers le dashboard 3G.

## Après l'API Render

1. Mettre `THREEG_API_URL` sur Vercel
2. Ajouter l'URL Vercel dans `CORS_ORIGIN` de l'API Render
3. Redeploy / Redémarrer si besoin
4. Tester une confirmation → visible dans 3G
