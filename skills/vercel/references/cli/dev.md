# vercel dev

Replicate the Vercel deployment environment locally to test Functions and Middleware without deploying.

## Signature / Usage

```bash
vercel dev
vercel dev --listen 5005
```

## Options / Props

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--listen` | `-l` | Port to run on (default: 3000) |
| `--yes` | | Skip new-project setup questions; use defaults |

## Notes

- Run `npm install` before using `vercel dev`
- If your framework's dev command (e.g. `next dev`) already supports all needed features, prefer that over `vercel dev`
- The Development Command configured in Project Settings affects `vercel dev` behavior for the whole team

## Related

- [pull.md](./pull.md)
- [build.md](./build.md)
- [env.md](./env.md)
