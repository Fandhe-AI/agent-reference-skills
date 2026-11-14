---
source: https://opencode.ai/docs/cli/commands/#serve
---

# opencode serve

Starts the API and web server. See [Web](https://opencode.ai/docs/cli/web/).

## Signature / Usage

```bash
$ opencode serve
```

Bind to all interfaces on a fixed port.

```bash
$ opencode serve --hostname 0.0.0.0 --port 4096
```

Allow a browser client from another origin.

```bash
$ opencode serve --cors https://app.example.com
```

View all subcommands and flags.

```bash
$ opencode serve --help
```

## Notes

- Binding to `0.0.0.0` exposes the server on every network interface; keep the server password secret.

## Related

- [Web](./web.md)
- [Commands: pair](./commands-pair.md)
- [Commands: service](./commands-service.md)
