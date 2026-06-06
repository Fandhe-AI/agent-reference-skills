# vercel switch

Switch the active team scope in the Vercel CLI.

## Signature / Usage

```bash
vercel switch
vercel switch [team-name]
```

## Notes

- Without an argument, shows an interactive list of teams
- `vercel teams switch [slug]` is equivalent
- Does not accept `--token` global flag; use `--scope` for per-command scope override

## Related

- [teams.md](./teams.md)
- [whoami.md](./whoami.md)
