---
source: https://www.electronjs.org/docs/latest/tutorial/debugging-main-process
---

# Debugging the Main Process

The DevTools in an Electron browser window can only debug JavaScript executed in that window. To debug main-process JavaScript, use an external debugger and launch Electron with the `--inspect` or `--inspect-brk` switch.

## Signature / Usage

```shell
electron --inspect=9229 your/app
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `--inspect=[port]` | switch | Electron listens for V8 inspector protocol messages on `port`; an external debugger connects on this port. Default `port` is `9229`. |
| `--inspect-brk=[port]` | switch | Like `--inspect` but pauses execution on the first line of JavaScript. |

## Notes

- Use a debugger that supports the V8 inspector protocol. Connect Chrome by visiting `chrome://inspect` and selecting to inspect the launched Electron app present there.
- VSCode can also be used (see Debugging in VSCode).

## Related

- [Application Debugging](./application-debugging.md)
- [Debugging in VSCode](./debugging-vscode.md)
