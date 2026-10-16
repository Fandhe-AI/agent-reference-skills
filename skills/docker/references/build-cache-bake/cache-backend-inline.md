---
source: https://docs.docker.com/build/cache/backends/inline/
---

# Inline cache

The `inline` cache storage backend is the simplest way to get an external cache and is easy to use if you already build and push an image.

## Signature / Usage

```console
$ docker buildx build --push -t <registry>/<image> \
  --cache-to type=inline \
  --cache-from type=registry,ref=<registry>/<image> .
```

Alternatively, export inline cache with a build argument instead of `--cache-to`:

```console
$ docker buildx build --push -t <registry>/<image> \
  --build-arg BUILDKIT_INLINE_CACHE=1 .
```

## Options / Props

No additional parameters are supported for the `inline` cache.

## Notes

- Downside: it doesn't scale with multi-stage builds as well as other backends, and offers no separation between output artifacts and cache output. For complex build flows, or if you don't export images directly to a registry, consider the registry cache.
- To import the cache in a later build, pass `type=registry` to `--cache-from`, which extracts the cache from inside a Docker image in the specified registry.
- `mode` is not supported for `inline`.

## Related

- [Cache storage backends](./cache-backends.md)
- [Registry cache](./cache-backend-registry.md)
