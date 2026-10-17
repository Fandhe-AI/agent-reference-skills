---
source: https://docs.astral.sh/uv/guides/integration/renovate/
---

# Renovate and Dependabot

Keeping uv-managed dependencies up to date with the Renovate and Dependabot dependency bots, including `uv.lock` handling, inline script metadata, and dependency cooldown.

## Signature / Usage

Dependabot (`dependabot.yml`):

```yaml
version: 2

updates:
  - package-ecosystem: "uv"
    directory: "/"
    schedule:
      interval: "weekly"
```

Renovate lockfile refresh (`renovate.json5`):

```jsx
{
  $schema: "https://docs.renovatebot.com/renovate-schema.json",
  lockFileMaintenance: {
    enabled: true,
  },
}
```

## Renovate

Renovate uses the presence of a `uv.lock` file to determine that uv is used, suggests upgrades to project, optional and development dependencies, and updates both `pyproject.toml` and `uv.lock`. Enable `lockFileMaintenance` to refresh the lockfile regularly (e.g. transitive dependencies).

Inline script metadata: Renovate cannot detect which Python files use it, so list locations with `managerFilePatterns`:

```jsx
{
  $schema: "https://docs.renovatebot.com/renovate-schema.json",
  pep723: {
    managerFilePatterns: [
      "docs/build.py",
      "scripts/**/*.py",
    ],
  },
}
```

Dependency cooldown: if `exclude-newer` is set, also set the equivalent `minimumReleaseAge` (example for `exclude-newer = "1 week"`):

```jsx
{
  $schema: "https://docs.renovatebot.com/renovate-schema.json",

  // Enable only for PyPI.
  packageRules: [
    {
      matchDatasources: ["pypi"],
      minimumReleaseAge: "1 week",
    },
  ],

  // Or enable for every ecosystem.
  minimumReleaseAge: "1 week",
}
```

## Dependabot

Dependabot supports updating `uv.lock` files via the uv `package-ecosystem`. Dependency cooldown: if `exclude-newer` is set, also set `cooldown` (example for `1 week`):

```yaml
version: 2

updates:
  - package-ecosystem: "uv"
    directory: "/"
    schedule:
      interval: "weekly"
    cooldown:
      default-days: 7
```

## Notes

- Renovate does not yet support updating the lock file associated with an inline-metadata script (renovatebot/renovate#33591); update it manually.
- Dependabot has announced support for uv, but some use cases are not yet working; see astral-sh/uv#2512.
- Source pages: `https://docs.astral.sh/uv/guides/integration/renovate/` and `https://docs.astral.sh/uv/guides/integration/dependabot/`.

## Related

- [GitHub Actions](./github-actions.md)
