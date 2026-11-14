# vercel open

Open the current linked project in the Vercel Dashboard in the default browser.

## Signature / Usage

```bash
vercel open
vercel open --yes
```

## Options / Props

| Name | Description |
|------|-------------|
| `--yes` | Skip the linking questions when the directory is not linked |

## Notes

- Requires the directory to be linked to a Vercel project (if not linked, `vercel open` asks you to link first, as `vercel link` does; in non-interactive use such as scripts it stops and requires confirmation, so run `vercel link` first)
- Opens `https://vercel.com/{team-slug}/{project-name}`
- Available in Vercel CLI v48.10.0+
- `--yes` links the directory like `vercel link --yes`, which can create a new project named after the directory. `--yes` does not choose a team, so pass `--scope` if you have more than one team
- In a terminal, when `vercel open --yes` links to an existing project, it also pulls that project's development environment variables into `.env.local` without asking, as `vercel env pull --yes` does
- Source: https://vercel.com/docs/cli/open (fetched 2026-11-14)

## Related

- [link.md](./link.md)
- [project.md](./project.md)
