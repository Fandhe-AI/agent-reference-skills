# vercel templates

Search templates, inspect their requirements, and deploy an application from a new GitHub repository.

## Signature / Usage

```bash
vercel templates search "AI chatbot" --framework next.js --limit 10
vercel templates inspect nextjs-boilerplate --json
vercel templates deploy nextjs-boilerplate --repo acme/my-site --scope your-team
```

```bash
vercel templates deploy eve-memory-agent \
  --repo acme/my-eve-agent \
  --scope your-team \
  --config eve-inputs.json \
  --prod --yes --non-interactive --json
```

```bash
vercel templates deploy eve-memory-agent \
  --resume <run-id> \
  --scope your-team --config eve-inputs.json --yes
```

## Options / Props

### deploy

| Option | Description |
|--------|-------------|
| `--repo <owner/name>` | Destination GitHub repository. Prompts when omitted in a terminal |
| `--public` | Create a public repository (default is private) |
| `--prod` | Explicitly select production, used by new projects for their first deployment |
| `--config <file>` | Read project names, resource selections, and environment variable references from a JSON file |
| `--yes` | Confirm creation after resolving required inputs |
| `--resume <run-id>` | Verify and continue a recorded deployment run |
| `--json` | Return a structured result |

### search

| Option | Description |
|--------|-------------|
| `--framework`, `--type` | Filter results |
| `--limit` | Default 20; above 100 is reduced to 100 with a warning; below 1 is invalid |
| `--next` | With `--json`, pass the value of `pagination.next` |

### Exit codes

| Code | Meaning |
|------|---------|
| `0` | Success. Read the result from stdout |
| `1` | Operational failure, invalid deployment config, or required setup. Read `reason`, `message`, `data` from stderr |
| `2` | Invalid arguments or missing required inputs (such as env values or a malformed `--resume` run ID) |
| `130` | Prompt canceled or required confirmation declined |

## Notes

- Search and inspect work without login. Interactive deploy starts `vercel login` if needed; authenticate before unattended deployments.
- Search prints slug, name, framework, and deployability. When stdout isn't a terminal the table is tab-separated with a header. `Next page:` is printed on stderr. Set `VERCEL_TEMPLATES_API_URL` (full base URL) to use another catalog endpoint; catalog requests are anonymous.
- `inspect` accepts a slug or template ID. `--json` adds the README as `overview` and each project's build and install commands. If the CLI can't deploy a template, it lists the reasons.
- Before deploying, connect your GitHub account to Vercel and install the Vercel GitHub App in the destination account. The CLI creates the repository (private by default), copies the template, connects each project to GitHub, and waits for deployments. First deployments go to production.
- Single-project name comes from the repository name, lowercased with runs of other characters replaced by one hyphen (`acme/My_Site` gives `my-site`). Override with `projects` in the config. Names: lowercase, start with a letter or digit, up to 100 characters, letters/digits/`.`/`_`/`-`, no `---`. Names are checked before anything is created.
- Config example keys: `projects`, `env` (`{"env": ...}`, `{"file": ...}`, `{"resource": ...}`), `resources`, `blobs`, `connectors`. Keep secrets out of command arguments; file values have trailing newlines removed. Choose plans explicitly (including free ones); use `existingId` to reuse a resource. Optional resources and Blob stores need `enabled: true` or an `existingId`; required resources can't be disabled. Take keys from `vercel templates inspect <template-slug> --json`.
- Install required Marketplace integrations and accept their terms before deploying; `--yes` doesn't accept legal terms or authorize provider access.
- Unattended runs need an existing authorized connector. `--json` results: search returns `templates` and `pagination`, inspect returns `template`, deploy returns `outcome`, `runId`, `repository`, `target`, `deployments`; failures return a JSON error on stderr.
- Resume: progress is saved in the global configuration directory without secrets; completed steps are skipped and created resources preserved. Keep repository, resource, and plan choices unchanged. For timed-out requests, add a `reconcile` entry (`operation` plus `receipt` with `id`, or `sha` for a repository copy) to the original config; for an unconfirmed connector creation use `nothingCreated` with `startedAt` only after verifying nothing was created. Don't retry an uncertain creation as a new run.
- Monorepo templates create a project per root directory. Microfrontend project names must match application keys in `microfrontends.json` / `microfrontends.jsonc`. Search can return non-deployable template kinds (firewall or routing rules).
- Source: https://vercel.com/docs/cli/templates (fetched 2026-11-14)

## Related

- [init.md](./init.md)
- [login.md](./login.md)
- [global-options.md](./global-options.md)
