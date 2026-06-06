# vercel target

List and use custom deployment environments (targets) beyond production, preview, and development.

## Signature / Usage

```bash
vercel target list
vercel target ls
vercel deploy --target=staging
vercel pull --environment=staging
vercel env add MY_KEY staging
```

## Notes

- `vercel target list` (alias: `vercel targets ls`) lists custom environments configured for the linked project
- The `--target` flag is available on `vercel deploy` and `vercel redeploy`
- The `--environment` flag on `vercel pull` and `vercel env` also accepts custom environment names

## Related

- [deploy.md](./deploy.md)
- [pull.md](./pull.md)
- [env.md](./env.md)
