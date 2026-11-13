---
source: https://opencode.ai/docs/cli/commands/#service
---

# opencode service

Manages the background server. See [Web](https://opencode.ai/docs/cli/web/).

## Signature / Usage

```bash
$ opencode service start
```

Restart it.

```bash
$ opencode service restart
```

Show its status.

```bash
$ opencode service status
```

Stop it.

```bash
$ opencode service stop
```

Read a setting.

```bash
$ opencode service get hostname
```

Set a setting.

```bash
$ opencode service set hostname 0.0.0.0
```

Allow an extra CORS origin.

```bash
$ opencode service set cors https://app.example.com
```

Pass an environment variable to the server process.

```bash
$ opencode service set env OPENCODE_LOG_LEVEL DEBUG
```

Reset a setting to its default.

```bash
$ opencode service unset hostname
```

View all subcommands and flags.

```bash
$ opencode service --help
```

## Notes

- `service set hostname 0.0.0.0` listens on every network interface. The server is password-protected with a generated password; keep it secret or replace it with a strong one using `service set password` (see [web.md](./web.md)) before exposing the server beyond the local machine.

## Related

- [Web](./web.md)
- [Overview](./overview.md)
- [Commands: reload](./commands-reload.md)
