# Open API

The Open API plugin provides an OpenAPI 3.0 reference for Better Auth. It surfaces every endpoint added by plugins and core, and renders an interactive reference UI using Scalar.

An early-stage plugin.

## Signature / Usage

### Setup (server side)

```typescript
import { betterAuth } from "better-auth"
import { openAPI } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [
        openAPI(),
    ]
})
```

### Accessing the reference

Visit `/api/auth/reference` to view the OpenAPI reference UI.

### Retrieving the schema programmatically

```typescript
import { auth } from "@/lib/auth"

const openAPISchema = await auth.api.generateOpenAPISchema()
console.log(openAPISchema)
```

### Integrating with Scalar docs

```typescript
app.get("/docs", Scalar({
    pageTitle: "API Documentation",
    sources: [
        { url: "/api/open-api", title: "API" },
        { url: "/api/auth/open-api/generate-schema", title: "Auth" },
    ],
}))
```

## Options / Props

| Option | Type | Default | Description |
|---|---|---|---|
| `path` | string | `/api/auth/reference` | URL path where the reference is served |
| `disableDefaultReference` | boolean | `false` | Disables the default Scalar UI when using a custom document |
| `theme` | string | `default` | Theme for the OpenAPI reference page |
| `nonce` | string | `undefined` | CSP nonce string for inline scripts |

## Notes

- An early-stage plugin
- All plugin and core endpoints are documented automatically
- Endpoints are grouped by plugin name; core endpoints are labeled "Default"
- Complies with the OpenAPI 3.0 specification
- The schema is generated dynamically from the configured auth instance, so the documentation stays in sync with the actual endpoint configuration
