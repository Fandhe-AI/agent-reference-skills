---
source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting#appwrite-sites
---

# Appwrite Sites

GitHub-connected deployment of a TanStack Start app to Appwrite Sites, with automatic build configuration.

## Signature / Usage

```bash
npx @tanstack/cli@latest create
```

## Options / Props

Build settings confirmed during setup in the Appwrite dashboard:

| Name | Value |
|------|-------|
| Install command | `npm install` |
| Build command | `npm run build` |
| Output directory | `./dist` (`./.output` if using Nitro v2/v3) |

## Notes

- Steps: create/use a TanStack Start app, push it to a GitHub repository, create an Appwrite project at Appwrite Cloud, then in the project's Sites page choose "Create site" → "Connect a repository".
- Select the production branch and root directory, verify TanStack Start is detected as the framework, confirm build settings, add environment variables, then Deploy.

## Related

- [Nitro](./nitro.md)
