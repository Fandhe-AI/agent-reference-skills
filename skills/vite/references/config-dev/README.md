# config-dev

| Name | Description | Path |
|------|-------------|------|
| optimizeDeps.entries / include / exclude | Control which entries are crawled and which dependencies are pre-bundled. | [optimize-deps-entries-include-exclude.md](./optimize-deps-entries-include-exclude.md) |
| optimizeDeps.force / noDiscovery / holdUntilCrawlEnd / disabled / needsInterop | Boolean/flag-style options of the dependency optimizer. | [optimize-deps-flags.md](./optimize-deps-flags.md) |
| optimizeDeps.rolldownOptions / esbuildOptions | Options passed to the bundler during dependency scanning and optimization. | [optimize-deps-rolldown-esbuild-options.md](./optimize-deps-rolldown-esbuild-options.md) |
| preview.* Options | Options for the preview server (`vite preview`). | [preview-options.md](./preview-options.md) |
| server.cors / server.headers | CORS configuration and extra response headers for the dev server. | [server-cors-headers.md](./server-cors-headers.md) |
| server.forwardConsole | Forward browser runtime events to the Vite server console during development. | [server-forward-console.md](./server-forward-console.md) |
| server.fs.strict / allow / deny | Restrict which files the dev server may serve. | [server-fs.md](./server-fs.md) |
| server.host / server.allowedHosts | Control which IP addresses the dev server listens on (`server.host`). | [server-host-allowed-hosts.md](./server-host-allowed-hosts.md) |
| server.hmr / server.ws | Configure HMR behavior (`server.hmr`) and the WebSocket connection (`server.ws`). | [server-hmr-ws.md](./server-hmr-ws.md) |
| server.https / server.open | Enable TLS + HTTP/2 on the dev server. | [server-https-open.md](./server-https-open.md) |
| server.middlewareMode | Create the Vite server in middleware mode, to mount `vite.middlewares`. | [server-middleware-mode.md](./server-middleware-mode.md) |
| server.origin / server.sourcemapIgnoreList | Set the origin of generated asset URLs during development. | [server-origin-sourcemap-ignore.md](./server-origin-sourcemap-ignore.md) |
| server.port / server.strictPort | Dev server port and whether to fail when the port is taken. | [server-port.md](./server-port.md) |
| server.proxy | Custom proxy rules for the dev server, as `{ key: options }` pairs. | [server-proxy.md](./server-proxy.md) |
| server.warmup | Warm up files to transform and cache the results in advance. | [server-warmup.md](./server-warmup.md) |
| server.watch | File system watcher options passed on to chokidar. | [server-watch.md](./server-watch.md) |
