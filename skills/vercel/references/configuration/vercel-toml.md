# vercel.toml

Configure a Vercel project with a TOML file. Supports the same configuration properties as `vercel.json`, plus comments and a flatter structure.

## Signature / Usage

```toml
"$schema" = "https://openapi.vercel.sh/vercel.json"
buildCommand = "pnpm run build"
outputDirectory = "dist"
cleanUrls = true
```

Equivalent `vercel.json`:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "pnpm run build",
  "outputDirectory": "dist",
  "cleanUrls": true
}
```

Services example (frontend and backend in one project; `/api` goes to the backend, everything else to the frontend):

```toml
"$schema" = "https://openapi.vercel.sh/vercel.json"

# Next.js frontend
[services.frontend]
root = "frontend/"

# FastAPI backend
[services.backend]
root = "backend/"
entrypoint = "main:app"

[[rewrites]]
source = "/api/(.*)"
destination = { service = "backend" }

[[rewrites]]
source = "/(.*)"
destination = { service = "frontend" }
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| (all `vercel.json` properties) | same as `vercel.json` | `vercel.toml` supports all the same configuration fields as `vercel.json` |

## Notes

- Create `vercel.toml` in the project root and commit it with the code.
- Use only one project configuration file: `vercel.toml`, `vercel.json`, or `vercel.ts`.
- Suited to large or complex configuration, such as many rewrites or Services (multiple applications in one Vercel project).
- Official page last updated 2026-08-25 (source: https://vercel.com/docs/project-configuration/vercel-toml).

## Related

- [vercel.json](./vercel-json.md)
- [vercel.ts](./vercel-ts.md)
