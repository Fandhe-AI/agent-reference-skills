---
source: https://docs.docker.com/compose/install/linux/
---

# Install Compose

Docker Compose installation steps for Linux (plugin / standalone). Source: `https://docs.docker.com/compose/install/{linux,standalone}/` (retrieved 2026-10-16 JST, Compose version in the original: v5.6.0).

> **Warning**: A system-wide installation places packages or binaries with root privileges. Run it in a disposable verification environment before applying it. Installing Docker Desktop is not covered.

## Install the plugin via the repository

Set up the Docker apt / dnf repository first (see `install-engine.md`). Install `docker-compose-plugin` with apt (Ubuntu / Debian) or yum (RPM-based). Root privileges are required, so refer to the official page https://docs.docker.com/compose/install/linux/ for the steps. Docker Engine and the Docker CLI must already be installed. Updates use the same steps.

## Verify the installation

```sh
docker compose version
```

## Manual plugin installation (current user only)

> **Warning**: According to the original, a manual installation is not updated automatically. Use the repository method for maintainability.

```sh
DOCKER_CONFIG="${DOCKER_CONFIG:-${HOME}/.docker}"
mkdir -p "${DOCKER_CONFIG}/cli-plugins"
curl -SL https://github.com/docker/compose/releases/download/v5.6.0/docker-compose-linux-x86_64 -o "${DOCKER_CONFIG}/cli-plugins/docker-compose"
```

```sh
chmod +x "${DOCKER_CONFIG}/cli-plugins/docker-compose"
```

This installs under the active user's `$HOME`. To use another version, replace `v5.6.0`; for another architecture, replace `x86_64` (from the original). To make it available to all users, the install location is `/usr/local/lib/docker/cli-plugins`; placing the file and setting the execute permission require root privileges, so refer to the official page https://docs.docker.com/compose/install/linux/.

## Install standalone (Linux, legacy)

> **Warning**: The original deprecates this method and states it is supported only for backward compatibility. Use it only when neither Docker Desktop nor the Compose plugin can be used. The command is `docker-compose`, not `docker compose`.

The install location is `/usr/local/bin/docker-compose`, and root privileges are required, including for setting the execute permission. Refer to the official page https://docs.docker.com/compose/install/standalone/ for the steps. If `docker-compose` fails after installation, check the PATH (the original gives creating a symbolic link to `/usr/bin/docker-compose` as an example).

```sh
docker-compose version
```

## Notes

Adapted: commands that need `sudo` (package install, system-wide plugin/standalone placement, symlink) are described in prose with links to the official pages; the per-user manual install keeps the original commands with `DOCKER_CONFIG` quoted as `"${DOCKER_CONFIG}"`.
