---
source: https://opencode.ai/docs/cli/commands/#api
---

# opencode api

Makes a request to the running server.

## Signature / Usage

```bash
$ opencode api GET /api/session
```

Call an operation ID with a query parameter.

```bash
$ opencode api session.list --param limit=10
```

Send a JSON body.

```bash
$ opencode api session.create --data '{"title": "New session"}'
```

Add a request header.

```bash
$ opencode api GET /api/session -H "accept: application/json"
```

View all subcommands and flags.

```bash
$ opencode api --help
```

## Related

- [Commands: serve](./commands-serve.md)
- [Web](./web.md)
