---
source: https://docs.docker.com/build/cache/optimize/
---

# Optimize cache usage in builds

A layer is reused from the build cache if the instruction and the files it depends on haven't changed since it was previously built. Techniques: order layers, keep the context small, use bind mounts, use cache mounts, use an external cache.

## Signature / Usage

Order layers so that expensive, rarely-changing steps come first:

```dockerfile
# syntax=docker/dockerfile:1
FROM node
WORKDIR /app
# Copy package management files
COPY package.json package-lock.json .
# Install dependencies
RUN npm ci
# Copy over project files
COPY . .
# Run build
RUN npm run build
```

Cache mount for a package manager:

```dockerfile
FROM node:latest
WORKDIR /app
COPY package.json package-lock.json .
RUN --mount=type=cache,target=/root/.npm npm ci
```

## Options / Props

Cache mount examples by build tool (from the page):

| Tool | Instruction |
| --- | --- |
| Go | `RUN --mount=type=cache,target=/go/pkg/mod --mount=type=cache,target=/root/.cache/go-build go build -o /app/hello` |
| Apt | `RUN --mount=type=cache,target=/var/cache/apt,sharing=locked --mount=type=cache,target=/var/lib/apt,sharing=locked apt update && apt-get --no-install-recommends install -y gcc` |
| Python | `RUN --mount=type=cache,target=/root/.cache/pip pip install -r requirements.txt` |
| Ruby | `RUN --mount=type=cache,target=/root/.gem bundle install` |
| Rust | `RUN --mount=type=cache,target=/app/target/ --mount=type=cache,target=/var/cache/cargo CARGO_HOME=/var/cache/cargo cargo build` |
| .NET | `RUN --mount=type=cache,target=/root/.nuget/packages dotnet restore` |
| PHP | `RUN --mount=type=cache,target=/tmp/cache composer install` |

## Notes

- The official example puts trailing `#` comments on instruction lines; Dockerfile only treats `#` at the start of a line as a comment, so they are moved to their own lines here. The official example also uses `npm build`, corrected to `npm run build`. The official example copies `yarn.lock` but runs `npm install`; it is aligned here to the `package-lock.json` that npm uses, with `npm ci`. The official cache mount example is an excerpt with no `package.json` COPY before `npm install`; the COPY is added here (and `npm ci` used) so it works as written.
- Keep the context small: create a `.dockerignore` in the root of the build context (works like `.gitignore`, applies to the entire context including subdirectories).

```plaintext
node_modules
tmp*
```

- Bind mounts in a build (`RUN --mount=type=bind,target=. go build -o /app/hello`) avoid adding unnecessary layers to the cache. They are read-only by default; use the `rw` option to write, but changes are discarded after the `RUN` instruction. Mounted files are not persisted in the final image or build cache. If the target directory is not empty its contents are hidden by the mounted files during the instruction. Write build output outside the mount target.
- Cache mounts persist across builds and are cumulative, so a rebuilt layer only downloads new or changed packages. Read the build tool's documentation for correct options; for example Apt needs exclusive access, so `sharing=locked` makes parallel builds wait for each other.
- Rust: the cache mount uses a single `CARGO_HOME` so concurrent builds coordinate through Cargo's cache lock. Setting `CARGO_HOME` also changes where Cargo looks for global configuration and credentials; project-level `.cargo/config.toml` files are unaffected.
- External cache: the default cache storage is internal to the builder (BuildKit instance); switching builders does not share cache. Use `--cache-to` (export) and `--cache-from` (import) with `docker buildx build`. Especially useful in CI/CD with ephemeral builders.
- The page shows a GitHub Actions workflow using `docker/build-push-action` with `cache-from: type=registry,ref=user/app:buildcache` and `cache-to: type=registry,ref=user/app:buildcache,mode=max`. Workflow syntax itself is covered by the github-docs skill.

```console
$ docker buildx build --cache-from type=registry,ref=user/app:buildcache .
```

## Related

- [Build cache invalidation](./cache-invalidation.md)
- [Cache storage backends](./cache-backends.md)
- [Registry cache](./cache-backend-registry.md)
