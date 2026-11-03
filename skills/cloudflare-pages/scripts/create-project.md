---
source: https://developers.cloudflare.com/pages/get-started/c3/, https://developers.cloudflare.com/pages/get-started/direct-upload/, https://developers.cloudflare.com/pages/get-started/git-integration/
---

# Create a Pages project

Copy-paste commands for scaffolding a Pages project with C3 and for creating a Direct Upload project with Wrangler.
## Signature / Usage

### Scaffold a new Pages application with C3

```sh
npm create cloudflare@latest -- --platform=pages
```

```sh
yarn create cloudflare --platform=pages
```

```sh
pnpm create cloudflare@latest --platform=pages
```

`--platform=pages` is required; without it C3 always creates a Workers project.

### Scaffold with a framework and skip the deploy prompt

```sh
npm create cloudflare@latest -- --platform=pages [<DIRECTORY>] [OPTIONS] [-- <NESTED ARGS...>]
```

For non-interactive use (CI), every required choice must be passed as an argument. Accepted `--framework` values: `angular`, `astro`, `docusaurus`, `gatsby`, `hono`, `next`, `nuxt`, `qwik`, `react`, `redwood`, `remix`, `solid`, `svelte`, `vue`. Other options: `--category`, `--type`, `--template`, `--deploy`, `--lang`, `--git`, `--open`, `-y` / `--accept-defaults`.

> **Warning**: To connect the project to a Git repository later, answer `no` to "Do you want to deploy your application?". Deploying from the terminal makes it a Direct Upload project, which cannot be switched to Git integration afterwards (a new project is required).

### Disable or check C3 telemetry

```sh
npm create cloudflare@latest -- telemetry disable
```

```sh
npm create cloudflare@latest -- telemetry status
```

```sh
export CREATE_CLOUDFLARE_TELEMETRY_DISABLED=1
```

### Create a Direct Upload project

```sh
npx wrangler pages project create
```

Prompts for the project name (served at `<PROJECT_NAME>.pages.dev`) and the production branch; both are cached in `node_modules/.cache/wrangler` for later deployments.

> **Warning**: A Direct Upload project cannot be switched to Git integration later.

### Change the production branch of a Direct Upload project

```bash
curl --request PATCH \
  "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT_NAME}" \
  --header "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{"production_branch": "main"}'
```

Adapted from the official docs: `{account_id}` / `<API_TOKEN>` placeholders replaced by quoted environment variables so the token is not typed inline. Direct Upload projects have no dashboard control for the production branch; this API call is the documented way.

## Notes

- Installing and logging in to Wrangler belongs to the cloudflare-wrangler skill, as do the full `wrangler pages` flag tables (`commands/pages.md`).
- A project created by deploying from the terminal (including via C3) is a Direct Upload project and cannot be switched to Git integration later; a new project is required.

## Related

- [Get started with C3](../references/platform-howto/get-started-c3.md)
- [Get started with Direct Upload](../references/platform-howto/get-started-direct-upload.md)
- [Get started with Git integration](../references/platform-howto/get-started-git-integration.md)
