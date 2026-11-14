---
source: https://opencode.ai/docs/cli/commands/#auth
---

# opencode auth

Manages AI providers and credentials.

## Signature / Usage

```bash
$ opencode auth list
```

List them as JSON.

```bash
$ opencode auth list --format json
```

Log in to a provider.

```bash
$ opencode auth login anthropic
```

Log in with a specific authentication method.

```bash
$ opencode auth login anthropic --method key
```

Log out of a saved account.

```bash
$ opencode auth logout anthropic work
```

Switch the active account for an integration.

```bash
$ opencode auth switch anthropic work
```

Export saved credentials and import them on another machine. The file contains secrets.

Adapted (not in the official docs): the export runs under `umask 077` so the credentials file is readable only by you.

```bash
$ (umask 077; opencode auth export anthropic > credentials.json)
$ opencode auth import credentials.json
```

View all subcommands and flags.

```bash
$ opencode auth --help
```

## Notes

- Adapted from the official docs: `opencode auth export` runs under `umask 077` so the exported credentials file is not readable by other users.
- The exported credentials file contains secrets; store it securely and delete it after import.

## Related

- [Providers](./providers.md)
- [Commands: models](./commands-models.md)
