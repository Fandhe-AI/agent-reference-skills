---
source: https://docs.docker.com/reference/dockerfile/#workdir
---

# WORKDIR

Sets the working directory for any `RUN`, `CMD`, `ENTRYPOINT`, `COPY` and `ADD` instructions that follow it.

## Signature / Usage

```dockerfile
WORKDIR /path/to/workdir
```

```dockerfile
WORKDIR /a
WORKDIR b
WORKDIR c
RUN pwd
```

The output of the final `pwd` is `/a/b/c`.

## Notes

- If the `WORKDIR` doesn't exist, it is created even if not used in any subsequent instruction.
- It can be used multiple times; a relative path is relative to the previous `WORKDIR`.
- It resolves environment variables previously set using `ENV` (only variables explicitly set in the Dockerfile):

  ```dockerfile
  ENV DIRPATH=/path
  WORKDIR $DIRPATH/$DIRNAME
  RUN pwd
  ```

  The output of the final `pwd` is `/path/$DIRNAME`.
- The default working directory is `/`. If not building `FROM scratch`, the `WORKDIR` may be set by the base image. Best practice: set `WORKDIR` explicitly to avoid unintended operations in unknown directories.
- `WORKDIR` does not perform shell expansion: paths beginning with `~` or `~username` are treated as literal directory names (build check `WorkdirRelativePath` warns on relative paths without a prior absolute `WORKDIR`).

## Related

- [build-check-rules.md](./build-check-rules.md)
- [copy.md](./copy.md)
- [env.md](./env.md)
