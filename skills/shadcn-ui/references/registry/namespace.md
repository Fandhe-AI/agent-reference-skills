---
source: https://ui.shadcn.com/docs/registry/namespace
---

# Namespaces

Namespaced registries (`@namespace/resource-name`) configure multiple resource sources in one project via the `registries` field of `components.json`. Resources may be components, libraries, hooks, AI prompts, config files, themes and more.

## Signature / Usage

```json
{
  "registries": {
    "@v0": "https://v0.dev/chat/b/{name}",
    "@acme": "https://registry.acme.com/resources/{name}.json",
    "@private": {
      "url": "https://api.company.com/registry/{name}.json",
      "headers": {
        "Authorization": "Bearer ${REGISTRY_TOKEN}",
        "X-API-Key": "${API_KEY}"
      },
      "params": {
        "version": "latest",
        "format": "json"
      }
    }
  }
}
```

```bash
npx shadcn@latest add @v0/dashboard
npx shadcn@latest add @acme/header @lib/auth-utils @ai/chatbot-rules
npx shadcn@latest view @acme/button
npx shadcn@latest search @acme --query "auth"
npx shadcn@latest search @v0 --limit 10 --offset 20
npx shadcn@latest list @acme
```

## Options / Props

URL template placeholders:

| Placeholder | Required | Description |
| --- | --- | --- |
| `{name}` | Yes | Replaced with the resource name (`@acme/button` becomes `https://registry.acme.com/button.json`). |
| `{style}` | No | Replaced with the current style configuration (style `new-york`: `@themes/card` resolves to `https://registry.example.com/new-york/card.json`). |

Object-form registry config:

| Key | Description |
| --- | --- |
| `url` | URL template containing `{name}`. |
| `headers` | Request headers (e.g. `Authorization`). |
| `params` | Query parameters appended to the URL (e.g. `version=v2`). |

## Notes

- Naming: must start with `@`; only alphanumeric characters, hyphens and underscores (`@v0`, `@acme-ui`, `@my_company`). Reference pattern `@namespace/resource-name`. Parser regex: `/^(@[a-zA-Z0-9](?:[a-zA-Z0-9-_]*[a-zA-Z0-9])?)\/(.+)$/`.
- The namespace system is intentionally decentralized: a central open source registry index exists, but any namespace may be used. No naming conflicts since there is no central authority.
- `${VAR_NAME}` is expanded from `process.env` in URLs, headers and params; the CLI never logs the values. Missing variables produce an error listing them; set them in `.env` or `.env.local`. Never commit tokens; use HTTPS (HTTP is "Avoid").
- Auth methods shown: Bearer token, API key header, Basic (`Basic ${BASE64_CREDENTIALS}`), query-parameter auth, and multiple combined.
- Security model: resources are validated against the registry item schema, are data not code, files only write to configured paths. Registry Trust Model: registries must be explicitly configured in `components.json`; the CLI never automatically adds registries. Exception documented on the Registry Index page: namespaces listed in the open source registry index (https://ui.shadcn.com/r/registries.json) are resolved and added to `components.json` automatically by add/search; custom or private registries must be configured explicitly. Inspect payloads before installing with `shadcn view`.
- Dependency resolution: clears registry context; fetches the resource; recursively resolves `registryDependencies` from their own registries; topological sort; deduplicates files by target path (last one wins); deep-merges tailwind, cssVars, css, envVars. Circular dependencies are detected. Override a third-party item by listing it in `registryDependencies` of your own item and overriding values or files.
- Versioning via `params` (e.g. `"version": "v2"` resolves to `?version=v2`, or `"${REGISTRY_VERSION}"`, or semver-style params). The page suggests `${VAR:-default}` syntax for defaults.
- GitHub address vs namespace: use `acme/ui/button` for public GitHub repos without configuring `components.json`; use `@acme/button` for stable aliases, custom hosting, authentication, headers, query parameters or private registries.
- CLI also accepts `add https://registry.example.com/button.json` and `add ./local-registry/button.json`; `view` accepts multiple items and URLs; `list` is an alias for `search`.
- Errors: `Unknown registry "@non-existent". Make sure it is defined in components.json ...`; 404 "was not found"; 401 "You are not authorized to access the item at ..."; 403 "Access forbidden for ...".
- To serve a namespace: return JSON conforming to the registry item schema, include `{name}` in the URL template, use appropriate `type` values, handle auth through headers or query parameters.

## Related

- [Authentication](./authentication.md)
- [GitHub Registries](./github.md)
- [Registry Directory (index submission)](./registry-index.md)
- [registry-item.json](./registry-item-json.md)
