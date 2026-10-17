---
source: https://docs.docker.com/build/concepts/context/
---

# Build context

The build context is the set of files a build can access. It is the positional argument to `docker build` / `docker buildx build`.

## Signature / Usage

```console
$ docker build [OPTIONS] PATH | URL | -
                         ^^^^^^^^^^^^^^
```

Accepted inputs: a relative or absolute local directory path; a remote URL of a Git repository, tarball, or plain-text file; a plain-text file or tarball piped through standard input.

```console
$ docker build .
$ docker build -f- <PATH>          # local context, Dockerfile from stdin
$ tar czf foo.tar.gz *
$ docker build - < foo.tar.gz      # tarball context
$ docker build --file test.Dockerfile - < foo.tar.gz
```

## Notes

### Filesystem contexts

- Local directory or tarball: all subdirectories are included. Git repository: the repository and all submodules are included.
- Plain-text file context: the file is interpreted as a Dockerfile and the build has no filesystem context (empty context). `COPY` of local files then fails.
- Remote tarball: the URL is sent to the builder and downloaded on the host where the BuildKit daemon runs (not necessarily where you issue the command). Must be a standard `tar` archive, compressed with `xz`, `bzip2`, `gzip`, or `identity` (none).

```console
$ docker build - < Dockerfile
$ docker build https://raw.githubusercontent.com/dvdksn/clockbox/main/Dockerfile
$ docker build http://server/context.tar.gz
```

```bash
docker build -t myimage:latest - <<EOF
FROM busybox
RUN echo "hello world"
EOF
```

### Git contexts

The builder does a shallow clone (HEAD commit only), recursively including submodules. Default: latest commit of the default branch.

```console
$ docker build https://github.com/user/myrepo.git
$ docker build https://github.com/user/myrepo.git#container:docker
```

URL fragment format is `#ref:dir` (`ref` = branch, tag, or commit hash; `dir` = subdirectory).

| Build Syntax Suffix | Commit Used | Build Context Used |
| --- | --- | --- |
| `myrepo.git` | `refs/heads/<default branch>` | `/` |
| `myrepo.git#mytag` | `refs/tags/mytag` | `/` |
| `myrepo.git#mybranch` | `refs/heads/mybranch` | `/` |
| `myrepo.git#pull/42/head` | `refs/pull/42/head` | `/` |
| `myrepo.git#:myfolder` | `refs/heads/<default branch>` | `/myfolder` |
| `myrepo.git#master:myfolder` | `refs/heads/master` | `/myfolder` |
| `myrepo.git#mytag:myfolder` | `refs/tags/mytag` | `/myfolder` |
| `myrepo.git#mybranch:myfolder` | `refs/heads/mybranch` | `/myfolder` |

URL queries are more structured and recommended over fragments:

```console
$ docker buildx build 'https://github.com/user/myrepo.git?branch=container&subdir=docker'
```

| Build syntax suffix | Commit used | Build context used |
| --- | --- | --- |
| `myrepo.git` | `refs/heads/<default branch>` | `/` |
| `myrepo.git?tag=mytag` | `refs/tags/mytag` | `/` |
| `myrepo.git?branch=mybranch` | `refs/heads/mybranch` | `/` |
| `myrepo.git?ref=pull/42/head` | `refs/pull/42/head` | `/` |
| `myrepo.git?subdir=myfolder` | `refs/heads/<default branch>` | `/myfolder` |
| `myrepo.git?branch=master&subdir=myfolder` | `refs/heads/master` | `/myfolder` |
| `myrepo.git?tag=mytag&subdir=myfolder` | `refs/tags/mytag` | `/myfolder` |
| `myrepo.git?branch=mybranch&subdir=myfolder` | `refs/heads/mybranch` | `/myfolder` |

A commit hash can be given as a `checksum` (alias `commit`) query alongside `tag`, `branch`, or `ref` to verify the reference resolves to the expected commit; the build fails on mismatch.

```console
$ docker buildx build 'https://github.com/moby/buildkit.git?tag=v0.21.1&checksum=66735c67'
```

