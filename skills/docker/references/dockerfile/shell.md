---
source: https://docs.docker.com/reference/dockerfile/#shell
---

# SHELL

Overrides the default shell used for the shell form of commands.

## Signature / Usage

```dockerfile
SHELL ["executable", "parameters"]
```

```dockerfile
FROM microsoft/windowsservercore

# Executed as cmd /S /C echo default
RUN echo default

# Executed as cmd /S /C powershell -command Write-Host default
RUN powershell -command Write-Host default

# Executed as powershell -command Write-Host hello
SHELL ["powershell", "-command"]
RUN Write-Host hello

# Executed as cmd /S /C echo hello
SHELL ["cmd", "/S", "/C"]
RUN echo hello
```

## Notes

- Default shell: `["/bin/sh", "-c"]` on Linux, `["cmd", "/S", "/C"]` on Windows. Must be written in JSON form.
- Particularly useful on Windows, where `cmd` and `powershell` are two commonly used and quite different native shells (alternate shells such as `sh` are available too). Also usable on Linux for `zsh`, `csh`, `tcsh`, etc.
- Can appear multiple times; each overrides all previous `SHELL` instructions and affects all subsequent instructions.
- Affects the shell form of `RUN`, `CMD` and `ENTRYPOINT`.
- Streamlining PowerShell: `RUN powershell -command Execute-MyCmdlet -param1 "c:\foo.txt"` is invoked as `cmd /S /C powershell -command ...`, which is inefficient (unnecessary `cmd.exe`, and a `powershell -command` prefix on every `RUN`). Use the JSON form of `RUN`, or `SHELL` with the shell form combined with the `escape` directive:

  ```dockerfile
  # escape=`

  FROM microsoft/nanoserver
  SHELL ["powershell","-command"]
  RUN New-Item -ItemType Directory C:\Example
  ADD Execute-MyCmdlet.ps1 c:\example\
  RUN c:\example\Execute-MyCmdlet -sample 'hello world'
  ```

- `SHELL` can also change how a shell operates, e.g. `SHELL ["cmd", "/S", "/C", "/V:ON"]` (or `/V:OFF` to disable) on Windows modifies delayed environment variable expansion. (The official text abbreviates this as `SHELL cmd /S /C /V:ON|OFF`; the instruction itself must be in JSON form.)
- Setting `SHELL` suppresses the `JSONArgsRecommended` build check (it signals that using shell form is a conscious decision).

## Related

- [shell-and-exec-form.md](./shell-and-exec-form.md)
- [parser-directives.md](./parser-directives.md)
- [run.md](./run.md)
