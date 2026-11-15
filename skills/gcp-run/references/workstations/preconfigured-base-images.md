---
source: https://docs.cloud.google.com/workstations/docs/preconfigured-base-images
---

# Preconfigured base images

Google Cloud maintains base images for Cloud Workstations, derived from Google Cloud's standard base images. Use them directly in workstation configurations or as `FROM` images for custom container images.

## Signature / Usage

### Refresh preinstalled APT keys in a Dockerfile

Run the script before `apt-get update` when a third-party repository changed its public key:

```dockerfile
# Refresh the preinstalled APT keys
RUN /google/scripts/refresh-preinstalled-apt-keys.sh

RUN apt-get update
```

### Customize without extending an image

All base images run an executable `/home/user/.workstation/customize_environment` in the background as `user` once at workstation start (unlike `.profile` / `.bashrc`, which run per shell login):

```bash
#!/bin/bash
sudo apt-get update
sudo apt-get install -y emacs
```

## Options / Props

### Images (prefix `us-central1-docker.pkg.dev/cloud-workstations-images/predefined/`, tag `:latest`)

| Image | Description |
|-------|-------------|
| `code-oss` | Base editor, Code OSS for Cloud Workstations (based on Code-OSS). Default. |
| `base` | No IDE installed. |
| `code-oss-cuda` | Code OSS for Cloud Workstations with NVIDIA CUDA Toolkit. |
| `clion`, `goland`, `intellij-ultimate`, `phpstorm`, `pycharm`, `rider`, `rubymine`, `webstorm` | JetBrains IDEs. Accessible only through JetBrains Gateway (https://docs.cloud.google.com/workstations/docs/develop-code-using-local-jetbrains-ides). |

Third-party image (maintained by Posit, not built, maintained or officially supported by Google Cloud; evaluate before production use): `us-central1-docker.pkg.dev/posit-images/cloud-workstations/workbench:latest` (Posit Workbench including RStudio Pro). Report issues to Posit on GitHub.

### Startup structure

| Item | Value |
|------|-------|
| Entrypoint | `/google/scripts/entrypoint.sh` |
| Startup scripts | `/etc/workstation-startup.d/*`, run in lexicographical order, as root by default (use `runuser` for another user) |
| `000_configure-docker.sh` | Configures and runs Docker inside the workstation |
| `010_add-user.sh` | Creates the default user |
| `020_start-sshd.sh` | Starts `sshd` |
| `030_customize-environment.sh` | Runs `/home/user/.workstation/customize_environment` as `user` |
| `110_start-$IDE.sh` | Starts the IDE |
| Your scripts | Prefix with a three-digit number greater than 200 |
| Docker image storage | `/home/.docker_data` (preserved between sessions) |
| Keep-alive script | `/google/scripts/keep_alive.sh` |
| IDE versions script | `/google/scripts/preinstalled-ide-versions.sh` |
| Disable sudo | environment variable `CLOUD_WORKSTATIONS_CONFIG_DISABLE_SUDO` = `true` in the workstation configuration |

## Notes

- Users must be added at workstation startup, not in the Dockerfile: the persistent disk is attached to the container at runtime and overwrites `/home` changes made at image build time. Move per-user `git` config, cloned repos, `$HOME/.config` files and user creation to a startup script in `/etc/workstation-startup.d` or `/etc/profile.d`; run slow setup in the background (`&`).
- The default user has `sudo` root access. If a user can break out of the container they might obtain root on the underlying VM. Console path: **Environment customization > Advanced container options > Environment variables**.
- `customize_environment` logs: `/var/log/customize_environment` (also in container output logs); `/var/run/customize_environment_done` is created on success. It runs in parallel with startup, so packages appear a few moments after start.
- AI agents: images include sample keep-alive configurations under `/google/samples/agents/keepalive/` (for example Claude Code, Antigravity CLI). They work best with workstation suspension (`idleAction` set to `SUSPEND`). See https://docs.cloud.google.com/workstations/docs/agent-optimized-development.
- Source inconsistency: this page recommends prefixing your startup scripts with a three-digit number greater than 200; the examples in https://docs.cloud.google.com/workstations/docs/customize-container-images use `011_`, `120_` and `150_` prefixes so they run before or among the built-in `110_start-$IDE.sh`.
- Base images are for Cloud Workstations; for general Dockerfile and image-build practice see the `docker` skill.
- Source: https://docs.cloud.google.com/workstations/docs/preconfigured-base-images (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [customize-container-images.md](./customize-container-images.md)
- [create-configuration.md](./create-configuration.md)
- [architecture.md](./architecture.md)
