# samples

| Name | Description | Path |
|------|-------------|------|
| Auto TLS | Obtain and renew TLS certificates automatically from Let's Encrypt via `autocert`. | [auto-tls.md](./auto-tls.md) |
| CORS | Enable Cross-Origin Resource Sharing with an origin allow list or a custom origin function. | [cors.md](./cors.md) |
| CRUD API (Routing + Binding + JSON Response) | In-memory REST API for a `user` resource, demonstrating route params, `c.Bind`, and JSON responses. | [crud-api.md](./crud-api.md) |
| Custom Middleware | Write custom middleware as a plain function and as a struct method, and register it globally. | [custom-middleware.md](./custom-middleware.md) |
| Embed Resources | Bundle static assets into the compiled binary with `embed`, with a live-reload fallback for development. | [embed-resources.md](./embed-resources.md) |
| File Download | Serve files for inline display or forced download with `c.File`, `c.Inline`, and `c.Attachment`. | [file-download.md](./file-download.md) |
| File Upload (multipart form) | Handle a `multipart/form-data` POST request, save the uploaded file to disk, and return an HTML confirmation. | [file-upload.md](./file-upload.md) |
| Graceful Shutdown | Shut down the Echo server cleanly on `SIGINT`/`SIGTERM` using `StartConfig`'s `GracefulTimeout`. | [graceful-shutdown.md](./graceful-shutdown.md) |
| Hello World / Basic Server | Minimal Echo server: register logging/recovery middleware, add one route, and start listening. | [hello-world.md](./hello-world.md) |
| HTTP/2 Server Push | Push static assets (CSS, JS, images) to the client alongside the initial HTML response over HTTP/2. | [http2-server-push.md](./http2-server-push.md) |
| HTTP/2 Server | Serve HTTP/2 over TLS; Go's `net/http` negotiates HTTP/2 automatically once TLS is configured. | [http2-server.md](./http2-server.md) |
| JSONP | Return a JSON payload wrapped in a client-supplied callback function name using `c.JSONP`. | [jsonp.md](./jsonp.md) |
| JWT Authentication | Issue a JWT on login and protect a route group with `echo-jwt` middleware verifying custom claims. | [jwt-authentication.md](./jwt-authentication.md) |
| Load Balancing with Nginx | Run multiple Echo server instances behind Nginx acting as an external reverse proxy / load balancer. | [load-balancing.md](./load-balancing.md) |
| Reverse Proxy | Use Echo's `middleware.Proxy` to forward HTTP and WebSocket traffic to upstream servers with round-robin load balancing. | [reverse-proxy.md](./reverse-proxy.md) |
| Server-Sent Events (SSE) | Stream periodic events to the browser over `text/event-stream`, flushing after each write. | [server-sent-events.md](./server-sent-events.md) |
| Streaming Response | Stream a sequence of JSON-encoded records to the client as they are produced, flushing after each write. | [streaming-response.md](./streaming-response.md) |
| Subdomain Routing | Route requests to independent `Echo` instances based on the request host, each with its own routes and middleware. | [subdomain.md](./subdomain.md) |
| Template Rendering (html/template) | Render server-side HTML by implementing the `echo.Renderer` interface with `html/template`. | [template-rendering.md](./template-rendering.md) |
| Timeout | Bound the maximum time a request handler is allowed to run using `middleware.ContextTimeout`. | [timeout.md](./timeout.md) |
| WebSocket | Upgrade an HTTP connection to WebSocket with `gorilla/websocket` and exchange messages with a browser client. | [websocket.md](./websocket.md) |
