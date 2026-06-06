# vercel bisect

Binary search through deployments to find when a bug was introduced, similar to `git bisect` but without rebuilding each commit.

## Signature / Usage

```bash
vercel bisect
vercel bisect --good https://example.com --bad https://example-s93n1nfa.vercel.app
vercel bisect --path /blog/first-post --open
vercel bisect --run ./test.sh
```

## Options / Props

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--good` | `-g` | Known good deployment URL or alias; skips the prompt |
| `--bad` | `-b` | Known bad deployment URL or alias; skips the prompt |
| `--path` | `-p` | Subpath appended to each deployment URL during bisect |
| `--open` | `-o` | Auto-open each deployment URL in the browser |
| `--run` | `-r` | Shell script to automate bisect; exit 0=good, non-0=bad, 125=skip |

## Notes

- Good and bad deployments must be **production** deployments
- If an alias URL is used, it resolves to the current alias target at the time of bisect
- Manual steps: at each deployment prompt, mark it good or bad

## Related

- [deploy.md](./deploy.md)
- [inspect.md](./inspect.md)
