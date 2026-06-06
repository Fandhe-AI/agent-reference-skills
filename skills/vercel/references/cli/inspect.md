# vercel inspect

Retrieve information about a Vercel deployment by URL or ID.

## Signature / Usage

```bash
vercel inspect [deployment-id-or-url]
vercel inspect https://example-app.vercel.app --logs
vercel inspect https://example-app.vercel.app --wait
vercel inspect https://example-app.vercel.app --logs --wait
```

## Options / Props

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--timeout` | | Time to wait for deployment completion (default: 3m); accepts ms-compatible strings like `5m`, `30s` |
| `--wait` | | Block until the specified deployment completes |
| `--logs` | `-l` | Print build logs instead of deployment info |

## Notes

- If deployment is queued or canceled there are no logs to display
- Combine `--logs --wait` to stream all build logs until deployment is ready

## Related

- [list.md](./list.md)
- [logs.md](./logs.md)
- [deploy.md](./deploy.md)
