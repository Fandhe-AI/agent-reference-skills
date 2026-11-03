---
source: https://developers.cloudflare.com/pages/get-started/direct-upload/
---

# Direct Upload

Upload prebuilt assets to Pages with Wrangler or drag and drop, without a Git connection.

## Signature / Usage

```sh
npx wrangler pages project create
```

```sh
npx wrangler pages deploy <BUILD_OUTPUT_DIRECTORY>
```

Preview environment (a branch alias `<BRANCH_NAME>.<PROJECT_NAME>.pages.dev` is created):

```sh
npx wrangler pages deploy <OUTPUT_DIRECTORY> --branch=<BRANCH_NAME>
```

```sh
npx wrangler pages project list
npx wrangler pages project list --json
npx wrangler pages deployment list
```

Change the production branch of a Direct Upload project through the API:

Adapted (not in the official docs): the API token is read from an environment variable and the placeholders are shell variables, so the token is not typed into a shell history line or committed; see Notes.

```bash
# Export CLOUDFLARE_API_TOKEN, ACCOUNT_ID and PROJECT_NAME first
curl --request PATCH \
"https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT_NAME}" \
--header "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
--header "Content-Type: application/json" \
--data '{"production_branch": "main"}'
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `--branch` | string | current git branch | Deploys to a preview environment under that branch alias; outside a Git workspace you must pass it. |
| `--json` | flag | — | `pages project list` output as JSON. |

Upload limits:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Wrangler | limit | 20,000 files | 25 MiB per file. |
| Drag and drop | limit | 1,000 files | 25 MiB per file. |

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases); see the cloudflare-workers skill (static-assets/migrate-from-pages and static-assets/direct-upload).
- A Direct Upload project cannot be switched to Git integration later; create a new Git project instead.
- Run your framework's build first. Wrangler accepts a single folder (no zip files); drag and drop accepts a zip or a folder.
- `wrangler pages project create` prompts for project name and production branch; both are saved in `node_modules/.cache/wrangler` and reused. `wrangler pages deploy` can also create the project. If the cache exists and you want a new project, run `create` explicitly.
- Corrected from the official docs: one note says existing Git-integrated projects can be deployed manually with `wrangler deploy`; Pages projects are deployed with `wrangler pages deploy` as shown elsewhere on the same page.
- Free-plan file limit is 20,000; paid plans can use 100,000 by setting `PAGES_WRANGLER_MAJOR_VERSION=4` (see Limits).
- Drag and drop: **Create application** > **Get started** > **Drag and drop your files**. A red warning marks a too-large asset; you can delete it but not replace it, so re-upload the whole project. You can switch between Wrangler and drag and drop within a Direct Upload project.
- Functions: dashboard drag and drop cannot compile a `functions` folder; use Wrangler (a `functions` folder in the working directory is uploaded). A `_worker.js` file works with both.
- Direct Upload projects have no production branch controls; the PATCH call above updates it (keep the token out of version control).
- Adapted from the official docs: the official command embeds `<API_TOKEN>`, `{account_id}` and `{project_name}` literally; they are shell variables here.
- CI usage: see the Direct Upload with continuous integration guide.

## Related

- [Direct Upload with continuous integration](./use-direct-upload-with-continuous-integration.md)
- [Get started with Git integration](./get-started-git-integration.md)
- [Limits](./limits.md)
