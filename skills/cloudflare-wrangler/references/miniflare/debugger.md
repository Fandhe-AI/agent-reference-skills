---
source: https://developers.cloudflare.com/workers/testing/miniflare/developing/debugger/
---

# Attaching a Debugger (Miniflare)

Attach a Node.js debugger (VS Code, WebStorm) to Miniflare to set breakpoints and inspect Worker code.

## Signature / Usage

VS Code: open **Run and Debug**, create `.vscode/launch.json`, select the `Miniflare` configuration and press the green play button.

```json
{
  "configurations": [
    {
      "name": "Miniflare",
      "type": "node",
      "request": "attach",
      "port": 9229,
      "cwd": "/",
      "resolveSourceMapLocations": null,
      "attachExistingChildren": false,
      "autoAttachChildProcesses": false,
    }
  ]
}
```

WebStorm: click **Add Configuration**, add a **Node.js/Chrome** configuration with **Host** `localhost` and **Port** `9229`, then click the green debug button.

## Notes

- This describes debugging when using Miniflare directly (advanced). With Wrangler, see the Workers Observability breakpoints docs: https://developers.cloudflare.com/workers/observability/dev-tools/breakpoints/
- Breakpoints can also be added via the Workers DevTools: https://developers.cloudflare.com/workers/observability/dev-tools
- The official page prefixes the JSON block with `filename: .vscode/launch.json` front-matter-like lines; omitted here. The JSON contains trailing commas (JSONC) as in the source.
- Port 9229 matches the `inspectorPort: 9229` option mentioned on the migration page.

## Related

- [migrating-from-v2.md](./migrating-from-v2.md)
- [live-reload.md](./live-reload.md)
- [../local-development/overview.md](../local-development/overview.md)
