# Monorepo Setup

Bootstrap a new Turborepo monorepo with apps and shared packages.

```bash
# Create with pnpm
pnpm dlx create-turbo@latest

# Create with npm
npx create-turbo@latest

# Create with yarn
yarn dlx create-turbo@latest
```

Resulting structure:

```
apps/
  web/          # Next.js app
  docs/         # docs app
packages/
  ui/           # shared UI components
  eslint-config/
  typescript-config/
turbo.json
package.json
```

`pnpm-workspace.yaml` (or root `package.json` `workspaces` field for npm/yarn):

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

Root `turbo.json`:

```json
{
  "$schema": "https://turborepo.com/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "!.next/cache/**"]
    },
    "lint": {},
    "test": {
      "dependsOn": ["build"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

## Notes

- `apps/` holds deployable applications; `packages/` holds shared libraries and configs
- Nested packages (e.g. `apps/**`) are not supported — use a flat list in workspace definitions
- Add `turbo` to devDependencies at the root to pin the version across the team
- Use scoped package names (e.g. `@acme/ui`) to avoid collisions
