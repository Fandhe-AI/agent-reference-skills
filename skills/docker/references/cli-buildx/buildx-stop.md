---
source: https://docs.docker.com/reference/cli/docker/buildx/stop/
---

# docker buildx stop

Stops the specified or current builder.

## Signature / Usage

```console
$ docker buildx stop [NAME]
$ docker buildx stop mybuilder
```

## Notes

- This does not prevent `buildx build` from restarting the builder.
- The implementation of stop depends on the driver.

## Related

- [docker buildx rm](./buildx-rm.md)
- [docker buildx inspect](./buildx-inspect.md)
