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

## Notes

- Run `vercel pull` first to ensure local env vars and project settings are up to date
- Use with `vercel deploy --prebuilt` to deploy without sharing source code with Vercel
- System environment variables are not available at build time with `--prebuilt`; avoid using it if your framework relies on them

## Related

- [deploy.md](./deploy.md)
- [pull.md](./pull.md)
