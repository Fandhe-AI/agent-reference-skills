# request-binding

| Name | Description | Path |
| --- | --- | --- |
| Bind | Struct-tag based binding of path/query/header/body data via `Context#Bind` | [bind.md](./bind.md) |
| DefaultBinder | Built-in binder and single-source bind functions (`BindBody`, `BindQueryParams`, `BindPathValues`, `BindHeaders`) | [default-binder.md](./default-binder.md) |
| Custom Binder | Replacing `Echo#Binder` with a custom implementation | [custom-binder.md](./custom-binder.md) |
| Fluent Binder | Chainable, type-safe query parameter binding via `echo.QueryParamsBinder` | [fluent-binder.md](./fluent-binder.md) |
| BindUnmarshaler | Interface for custom types to parse themselves from a raw string parameter | [bind-unmarshaler.md](./bind-unmarshaler.md) |
| Validator | Registering `Echo#Validator` and validating bound data with `Context#Validate` | [validator.md](./validator.md) |
| Request Data | Individual accessors for form values, query parameters, and path parameters | [request-data.md](./request-data.md) |
