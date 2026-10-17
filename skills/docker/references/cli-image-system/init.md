---
source: https://docs.docker.com/reference/cli/docker/init/
---

# docker init

Creates Docker-related starter files for your project. Provided by Docker Desktop.

## Signature / Usage

```console
$ docker init [OPTIONS]
```

Run `docker init` in the project directory to be walked through creating `.dockerignore`, `Dockerfile`, `compose.yaml`, and `README.Docker.md`.

```console
$ docker init

Welcome to the Docker Init CLI!

This utility will walk you through creating the following files with sensible defaults for your project:
  - .dockerignore
  - Dockerfile
  - compose.yaml
  - README.Docker.md
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `--version` |  | Display version of the init plugin |

## Notes

### Templates

| Template | Description |
| --- | --- |
| ASP.NET Core | Suitable for an ASP.NET Core application. |
| Go | Suitable for a Go server application. |
| Java | Suitable for a Java application that uses Maven and packages as an uber jar. |
| Node | Suitable for a Node server application. |
| PHP with Apache | Suitable for a PHP web application. |
| Python | Suitable for a Python server application. |
| Rust | Suitable for a Rust server application. |
| Other | General purpose starting point for containerizing your application. |

Example prompts after selecting `Go`:

```console
? What application platform does your project use? Go
? What version of Go do you want to use? 1.20
? What's the relative directory (with a leading .) of your main package? .
? What port does your server listen on? 3333

CREATED: .dockerignore
CREATED: Dockerfile
CREATED: compose.yaml
CREATED: README.Docker.md
```

### Other notes

- If any file already exists, a prompt warns and offers to overwrite all files. If `docker-compose.yaml` exists instead of `compose.yaml`, `docker init` can overwrite it, keeping `docker-compose.yaml` as the Compose file name. Overwritten files cannot be recovered; rename or copy first to back up.
- After running, tailor the generated files to your project. Start the app with `docker compose up --build`.
- PHP with Apache template: PHP extensions your application needs must be added manually to the Dockerfile.
- The Node template prompts for version, package manager, build command, build output directory, start command, and port; the Python template prompts for version, port, and run command; the Rust template for version and port; the ASP.NET Core template for main project name, .NET version, and local port.

## Related

- [docker image build](./image-build.md)
