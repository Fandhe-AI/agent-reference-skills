# indexes-auth

| Name | Description | Path |
|------|-------------|------|
| The auth CLI | High-level interface (`uv auth`) for storing and retrieving service credentials. | [auth-cli.md](./auth-cli.md) |
| Authentication | Authentication for private repositories and package indexes; entry point to auth topics. | [authentication.md](./authentication.md) |
| TLS certificates | TLS certificates that verify server identity for package indexes and HTTPS servers. | [certificates.md](./certificates.md) |
| Flat indexes and --index-url | PyPI-style indexes by default; flat indexes (`--find-links`) for local or HTML wheel lists. | [flat-indexes.md](./flat-indexes.md) |
| Git credentials | Install packages from private Git repositories using SSH or HTTP authentication. | [git-credentials.md](./git-credentials.md) |
| HTTP credentials | uv supports credentials over HTTP when querying package registries. | [http-credentials.md](./http-credentials.md) |
| Index authentication | Private index authentication via username and password or token in `[[tool.uv.index]]`. | [index-authentication.md](./index-authentication.md) |
| Package indexes | Package indexes: PyPI by default, plus private indexes via `[[tool.uv.index]]`. | [indexes.md](./indexes.md) |
| Third-party services | Authentication with alternative package indexes and Hugging Face. | [third-party-services.md](./third-party-services.md) |
| uv auth dir | Show the path to the uv credentials directory. | [uv-auth-dir.md](./uv-auth-dir.md) |
| uv auth login | Login to a service; `uv auth` subcommands are `login`, `logout`, `token`, and `dir`. | [uv-auth-login.md](./uv-auth-login.md) |
| uv auth logout | Logout of a service. | [uv-auth-logout.md](./uv-auth-logout.md) |
| uv auth token | Show the authentication token for a service. | [uv-auth-token.md](./uv-auth-token.md) |
