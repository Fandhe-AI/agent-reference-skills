# Third-party Middleware

Middleware not bundled within the Hono package. Most of it leverages external libraries.

## Signature / Usage

Entries are listed by category in the official page, for example:

```md
### Validators

- [Zod Validator](https://github.com/honojs/middleware/tree/main/packages/zod-validator)
- [Valibot Validator](https://github.com/honojs/middleware/tree/main/packages/valibot-validator)
```

### Catalog

| Category | Entries |
|----------|---------|
| Authentication | [Auth.js (Next Auth)](https://github.com/honojs/middleware/tree/main/packages/auth-js), [Casbin](https://github.com/honojs/middleware/tree/main/packages/casbin), [Clerk Auth](https://github.com/honojs/middleware/tree/main/packages/clerk-auth), [Cloudflare Access](https://github.com/honojs/middleware/tree/main/packages/cloudflare-access), [OAuth Providers](https://github.com/honojs/middleware/tree/main/packages/oauth-providers), [OIDC Auth](https://github.com/honojs/middleware/tree/main/packages/oidc-auth), [Firebase Auth](https://github.com/honojs/middleware/tree/main/packages/firebase-auth), [Verify RSA JWT (JWKS)](https://github.com/wataruoguchi/verify-rsa-jwt-cloudflare-worker), [SSOJet Auth](https://github.com/ssojet/ssojet-hono), [Stytch Auth](https://github.com/honojs/middleware/tree/main/packages/stytch-auth), [Shopify Auth](https://github.com/besart-k/hono-shopify-auth) |
| Validators | [Ajv](https://github.com/honojs/middleware/tree/main/packages/ajv-validator), [ArkType](https://github.com/honojs/middleware/tree/main/packages/arktype-validator), [Class Validator](https://github.com/honojs/middleware/tree/main/packages/class-validator), [Conform](https://github.com/honojs/middleware/tree/main/packages/conform-validator), [Effect Schema](https://github.com/honojs/middleware/tree/main/packages/effect-validator), [Standard Schema](https://github.com/honojs/middleware/tree/main/packages/standard-validator), [TypeBox](https://github.com/honojs/middleware/tree/main/packages/typebox-validator), [Typia](https://github.com/honojs/middleware/tree/main/packages/typia-validator), [unknownutil](https://github.com/ryoppippi/hono-unknownutil-validator), [Valibot](https://github.com/honojs/middleware/tree/main/packages/valibot-validator), [Zod](https://github.com/honojs/middleware/tree/main/packages/zod-validator) |
| OpenAPI | [Zod OpenAPI](https://github.com/honojs/middleware/tree/main/packages/zod-openapi), [Scalar](https://github.com/scalar/scalar/tree/main/integrations/hono), [Swagger UI](https://github.com/honojs/middleware/tree/main/packages/swagger-ui), [Swagger Editor](https://github.com/honojs/middleware/tree/main/packages/swagger-editor), [Hono OpenAPI](https://github.com/rhinobase/hono-openapi), [hono-zod-openapi](https://github.com/paolostyle/hono-zod-openapi) |
| Development | [ESLint Config](https://github.com/honojs/middleware/tree/main/packages/eslint-config), [hono-testkit](https://github.com/md-sagban/hono-testkit), [SSG Plugin Essential](https://github.com/honojs/middleware/tree/main/packages/ssg-plugins-essential) |
| Monitoring / Tracing | [Apitally](https://docs.apitally.io/frameworks/hono), [Highlight.io](https://www.highlight.io/docs/getting-started/backend-sdk/js/hono), [LogTape](https://logtape.org/manual/integrations#hono), [OpenTelemetry](https://github.com/honojs/middleware/tree/main/packages/otel), [Prometheus Metrics](https://github.com/honojs/middleware/tree/main/packages/prometheus), [Sentry](https://github.com/honojs/middleware/tree/main/packages/sentry), [Pino logger](https://github.com/maou-shonen/hono-pino) |
| Server / Adapter | [GraphQL Server](https://github.com/honojs/middleware/tree/main/packages/graphql-server), [oRPC](https://orpc.dev/docs/adapters/hono), [tRPC Server](https://github.com/honojs/middleware/tree/main/packages/trpc-server), [mcp-use (MCP Server)](https://github.com/mcp-use/mcp-use) |
| Transpiler | [Bun Transpiler](https://github.com/honojs/middleware/tree/main/packages/bun-transpiler), [esbuild Transpiler](https://github.com/honojs/middleware/tree/main/packages/esbuild-transpiler) |
| UI / Renderer | [Qwik City](https://github.com/honojs/middleware/tree/main/packages/qwik-city), [React Compatibility](https://github.com/honojs/middleware/tree/main/packages/react-compat), [React Renderer](https://github.com/honojs/middleware/tree/main/packages/react-renderer) |
| Queue / Job Processing | [GlideMQ](https://github.com/avifenesh/glidemq-hono) |
| Internationalization | [Intlayer i18n](https://intlayer.org/doc/environment/hono) |
| Utilities | [Bun Compress](https://github.com/honojs/middleware/tree/main/packages/bun-compress), [Cap Checkpoint](https://capjs.js.org/guide/middleware/hono.html), [Event Emitter](https://github.com/honojs/middleware/tree/main/packages/event-emitter), [Geo](https://github.com/ktkongtong/hono-geo-middleware/tree/main/packages/middleware), [Hono Rate Limiter](https://github.com/rhinobase/hono-rate-limiter), [Hono Problem Details (RFC 9457)](https://github.com/paveg/hono-problem-details), [Hono Simple DI](https://github.com/maou-shonen/hono-simple-DI), [InferDI](https://github.com/inferdi/inferdi/tree/main/packages/hono), [Idempotency](https://github.com/paveg/hono-idempotency), [idempot-js](https://js.idempot.dev), [jsonv-ts](https://github.com/dswbx/jsonv-ts), [MCP](https://github.com/honojs/middleware/tree/main/packages/mcp), [RONIN (Database)](https://github.com/ronin-co/hono-client), [Session](https://github.com/honojs/middleware/tree/main/packages/session), [StitchAPI](https://github.com/rejifald/StitchAPI/tree/main/packages/hono), [tsyringe](https://github.com/honojs/middleware/tree/main/packages/tsyringe), [User Agent based Blocker](https://github.com/honojs/middleware/tree/main/packages/ua-blocker) |

## Notes

- Not bundled with the `hono` package; each entry is installed and versioned separately.
- Many entries live in the `honojs/middleware` monorepo under `packages/`; others are community repositories or vendor docs.
- Source: https://hono.dev/docs/middleware/third-party (honojs/website@7838d779)
