# Go Runtime

Go runtime (Beta, all plans) deploys a Go HTTP server on Vercel. The Go Framework Preset works with standard `net/http` and frameworks such as `chi` or `gin`.

## Signature / Usage

```go
// main.go
package main

import (
  "fmt"
  "log"
  "net/http"
  "os"
)

func main() {
  mux := http.NewServeMux()
  mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "Hello from Go on Vercel")
  })

  port := os.Getenv("PORT")
  if port == "" {
    port = "3000"
  }

  log.Fatal(http.ListenAndServe(":"+port, mux))
}
```

```go
// /api/index.go — file-based function
package handler

import (
  "fmt"
  "net/http"
)

func Handler(w http.ResponseWriter, r *http.Request) {
  fmt.Fprintf(w, "<h1>Hello from Go!</h1>")
}
```

## Options / Props

| Name | Where | Description |
|------|-------|-------------|
| `framework: "go"` | `vercel.json` | Required to run a Go server |
| `GO_BUILD_FLAGS` | `build.env` in `vercel.json` | Flags for the default `go build` step. Default is `-ldflags '-s -w'` when unset |
| `buildCommand` | `vercel.json` | Overrides the default `go build` step; runs with the selected Go toolchain on `PATH` and `GOOS=linux` |
| `VERCEL_OUTPUT_FILE` | env var | Path to write the binary to when it is not found in the project root or `bin/` |
| `GIT_CREDENTIALS` | env var | Git URL with credentials (e.g. `https://username:token@github.com`) for private packages with `go get` |

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "build": {
    "env": {
      "GO_BUILD_FLAGS": "-ldflags '-s -w'"
    }
  }
}
```

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "go build -o server ./cmd/api"
}
```

Adapted (not in the official docs): `$VERCEL_OUTPUT_FILE` is quoted in the following example.

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "make build && cp out/myapp \"${VERCEL_OUTPUT_FILE}\""
}
```

## Notes

- Detection: a root `go.mod` plus one of `main.go`, `cmd/api/main.go`, or `cmd/server/main.go`. The server must listen on the `PORT` environment variable
- Go version comes from the `go` directive in `go.mod` (a `toolchain` directive takes precedence); `go.mod` must be at the project root. If no version is declared, the latest supported Go version is used. Toolchains are cached after first use
- Define dependencies in `go.mod` and commit `go.sum`. If `vendor/` contains `modules.txt`, Vercel passes `-mod=vendor` automatically
- Files in `/api` that export an `http.HandlerFunc` each become a separate Vercel Function; any exported identifier works as the function name
- To deploy a Go server alongside a frontend in the same project, use Services
- Private packages support GitHub, GitLab, Bitbucket, and self-hosted Git servers
- Adapted from the official docs: the last buildCommand example quotes "${VERCEL_OUTPUT_FILE}" (the official snippet leaves it unquoted as `$VERCEL_OUTPUT_FILE`).
- After a custom `buildCommand`, Vercel looks for the compiled binary in the project root and `bin/`; `GO_BUILD_FLAGS` `-ldflags '-s -w'` removes debug info and is the default
- With GitHub, `GIT_CREDENTIALS` needs a personal token with access to the private repository
- Source: https://vercel.com/docs/functions/runtimes/go (fetched 2026-11-14)

## Related

- [rust-runtime.md](./rust-runtime.md)
- [runtimes.md](./runtimes.md)
- [configuring-functions.md](./configuring-functions.md)
