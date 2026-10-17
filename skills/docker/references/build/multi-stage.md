---
source: https://docs.docker.com/build/building/multi-stage/
---

# Multi-stage builds

Use multiple `FROM` statements in one Dockerfile; each `FROM` begins a new stage, and you selectively copy artifacts between stages, leaving behind everything else.

## Signature / Usage

```dockerfile
# syntax=docker/dockerfile:1
FROM golang:1.26 AS build
WORKDIR /src
COPY <<EOF /src/main.go
package main

import "fmt"

func main() {
  fmt.Println("hello, world")
}
EOF
RUN go build -o /bin/hello ./main.go

FROM scratch
COPY --from=build /bin/hello /bin/hello
CMD ["/bin/hello"]
```

```console
$ docker build -t hello .
```

- Stages are numbered from 0 by default (`COPY --from=0 ...`). Name them with `AS <NAME>` so re-ordering does not break `COPY --from`.
- Stop at a stage with `--target`:

```console
$ docker build --target build -t hello .
```

Useful for debugging a stage, a `debug` stage vs a lean `production` stage, or a `testing` stage with test data.

- Copy from an external image (local name, local/registry tag, or tag ID; pulled if necessary):

```dockerfile
COPY --from=nginx:latest /etc/nginx/nginx.conf /nginx.conf
```

- Continue from a previous stage:

```dockerfile
FROM alpine:latest AS builder
RUN apk --no-cache add build-base

FROM builder AS build1
COPY source1.cpp source.cpp
RUN g++ -o /binary source.cpp
```

## Notes

- Legacy builder vs BuildKit: the legacy Docker Engine builder processes all stages up to the selected `--target`, even stages the target does not depend on. BuildKit builds only the stages the target depends on (e.g. with `--target stage2`, a sibling `stage1` is skipped).

```console
$ DOCKER_BUILDKIT=1 docker build --no-cache -f Dockerfile --target stage2 .
```

## Related

- [Build variables](./build-variables.md)
- [Export binaries](./export.md)
- [BuildKit](./buildkit.md)
