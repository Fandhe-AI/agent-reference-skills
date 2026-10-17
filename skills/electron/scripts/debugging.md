---
source: https://www.electronjs.org/docs/latest/tutorial/debugging-main-process
---

# Debugging

Main-process debugging, REPL, and Chromium logging. Sources: debugging-main-process, repl, api/command-line-switches, api/environment-variables.

> **Warning**: `--inspect` / `--remote-debugging-port` open a debugger port. Use them only on a development machine or a disposable environment, and never enable them in production builds or on shared networks.

## Enable the main-process inspector

```sh
electron --inspect=9229 your/app
```

The default port is `9229`. Connect from `chrome://inspect` in Chrome.

## Start paused on the first line

```sh
electron --inspect-brk=9229 your/app
```

`--inspect-brk[=port]` pauses execution on the first JavaScript line (debugging-main-process has no example command; it is documented in the same form as `--inspect`).

## Main-process REPL

```sh
./node_modules/.bin/electron --interactive
```

`electron --interactive` is not available on Windows (per the official docs).

## Remote debugging port for the renderer

```sh
electron . --remote-debugging-port=9222
```

The VS Code launch configuration in tutorial-first-app also uses it as `"args": [".", "--remote-debugging-port=9222"]`.

## Chromium logging (environment variable)

```sh
export ELECTRON_ENABLE_LOGGING=true
electron
```

Equivalent to `--enable-logging`. Set the output destination with `ELECTRON_LOG_FILE` or `--log-file=path` (the parent directory must exist). In a Windows console, use `set ELECTRON_ENABLE_LOGGING=true`.

## Print stack traces on crash

```sh
export ELECTRON_ENABLE_STACK_DUMPING=true
electron
```

Disabled when `crashReporter` has been started (per the official docs).

## Launch with a specific Electron build

```sh
export ELECTRON_OVERRIDE_DIST_PATH=/Users/username/projects/electron/out/Testing
```

Uses the specified build instead of the one fetched by `npm install` (example from the environment-variables page).
