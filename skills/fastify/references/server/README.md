# server

対象 Fastify v5.12.1

| Name | Description | Path |
|------|-------------|------|
| Factory Options | Fastify ファクトリ関数のオプション（http/https/http2, bodyLimit, trustProxy, logger, ajv 等） | [factory-options.md](./factory-options.md) |
| Router Options | `routerOptions` 配下の find-my-way ルーターオプション（caseSensitive, constraints, maxParamLength 等） | [router-options.md](./router-options.md) |
| Instance Lifecycle | after / ready / listen / addresses / close / Symbol.asyncDispose / listeningOrigin | [instance-lifecycle.md](./instance-lifecycle.md) |
| Instance Routing | route / hasRoute / findRoute / printRoutes / addHttpMethod / addConstraintStrategy / hasConstraintStrategy | [instance-routing.md](./instance-routing.md) |
| Instance Plugins | register / hasPlugin / pluginName / printPlugins / prefix | [instance-plugins.md](./instance-plugins.md) |
| Instance Decorators | decorate / decorateRequest / decorateReply（詳細は plugins/decorators.md） | [instance-decorators.md](./instance-decorators.md) |
| Instance Schemas | addSchema / getSchema(s) / setValidatorCompiler / setSerializerCompiler / schemaController 等 | [instance-schemas.md](./instance-schemas.md) |
| Instance Handlers | setNotFoundHandler / setErrorHandler / setChildLoggerFactory / setGenReqId / errorHandler | [instance-handlers.md](./instance-handlers.md) |
| Instance Content Type | addContentTypeParser 系メソッド一覧（詳細は content-type-parser.md） | [instance-content-type.md](./instance-content-type.md) |
| Instance Inject | inject（テスト用の擬似 HTTP リクエスト） | [instance-inject.md](./instance-inject.md) |
| Instance Misc | server / log / version / initialConfig / routing | [instance-misc.md](./instance-misc.md) |
| Content-Type Parser | Content-Type パーサーの登録・削除・catch-all パターン | [content-type-parser.md](./content-type-parser.md) |
