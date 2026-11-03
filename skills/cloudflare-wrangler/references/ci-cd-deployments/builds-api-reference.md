---
source: https://developers.cloudflare.com/workers/ci-cd/builds/api-reference/
---

# Workers Builds API

Use the Workers Builds REST API to connect a Worker to a Git repository, manage build settings and Previews, and monitor builds.

## Signature / Usage

Get the Worker tag (the API identifies Workers by immutable `tag`, appearing as `script_tag`, not by name):

```bash
curl -s "https://api.cloudflare.com/client/v4/accounts/{account_id}/workers/scripts" \
  --header "Authorization: Bearer <API_TOKEN>" \
  | jq '.result[] | {name: .id, tag: .tag}'
```

Connect a Worker to a repository:

```bash
curl -s "https://api.cloudflare.com/client/v4/accounts/{account_id}/builds/workers" \
  --header "Authorization: Bearer <API_TOKEN>" \
  --header "Content-Type: application/json" \
  --request POST \
  --data '{
    "script_tag": "<WORKER_TAG>",
    "git_repository": {
      "provider_type": "github",
      "provider_account_id": "<GITHUB_USER_ID>",
      "provider_account_name": "<GITHUB_USERNAME>",
      "repo_id": "<GITHUB_REPO_ID>",
      "repo_name": "<REPO_NAME>",
      "branch": "main"
    },
    "production_settings": {
      "build_command": "npm run build",
      "deploy_command": "npx wrangler deploy",
      "build_token_uuid": "<BUILD_TOKEN_UUID>",
      "environment_variables": {
        "NODE_ENV": {"value": "production", "is_secret": false}
      }
    },
    "previews_enabled": true,
    "previews_base_config": {
      "build_command": "npm run build",
      "deploy_command": "npx wrangler preview",
      "build_token_uuid": "<BUILD_TOKEN_UUID>",
      "environment_variables": {
        "NODE_ENV": {"value": "development", "is_secret": false}
      }
    }
  }'
```

Get build settings, list builds, get build logs, and cancel a build:

```bash
curl -s "https://api.cloudflare.com/client/v4/accounts/{account_id}/builds/workers/{worker_tag}" \
  --header "Authorization: Bearer <API_TOKEN>"

curl -s "https://api.cloudflare.com/client/v4/accounts/{account_id}/builds/workers/{worker_tag}/builds" \
  --header "Authorization: Bearer <API_TOKEN>" \
  | jq '.result[] | {build_uuid, status, build_outcome, branch: .build_trigger_metadata.branch, created_on}'

curl -s "https://api.cloudflare.com/client/v4/accounts/{account_id}/builds/builds/{build_uuid}/logs" \
  --header "Authorization: Bearer <API_TOKEN>"

curl -s "https://api.cloudflare.com/client/v4/accounts/{account_id}/builds/builds/{build_uuid}/cancel" \
  --header "Authorization: Bearer <API_TOKEN>" \
  --request PUT
```

Update a Preview (PATCH) and build a Preview (POST):

```bash
curl -s "https://api.cloudflare.com/client/v4/accounts/{account_id}/builds/workers/{worker_tag}/previews/{preview_id}" \
  --header "Authorization: Bearer <API_TOKEN>" \
  --header "Content-Type: application/json" \
  --request PATCH \
  --data '{
    "auto_build": false,
    "settings": {
      "build_command": "npm run build:preview"
    }
  }'

curl -s "https://api.cloudflare.com/client/v4/accounts/{account_id}/builds/workers/{worker_tag}/previews/{preview_id}/builds" \
  --header "Authorization: Bearer <API_TOKEN>" \
  --header "Content-Type: application/json" \
  --request POST \
  --data '{"branch": "feature-branch"}'
```

## Options / Props

API token permissions (must be a **user-scoped** token; account-scoped tokens return "Invalid token"):

| Permission | Access level | Why you need it |
| --- | --- | --- |
| Workers Builds Configuration | Edit | Manage build settings and Previews, and work with builds |
| Workers Scripts | Read | Only needed to get your Worker tag |

Top-level request fields:

| Field | Description |
| --- | --- |
| `git_repository` | The repository to connect. `branch` is your production branch. |
| `production_settings` | Build settings for pushes to your production branch |
| `previews_enabled` | Whether pushes to other branches create or update Previews |
| `previews_base_config` | Build settings copied to each new Preview. `deploy_command` is your Preview command. |

`production_settings` and `previews_base_config` fields:

| Field | Type | Description |
| --- | --- | --- |
| `build_command` | string | Command to build your project (for example, `npm run build`) |
| `deploy_command` | string | Command to deploy your Worker (for example, `npx wrangler deploy` or `npx wrangler preview`) |
| `build_token_uuid` | string | UUID of the build token used to deploy your Worker |
| `root_directory` | string | Path to your project, relative to the repository root. Defaults to `/`. |
| `path_includes` | array | File path patterns that start a build |
| `path_excludes` | array | File path patterns that do not start a build |
| `build_caching_enabled` | boolean | Whether builds reuse cached dependencies and build artifacts. Defaults to `true`. |
| `environment_variables` | object | Build-time variables. Set `is_secret` to `true` to mask a value in build logs. |

Preview fields (list Previews):

| Field | Description |
| --- | --- |
| `preview_id` | Identifier of the Preview |
| `branch` | Git branch the Preview tracks |
| `auto_build` | Whether pushes to the branch build this Preview. Manual builds and Deploy Hooks run regardless. |
| `auto_delete` | Whether deleting the Git branch also deletes this Preview |

## Notes

- Prerequisites: install the Cloudflare GitHub App once (**Settings** > **Builds** > **Connect** > **GitHub**); get GitHub user and repo IDs; get a `build_token_uuid` from **Settings** > **Builds** > **API token** or `GET /builds/tokens` (a build token is different from the API token).
- Updates (PATCH `/builds/workers/{worker_tag}`): send only changed fields; set an environment variable to `null` to delete it; `{"previews_enabled": false}` turns Previews off; changes to `previews_base_config` apply to Previews created afterward (add `?patch_existing_previews=true` for existing ones).
- Workers connected before Worker Previews use legacy branch builds, and `previews_base_config` updates those settings.
- `environment_variables` are build-time only.
- Start a production build without pushing: create a Deploy Hook for the production branch and POST to its URL. Builds older than 90 days are not returned; logs are retained 90 days.
- List Previews: `GET /builds/workers/{worker_tag}/previews` (jq filter `.result[] | {preview_id, branch, auto_build, auto_delete}`); single Preview at `/previews/{preview_id}`; list a Preview's builds with GET on `/previews/{preview_id}/builds`.

## Related

- [builds-deploy-hooks.md](./builds-deploy-hooks.md)
- [builds-configuration.md](./builds-configuration.md)
- [builds-troubleshoot.md](./builds-troubleshoot.md)
- [previews-configuration.md](./previews-configuration.md)
