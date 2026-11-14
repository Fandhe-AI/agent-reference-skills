# vercel token-pass

Connect supported coding agents to Token Pass through AI Gateway by creating a Token Pass API key and updating local agent configuration.

## Signature / Usage

```bash
vercel token-pass
vercel token-pass setup --agent opencode
vercel token-pass --agent opencode --dry-run
vercel token-pass setup --agent pi --dry-run --non-interactive
vercel token-pass --agent opencode --scope my-team --yes
vercel token-pass --agent opencode --key your_token_pass_api_key --yes
vercel token-pass --agent opencode --dry-run --non-interactive
```

## Options / Props

| Option | Description |
|--------|-------------|
| `--agent <NAME>` | Select an agent from `fx`, `opencode`, or `pi`. Repeatable |
| `--all`, `-a` | Configure all supported Token Pass agents |
| `--dry-run` | Preview configuration changes without creating a key or writing agent files |
| `--key <KEY>` | Use an existing Token Pass API key |
| `--name <NAME>` | Name for a newly created key |
| `--expiration <PERIOD>` | New-key expiry: `7d`, `30d`, `60d`, `90d`, `1y`, or `none` (default) |
| `--agent-config <AGENT=PATH>` | Override an agent's configuration file, for example `opencode=/path/opencode.json`. Repeatable |
| `--shell-rc <PATH>` | Override the shell startup file used for environment exports |
| `--apply <MODE>` | `edit` writes files (default). `prompt` emits instructions for an agent to apply and requires the macOS Keychain |
| `--no-keychain` | Write the key into configuration files instead of the macOS Keychain |
| `--no-backup` | Skip the `.bak` backups normally made for changed files |
| `--reconfigure` | Run setup again when already configured. Without `--key`, Token Pass setup already enables this |
| `--yes`, `-y` | Accept defaults and run without prompts |

## Notes

- A dedicated Token Pass API key is optional: any AI Gateway API key or OIDC token uses Token Pass credit automatically for featured models and falls back to team AI Gateway credits when the credit runs out. This command gives a key scoped only to Token Pass credit, with no fallback
- `vercel token-pass` without a subcommand runs `setup`; both accept the same options. The older `tokenpass` alias still works but prints a deprecation warning
- Sign in to the CLI before setup, including dry runs; for scripts use a Vercel access token. This CLI credential is separate from the Token Pass API key given to the agent
- Supported agents: `fx`, `opencode`, `pi` (smaller than the set for `vercel ai-gateway setup`; other values error). Without `--agent` or `--all`, setup selects detected agents; with no prompts and none found, it is an error
- Dry run does not create a key or write files. With `--non-interactive`, output includes `reason: "dry_run"` and a `changes` array with each file's path and action (`would_create`, `would_update`)
- Without `--key`, setup always requests a new Token Pass key (even when rerun) and does not recover a previously stored general AI Gateway key. For prompt-free creation, select the team with `--scope` and pass `--yes`. A supplied `--key` must be a Token Pass API key (a warning is shown; a general AI Gateway key is not converted) and skips new-key name, team, quota, and expiration prompts
- Shared with `vercel ai-gateway setup`: `--amount`, `--refresh-period`, `--include-byok` (new key quota) and `--base-url` (endpoint override)
- Output: `--non-interactive` gives structured JSON on stdout; `--json` is not accepted. Success returns `reason: "coding_agents_configured"`, a `configured` file list, and an `apiKey`. The success output contains the full API key; keep it out of shared logs
- Key storage: on macOS, fx and OpenCode use the login Keychain by default with a shell export that reads the key; Pi stores its key in its own configuration. With `--no-keychain`, fx stores the key in the shell startup file and OpenCode in its configuration. Open a new terminal after shell export changes
- Source: https://vercel.com/docs/cli/token-pass (fetched 2026-11-14)

## Related

- [ai-gateway.md](./ai-gateway.md)
- [login.md](./login.md)
- [global-options.md](./global-options.md)
