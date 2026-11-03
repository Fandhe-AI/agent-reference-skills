---
source: https://developers.cloudflare.com/workers/vite-plugin/reference/debugging/
---

# Debugging

Debugging is enabled by default and the inspector listens on port `9229`. Set a custom port or disable it with the `inspectorPort` plugin option.

## Signature / Usage

`.vscode/launch.json` for breakpoint debugging in VS Code:

```json
{
	"configurations": [
		{
			"name": "<NAME_OF_WORKER>",
			"type": "node",
			"request": "attach",
			"websocketAddress": "ws://localhost:9229/<NAME_OF_WORKER>",
			"resolveSourceMapLocations": null,
			"attachExistingChildren": false,
			"autoAttachChildProcesses": false,
			"sourceMaps": true
		}
	],
	"compounds": [
		{
			"name": "Debug Workers",
			"configurations": ["<NAME_OF_WORKER>"],
			"stopAll": true
		}
	]
}
```

Run `vite dev` or `vite preview`, then select **Debug Workers** in the **Run & Debug** panel.

## Notes

- DevTools: `vite dev` and `vite preview` add a `/__debug` route exposing Cloudflare's implementation of Chrome DevTools. Navigating to it opens a DevTools tab per Worker; make a request to the app to start debugging. With multiple Workers, allow the browser to open pop-ups.
- `<NAME_OF_WORKER>` is the Worker name from the Worker config file. If `inspectorPort` is customized, use that port in the `websocketAddress` field (the docs prose spells it `websocketaddress`).
- With more than one Worker, add a configuration per Worker in `configurations` and include each name in the `compounds` `configurations` array.

## Related

- [api.md](./api.md)
