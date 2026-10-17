---
source: https://docs.docker.com/reference/dockerfile/#shell-and-exec-form
---

# Shell and exec form

`RUN`, `CMD`, and `ENTRYPOINT` each accept two forms: exec form (JSON array, no shell) and shell form (plain string, uses a command shell).

## Signature / Usage

```dockerfile
INSTRUCTION ["executable","param1","param2"]   # exec form
INSTRUCTION command param1 param2               # shell form
```

```dockerfile
ENTRYPOINT ["/bin/bash", "-c", "echo hello"]
```

### Exec form

Parsed as a JSON array: use double quotes (`"`), not single quotes (`'`). It avoids shell string munging and lets you invoke commands using a specific shell or any other executable. Best used for `ENTRYPOINT`, combined with `CMD` for default arguments that can be overridden at runtime.

Variable substitution: exec form doesn't invoke a command shell, so `RUN [ "echo", "$HOME" ]` won't substitute `$HOME`. Use shell form or execute a shell directly: `RUN [ "sh", "-c", "echo $HOME" ]` (the shell, not the builder, then does the substitution).

Backslashes must be escaped in exec form (relevant on Windows). The following is treated as shell form because it is not valid JSON:

```dockerfile
RUN ["c:\windows\system32\tasklist.exe"]
```

Correct syntax:

```dockerfile
RUN ["c:\\windows\\system32\\tasklist.exe"]
```

### Shell form

Always uses a command shell. A regular string (not JSON); newlines can be escaped with the escape character (backslash by default) to continue onto the next line:

```dockerfile
RUN source $HOME/.bashrc && \
echo $HOME
```

is equivalent to `RUN source $HOME/.bashrc && echo $HOME`. Heredocs can also be used:

```dockerfile
RUN <<EOF
  source $HOME/.bashrc
  echo $HOME
EOF
```

### Use a different shell

```dockerfile
SHELL ["/bin/bash", "-c"]
RUN echo hello
```

## Related

- [run.md](./run.md)
- [cmd.md](./cmd.md)
- [entrypoint.md](./entrypoint.md)
- [shell.md](./shell.md)
- [here-documents.md](./here-documents.md)
