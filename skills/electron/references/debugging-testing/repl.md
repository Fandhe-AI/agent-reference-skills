---
source: https://www.electronjs.org/docs/latest/tutorial/repl
---

# REPL

Interactive Read-Eval-Print-Loop access for the main process (via the Node.js `repl` module) and for renderers (via DevTools Console).

## Signature / Usage

Main process: Electron exposes the Node.js `repl` module through the `--interactive` CLI flag, assuming `electron` is installed as a local project dependency.

```sh
./node_modules/.bin/electron --interactive
```

Renderer process: use the DevTools Console tab as a REPL for any renderer process.

## Notes

- `electron --interactive` is not available on Windows (see electron/electron#5776).

## Related

- [Debugging the Main Process](./debugging-main-process.md)
- [Application Debugging](./application-debugging.md)
