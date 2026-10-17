---
source: https://ui.shadcn.com/docs/registry/registry-index
---

# Open Source Registry Index

The open source registry index lists open source registries available out of the box. `shadcn add` and `shadcn search` check the index and add the matching registry to `components.json` automatically. The full list is at `https://ui.shadcn.com/r/registries.json`.

## Signature / Usage

Example of a valid registry for the index:

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "acme",
  "homepage": "https://acme.com",
  "items": [
    {
      "name": "login-form",
      "type": "registry:component",
      "title": "Login Form",
      "description": "A login form component.",
      "files": [
        {
          "path": "registry/new-york/auth/login-form.tsx",
          "type": "registry:component"
        }
      ]
    }
  ]
}
```

Submission steps:

```bash
pnpm validate:registries
```

1. Add your registry to `apps/v4/registry/directory.json` in `shadcn-ui/ui`.
2. Run `pnpm validate:registries`.
3. Open a pull request to `https://github.com/shadcn-ui/ui`.

## Notes

- Requirements: open source and publicly accessible; a valid JSON file conforming to the registry schema; expected to be flat (`/registry.json` and `/component-name.json` at the registry root, no nested items); the `files` array, if present, must NOT include a `content` property.
- Once the PR is merged the registry is published immediately; Registry Health starts monitoring after publication and does not delay or gate it.
- A public GitHub registry does not need to be submitted to use `owner/repo/item` addresses; the directory is for namespaces such as `@acme`.

## Related

- [Registry Health](./health.md)
- [Namespaces](./namespace.md)
- [registry.json](./registry-json.md)
- [Registry Directory (browse page)](./directory.md)
