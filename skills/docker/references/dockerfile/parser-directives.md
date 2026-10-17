---
source: https://docs.docker.com/reference/dockerfile/#parser-directives
---

# Parser directives (syntax / escape / check)

Parser directives are optional special comments of the form `# directive=value` that affect how subsequent Dockerfile lines are handled. They don't add layers to the build and don't show up as build steps. A single directive may only be used once.

## Signature / Usage

```dockerfile
# syntax=docker/dockerfile:1
# escape=`
# check=skip=JSONArgsRecommended,StageNameCasing;error=true
```

Supported directives:

| Directive | Description |
| --- | --- |
| `syntax` | Declare the Dockerfile syntax version (frontend image) to use for the build. |
| `escape` | Set the character used to escape characters and newlines in the Dockerfile. Default `\`. |
| `check` | Configure how build checks are evaluated (since Dockerfile v1.8.0). |

### syntax

```dockerfile
# syntax=docker/dockerfile:1
```

If unspecified, BuildKit uses a bundled version of the Dockerfile frontend. Declaring a syntax version lets you automatically use the latest Dockerfile version without upgrading BuildKit or Docker Engine, or even use a custom Dockerfile implementation. Most users should set `docker/dockerfile:1`, which pulls the latest stable version of the Dockerfile syntax before the build.

### escape

```dockerfile
# escape=\
```

Or

```dockerfile
# escape=`
```

The default escape character is `\`. It is used both to escape characters in a line, and to escape a newline so an instruction can span multiple lines. Regardless of whether the `escape` directive is present, escaping is not performed in a `RUN` command, except at the end of a line.

Setting the escape character to `` ` `` is especially useful on Windows, where `\` is the directory path separator. Without it, the following Dockerfile fails in a non-obvious way (the second and third lines are considered a single instruction):

```dockerfile
FROM microsoft/nanoserver
COPY testfile.txt c:\\
RUN dir c:\
```

With the directive, natural Windows path semantics work:

```dockerfile
# escape=`

FROM microsoft/nanoserver
COPY testfile.txt c:\
RUN dir c:\
```

### check

```dockerfile
# check=skip=<checks|all>
# check=error=<boolean>
```

- By default, all checks run and failures are treated as warnings (build exits with status code zero).
- Disable specific checks with `# check=skip=<check-name>`; separate multiple checks with a comma: `# check=skip=JSONArgsRecommended,StageNameCasing`.
- Disable all checks with `# check=skip=all`.
- Make the build fail on warnings with `# check=error=true`.
- Combine `skip` and `error` using a semi-colon: `# check=skip=JSONArgsRecommended;error=true`.

## Notes

- Once a comment, empty line or builder instruction has been processed, BuildKit no longer looks for parser directives; anything formatted as a directive is then treated as a comment. All parser directives must be at the top of a Dockerfile.
- Directive keys (such as `syntax` or `check`) aren't case-sensitive but are lowercase by convention. Values are case-sensitive: `#check=skip=jsonargsrecommended` is invalid because the check name must use Pascal case. It's conventional to include a blank line after any parser directives. Line continuation characters aren't supported in parser directives.
- Invalid or ignored cases (all in the source): line continuation (`# direc \` + `tive=value`); the same directive appearing twice; a directive after a builder instruction; a directive after a non-directive comment; unknown directives (treated as comments).
- Non line-breaking whitespace is permitted: `#directive=value`, `# directive =value`, `# directive = value` are treated identically.
- With `check=error=true`, it is recommended to pin the Dockerfile syntax to a specific version. Otherwise your build may start to fail when new checks are added in future versions.
- Available checks depend on the Dockerfile syntax version; use the `syntax` directive with the latest stable version to get the most up-to-date checks.

## Related

- [build-checks.md](./build-checks.md)
- [build-check-rules.md](./build-check-rules.md)
- [overview-format.md](./overview-format.md)
