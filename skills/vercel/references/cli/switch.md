# vercel switch

Switch the active team scope in the Vercel CLI.

## Signature / Usage

```bash
vercel switch
vercel switch [team-slug]
```

## Notes

- Without an argument, shows an interactive list of teams
- The argument is the team slug (if the team URL is `vercel.com/acme`, the slug is `acme`)
- `vercel teams switch [slug]` is equivalent
- Does not accept `--token` global flag; use `--scope` for per-command scope override
- Source: https://vercel.com/docs/cli/switch (fetched 2026-11-14)

## Related

- [teams.md](./teams.md)
- [whoami.md](./whoami.md)
