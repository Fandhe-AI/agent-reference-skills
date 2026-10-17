---
source: https://docs.docker.com/reference/dockerfile/#env
---

# ENV

Sets environment variables for all subsequent instructions in the build stage and for containers run from the image.

## Signature / Usage

```dockerfile
ENV <key>=<value> [<key>=<value>...]
```

```dockerfile
ENV MY_NAME="John Doe"
ENV MY_DOG=Rex\ The\ Dog
ENV MY_CAT=fluffy
```

Equivalent single instruction:

```dockerfile
ENV MY_NAME="John Doe" MY_DOG=Rex\ The\ Dog \
    MY_CAT=fluffy
```

## Notes

- The value is interpreted for other environment variables, so quote characters are removed if not escaped. Quotes and backslashes can include spaces in values.
- Values set with `ENV` persist when a container is run from the resulting image; view with `docker inspect`, change with `docker run --env <key>=<value>`.
- A stage inherits `ENV` values set by its parent stage or any ancestor.
- Persistence can cause side effects, e.g. `ENV DEBIAN_FRONTEND=noninteractive` changes `apt-get` behavior and may confuse users of your image. If a variable is only needed during build, set it for a single command or use `ARG` (not persisted in the final image):

  ```dockerfile
  RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y ...
  ```

  Adapted: the official example prefixes `apt-get update` with `DEBIAN_FRONTEND=noninteractive`; a per-command assignment applies only to that command, so it is moved to `apt-get install` here.

  ```dockerfile
  ARG DEBIAN_FRONTEND=noninteractive
  RUN apt-get update && apt-get install -y ...
  ```

- Alternative syntax `ENV <key> <value>` (no `=`) is supported for backward compatibility but discouraged and may be removed in a future release. It can't set multiple variables in one instruction and can be confusing: `ENV ONE TWO= THREE=world` sets a single variable `ONE` with value `"TWO= THREE=world"`. The `LegacyKeyValueFormat` build check reports it.

## Related

- [arg.md](./arg.md)
- [environment-replacement.md](./environment-replacement.md)
