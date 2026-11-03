---
source: https://developers.cloudflare.com/pages/migrations/migrating-from-firebase/
---

# Migrating from Firebase

Move a Firebase Hosting site to Pages using its build command and the `public` directory from `firebase.json`.

## Signature / Usage

The `public` key in `firebase.json` is your build output directory:

```json
{
	"public": "public"
}
```

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases); see the cloudflare-workers skill (static-assets/migrate-from-pages).
- Firebase Hosting does not ask for a build command; use the one for your framework (for example `ng build`). The source suggests `npm build`, which is not a valid npm command; `npm run build` is the script form.
- Push the static site to GitHub first to get automatic deployments and preview deployments, then create the Pages project with the saved build command and directory.
- Afterwards remove the old Firebase project and change the domain's CNAME record from Firebase to Cloudflare Pages.

## Related

- [Get started with Git integration](./get-started-git-integration.md)
- [Preview deployments](../configuration/preview-deployments.md)
