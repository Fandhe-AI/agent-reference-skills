---
source: https://docs.docker.com/reference/dockerfile/#cmd
---

# CMD

Sets the command to be executed when running a container from an image.

## Signature / Usage

```dockerfile
# exec form
CMD ["executable","param1","param2"]
# exec form, as default parameters to ENTRYPOINT
CMD ["param1","param2"]
# shell form
CMD command param1 param2
```

## Notes

- There can only be one `CMD` in a Dockerfile. If you list more than one, only the last takes effect.
- The purpose of `CMD` is to provide defaults for an executing container. Defaults can include an executable, or omit it, in which case you must also specify an `ENTRYPOINT`.
- If you want the container to run the same executable every time, use `ENTRYPOINT` in combination with `CMD`. Arguments to `docker run` override the `CMD` default but still use the default `ENTRYPOINT`.
- If `CMD` provides default arguments for `ENTRYPOINT`, both should be in exec form.
- Don't confuse `RUN` with `CMD`: `RUN` actually runs a command and commits the result; `CMD` executes nothing at build time and specifies the intended command for the image.

## Related

- [entrypoint.md](./entrypoint.md)
- [shell-and-exec-form.md](./shell-and-exec-form.md)
- [run.md](./run.md)
