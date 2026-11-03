---
source: https://developers.cloudflare.com/workers/ci-cd/builds/configuration/
---

# Workers Builds Configuration

Build, deploy, and Preview commands, root directory, API token, build variables, and build caching. Also covers the Build caching page.

## Signature / Usage

On push, Workers Builds runs: (1) optional **Build command**, (2) **Deploy command** (default `npx wrangler deploy`). Preview builds run the **Preview command** instead (default `npx wrangler preview`). Settings live under **Settings** > **Build**; saved changes apply to the *next* build, and a retried build uses the settings in effect at retry time.

Build-only variables via the Wrangler file `[vars]` (text and JSON):

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "my-worker-dev",
	"vars": {
		"API_HOST": "example.com",
		"API_ACCOUNT_ID": "example_user",
		"SERVICE_X_DATA": {
			"URL": "service-x-api.dev.example",
			"MY_ID": 123
		}
	}
}
```

```toml
"$schema" = "./node_modules/wrangler/config-schema.json"
name = "my-worker-dev"

[vars]
API_HOST = "example.com"
API_ACCOUNT_ID = "example_user"

  [vars.SERVICE_X_DATA]
  URL = "service-x-api.dev.example"
  MY_ID = 123
```

## Options / Props

Build settings:

| Setting | Description |
| --- | --- |
| **Git account** | Git account to use; reused for future projects. |
| **Git repository** | Repository to connect the Worker to. |
| **Git branch** | Branch to listen to for new commits. Defaults to `main`. |
| **Build command** *(Optional)* | Build step, e.g. `npm run build` (needed for front-end frameworks such as Next.js or Remix). |
| **Deploy command** | Wrangler command used to deploy. Defaults to `npx wrangler deploy`. Uses the Wrangler version in your `package.json`. |
| **Preview command** | Command for preview builds. Defaults to `npx wrangler preview`. Uses the Wrangler version in your `package.json`. |
| **Root directory** *(Optional)* | Path to the project; where the build command runs. Useful in monorepos. |
| **API token** *(Optional)* | Authenticates the build and authorizes upload/deploy. Cloudflare generates one by default; you can create or select your own. |
| **Build variables and secrets** *(Optional)* | Variables and secrets available only to the build, not at runtime. Runtime variables: **Settings** > **Variables & Secrets**. |

Deploy command examples:

| Example Command | Description |
| --- | --- |
| `npx wrangler deploy --assets ./public/` | Deploy with static assets from the directory (or use the assets binding). |
| `npx wrangler deploy --env staging` | Deploy a Wrangler environment Worker. |
| `npx wrangler deploy --containers-rollout=immediate` | Containers rollout mode for this deploy. |
| `npx wrangler deploy --containers-rollout=none` | Deploy the Worker only; skip container image build/push and instance rollout. |

Preview command examples:

| Example Command | Description |
| --- | --- |
| `yarn exec wrangler preview` | Customize the package manager used to run Wrangler. |
| `npx wrangler preview --env staging` | Preview for a Wrangler environment Worker. |

Default variables injected (can be overridden):

| Environment Variable | Injected value | Example use-case |
| --- | --- | --- |
| `CI` | `true` | Changing build behaviour when run on CI versus locally |
| `WORKERS_CI` | `1` | Changing build behaviour when run on Workers Builds versus locally |
| `WORKERS_CI_BUILD_UUID` | `<build-uuid-of-current-build>` | Passing the Build UUID along to custom workflows |
| `WORKERS_CI_COMMIT_SHA` | `<sha1-hash-of-current-commit>` | Passing current commit ID to error reporting, for example, Sentry |
| `WORKERS_CI_BRANCH` | `<branch-name-from-push-event>` | Customizing build based on branch, for example, disabling debug logging on `production` |

Build cache — package managers (global cache directories):

| Package Manager | Directories cached |
| --- | --- |
| npm | `.npm` |
| yarn | `.cache/yarn` |
| pnpm | `.pnpm-store`, `.local/share/pnpm/store` |
| bun | `.bun/install/cache` |

Build cache — frameworks:

| Framework | Directories cached |
| --- | --- |
| Astro | `node_modules/.astro` |
| Docusaurus | `node_modules/.cache`, `.docusaurus`, `build` |
| Eleventy | `.cache` |
| Gatsby | `.cache`, `public` |
| Next.js | `.next/cache` |
| Nuxt | `node_modules/.cache/nuxt` |
| SvelteKit | `node_modules/.cache/imagetools` |

## Notes

- Corrected from the official docs: the `WORKERS_CI_BRANCH` placeholder is missing its closing `>` on the official page; it is added here.
- Workers Builds does not honor [Custom Builds](../configuration/custom-builds.md) settings in the Wrangler configuration file.
- Changing the Preview command to `npx wrangler versions upload` creates a Worker version and Version URL instead of a Preview (no branch-isolated resources).
- If the repository has no Wrangler configuration, the deploy command triggers automatic project configuration and opens a pull request (see `builds-overview.md`).
- Containers: `wrangler deploy` can build/publish container images and roll out instances; `wrangler versions upload` does not update container images. Version URLs are not generated for Workers that implement Durable Objects, including Containers.
- API token: only user tokens are supported (account-owned tokens "coming soon"). **Create new token** grants: Account: Account Settings (read), Workers Scripts (edit), Workers KV Storage (edit), Workers R2 Storage (edit); Zone: Workers Routes (edit) for all zones; User: User Details (read), Memberships (read). Use the same token across all uploads/deployments of a Worker.
- Build cache: enable at **Settings** > **Build** > **Build cache** > **Enable**; **Clear Cache** there too. Package manager and framework are auto-detected from `package.json`. A non-default pnpm store directory is not cached. Retention: purged 7 days after last read (unread artifacts 7 days after creation). Storage: 10 GB per project; least recently read artifacts are deleted first.
- Framework setup guides are in the Workers framework guides (automatic configuration, React + Vite, Astro, Next.js, SvelteKit, Hono, etc.); see the official docs.

## Related

- [builds-overview.md](./builds-overview.md)
- [builds-branches-and-paths.md](./builds-branches-and-paths.md)
- [builds-build-image.md](./builds-build-image.md)
- [custom-builds.md](../configuration/custom-builds.md)
- [environments.md](../configuration/environments.md)
