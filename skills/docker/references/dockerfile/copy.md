---
source: https://docs.docker.com/reference/dockerfile/#copy
---

# COPY

Copies new files or directories from `<src>` (build context, build stage, named context, or an image) and adds them to the image filesystem at `<dest>`.

## Signature / Usage

```dockerfile
COPY [OPTIONS] <src> ... <dest>
COPY [OPTIONS] ["<src>", ... "<dest>"]
```

The latter form is required for paths containing whitespace.

```dockerfile
FROM golang AS build
WORKDIR /app
RUN --mount=type=bind,target=. go build -o /myapp ./cmd

FROM alpine
COPY --from=build /myapp /usr/bin/
```

## Options / Props

| Option | Minimum Dockerfile version | Description |
| --- | --- | --- |
| `--from` | | `COPY [--from=<image\|stage\|context>]`: copy from an image, build stage, or named context (`--build-context <name>=<source>`) instead of the build context. The source path is always resolved from the filesystem root of that image or stage. |
| `--chmod` | 1.2 | `COPY [--chmod=<perms>]`: octal (`755`, `644`) or symbolic notation (`+x`, `g=u`; symbolic added in Dockerfile 1.14). `u=rwX,go=rX` sets directories to 755 and files to 644, preserving the executable bit on files that already have it. Not supported when building Windows containers. |
| `--chown` | | `COPY [--chown=<user>:<group>]`: set ownership. Without it files are created with UID and GID 0. Not supported when building Windows containers. |
| `--link` | 1.4 | `COPY [--link[=<boolean>]]`: copy into an empty destination directory turned into an independent layer linked on top of the previous state. |
| `--parents` | 1.20 | `COPY [--parents[=<boolean>]]`: preserve parent directories for `src` entries. Defaults to `false`. |
| `--exclude` | 1.19 | `COPY [--exclude=<path> ...]`: path expression for files to exclude. |

## Notes

- Adapted: the official snippet omits the second `FROM`, which makes the stage copy from itself.
- `ADD` and `COPY` are functionally similar but serve slightly different purposes.
- The last argument is always the destination. With multiple sources (or a wildcard) the destination must be a directory ending with `/`.
- Build context sources: a leading slash or `../` navigating outside the context has parent navigation removed; trailing slashes are disregarded. For a directory, only its contents are copied (merged; conflicts resolved in favor of the added content, except copying a directory onto an existing file is an error). File permissions are preserved. With a Dockerfile passed via stdin there is no build context; only `--from` copies work. With a Git repository as the build context, copied file permission bits are 644 (755 if executable), directories 755.
- Pattern matching uses Go's `filepath.Match` rules (`COPY *.png /dest/`, `COPY index.?s /dest/`); escape `[` and `]`, e.g. `COPY arr[[]0].txt /dest/`.
- Destination: begins with `/` means absolute (relative to the root of the current build stage); otherwise relative to the working directory. Trailing slashes are significant. Missing directories in the path are created.
- `--from` example (multi-stage and image sources):

  ```dockerfile
  # syntax=docker/dockerfile:1
  FROM alpine AS build
  COPY . .
  RUN apk add clang
  RUN clang -o /hello hello.c

  FROM scratch
  COPY --from=build /hello /
  ```

  ```dockerfile
  COPY --from=nginx:latest /etc/nginx/nginx.conf /nginx.conf
  ```

- `--chmod` examples:

  ```dockerfile
  COPY --chmod=755 app.sh /app/
  ARG MODE=440
  COPY --chmod=$MODE . .
  COPY --chmod=+x script.sh /app/
  COPY --chmod=u=rwX,go=rX . /app/
  ```

- `--chown` accepts usernames, group names, UIDs, or GIDs in any combination. Omitting the group (`--chown=<user>` or `--chown=<user>:`): a username uses the primary GID from `/etc/passwd`; a numeric UID uses the same numeric value for the GID (`--chown=1000:` sets both to 1000). Names are resolved from `/etc/passwd` and `/etc/group` in the container's root filesystem (build fails if missing). With `--link`, files are copied into an empty filesystem, so names can't be resolved and `--chown` must use numeric IDs.

  ```dockerfile
  COPY --chown=55:mygroup files* /somedir/
  COPY --chown=bin files* /somedir/
  COPY --chown=myuser:mygroup --chmod=644 files* /somedir/
  ```

- `--link`: equivalent to building `FROM alpine` and `FROM scratch` + `COPY /foo /bar` separately and merging the layers.

  ```dockerfile
  # syntax=docker/dockerfile:1
  FROM alpine
  COPY --link /foo /bar
  ```

  Benefits: reuse already-built layers in later builds with `--cache-from` even if previous layers changed (important for multi-stage builds with `COPY --from`); rebase images when base images update without re-running the whole build; BuildKit can avoid pulling the base image when no other command needs its files and push only the new layers.
  Incompatibilities with `--link=false`: `COPY/ADD` can't read any files from the previous state (can't follow a symlink in the destination path; the final destination path contains only directories). When copying into a subdirectory it always copies from the filesystem root. When copying a directory, the existing mode is overridden with the new mode (use `--chmod` or avoid `--link` if a specific mode, such as for `/tmp`, is needed). If you don't rely on following symlinks in the destination, `--link` is always recommended.
- `--parents`: similar to the Linux `cp --parents` or `rsync --relative`. Insert `./` in the source path to limit which parent directories are preserved; `**` matches any number of path components. With `--parents`, BuildKit can pack multiple `COPY` instructions together while keeping the directory structure intact. Without it, filename collisions are silently overwritten by BuildKit (Linux `cp` errors).

  ```dockerfile
  # syntax=docker/dockerfile:1
  FROM scratch

  COPY ./x/a.txt ./y/a.txt /no_parents/
  COPY --parents ./x/a.txt ./y/a.txt /parents/

  # /no_parents/a.txt
  # /parents/x/a.txt
  # /parents/y/a.txt
  ```

  ```dockerfile
  COPY --parents ./x/./y/*.txt /parents/
  # Build context: ./x/y/a.txt ./x/y/b.txt
  # Output: /parents/y/a.txt /parents/y/b.txt
  ```

- `--exclude` follows the same format as `<src>` (wildcards, Go `filepath.Match`); it can be specified multiple times and files matching any pattern are not copied:

  ```dockerfile
  # syntax=docker/dockerfile:1
  FROM scratch

  COPY --exclude=*.txt --exclude=*.md hom* /mydir/
  ```

## Related

- [add.md](./add.md)
- [from.md](./from.md)
- [workdir.md](./workdir.md)
- [here-documents.md](./here-documents.md)
