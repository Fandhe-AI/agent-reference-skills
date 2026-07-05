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
| `github.com/labstack/echo/v4` | module (LTS) | Maintenance-only long-term support version |

## Notes

- Echo v5 requires Go 1.25 or newer; verify with `go version`.
- Semantic import versioning means the major version is part of the import path, so `v4` and `v5` can coexist in a codebase during migration.
- To upgrade to the latest release: `go get github.com/labstack/echo/v5` followed by `go mod tidy`.

## Related

- [Quickstart](./quickstart.md)
- [Customization](./customization.md)
