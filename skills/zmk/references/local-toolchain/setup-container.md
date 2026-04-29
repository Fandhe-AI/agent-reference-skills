# Container Setup

Set up a containerized ZMK development environment using Docker, Dev Container CLI, or Podman. No native toolchain installation required.

## Signature / Usage

### 1. Clone the ZMK repository

```bash
git clone https://github.com/zmkfirmware/zmk.git
```

### 2. Create volumes (if using zmk-config or external modules)

```bash
# Docker
docker volume create --driver local -o o=bind -o type=none \
  -o device="/absolute/path/to/zmk-config/" zmk-config

docker volume create --driver local -o o=bind -o type=none \
  -o device="/absolute/path/to/zmk-modules/parent/" zmk-modules

# Podman (same flags)
podman volume create --driver local -o o=bind -o type=none \
  -o device="/absolute/path/to/zmk-config/" zmk-config
```

### 3. Initialize the container

**VS Code:** Open the `zmk` directory and click "Reopen in Container" when prompted, or use the command palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) and select "Remote: Show Remote Menu".

**Dev Container CLI:**
```bash
devcontainer up --workspace-folder "/absolute/path/to/zmk"
```

**Podman (manual):**
```bash
podman build -t <container-name> -f Dockerfile /path/to/.devcontainer
podman run -it --rm \
  --security-opt label=disable \
  --workdir /workspaces/zmk \
  -v /path/to/zmk:/workspaces/zmk \
  -v /path/to/zmk-config:/workspaces/zmk-config \
  <container-name> /bin/bash
```

### 4. Configure the Zephyr workspace (inside the container)

```bash
west init -l app/
west update
```

## Notes

- First container build pulls the Docker image and takes longer; subsequent launches are faster
- All `west build` commands must be run from inside the container
- Volumes mount to `/workspaces/zmk-config` and `/workspaces/zmk-modules` inside the container
- When changing config/module directories, remove old volumes before creating new ones
- VS Code requires the official VS Code (not Code OSS) with the Remote - Containers extension

## Related

- [Setup Overview](./setup.md)
- [Native Setup](./setup-native.md)
- [Build and Flash](./build-flash.md)
