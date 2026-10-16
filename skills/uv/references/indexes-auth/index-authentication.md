---
source: https://docs.astral.sh/uv/concepts/indexes/#authentication
---

# Index authentication

Most private package indexes require authentication, typically via a username and password (or access token). Per-index settings in `[[tool.uv.index]]` control credentials, error handling, caching, and hashes.

## Signature / Usage

```toml
[[tool.uv.index]]
name = "internal-proxy"
url = "https://example.com/simple"
```

```sh
export UV_INDEX_INTERNAL_PROXY_USERNAME=public
export UV_INDEX_INTERNAL_PROXY_PASSWORD=koala
```

`INTERNAL_PROXY` is the uppercase version of the index name, with non-alphanumeric characters replaced by underscores. Alternatively, credentials can be embedded directly in the index definition:

```toml
[[tool.uv.index]]
name = "internal"
url = "https://public:koala@pypi-proxy.corp.dev/simple"
```

## Options / Props

Per-index settings shown in the source:

| Name | Type | Description |
|------|------|-------------|
| `authenticate` | `"always"` / `"never"` | `always`: eagerly search for credentials and error if none found. `never`: never search for credentials for the index and error if credentials are provided directly. |
| `ignore-error-codes` | list of HTTP status codes | Error codes ignored for the index, e.g. `[403]`. |
| `cache-control` | `{ api, files }` | Override cache control headers. `api`: Simple API requests (package metadata). `files`: artifact downloads (wheels and source distributions). Values follow HTTP `Cache-Control` syntax. |
| `hash-algorithm` | string | Require a specific hash algorithm (e.g. `"sha256"`). Requires `preview-features = ["index-hash-algorithm"]`. |
| `exclude-newer` | string / `false` | Per-index `exclude-newer` cutoff (e.g. `"7 days"`); `false` disables the cutoff for that index. |

## Using credential providers

uv supports discovery of credentials from netrc and keyring in addition to direct credentials. By default, uv attempts an unauthenticated request before querying providers. If the request fails, uv searches for credentials; if found, an authenticated request is attempted. If a username is set, uv searches for credentials before making an unauthenticated request.

Some indexes (e.g., GitLab) forward unauthenticated requests to a public index like PyPI, so uv does not search for credentials. Change this per index with `authenticate`:

```toml
[[tool.uv.index]]
name = "example"
url = "https://example.com/simple"
authenticate = "always"
```

## Ignoring error codes

When using the first-index strategy, uv stops searching across indexes if an HTTP 401 Unauthorized or HTTP 403 Forbidden status code is encountered. The one exception is that uv ignores 403s when searching the `pytorch` index (since this index returns a 403 when a package is not present).

By default, uv also stops resolution if an HTTP error is encountered when fetching distribution metadata or an archive from an index. Ignoring that error marks the affected package version as unavailable, allowing the resolver to try another version.

```toml
[[tool.uv.index]]
name = "private-index"
url = "https://private-index.com/simple"
authenticate = "always"
ignore-error-codes = [403]
```

uv always continues searching across indexes when it encounters a `404 Not Found`. This cannot be overridden.

## Disabling authentication

```toml
[[tool.uv.index]]
name = "example"
url = "https://example.com/simple"
authenticate = "never"
```

## Customizing cache control headers

By default, uv respects the cache control headers provided by the index. PyPI serves package metadata with `max-age=600` (cached for 10 minutes) and wheels and source distributions with `max-age=365000000, immutable` (cached indefinitely).

```toml
[[tool.uv.index]]
name = "example"
url = "https://example.com/simple"
cache-control = { api = "max-age=600", files = "max-age=365000000, immutable" }
```

To force uv to always revalidate package metadata, set `api = "no-cache"`. This setting is most commonly used to override the default headers for private indexes that otherwise disable caching, often unintentionally. The source recommends following PyPI's approach (`api = "max-age=600"`, `files = "max-age=365000000, immutable"`).

## Requiring a hash algorithm

When an index advertises multiple hashes for a distribution, uv selects a single hash to record in the lockfile.

```toml
[tool.uv]
preview-features = ["index-hash-algorithm"]

[[tool.uv.index]]
name = "private-index"
url = "https://private-index.com/simple"
hash-algorithm = "sha256"
```

If a locked distribution does not advertise the required algorithm, uv fails instead of falling back to another hash algorithm.

## Configuring exclude-newer for an index

```toml
[[tool.uv.index]]
name = "internal"
url = "https://internal.example.com/simple"
exclude-newer = "7 days"
```

Index-specific values only affect packages served from that index. Package-specific `exclude-newer-package` overrides still take precedence. If an index does not provide `upload-time` metadata, disable the cutoff for that index with `exclude-newer = false`.

## Notes

- Credentials are never stored in the `uv.lock` file; uv must have access to the authenticated URL at installation time.
- Providing credentials via environment variables avoids storing sensitive information in the plaintext `pyproject.toml`.
- `hash-algorithm` requires the `index-hash-algorithm` preview feature.
- Provider-specific guides exist for Azure Artifacts, Google Artifact Registry, AWS CodeArtifact, and JFrog Artifactory (see Third-party services).
- This page covers package-registry credentials, not application authentication; for app auth see better-auth / supabase.

## Related

- [Package indexes](./indexes.md)
- [HTTP credentials](./http-credentials.md)
- [Third-party services](./third-party-services.md)
