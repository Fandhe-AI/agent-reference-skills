---
source: https://docs.docker.com/build/bake/targets/
---

# Bake targets

A target in a Bake file represents a build invocation and holds all the information you would normally pass to `docker build` using flags.

## Signature / Usage

```hcl
target "webapp" {
  dockerfile = "webapp.Dockerfile"
  tags = ["docker.io/username/webapp:latest"]
  context = "https://github.com/username/webapp"
}
```

```console
$ docker buildx bake webapp
$ docker buildx bake webapp api tests
```

Grouping targets:

```hcl
group "all" {
  targets = ["webapp", "api", "tests"]
}

target "tests" {
  dockerfile = "tests.Dockerfile"
  contexts = {
    webapp = "target:webapp"
    api = "target:api"
  }
  output = ["type=local,dest=build/tests"]
  context = "."
}
```

```console
$ docker buildx bake all
```

## Options / Props

Shell-style wildcard patterns for target or group names:

| Pattern | Matches |
| --- | --- |
| `*` | any sequence of characters |
| `?` | any single character |
| `[abc]` | any character in brackets |

```console
$ docker buildx bake "foo-*"
$ docker buildx bake "foo-?az"
$ docker buildx bake "[fb]oo-bar"
$ docker buildx bake "foo*" "tests"
```

## Notes

- With no target specified, Bake builds the target named `default`.
- The `dockerfile` path resolves relative to `context` when both are set (`context = "app"` with `dockerfile = "src/www/Dockerfile"` resolves to `app/src/www/Dockerfile`).
- Always wrap wildcard patterns in quotes; otherwise the shell expands them against files in the current directory, causing errors.
- For all target properties see the Bake file reference.

### Run tests and lint checks

Bake targets can run checks without producing an image. For a Go project with a `go.mod` file, source code, and tests, define matching Dockerfile stages:

```dockerfile {title=Dockerfile}
FROM --platform=$BUILDPLATFORM golang:1.26 AS base
WORKDIR /src
COPY . .

FROM base AS test
RUN go test ./...

FROM base AS lint
RUN go vet ./...
```

Map each Bake target to its Dockerfile stage and group the checks:

```hcl {title=docker-bake.hcl}
group "validate" {
  targets = ["test", "lint"]
}

target "test" {
  target = "test"
  output = ["type=cacheonly"]
}

target "lint" {
  target = "lint"
  output = ["type=cacheonly"]
}
```

```console
$ docker buildx bake validate
```

Both checks run concurrently. A failing check causes the command to fail. The `cacheonly` output keeps the build cache without exporting an image.

### Export build artifacts

A target can export files, such as compiled binaries, to your local filesystem. For the Go project in the previous example, append these stages to the Dockerfile:

```dockerfile {title=Dockerfile}
FROM base AS build
ARG TARGETOS
ARG TARGETARCH
ARG BUILD_MODE=release
RUN if [ "$BUILD_MODE" = "debug" ]; then \
      CGO_ENABLED=0 GOOS=$TARGETOS GOARCH=$TARGETARCH go build -gcflags="all=-N -l" -o /out/app .; \
    else \
      CGO_ENABLED=0 GOOS=$TARGETOS GOARCH=$TARGETARCH go build -o /out/app .; \
    fi

FROM scratch AS export
COPY --from=build /out/ /
```

The `scratch` stage contains only the files to export. Add these Bake targets to save the binary locally or build it for multiple platforms:

```hcl {title=docker-bake.hcl}
target "bin" {
  target = "export"
  platforms = ["local"]
  output = ["type=local,dest=build/bin"]
}

target "bin-cross" {
  inherits = ["bin"]
  platforms = ["linux/amd64", "linux/arm64"]
}
```

```console
$ docker buildx bake bin
$ docker buildx bake bin-cross
```

The `bin` target builds for the client's platform and writes `build/bin/app`. The `bin-cross` target writes separate `build/bin/linux_amd64/app` and `build/bin/linux_arm64/app` files. See Inheritance in Bake and the local and tar exporters for reuse and output options.

The base stage uses `BUILDPLATFORM` to run the Go compiler on the builder's native platform. `TARGETOS` and `TARGETARCH` select the output platform, so this example cross-compiles without emulation. For other toolchains, see the multi-platform build strategies.

- Source: https://docs.docker.com/build/bake/targets/ (docker/docs @ 553482c, retrieved 2026-11-14 JST)

## Related

- [Bake file reference](./bake-file-reference.md)
- [Variables in Bake](./bake-variables.md)
- [Matrix targets](./bake-matrices.md)
- [Inheritance in Bake](./bake-inheritance.md)
- [Local and tar exporters](../build/exporter-local-tar.md)
