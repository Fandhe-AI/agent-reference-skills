# context

| Name | Description | Path |
| --- | --- | --- |
| Context (core) | Core `echo.Context` methods: request/response access, route path, TLS/scheme/IP, logger | [context.md](./context.md) |
| Request Data | Param/QueryParam/FormValue and their typed generic/`*Or` variants, cookies | [request.md](./request.md) |
| Response Helpers | String/JSON/HTML/XML/Blob/Stream/File/Redirect/Render and related response methods | [response.md](./response.md) |
| Per-Request Storage & Custom Context | `Set`/`Get`, `echo.ContextGet[T]`, and notes on extending Context in v5 | [storage.md](./storage.md) |
| Binding & Validation | `Bind`, `Validate`, single-source `Bind*` functions, struct tags | [binding.md](./binding.md) |
