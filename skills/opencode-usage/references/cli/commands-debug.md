---
source: https://opencode.ai/docs/cli/commands/#debug
---

# opencode debug

Provides debugging and troubleshooting tools.

## Signature / Usage

```bash
$ opencode debug agents
```

List configuration sources.

```bash
$ opencode debug config
```

Write a heap snapshot of the running background server and print its path.

```bash
$ opencode debug heap-dump
```

Write the snapshot into a directory of your choice.

```bash
$ opencode debug heap-dump --directory ./snapshots
```

Show global paths.

```bash
$ opencode debug paths
```

Print a single path.

```bash
$ opencode debug paths db
```

View all subcommands and flags.

```bash
$ opencode debug --help
```

## Notes

- A heap snapshot can contain prompts, file contents, and credentials; do not share it publicly (see https://opencode.ai/docs/troubleshooting/).

## Related

- [Overview](./overview.md)
