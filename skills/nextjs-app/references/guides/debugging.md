# Debugging

Debug a Next.js frontend and backend with full source-map support using VS Code, Chrome DevTools, or Firefox DevTools.

## Signature / Usage

```json filename=".vscode/launch.json"
{
  "version": "0.2.0",
  "configurations": [
    { "name": "Next.js: debug server-side", "type": "node-terminal", "request": "launch", "command": "npm run dev -- --inspect" },
    { "name": "Next.js: debug client-side", "type": "chrome", "request": "launch", "url": "http://localhost:3000" },
    {
      "name": "Next.js: debug full stack",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/next/dist/bin/next",
      "runtimeArgs": ["--inspect"],
      "skipFiles": ["<node_internals>/**"],
      "serverReadyAction": {
        "action": "debugWithEdge",
        "killOnServerStop": true,
        "pattern": "- Local:.+(https?://.+)",
        "uriFormat": "%s",
        "webRoot": "${workspaceFolder}"
      }
    }
  ]
}
```

## Key topics

- **VS Code**: create `.vscode/launch.json` with server-side, client-side, Firefox, and full-stack configurations; start with the Debug panel or `F5`. Use `cwd` if running from a non-root directory (e.g. Turborepo).
- **JetBrains WebStorm**: create a `JavaScript Debug` configuration pointed at `http://localhost:3000`.
- **Browser DevTools (client-side)**: run `next dev`, open DevTools Sources/Debugger tab; `debugger` statements pause execution; source files appear under `webpack://_N_E/./`.
- **React Developer Tools**: browser extension for inspecting components, editing props/state, and spotting performance issues.
- **Browser DevTools (server-side)**: start with `--inspect` (or `NODE_OPTIONS=--inspect-brk` for break-on-start); open `chrome://inspect` or `about:debugging` to attach; source files appear under `webpack://{app-name}/./`.
- **Inspecting server errors**: the error overlay shows a Node.js icon that copies a DevTools URL to inspect the server process.

## Notes

- Use `--inspect=0.0.0.0` for remote debugging access outside localhost (e.g. Docker).
- On Windows, disable Windows Defender scanning for the project folder — it can significantly slow Fast Refresh.

## Related

- [Development Environment](./local-development.md)
