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
