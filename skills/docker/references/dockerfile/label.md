---
source: https://docs.docker.com/reference/dockerfile/#label
---

# LABEL (incl. MAINTAINER deprecated)

Adds metadata to an image as key-value pairs.

## Signature / Usage

```dockerfile
LABEL <key>=<value> [<key>=<value>...]
```

```dockerfile
LABEL "com.example.vendor"="ACME Incorporated"
LABEL com.example.label-with-value="foo"
LABEL version="1.0"
LABEL description="This text illustrates \
that label-values can span multiple lines."
```

Multiple labels in one instruction:

```dockerfile
LABEL multi.label1="value1" \
      multi.label2="value2" \
      other="value3"
```

To view labels:

```console
$ docker image inspect --format='{{json .Config.Labels}}' myimage
```

### MAINTAINER (deprecated)

```dockerfile
MAINTAINER <name>
```

Sets the _Author_ field of the generated images. Use `LABEL` instead:

```dockerfile
LABEL org.opencontainers.image.authors="SvenDowideit@home.org.au"
```

## Notes

- To include spaces within a value, use quotes and backslashes as in command-line parsing. Use double quotes, not single quotes: with string interpolation (e.g. `LABEL example="foo-$ENV_VAR"`) single quotes take the string as is.
- Specifying multiple labels on one line decreased image size prior to Docker 1.10, but no longer does.
- Labels in base images (the `FROM` line) are inherited. If a label exists with a different value, the most-recently-applied value overrides.
- In a multi-stage build, labels from intermediate stages are only in the final image if the final stage is directly or indirectly based on them (via `FROM`). Labels from a stage referenced only via `COPY --from` or `RUN --mount=from=` are not included. Labels from the base image in the final `FROM` are always inherited.
- `MAINTAINER` is deprecated. The `MaintainerDeprecated` build check reports it.

## Related

- [build-check-rules.md](./build-check-rules.md)
- [from.md](./from.md)
