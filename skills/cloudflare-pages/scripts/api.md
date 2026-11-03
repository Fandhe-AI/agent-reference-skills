---
source: https://developers.cloudflare.com/pages/configuration/api/, https://developers.cloudflare.com/pages/configuration/branch-build-controls/, https://developers.cloudflare.com/pages/configuration/deploy-hooks/
---

# Pages REST API

Copy-paste `curl` commands for the Pages REST API. Export credentials once in the shell instead of typing them inline; never commit them.

## Set credentials

Adapted (not in the official docs): the token is read from a silent prompt so it is not typed into a command line or shell history.

Run this in Bash or Zsh: `read -s` is not POSIX `sh` (it fails in dash, for example `/bin/sh` on Ubuntu). In a POSIX shell use `stty -echo; read CLOUDFLARE_API_TOKEN; stty echo` instead of the `read` line.

```bash
export ACCOUNT_ID="<ACCOUNT_ID>"
export PROJECT_NAME="<PROJECT_NAME>"
read -rs CLOUDFLARE_API_TOKEN && export CLOUDFLARE_API_TOKEN  # paste the token, then press Enter
```

The API token needs the Cloudflare Pages permission (`Pages Read` for reads, `Pages Write` for changes). Create it under Account API tokens, either from the Edit Cloudflare Workers template or as a custom token with Cloudflare Pages Edit.

## List deployments of a project

```bash
curl "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT_NAME}/deployments" \
	--request GET \
	--header "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}"
```

## Update the production branch (Direct Upload projects)

```bash
curl --request PATCH \
  "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT_NAME}" \
  --header "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{"production_branch": "main"}'
```

Adapted from the official docs: placeholders replaced by quoted environment variables.

## Trigger a build with a deploy hook

Deploy hooks are created in the dashboard under the Pages project **Settings** > **Builds** > **Add deploy hook**; the dashboard shows the unique URL and a ready-made POST snippet to copy. The source does not give a command line for it, so copy that snippet from the dashboard.

> **Warning**: A deploy hook URL needs no further authentication. Treat it like an application secret, do not commit it, and delete and regenerate it if you suspect unauthorized use.

## Related

Full endpoint and object reference: https://developers.cloudflare.com/api/resources/pages/subresources/projects/methods/list/
