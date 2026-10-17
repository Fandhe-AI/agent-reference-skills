---
source: https://www.electronjs.org/docs/latest/api/command-line
---

# CommandLine

Manipulate the command line arguments for your app that Chromium reads. Process: Main.

This class is not exported from the `'electron'` module. It is only available as a return value of other methods in the Electron API (`app.commandLine`).

## Signature / Usage

```js
const { app } = require('electron')

app.commandLine.hasSwitch('disable-gpu')
```

## Instance Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `commandLine.appendSwitch(switch[, value])` | | Append a switch (without the leading `--`, optional string `value`) to Chromium's command line. |
| `commandLine.appendArgument(value)` | | Append an argument to Chromium's command line; quoted correctly. Switches precede arguments regardless of append order. For `--switch=value`, prefer `appendSwitch('switch', 'value')`. |
| `commandLine.hasSwitch(switch)` | boolean | Whether the switch is present. |
| `commandLine.getSwitchValue(switch)` | string | The switch value; empty string if not present or no value. Meant for Chromium switches, not app-specific arguments (use `process.argv`). |
| `commandLine.removeSwitch(switch)` | | Removes the specified switch from Chromium's command line. |

```js
const { app } = require('electron')

app.commandLine.appendSwitch('remote-debugging-port', '8315')
const portValue = app.commandLine.getSwitchValue('remote-debugging-port')
console.log(portValue) // '8315'
```

## Notes

- `appendSwitch`, `appendArgument` and `removeSwitch` do not affect `process.argv`; they are intended to control Chromium's behavior.

## Related

- [Supported Command Line Switches](./command-line-switches.md)
- [process](./process.md)
