---
source: https://developers.cloudflare.com/workers/ci-cd/builds/build-image/
---

# Workers Builds Build Image

Languages, tools, default versions, version overrides, and environment of the Workers Builds image.

## Signature / Usage

Override a version with a build variable (**Settings** > **Build** > **Build Variables and Secrets**, e.g. `NODE_VERSION = 22`) or a version file in the root directory (e.g. `.nvmrc` containing `22`). Package manager versions use `packageManager` in `package.json`:

*package.json*

```json
{
	"packageManager": "npm@11.19.1"
}
```

## Options / Props

Runtime:

| Tool | Default version | Environment variable | File |
| --- | --- | --- | --- |
| **Go** | 1.27.3 | `GO_VERSION` | |
| **Node.js** | 24.22.1 | `NODE_VERSION` | .nvmrc, .node-version |
| **Python** | 3.14.8 | `PYTHON_VERSION` | .python-version, runtime.txt |
| **Ruby** | 3.4.11 | `RUBY_VERSION` | .ruby-version |

Build image facts:

| Item | Value |
| --- | --- |
| Preinstalled Node.js versions | 22.23.4 and 24.22.1 |
| Build environment | Ubuntu 24.04, x86_64 |

Tools and languages:

| Tool | Default version | Environment variable | File |
| --- | --- | --- | --- |
| **Bun** | 1.4.4 | `BUN_VERSION` | `packageManager` field in `package.json` |
| **Hugo** | extended\_0.147.7 | `HUGO_VERSION` | |
| **npm** | 10.9.2 | | `packageManager` field in `package.json` |
| **yarn** | 4.18.1 | `YARN_VERSION` | `packageManager` field in `package.json` |
| **pnpm** | 9.10.0 | `PNPM_VERSION` | `packageManager` field in `package.json` |
| **pip** | 26.2.2 | | |
| **gem** | 3.6.9 | | |
| **poetry** | 2.4.3 | | |
| **pipx** | 1.17.2 | | |
| **bundler** | 2.6.9 | | |
| **uv** | 0.13.4 | | |

Skip dependency install:

| Build variable | Value |
| --- | --- |
| `SKIP_DEPENDENCY_INSTALL` | `1` or `true` |

Trusted certificates (replaced if you set them as build variables; `--use-openssl-ca` is added to your own `NODE_OPTIONS` unless it already contains `--use-openssl-ca` or `--use-bundled-ca`):

| Environment variable | Value |
| --- | --- |
| `SSL_CERT_FILE` | `/etc/ssl/certs/ca-certificates.crt` |
| `PIP_CERT` | `/etc/ssl/certs/ca-certificates.crt` |
| `REQUESTS_CA_BUNDLE` | `/etc/ssl/certs/ca-certificates.crt` |
| `NODE_OPTIONS` | `--use-openssl-ca` |

## Notes

- Pre-installed apt packages: `curl`, `git`, `git-lfs`, `unzip`, `autoconf`, `build-essential`, `bzip2`, `gnupg`, `libffi-dev`, `libbz2-dev`, `libc++1`, `libdb-dev`, `libgdbm-dev`, `libgdbm6`, `libgbm1`, `libgmp-dev`, `liblzma-dev`, `libncurses5-dev`, `libreadline-dev`, `libssl-dev`, `libvips-dev`, `libyaml-dev`, `tzdata`, `wget`, `zlib1g-dev`, `zstd`.
- `packageManager`: read from `package.json` in the root directory, and also from the repository top level if different; use the same value in both. Use an exact version (`npm@11.19.1`, not `npm@^11`). `engines.npm` does not set the npm version (npm prints `EBADENGINE`). The lockfile still determines which package manager installs dependencies. `packageManager` is the only way to change the npm version.
- pnpm runs through Corepack; selection order: top-level `packageManager`, then `devEngines.packageManager` (pnpm with version), then `PNPM_VERSION`, then image default. Version ranges in `devEngines.packageManager` can select different releases across builds; the version in `pnpm-lock.yaml` does not pin Corepack. The log line `Detected the following tools from environment` is printed before Corepack applies `devEngines.packageManager`; check pnpm's install output for the real version.
- Policy: defaults update to the latest minor without notice (non-semver tools like Bun/Hugo get 3 months' notice for breaking updates); major updates move to the next LTS with 3 months' notice (Changelog, dashboard notifications, email). Pin critical versions via overrides.

## Related

- [builds-configuration.md](./builds-configuration.md)
- [builds-troubleshoot.md](./builds-troubleshoot.md)
