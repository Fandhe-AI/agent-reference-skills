# vercel feedback

Send feedback about Vercel from the terminal. No login or linked project needed.

## Signature / Usage

```bash
vercel feedback "The error didn't explain how to fix the issue"
```

```bash
printf '%s\n' "The deployment error didn't explain how to fix the issue" | vercel feedback - --field product=cli
```

```bash
vercel feedback "The error did not explain the correct command" \
  --field product=cli \
  --field task="deploy a preview" \
  --field expected="Create a Preview deployment" \
  --field actual="Unknown option: --preview" \
  --field type=bug \
  --field impact="Time spent finding the correct syntax"
```

```bash
vercel feedback --field product=cli --field type=feature --field expected="Explain how to fix deployment errors"
```

## Options / Props

| Name | Description |
|------|-------------|
| `--field key=value` | Repeatable named field; keys non-empty, values strings, last value wins for a repeated key; any field name allowed |
| `-` (positional note) | Read the complete UTF-8 note from stdin |

Recommended optional fields:

| Field | Description |
|-------|-------------|
| `type` | A category such as `bug`, `friction`, or `feature` |
| `product` | The Vercel product involved, such as `functions` or `domains` |
| `model` | The model name used for the task |
| `task` | What you were trying to do |
| `expected` | What you expected to happen |
| `actual` | What happened, including the error text |
| `impact` | Time spent, retries, or workarounds used |

## Notes

- On success the command prints `Feedback sent`. `vercel feedback` with no note or fields shows help without submitting
- A note is optional when at least one `--field` is given. Use one positional note (including `-`) or `--field note=...`; combining both is an error
- Agents can use it to report issues hit while completing tasks (the official page recommends `--field model=<your model name>`)
- The whole submission, including metadata, must fit within 1 MiB. With telemetry enabled the CLI includes locally known metadata and preserves your named fields; with telemetry disabled it sends only your feedback
- Global options accepted: `--cwd`, `--debug`, `--global-config`, `--help`, `--local-config`, `--no-color`, `--non-interactive`, `--scope`, `--token`, `--version`
- Source: https://vercel.com/docs/cli/feedback (fetched 2026-11-14)

## Related

- [telemetry.md](./telemetry.md)
- [global-options.md](./global-options.md)
