# vercel dev

Replicate the Vercel deployment environment locally to test Functions and Middleware without deploying.

## Signature / Usage

```bash
vercel dev
vercel dev --listen 5005
vercel dev --local
vercel dev --yes
```

## Options / Props

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--listen` | | Port to run on |
| `--local` | | Start in a directory not linked to a Vercel Project, without setting up a project or logging in |
| `--yes` | | Skip new-project setup questions; the CLI answers with the current directory as project name and location. Does not choose a team; also pass `--scope` if you belong to several teams |

## Notes

- Run `npm install` before using `vercel dev`
- If your framework's dev command (e.g. `next dev`) already supports all needed features, prefer that over `vercel dev`
- The Development Command configured in Project Settings affects `vercel dev` behavior for the whole team
- With `--local` and no linked project, the CLI does not pull environment variables from Vercel; project settings come from local configuration such as `vercel.json`
- `--experimental-https` appears on the official page only as a `next dev` flag in a related guide link, not as a `vercel dev` option; not confirmed for `vercel dev`
- Not confirmed in the current official page: the `-l` shorthand and the default port 3000 for `--listen`
- Source: https://vercel.com/docs/cli/dev (fetched 2026-11-14)

## Related

- [pull.md](./pull.md)
- [build.md](./build.md)
- [env.md](./env.md)
