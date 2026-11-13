---
source: https://opencode.ai/docs/cli/commands/#pair
---

# opencode pair

Prints one-time links, plus a QR code of the first one, that sign a browser or app in to the server. Links expire after 5 minutes and work once.

## Signature / Usage

```bash
$ opencode pair
```

Use an external URL in the links.

```bash
$ opencode pair --url https://dev.example.com
```

Pair from anywhere through an OpenTunnel remote address. This exposes the server to the internet, so the first time it enables remote access it explains this and asks you to accept. See [Remote access](https://opencode.ai/docs/cli/web/#remote-access).

```bash
$ opencode pair --remote
```

Accept without a prompt, for example in a script without a terminal.

```bash
$ opencode pair --remote --yes
```

View all subcommands and flags.

```bash
$ opencode pair --help
```

## Notes

- `--remote` exposes the server to the internet; use `--yes` only where that is intended.

## Related

- [Web](./web.md)
- [Commands: serve](./commands-serve.md)
