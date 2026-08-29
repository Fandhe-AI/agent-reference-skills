---
source: https://fastify.dev/docs/latest/Reference/LTS/
---

# Long Term Support (LTS)

Fastify provides structured Long Term Support for major releases, aligned with Node.js LTS versions.

## Signature / Usage

To get patches for a specific minor release while avoiding automatic updates to the next minor release, pin the dependency with a tilde range in `package.json`:

```json
{
  "dependencies": {
    "fastify": "~3.15.x"
  }
}
```

## Options / Props

| Version | Released | LTS ends |
|---------|----------|----------|
| 4.0.0 | June 2022 | June 2025 |
| 5.0.0 | September 2024 | TBD |

## Notes

- Major releases (the `X` in `X.Y.Z`) are supported for a minimum of six months from their release date, and receive security updates for an additional six months after the next major release ships.
- Fastify is tested against all Node.js LTS versions active during its support window, plus alternative runtimes such as N|Solid (verification for alternative runtimes is the responsibility of their maintainers).
- Breaking changes are occasionally released as a *minor* version when required for security reasons. Use a tilde range (see `## Signature / Usage`) to avoid such updates automatically, at the cost of missing security fixes.
- HeroDevs offers commercial security maintenance for end-of-life Fastify versions through the OpenJS Ecosystem Sustainability Program.
- CI tests run on Linux (ubuntu-latest), Windows, and macOS using Node.js 20; yarn is optionally supported and requires the `--ignore-engines` flag.

## Related

- [warnings.md](./warnings.md)
