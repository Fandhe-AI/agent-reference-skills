# vercel build

Build a Vercel Project locally or in a CI environment. Output is placed in `.vercel/output` (Build Output API v3 format).

## Signature / Usage

```bash
vercel build
vercel build --prod
vercel build --target=staging
vercel build --output ./custom-output
```

## Options / Props

| Name | Description |
|------|-------------|
| `--prod` | Build using Production environment variables (default: Preview) |
| `--yes` | Skip confirmation; auto-pull env vars and project settings if not found locally |
| `--target` | Target environment: `production`, `preview`, or a custom environment name |
| `--output` | Custom output directory (default: `.vercel/output`) |
| `--standalone` | Standalone build: all dependencies inlined into function output folders so artifacts are fully contained within `.vercel` |

## Notes

- Run `vercel pull` first to ensure local env vars and project settings are up to date
- Use with `vercel deploy --prebuilt` to deploy without sharing source code with Vercel
- System environment variables are not available at build time with `--prebuilt`; avoid using it if your framework relies on them
- Schedules: `vercel build` combines Schedules defined in `vercel.json` with schedules framework builders emit in Build Output `config.json`. Names must be unique across both sources; a duplicate fails the build with `SCHEDULE_NAME_CONFLICT`
- A schedule targeting a function in a service sets `service` to the service name and `function` to its build-output function identifier without `.func` (e.g. `service: "worker"`, `function: "index"` targets `.vercel/output/services/worker/functions/index.func`). `service` applies only to function targets, not `path` or `topic`. Service-hosted function schedules run after deployment; `vercel dev` rejects them with `DEV_SCHEDULE_SERVICE_FUNCTION_UNSUPPORTED`

## Related

- [deploy.md](./deploy.md)
- [pull.md](./pull.md)