Keep `.git`: BuildKit drops the `.git` directory by default; set the `BUILDKIT_CONTEXT_KEEP_GIT_DIR` build argument to keep it.

```console
$ docker build \
  --build-arg BUILDKIT_CONTEXT_KEEP_GIT_DIR=1 \
  https://github.com/user/myrepo.git#main
```

Private repositories: SSH credentials are auto-detected for SSH/Git addresses (default `$SSH_AUTH_SOCK`, configurable with `--ssh`); for token auth pass `--secret`.

```console
$ docker buildx build --ssh default git@github.com:user/private.git
$ GIT_AUTH_TOKEN=<token> docker buildx build \
  --secret id=GIT_AUTH_TOKEN \
  https://github.com/user/private.git
```

Remote context with a Dockerfile from stdin:

```bash
docker build -t myimage:latest -f- https://github.com/docker-library/hello-world.git <<EOF
FROM busybox
COPY hello.c ./
EOF
```

### .dockerignore

The client looks for `.dockerignore` in the context root and removes matching files from the context before sending it to the builder.

```text
# .dockerignore
node_modules
bar
```

- Dockerfile-specific ignore file: place `<Dockerfile name>.dockerignore` next to the Dockerfile (e.g. `docker/build.Dockerfile.dockerignore`). It takes precedence over the root `.dockerignore`.
- Syntax: newline-separated patterns like Unix shell globs; leading and trailing slashes are disregarded (`/foo/bar/`, `/foo/bar`, `foo/bar/`, `foo/bar` are equivalent). A line starting with `#` in column 1 is a comment.
- Matching uses Go `filepath.Match` rules after a `filepath.Clean` preprocessing step; blank lines are ignored; for historical reasons the pattern `.` is ignored. `**` matches any number of directories (including zero), e.g. `**/*.go`.
- A leading `!` makes an exception. The last matching line decides inclusion.

```text
# comment
*/temp*
*/*/temp*
temp?
```

| Rule | Behavior |
| --- | --- |
| `# comment` | Ignored. |
| `*/temp*` | Exclude files and directories whose names start with `temp` in any immediate subdirectory of the root. |
| `*/*/temp*` | Exclude files and directories starting with `temp` from any subdirectory two levels below the root. |
| `temp?` | Exclude files and directories in the root whose names are a one-character extension of `temp`. |

```text
*.md
!README*.md
README-secret.md
```

With the above, no markdown files are included except README files other than `README-secret.md`. If `README-secret.md` is listed before `!README*.md`, all README files are included.

You can exclude `Dockerfile` and `.dockerignore` themselves: they are still sent to the builder, but cannot be copied into the image with `ADD`, `COPY`, or bind mounts.

### Named contexts

Additional contexts are passed with `--build-context name=value`. In a Dockerfile they are referenced like stages in a multi-stage build.

```console
$ docker build --build-context docs=./docs .
```

```dockerfile
# syntax=docker/dockerfile:1
FROM buildbase
WORKDIR /app

# Copy all files from the default context into /app/src in the build container
COPY . /app/src
RUN make bin

# Mount the files from the named "docs" context to build the documentation
RUN --mount=from=docs,target=/app/docs \
    make manpages
```

Override an image reference with a named context (the `docker-image://` prefix marks an image reference, local or in a registry):

```console
docker buildx build --build-context alpine:3.23=docker-image://alpine:edge .
```

Use a Git repository as a named context:

```console
$ docker build --build-context scripts=https://github.com/user/deployment-scripts.git .
```

In Bake, named contexts go under `contexts`; the `target:` prefix links targets:

```hcl
target "base" {
  dockerfile = "base.Dockerfile"
}

target "app" {
  dockerfile = "app.Dockerfile"
  contexts = {
    # the target: prefix indicates that 'base' is a Bake target
    mybaseimage = "target:base"
  }
}
```

### Other notes

- Do not use `--build-arg` for secrets (use `--secret`).
- Short commit hashes are supported with the `checksum` / `commit` query but not for `ref` or URL-fragment refs: use the full 40-character SHA-1.

## Related

- [Build secrets](./secrets.md)
- [Multi-stage builds](./multi-stage.md)
- [Build overview](./build-overview.md)
