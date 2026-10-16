---
source: https://docs.docker.com/build/builders/drivers/docker/
---

# Docker driver

The default Buildx driver. It uses the BuildKit server components built directly into the Docker Engine and requires no configuration.

## Signature / Usage

```console
# The Docker driver is used by buildx by default
docker buildx build .
```

## Notes

- Builders using this driver cannot be manually created; they are created automatically from the Docker context.
- Images are automatically loaded to the local image store.
- You cannot configure the BuildKit version or pass additional BuildKit parameters; both are preset by Docker Engine. For more flexibility use the `docker-container` driver.

## Related

- [Docker container driver](./driver-docker-container.md)
- [Build drivers](./drivers.md)
