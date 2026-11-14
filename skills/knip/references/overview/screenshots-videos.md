# Screenshots & Videos

Source: https://knip.dev/overview/screenshots-videos

## Overview

The upstream page shows Knip in action with a video and screenshots. This page keeps the commands they demonstrate; the media files themselves are not reproduced.

## Signature / Usage

### Watch and auto-fix

The demo uses the `--watch` and `--fix` options inside Visual Studio Code. It works in any terminal:

```sh
knip --watch --fix
```

### Trace

The screenshots trace the `mapIterator` export in the TypeScript codebase, and inspect complicated import and re-export chains at a glance:

```sh
knip --trace-export mapIterator
knip --trace-file src/utils.ts
```

### Performance

The screenshot shows `--performance` output for the Knip codebase:

```sh
knip --performance
```

## Notes

- Adapted (not in the official docs): the code blocks are illustrative command lines assembled from the flags named on the upstream page (`--watch`, `--fix`, trace, `--performance`); the upstream page contains only media, no code blocks
- The `mapIterator` example is taken from the upstream page text; `src/utils.ts` is a placeholder path
- Source: https://knip.dev/overview/screenshots-videos (knip@6.45.1 docs, retrieved 2026-11-14)

## Related

- [CLI Arguments](../reference/cli.md)
- [Auto-fix](../features/auto-fix.md)
- [Troubleshooting](../guides/troubleshooting.md)
