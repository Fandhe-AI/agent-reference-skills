---
source: https://developers.cloudflare.com/workers/observability/dev-tools/
---

# DevTools and breakpoints

Running a Worker locally with `wrangler dev` or Vite with the Cloudflare Vite plugin gives access to Cloudflare's implementation of Chrome DevTools: view logs in the console, debug with breakpoints, profile CPU, and inspect memory. Also covers breakpoint debugging (https://developers.cloudflare.com/workers/observability/dev-tools/breakpoints/).

## Signature / Usage

VS Code `.vscode/launch.json` for breakpoint debugging:

```json
{
	"configurations": [
		{
			"name": "Listen Wrangler",
			"type": "node",
			"request": "attach",
			"port": 9229,
			"cwd": "/",
			"resolveSourceMapLocations": null,
			"attachExistingChildren": false,
			"autoAttachChildProcesses": false,
			"sourceMaps": true // works with or without this line
		},
		{
			"name": "Launch Wrangler",
			"command": "npm run dev",
			"type": "node-terminal",
			"request": "launch",
			"console": "integratedTerminal",
			"sourceMaps": true
		}
	]
}
```

## Notes

- Open DevTools with Wrangler: run `wrangler dev`, then press the `D` key in the terminal. With Vite: run `vite` and open the debug URL shown in the console (for example `http://localhost:5173/__debug`) in a Chrome tab. The Cloudflare dashboard editor and the Workers Playground include DevTools in the UI.
- VS Code debug terminals: open a JavaScript Debug Terminal (`Cmd + Shift + P`, type `javascript debug`) and run `wrangler dev` (or `vite dev`) in it; VS Code connects automatically, even with multiple Workers.
- `launch.json` steps: create `.vscode/` in the project root, add the file above, run `npx wrangler dev` in a VS Code terminal, choose **Wrangler** in the **Run & Debug** panel and select play (**Wrangler: Remote Process [0]** appears in Call Stack), add a breakpoint in a `.js`/`.ts` file, then open the Worker's local URL (default `http://127.0.0.1:8787`). The file applies to a single workspace; the config can instead be added to User Settings.
- Caution: breakpoint debugging with `wrangler dev --remote` could extend Worker CPU time and incur costs against actual resources; prefer `wrangler dev` without `--remote`. With `--remote`, minification cannot be used (do not set `minify` to `true`) because the debugger cannot find variables at a breakpoint.

## Related

- [cpu-profiling.md](./cpu-profiling.md)
- [memory-profiling.md](./memory-profiling.md)
- [profiling-in-production.md](./profiling-in-production.md)
- [../local-development/overview.md](../local-development/overview.md)
- [../vite-plugin/debugging.md](../vite-plugin/debugging.md)
