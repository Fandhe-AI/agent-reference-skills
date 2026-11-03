---
source: https://developers.cloudflare.com/workers/get-started/guide/
---

# Get started: CLI

Create, develop, and deploy your first Worker with C3 (`create-cloudflare`) and Wrangler.

## Signature / Usage

```bash
npm create cloudflare@latest -- my-first-worker
```

```sh
cd my-first-worker
```

```sh
npx wrangler dev
```

```sh
npx wrangler deploy
```

Default `src/index.js`:

```js
export default {
	async fetch(request, env, ctx) {
		return new Response("Hello World!");
	},
};
```

Create from an existing Git repository:

```sh
npm create cloudflare@latest -- --template <SOURCE>
```

## Options / Props

C3 prompts used in the guide:

| Prompt | Choice |
| --- | --- |
| What would you like to start with? | `Hello World example` |
| Which template would you like to use? | `Worker only` |
| Which language do you want to use? | `JavaScript` |
| Do you want to use git for version control? | `Yes` |
| Add an AGENTS.md file to help AI coding tools understand Cloudflare APIs? | `Yes` |
| Do you want to deploy your application? | `No` |

`<SOURCE>` forms: `user/repo`, `git@github.com:user/repo`, `https://github.com/user/repo`, `user/repo/some-template`, `user/repo#canary`, `user/repo#1234abcd`, `bitbucket:user/repo`, `gitlab:user/repo`.

## Notes

- Prerequisites: a Cloudflare account and Node.js (supported versions: Wrangler system requirements).
- C3 generates `wrangler.jsonc` (source map uploads enabled), `src/index.js`, `package.json`, lockfile, and `node_modules`. A template repo needs at minimum `package.json`, `wrangler.jsonc`, and `src/` with a Worker script referenced from the config.
- `wrangler dev` serves at http://localhost:8787 and logs you in via browser if needed.
- `wrangler deploy` publishes to `*.workers.dev` or a Custom Domain; Wrangler prompts to set up a subdomain if none exists. First-time `523` errors on `workers.dev` resolve after about a minute.
- `export default` defines a module; the `fetch` handler always receives `request`, `env`, and `ctx`, and must return a `Response` (or a Promise of one). Add other handlers (e.g. `scheduled()` for Cron Triggers) to the same object.
- Next steps: connect to Workers Builds for Git-based deploys, add bindings, test and debug, review limits and pricing. For Wrangler commands and configuration, see the cloudflare-wrangler skill.

## Related

- [get-started-dashboard.md](./get-started-dashboard.md)
- [limits.md](./limits.md)
- [pricing.md](./pricing.md)
- [../handlers-context/README.md](../handlers-context/README.md)
