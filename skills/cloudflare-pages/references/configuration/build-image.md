---
source: https://developers.cloudflare.com/pages/configuration/build-image/
---

# Build image

Languages, tools, build environment, version overrides and deprecation policy of the Pages build image (v3 current; v1 and v2 legacy).

## Signature / Usage

Pin a version with an environment variable (**Settings** > **Environment variables**) or a file in the project root. To pin a framework, put it in the package manager config. The source shows this fragment (shown here as valid JSON):

Adapted (not in the official docs): the source fragment `"dependencies": { "gatsby": "^5.13.7", }` has a trailing comma and no enclosing braces; see Notes.

```json
{
	"dependencies": {
		"gatsby": "^5.13.7"
	}
}
```

## Options / Props

Languages and runtime, v3 build system (the first of three version tabs in the source):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Go | env `GO_VERSION` | 1.24.3 | Any version. |
| Node.js | env `NODE_VERSION`; files `.nvmrc`, `.node-version` | 22.23.4 | Any version. |
| Bun | env `BUN_VERSION` | 1.4.4 | Any version. |
| Python | env `PYTHON_VERSION`; files `.python-version`, `runtime.txt` | 3.13.3 | Any version. |
| Ruby | env `RUBY_VERSION`; file `.ruby-version` | 3.4.4 | Any version. |

Tools, v3:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Bundler | — | 2.6.9 | Corresponds with Ruby version. |
| Embedded Dart Sass | env `EMBEDDED_DART_SASS_VERSION` | 1.62.1 | Up to 1.62.1. |
| gem | — | 3.6.9 | Corresponds with Ruby version. |
| Hugo | env `HUGO_VERSION` | 0.147.7 | Any version. |
| npm | — | 10.9.9 | Corresponds with Node.js version. |
| pip | — | 26.2.2 | Corresponds with Python version. |
| pipx | — | 1.7.1 | — |
| pnpm | env `PNPM_VERSION` | 10.11.1 | Any version. |
| Poetry | — | 2.1.3 | — |
| Yarn | env `YARN_VERSION` | 4.9.1 | Any version. |
| Zola | env `ZOLA_VERSION` | 0.22.1 | Any version. |

Legacy v2 defaults (second tab): Go 1.21.0, Node.js 18.17.1, Bun 1.4.4, Python 3.11.5, Ruby 3.2.2, Bundler 2.4.10, gem 3.4.10, Hugo 0.118.2, npm 9.6.7, pip 26.2.2, pipx 1.2.0, pnpm 8.7.1, Poetry 1.6.1, Yarn 3.6.3, Zola 0.22.1.

Legacy v1 defaults (third tab): Go 1.14.4, Node.js 12.18.0, PHP 5.6 (5.6, 7.2, 7.4 only), Python 2.7 (2.7, 3.5, 3.7 only), Ruby 2.7.1 (2.6.2 to 2.7.5), Swift 5.2.5 (any 5.x), Elixir 1.7, Erlang 21, Java 8, .NET 3.1.302, Hugo 0.54.0, Yarn 1.22.4 (0.2.0 to 1.22.19), Zola requires `ZOLA_VERSION` (0.5.0 and up), `NPM_VERSION` for npm.

Other settings:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `SKIP_DEPENDENCY_INSTALL` | env (`1` or `true`) | — | Disable automatic dependency installation and run a custom install command. |
| `SSL_CERT_FILE` | env | `/etc/ssl/certs/ca-certificates.crt` | CA bundle for runtimes with bundled certificates. |
| `PIP_CERT` | env | `/etc/ssl/certs/ca-certificates.crt` | CA bundle for pip. |
| `REQUESTS_CA_BUNDLE` | env | `/etc/ssl/certs/ca-certificates.crt` | CA bundle for Python requests. |
| `NODE_OPTIONS` | env | `--use-openssl-ca` | Added to your own `NODE_OPTIONS` unless it already contains `--use-openssl-ca` or `--use-bundled-ca`. |

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases); see the cloudflare-workers skill (static-assets/migrate-from-pages).
- The source twin renders the v3, v2 and v1 tab contents one after another without labels. The mapping used here follows the page text: v3 updates tools to LTS versions as of May 2025, and v1 is the Node.js 12.18.0 era. Confirm in the dashboard.
- Corrected from the official docs: the Gatsby `package.json` fragment is not valid JSON as printed (trailing comma, no braces); the snippet above is the valid form.
- Build environment: gVisor container, x86_64; Ubuntu 22.04.2 for the first two tabs (v3, v2) and Ubuntu 20.04.5 for the third (v1).
- v3 does not support: Node.js version codenames (`hydrogen`, `lts/hydrogen`), Yarn version detection from `yarn.lock`, pnpm version detection from `pnpm-lock.yaml`, Node.js and package manager detection from `package.json` `engines`, and `pipenv` / `Pipfile`.
- Migrating v2 to v3: Pages project > **Deployments** > **All deployments** > select the latest version. If you relied on default tool versions, builds may fail; pin the versions you need.
- Deprecation policy as written in the source: v1 projects move to v3 on September 15, 2026 and v2 projects on February 23, 2027, with 6 months' notice. The fetch date of this reference is 2026-11-03, so the v1 date has already passed; verify in the dashboard.
- Preinstalled software updates (apply only when the default version is not overridden): minor versions may update without notice (tools not following semantic versioning, for example Bun or Hugo, get 3 months' notice for breaking changes); major versions move to the next LTS with 3 months' notice. Pin versions to avoid surprises.
- Installing from Git: the framework version in the config is installed with `npm install` unless already cached.

## Related

- [Build configuration](./build-configuration.md)
- [Build caching](./build-caching.md)
- [Monorepos](./monorepos.md)
