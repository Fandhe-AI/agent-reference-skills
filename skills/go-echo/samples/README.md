# samples

| Name | Description | Path |
| --- | --- | --- |
| Hello World / Basic Server | Minimal Echo server: register logging/recovery middleware, add one route, start listening | [hello-world.md](./hello-world.md) |
| CRUD API | In-memory REST API for a `user` resource, demonstrating route params, `c.Bind`, and JSON responses | [crud-api.md](./crud-api.md) |
| JWT Authentication | Issue a JWT on login and protect a route group with `echo-jwt` middleware verifying custom claims | [jwt-authentication.md](./jwt-authentication.md) |
| WebSocket | Upgrade an HTTP connection to WebSocket with `gorilla/websocket` and exchange messages with a browser client | [websocket.md](./websocket.md) |
| Server-Sent Events (SSE) | Stream periodic events to the browser over `text/event-stream`, flushing after each write | [server-sent-events.md](./server-sent-events.md) |
| File Upload | Handle a `multipart/form-data` POST request, save the uploaded file to disk, return an HTML confirmation | [file-upload.md](./file-upload.md) |
| File Download | Serve files for inline display or forced download using `c.File`, `c.Inline`, and `c.Attachment` | [file-download.md](./file-download.md) |
| Graceful Shutdown | Shut down the Echo server cleanly on `SIGINT`/`SIGTERM` using `echo.StartConfig`'s `GracefulTimeout` | [graceful-shutdown.md](./graceful-shutdown.md) |
| Template Rendering | Render server-side HTML by implementing the `echo.Renderer` interface with `html/template` | [template-rendering.md](./template-rendering.md) |
| Custom Middleware | Write custom middleware as a plain function and as a struct method, registered globally | [custom-middleware.md](./custom-middleware.md) |
| Auto TLS | Automatically obtain and renew TLS certificates from Let's Encrypt using `autocert` | [auto-tls.md](./auto-tls.md) |
| Embed Resources | Bundle static assets into the binary with Go's `embed` package, with a live-reload dev fallback | [embed-resources.md](./embed-resources.md) |
| HTTP/2 Server | Serve HTTP/2 over TLS; negotiated automatically by Go's `net/http` once TLS is configured | [http2-server.md](./http2-server.md) |
| HTTP/2 Server Push | Proactively push CSS/JS/image assets to the client alongside the initial HTML response | [http2-server-push.md](./http2-server-push.md) |
| JSONP | Return a JSON payload wrapped in a client-supplied callback function name using `c.JSONP` | [jsonp.md](./jsonp.md) |
| Streaming Response | Stream JSON-encoded records to the client as they are produced, flushing after each write | [streaming-response.md](./streaming-response.md) |
| Subdomain Routing | Route requests to independent `Echo` instances per host using `echo.NewVirtualHostHandler` | [subdomain.md](./subdomain.md) |
| Timeout | Bound handler execution time with `middleware.ContextTimeout` and react via context cancellation | [timeout.md](./timeout.md) |
| Reverse Proxy | Forward HTTP/WebSocket traffic to multiple upstream servers with `middleware.Proxy` round-robin balancing | [reverse-proxy.md](./reverse-proxy.md) |
| Load Balancing with Nginx | Run multiple Echo instances behind an external Nginx reverse proxy / load balancer | [load-balancing.md](./load-balancing.md) |
