---
source: https://docs.docker.com/reference/dockerfile/#here-documents
---

# Here-Documents

Here-documents redirect subsequent Dockerfile lines to the input of `RUN` or `COPY` commands. If such a command contains a here-document, the Dockerfile considers the next lines, until the line containing only the here-doc delimiter, part of the same command.

## Signature / Usage

```dockerfile
# syntax=docker/dockerfile:1
FROM debian
RUN <<EOT bash
  set -ex
  apt-get update
  apt-get install -y vim
EOT
```

If the command only contains a here-document, its contents are evaluated with the default shell:

```dockerfile
# syntax=docker/dockerfile:1
FROM debian
RUN <<EOT
  mkdir -p foo/bar
EOT
```

A shebang header can define an interpreter:

```dockerfile
# syntax=docker/dockerfile:1
FROM python:3.6
RUN <<EOT
#!/usr/bin/env python
print("hello world")
EOT
```

Multiple here-documents:

```dockerfile
# syntax=docker/dockerfile:1
FROM alpine
RUN <<FILE1 cat > file1 && <<FILE2 cat > file2
I am
first
FILE1
I am
second
FILE2
```

### Creating inline files with COPY

Replace the source parameter with a here-doc indicator to write its contents directly to a file:

```dockerfile
# syntax=docker/dockerfile:1
FROM alpine
COPY <<EOF greeting.txt
hello world
EOF
```

## Notes

- Regular here-doc variable expansion and tab stripping rules apply. In the following, `script.sh` prints "hello bar" because the variable is expanded when `COPY` executes:

  ```dockerfile
  # syntax=docker/dockerfile:1
  FROM alpine
  ARG FOO=bar
  COPY <<-EOT /script.sh
    echo "hello ${FOO}"
  EOT
  ENTRYPOINT ash /script.sh
  ```

- If any part of the here-document word `EOT` is quoted (`<<-"EOT"`), the variable is not expanded at build time; it is interpreted at runtime when the script is invoked (`docker run -e FOO=world heredoc` prints `hello world`), and `ARG FOO=bar` is then excessive.

## Related

- [run.md](./run.md)
- [copy.md](./copy.md)
- [shell-and-exec-form.md](./shell-and-exec-form.md)
