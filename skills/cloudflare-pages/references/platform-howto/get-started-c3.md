---
source: https://developers.cloudflare.com/pages/get-started/c3/
---

# C3 CLI

Create and deploy a Pages project from the command line with `create-cloudflare` (C3).

## Signature / Usage

```
npm create cloudflare@latest -- --platform=pages
```

```
yarn create cloudflare --platform=pages
```

```
pnpm create cloudflare@latest --platform=pages
```

Full invocation:

```
npm create cloudflare@latest -- --platform=pages [<DIRECTORY>] [OPTIONS] [-- <NESTED ARGS...>]
```

Opt out of telemetry:

```sh
export CREATE_CLOUDFLARE_TELEMETRY_DISABLED=1
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `DIRECTORY` | string | — | Directory for the application; the app name comes from it. |
| `NESTED ARGS..` | string[] | — | Arguments passed to third-party CLIs C3 may invoke (full-stack apps). |
| `--category` | string | — | `hello-world`, `web-framework`, `demo` or `remote-template`. |
| `--type` | string | — | `hello-world`, `hello-world-durable-object`, `common`, `scheduled`, `queues`, `openapi`, `pre-existing`. |
| `--framework` | string | — | `angular`, `astro`, `docusaurus`, `gatsby`, `hono`, `next`, `nuxt`, `qwik`, `react`, `redwood`, `remix`, `solid`, `svelte`, `vue`; overrides `--type`. |
| `--template` | string | — | External template: `user/repo`, `git@github.com:user/repo`, `https://github.com/user/repo`, `user/repo/some-template`, `user/repo#canary`, `user/repo#1234abcd`, `bitbucket:user/repo`, `gitlab:user/repo`. Needs `package.json`, a Wrangler configuration file and `src/`. |
| `--deploy` | boolean | true | Deploy after creation. |
| `--lang` | string | ts | `ts`, `js` or `python`. |
| `--ts` | boolean | true | Deprecated; use `--lang=ts`. |
| `--git` | boolean | true | Initialize a local git repository. |
| `--open` | boolean | true | Open the deployed app in a browser (ignored when not deployed). |
| `--existing-script` | string | — | Existing Workers script to clone; coerces `--type` to `pre-existing` and ignores deploy. |
| `-y`, `--accept-defaults` | boolean | — | Use all defaults. |
| `--auto-update` | boolean | true | Automatically use the latest C3. |
| `-v`, `--version` | boolean | — | Show version. |
| `-h`, `--help` | boolean | — | Show help. |

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases); see the cloudflare-workers skill (static-assets/migrate-from-pages). Without `--platform=pages`, C3 always creates a Workers project.
- To connect a C3 project to Git later, answer `no` to "Do you want to deploy your application?". Deploying from the terminal makes it a Direct Upload project that cannot be connected to Git; create a new project instead.
- Non-interactive use (such as CI) requires all needed arguments on the command line. Boolean options accept `--open`, `--open true`, `--no-open`, `--open false`.
- Telemetry subcommands: `telemetry disable`, `telemetry status`, `telemetry enable`, for example `npm create cloudflare@latest -- telemetry disable`.
- Supported framework starters link to per-framework guides in the Pages framework guides; Redwood links to the Workers framework guides.

## Related

- [Get started with Git integration](./get-started-git-integration.md)
- [Get started with Direct Upload](./get-started-direct-upload.md)
