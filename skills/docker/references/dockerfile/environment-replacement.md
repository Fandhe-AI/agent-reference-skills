---
source: https://docs.docker.com/reference/dockerfile/#environment-replacement
---

# Environment replacement

Environment variables (declared with `ENV`) can be used in certain instructions as variables interpreted by the Dockerfile. Escapes are also handled for including variable-like syntax literally.

## Signature / Usage

```dockerfile
FROM busybox
ENV FOO=/bar
WORKDIR ${FOO}   # WORKDIR /bar
ADD . $FOO       # ADD . /bar
COPY \$FOO /quux # COPY $FOO /quux
```

Variables are written `$variable_name` or `${variable_name}` (treated equivalently; braces are typically used for names like `${foo}_bar`).

Supported bash-style modifiers:

| Syntax | Result |
| --- | --- |
| `${variable:-word}` | If `variable` is set and non-empty, its value; otherwise `word`. |
| `${variable-word}` | If `variable` is set (even if empty), its value; otherwise `word`. |
| `${variable:+word}` | If `variable` is set and non-empty, `word`; otherwise the empty string. |
| `${variable+word}` | If `variable` is set (even if empty), `word`; otherwise the empty string. |

Supported only in a pre-release Dockerfile syntax (`# syntax=docker/dockerfile-upstream:master`):

| Syntax | Result |
| --- | --- |
| `${variable#pattern}` | Remove shortest match of `pattern` from the start. (`str=foobarbaz echo ${str#f*b}` gives `arbaz`) |
| `${variable##pattern}` | Remove longest match of `pattern` from the start. (`${str##f*b}` gives `az`) |
| `${variable%pattern}` | Remove shortest match of `pattern` from the end. (`${string%b*}` gives `foobar`) |
| `${variable%%pattern}` | Remove longest match of `pattern` from the end. (`${string%%b*}` gives `foo`) |
| `${variable/pattern/replacement}` | Replace first occurrence. (`${string/ba/fo}` gives `fooforbaz`) |
| `${variable//pattern/replacement}` | Replace all occurrences. (`${string//ba/fo}` gives `fooforfoz`) |

## Notes

- In all cases, `word` can be any string, including additional environment variables.
- `pattern` is a glob pattern where `?` matches any single character and `*` any number of characters (including zero). To match literal `?` and `*`, use `\?` and `\*`.
- Escape whole variable names with `\`: `\$foo` or `\${foo}` translate to the literals `$foo` and `${foo}`.
- Instructions that support environment variables: `ADD`, `COPY`, `ENV`, `EXPOSE`, `FROM`, `LABEL`, `STOPSIGNAL`, `USER`, `VOLUME`, `WORKDIR`, and `ONBUILD` (when combined with one of the supported instructions).
- `RUN`, `CMD`, and `ENTRYPOINT` also work with environment variables, but substitution is handled by the command shell, not the builder. Instructions in exec form don't invoke a shell automatically.
- Substitution uses the same value for each variable throughout the entire instruction; a changed value only takes effect in subsequent instructions:

  ```dockerfile
  ENV abc=hello
  ENV abc=bye def=$abc
  ENV ghi=$abc
  ```

  `def` becomes `hello`; `ghi` becomes `bye`.

## Related

- [env.md](./env.md)
- [arg.md](./arg.md)
- [shell-and-exec-form.md](./shell-and-exec-form.md)
