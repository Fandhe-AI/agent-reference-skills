---
source: https://docs.docker.com/build/building/base-images/
---

# Base images

Create a minimal image with `FROM scratch`, or import a root filesystem tarball as a distribution base image.

```dockerfile
# syntax=docker/dockerfile:1
FROM scratch
ADD hello /
CMD ["/hello"]
```

```console
$ docker build --tag hello .
$ docker run --rm hello
```

Full image from a tar (Ubuntu `noble` via debootstrap): with root privileges, create the `noble` root filesystem using `debootstrap`, archive it with `tar`, and pass the archive to `docker import - noble` (see https://docs.docker.com/build/building/base-images/ for the exact steps). Once imported, verify the image:

```console
$ docker run noble cat /etc/lsb-release
```

## Notes

- `scratch` cannot be pulled, run, or used as an image tag name; it can only be referenced in a `FROM`.
- The `hello` binary must exist at the root of the build context and have no runtime dependencies (language runtimes, dynamic C libraries, CA certificates would have to be included).
- Adapted: the original debootstrap and tar commands that use `sudo` are described in prose instead of shown as commands; follow the official page for the exact commands.
