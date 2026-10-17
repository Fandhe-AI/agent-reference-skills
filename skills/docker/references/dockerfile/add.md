---
source: https://docs.docker.com/reference/dockerfile/#add
---

# ADD

Copies new files or directories from `<src>` (build context, remote URL, or Git repository) and adds them to the image filesystem at `<dest>`.

## Signature / Usage

```dockerfile
ADD [OPTIONS] <src> ... <dest>
ADD [OPTIONS] ["<src>", ... "<dest>"]
```

The latter form is required for paths containing whitespace.

```dockerfile
ADD file1.txt file2.txt /usr/src/things/
ADD https://example.com/archive.zip /usr/src/things/
ADD git@github.com:user/repo.git /usr/src/things/
```

## Options / Props

| Option | Minimum Dockerfile version | Description |
| --- | --- | --- |
| `--keep-git-dir` | 1.1 | `ADD [--keep-git-dir=<boolean>]`: keep the `.git` directory when `<src>` is a Git repository (excluded by default). |
| `--checksum` | 1.6 | `ADD [--checksum=<hash>]`: verify a remote Git or HTTP resource. Git: commit SHA (full or prefix of 1+ characters). HTTP: SHA-256 digest formatted `sha256:<hash>` (only supported algorithm). |
| `--chmod` | 1.2 | See `COPY --chmod`. |
| `--chown` | | See `COPY --chown`. |
| `--link` | 1.4 | See `COPY --link`. |
| `--unpack` | 1.17 | `ADD [--unpack=<bool>]`: whether to unpack tar archives (gzip, bzip2, xz, zstd, or uncompressed). Local tar archives are unpacked by default; remote ones (URL) are downloaded without unpacking. |
| `--exclude` | 1.19 | See `COPY --exclude`. |

## Notes

- `ADD` and `COPY` are functionally similar but serve slightly different purposes.
- Multiple sources: the last argument must always be the destination. If multiple sources (or a wildcard), the destination must be a directory ending with `/`.
- BuildKit detects the type of `<src>`: local file/directory (copied), local tar archive (decompressed and extracted), URL (downloaded), Git repository (cloned).
- Build context sources: any path not beginning with `http://`, `https://`, or `git@` is a local path relative to the context. A leading slash or `../` navigating outside the context has parent navigation removed; trailing slashes are disregarded. For a directory, only its contents are copied (merged with existing directories; conflicts resolved in favor of the added content, except copying a directory onto an existing file is an error). File permissions are preserved.
- Passing a Dockerfile through stdin (`docker build - < Dockerfile`) means no build context; only remote files can then be added. A tar archive via stdin uses the archive as context.
- Pattern matching uses Go's `filepath.Match` rules (`*.png`, `index.?s`). Escape special characters like `[` and `]`, e.g. `ADD arr[[]0].txt /dest/`.
- Local tar archives: compression format is detected from file contents, not the name; an empty file ending in `.tar.gz` is simply copied. Extraction behaves like `tar -x` (union of the existing destination and the source, conflicts resolved in favor of the added content).
- URL sources: destination file permissions are 600; `Last-Modified` sets `mtime` (but `mtime` isn't part of the cache determination). If the destination ends with `/`, the filename is inferred from the URL path (needs a nontrivial path; `http://example.com` doesn't work); otherwise the destination path becomes the filename. Authenticated URLs aren't supported by `ADD` (use `RUN wget` / `RUN curl`). `HTTP_AUTH_HEADER_<host>` and `HTTP_AUTH_TOKEN_<host>` build secrets can set credentials for remote sources.
- Git sources: use URL fragments for branch, tag, commit, or subdirectory:

  ```dockerfile
  ADD git@github.com:moby/buildkit.git#v0.14.1:docs /buildkit-docs
  ```

  File permission bits are 644 (755 if the executable bit is set); directories 755. SSH repositories need `--ssh` (`docker build --ssh default .`).
- Destination: begins with `/` means absolute (relative to the root of the current build stage); otherwise relative to the working directory. Trailing slashes are significant (`ADD test.txt /abs` creates the file `/abs`; `ADD test.txt /abs/` creates `/abs/test.txt`). Missing directories in the path are created.
- `--keep-git-dir` example:

  ```dockerfile
  # syntax=docker/dockerfile:1
  FROM alpine
  ADD --keep-git-dir=true https://github.com/moby/buildkit.git#v0.10.1 /buildkit
  ```

- `--checksum` examples:

  ```dockerfile
  ADD --checksum=be1f38e https://github.com/moby/buildkit.git#v0.26.2 /
  ADD --checksum=sha256:24454f830cdb571e2c4ad15481119c43b3cafd48dd869a9b2945d1036d1dc68d https://mirrors.edge.kernel.org/pub/linux/kernel/Historic/linux-0.01.tar.gz /
  ```

- `--unpack` example:

  ```dockerfile
  # syntax=docker/dockerfile:1
  FROM alpine
  # Download and unpack archive.tar.gz into /download:
  ADD --unpack=true https://example.com/archive.tar.gz /download
  # Add local tar without unpacking:
  ADD --unpack=false my-archive.tar.gz .
  ```

## Related

- [copy.md](./copy.md)
- [here-documents.md](./here-documents.md)
- [run-mount.md](./run-mount.md)
