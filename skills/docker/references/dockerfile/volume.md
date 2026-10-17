---
source: https://docs.docker.com/reference/dockerfile/#volume
---

# VOLUME

Creates a mount point with the specified name and marks it as holding externally mounted volumes from the native host or other containers.

## Signature / Usage

```dockerfile
VOLUME ["/data"]
```

```dockerfile
FROM ubuntu
RUN mkdir /myvol
RUN echo "hello world" > /myvol/greeting
VOLUME /myvol
```

This results in an image that causes `docker run` to create a new mount point at `/myvol` and copy the `greeting` file into the newly created volume.

## Notes

- The value can be a JSON array (`VOLUME ["/var/log/"]`) or a plain string with multiple arguments (`VOLUME /var/log` or `VOLUME /var/log /var/db`).
- `docker run` initializes the newly created volume with any data that exists at the specified location within the base image.
- Windows-based containers: the destination of a volume must be a non-existing or empty directory, or a drive other than `C:`.
- Changing the volume from within the Dockerfile: if build steps change the data within the volume after it has been declared, those changes are discarded with the legacy builder; with BuildKit the changes are kept.
- JSON formatting: use double quotes (`"`), not single quotes (`'`).
- The host directory is declared at container run-time to preserve image portability. You can't mount a host directory from within the Dockerfile; `VOLUME` doesn't support a `host-dir` parameter. Specify the mountpoint when you create or run the container.

## Related

- [workdir.md](./workdir.md)
- [user.md](./user.md)
