# vercel environments (target)

List the project's environments, including custom environments beyond production, preview, and development. The official page is now titled `vercel environments`.

## Signature / Usage

```bash
vercel environments list
```

```bash
# Deploy to a custom environment named "staging"
vercel deploy --environment=staging
vercel pull --environment=staging
vercel env add MY_KEY --environment=staging
vercel env list --environment=staging
```

## Notes

- `vercel environments list` lists the standard environments and all custom environments defined for the current project.
- The `--environment` option is available on several commands (e.g. `vercel deploy`, `vercel pull`, `vercel env`) to specify the target environment.
- Previously documented here as `vercel target list` / `vercel targets ls` and `vercel deploy --target=staging`; those names are not shown in the current official page (not confirmed).
- Source: https://vercel.com/docs/cli/target (fetched 2026-11-14)

## Related

- [deploy.md](./deploy.md)
- [pull.md](./pull.md)
- [env.md](./env.md)
