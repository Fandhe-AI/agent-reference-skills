# vercel traces

Inspect request traces for a linked project or a specific deployment.

## Signature / Usage

```bash
vercel traces get req_1234567890
vercel traces req_1234567890           # `get` is the default subcommand
vercel traces get req_1234567890 --open --view=tree
vercel traces get req_1234567890 --json
```

## Options / Props

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--project` | `-p` | Project name or ID |
| `--json` | `-j` | Machine-readable JSON output; cannot combine with `--open` |
| `--open` | | Open the trace in the Vercel Dashboard instead of printing in terminal |
| `--view` | | Initial Dashboard view (requires `--open`): `timeline`, `tree`, `gantt` |

## Notes

- `get` is the default subcommand: `vercel traces req_...` equals `vercel traces get req_...`
- Capture a trace during a request with `vercel curl --trace /api/hello`

## Related

- [curl.md](./curl.md)
- [logs.md](./logs.md)
