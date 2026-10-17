# Command Helper Secret Source

Resolve credentials by running your own helper command at startup. The helper prints `KEY=VALUE` lines on stdout (e.g. `keepassxc-cli`, `secret-tool`, `pass`, `gpg`, or a script reading a tmpfs env file).

## Signature / Usage

```yaml
secrets:
  command:
    enabled: true
    command: "cat /run/user/1000/hermes-secrets.env"
    # command: "pass show hermes/env"
    # command: "secret-tool lookup service hermes-env"
```

## Options / Props

| Name | Default | Description |
|------|---------|-------------|
| enabled | false | Master switch |
| command | "" | Helper run via `/bin/sh -c`; must print `KEY=VALUE` lines |
| helper_timeout_seconds | 3 | Hard timeout; helper must be fast and non-interactive |
| override_existing | false | Helper values overwrite `.env`/shell values (off by default, unlike Bitwarden/1Password) |

## Notes

- Configure the command in `config.yaml`, never `.env`. It runs once at startup after `.env` loads; output is parsed as a dotenv blob and goes through the standard precedence ladder.
- Output capped at 1 MiB; process group killed on timeout. Helper stderr is discarded on purpose; failures log only exit code / signal / errno, never the command string. Whitespace-only values count as no value.
- POSIX-only (needs `/bin/sh`); on Windows the source reports unconfigured and startup continues.
- Startup is never blocked. Errors: `secrets.command.command is empty`, `helper command failed` (run the helper manually to see stderr), `helper output was not a KEY=VALUE map`.
- For complex CLI wrapping, prefer a secret-source plugin (caching, provenance labels, typed config).
- Source: user-guide/secrets/command (v0.22.2 snapshot).

## Related

- [Secrets](./secrets.md)
- [Bitwarden Secrets Manager](./secrets-bitwarden.md)
- [1Password](./secrets-onepassword.md)
