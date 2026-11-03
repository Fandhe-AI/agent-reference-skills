---
source: https://developers.cloudflare.com/pages/migrations/migrating-from-firebase/
---

# Migrating from Firebase

Move a Firebase Hosting site to Pages using its build command and the `public` directory from `firebase.json`.

## Signature / Usage

The `hosting.public` key in `firebase.json` is your build output directory. Adapted (not in the official docs): the source shows `public` at the top level; in `firebase.json` it sits under `hosting` (with multiple sites, read it from the matching `hosting` entry):

```json
{
	"hosting": {
		"public": "public"
	}
}
```

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases); see the cloudflare-workers skill (static-assets/migrate-from-pages).
- Firebase Hosting does not ask for a build command; use the one for your framework (for example `ng build`). The source suggests `npm build`, which is not a valid npm command; `npm run build` is the script form.
- Push the static site to GitHub first to get automatic deployments and preview deployments, then create the Pages project with the saved build command and directory.
- Cut over in this order: add the custom domain to the Pages project, change the domain's CNAME record from Firebase to Cloudflare Pages, and confirm the site is served by Pages. Only then retire the Firebase Hosting site itself (for example `firebase hosting:disable`).
- Adapted from the official docs: the source says to delete the Firebase project afterwards. Deleting the project also deletes any Authentication, Firestore, Storage or other Firebase services in it, and deleting before the DNS switch takes the old site offline; this page only retires Hosting after the cutover.
- Adapted from the official docs: the source's `firebase.json` example puts `public` at the top level; it is `hosting.public`.

## Related

- [Get started with Git integration](./get-started-git-integration.md)
- [Preview deployments](../configuration/preview-deployments.md)
