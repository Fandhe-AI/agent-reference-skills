# Installation

Echo is distributed as a Go module under `github.com/labstack/echo/v5`.

## Signature / Usage

```sh
# existing project
go get github.com/labstack/echo/v5

# new project
mkdir myapp && cd myapp
go mod init myapp
go get github.com/labstack/echo/v5
```

```go
import "github.com/labstack/echo/v5"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `github.com/labstack/echo/v5` | module (current) | Actively developed version, requires Go 1.25+ |
| `github.com/labstack/echo/v4` | module (maintenance) | Bug fixes until 2026-12-31; security fixes until 2027-12-31 |

## Notes

- Echo v5 requires Go 1.25 or newer; verify with `go version`.
- Semantic import versioning means the major version is part of the import path, so `v4` and `v5` can coexist in a codebase during migration.
- To upgrade to the latest release: `go get github.com/labstack/echo/v5` followed by `go mod tidy`.
- v4 support dates (echox a77b1e8, fetched 2026-11-14): v4 receives bug fixes until 2026-12-31 and security fixes until 2027-12-31; the official table labels v4 "Bug fixes until 2026-12-31; security fixes until 2027-12-31" (previously "LTS (maintenance)"). Source: https://echo.labstack.com/guide/installation/ and https://github.com/labstack/echo/blob/v5.4.5/SECURITY.md.

## Related

- [Quickstart](./quickstart.md)
- [Customization](./customization.md)
