---
source: https://docs.docker.com/reference/dockerfile/#format
---

# Dockerfile overview and format

A Dockerfile is a text document that contains all the commands a user could call on the command line to assemble an image. Docker builds images automatically by reading its instructions.

## Signature / Usage

```dockerfile
# Comment
INSTRUCTION arguments
```

Supported instructions:

| Instruction | Description |
| --- | --- |
| `ADD` | Add local or remote files and directories. |
| `ARG` | Use build-time variables. |
| `CMD` | Specify default commands. |
| `COPY` | Copy files and directories. |
| `ENTRYPOINT` | Specify default executable. |
| `ENV` | Set environment variables. |
| `EXPOSE` | Describe which ports your application is listening on. |
| `FROM` | Create a new build stage from a base image. |
| `HEALTHCHECK` | Check a container's health on startup. |
| `LABEL` | Add metadata to an image. |
| `MAINTAINER` | Specify the author of an image (deprecated). |
| `ONBUILD` | Specify instructions for when the image is used in a build. |
| `RUN` | Execute build commands. |
| `SHELL` | Set the default shell of an image. |
| `STOPSIGNAL` | Specify the system call signal for exiting a container. |
| `USER` | Set user and group ID. |
| `VOLUME` | Create volume mounts. |
| `WORKDIR` | Change working directory. |

## Notes

- The instruction is not case-sensitive. Convention is UPPERCASE to distinguish instructions from arguments.
- Docker runs instructions in order. A Dockerfile must begin with a `FROM` instruction. This may be after parser directives, comments, and globally scoped `ARG`s. `FROM` may only be preceded by one or more `ARG` instructions, which declare arguments used in `FROM` lines.
- BuildKit treats lines that begin with `#` as a comment, unless the line is a valid parser directive. A `#` marker anywhere else in a line is treated as an argument:

  ```dockerfile
  # Comment
  RUN echo 'we are running some # of cool things'
  ```

- Comment lines are removed before the instructions are executed. The comment in the following example is removed before the shell executes `echo`; it is equivalent to `RUN echo hello \` followed by `world`:

  ```dockerfile
  RUN echo hello \
  # comment
  world
  ```

- Comments don't support line continuation characters.
- For backward compatibility, leading whitespace before comments (`#`) and instructions (such as `RUN`) is ignored, but discouraged. Whitespace in instruction arguments isn't ignored: `RUN echo "\` followed by indented `hello\` / `world"` prints `    hello    world` with leading whitespace as specified.
- Use a `.dockerignore` file to exclude files and directories from the build context.

## Related

- [parser-directives.md](./parser-directives.md)
- [environment-replacement.md](./environment-replacement.md)
- [shell-and-exec-form.md](./shell-and-exec-form.md)
- [from.md](./from.md)
