# Mayo — Back-office & API

## Variables d'environnement (Vercel)

| Nom | Rôle |
|---|---|
| `GOOGLE_SERVICE_ACCOUNT_JSON` | JSON complet du compte de service Google (Sheets API activée, partage de la Sheet en *Editor* sur l'email du SA). |
| `SHEET_ID` | ID du Google Spreadsheet (segment entre `/d/` et `/edit` dans l'URL). |
| `ADMIN_PASSWORD` | Mot de passe d'accès au back-office `/admin`. |

## Endpoints

- `POST /api/waitlist` — public, capture les leads (`source`: `quiz` · `contact` · `rappel`).
- `GET /api/leads` — protégé (header `X-Admin-Password`), liste les leads.
- `POST /api/lead-status` — protégé, met à jour le statut (`nouveau` · `contacté` · `visite` · `inscrit` · `perdu`).

## Onglet `Leads` de la Sheet

Colonnes (ordre figé, créé automatiquement) :
`id | created_at | status | source | parent_name | email | phone | child_age_months | preferred_site | highlighted_language | days_per_week | desired_start | income_bracket | nb_children | monaco_worker | estimated_net_cost | message | locale`

## Back-office

`/admin` — connexion par mot de passe (vérifié côté serveur), onglets **Inscriptions / Crèches / SEO**.

## CMG — source unique

Toute estimation passe par `src/lib/cmg.ts` (`computeCmg` au cœur). Le simulateur (`CafSimulator.tsx`) et le quiz (`IdealCareQuiz.tsx`) appellent ce même module : un même profil donne le même montant des deux côtés.
