---
source: https://docs.cloud.google.com/workstations/docs/customize-container-images
---

# Customize container images

Extend the preconfigured base images (minimal IDE, Linux terminal, language tools, `sshd`) or bring your own Linux image to pre-install tools and run automation scripts. You are responsible for maintaining packages you add.

## Signature / Usage

### Extend a base image: install a package

Adapted (not in the official docs): `apt update` and `apt install` are joined into one `RUN` with `apt-get`, so a cached update layer cannot leave stale package indexes for a changed install line, and the build step runs as root through `USER root` instead of `sudo`.

```dockerfile
FROM us-central1-docker.pkg.dev/cloud-workstations-images/predefined/code-oss:latest

USER root
RUN apt-get update && apt-get install -y emacs
```

### User customization script

Create `011_customize-user.sh` (runs after `010_add-user.sh`); set `GROUP` to the new group name and `USERNAME` to the user's username (the upper-case placeholder values fail the name check until you replace them):

Adapted (not in the official docs): the source's replace-me `$GROUP` / `$USERNAME` become variables set at the top, validated, quoted and passed after `--`, because the script runs as root.

```bash
#!/bin/bash
GROUP="NEW_GROUP_NAME"
USERNAME="USER_NAME"
for name in "${GROUP}" "${USERNAME}"; do
  case "${name}" in
    ''|-*|*[!a-z0-9_-]*) echo "invalid group or user name: ${name}" >&2; exit 1 ;;
  esac
done
# Create new group
groupadd -- "${GROUP}"
# Add the user to a new group
usermod -a -G "${GROUP}" -- "${USERNAME}"
```

```dockerfile
FROM us-central1-docker.pkg.dev/cloud-workstations-images/predefined/code-oss:latest

COPY 011_customize-user.sh /etc/workstation-startup.d/

RUN chmod +x /etc/workstation-startup.d/011_customize-user.sh
```

### Environment variables in SSH sessions

SSH sessions are not children of the entrypoint and do not see configuration-level environment variables. Relay them via `011_add-ssh-env-variables.sh` (replace `CUSTOM_ENV_VAR`):

```bash
#!/bin/bash
#
echo "CUSTOM_ENV_VAR=$CUSTOM_ENV_VAR" >> /etc/environment
```

```dockerfile
FROM us-central1-docker.pkg.dev/cloud-workstations-images/predefined/code-oss:latest

COPY 011_add-ssh-env-variables.sh /etc/workstation-startup.d/

RUN chmod +x /etc/workstation-startup.d/011_add-ssh-env-variables.sh
```

### X11 forwarding for SSH

```dockerfile
FROM us-central1-docker.pkg.dev/cloud-workstations-images/predefined/code-oss:latest

# Permit X11 forwarding using only IPv4
RUN cat >> /etc/ssh/sshd_config <<-EOF

AddressFamily inet
X11Forwarding yes
EOF
```

### Copy Code OSS into another image (multi-stage)

```dockerfile
FROM us-central1-docker.pkg.dev/cloud-workstations-images/predefined/code-oss:latest as code-oss-image

FROM us-central1-docker.pkg.dev/cloud-workstations-images/predefined/jetbrains-intellij:latest

# Copy Code OSS for Cloud Workstations and startup scripts into our custom image
COPY --from=code-oss-image /opt/code-oss /opt/code-oss
COPY --from=code-oss-image /etc/workstation-startup.d/110_start-code-oss.sh /etc/workstation-startup.d/110_start-code-oss.sh

# Use the existing entrypoint script which will execute all scripts in /etc/workstation-startup.d/
ENTRYPOINT ["/google/scripts/entrypoint.sh"]
```

### Default Code OSS color theme

Add as `/etc/workstation-startup.d/150_default-ide-color-theme.sh` (settings file: `$HOME/.codeoss-cloudworkstations/data/Machine/settings.json`, needs a persistent home directory):

Adapted (not in the official docs): jq writes to a temporary file that replaces `settings.json` only when jq succeeds; the source's one-liner truncates `settings.json` if jq fails.

```bash
jq '. += {"workbench.colorTheme": "Default Dark Modern"}' settings.json > settings.json.tmp && mv settings.json.tmp settings.json
```

### JetBrains installer scripts

```text
plugin-installer.sh [-v VERSION] [-d DESTINATION-DIRECTORY] [-c CHECKSUM] [-f] PLUGIN_ID
jetbrains-installer.sh IDE [ pinned|latest ]
```

```bash
/installer-scripts/plugin-installer.sh -d /opt/ideaIU/plugins/ 6351
/installer-scripts/jetbrains-installer.sh clion
```

### Build, test and push

Replace `CUSTOM_IMAGE_FOLDER` and `TARGET_IMAGE` (an Artifact Registry path such as `*.pkg.dev/cloud-workstations-external/customimage:latest`, with `*` replaced by region and identifiers):

The source gives these as three separate steps; run them one at a time (`docker run` stays in the foreground until you stop the container).

Build the image:

```bash
docker build CUSTOM_IMAGE_FOLDER -t TARGET_IMAGE
```

Test it locally (`docker run --privileged` is for local testing only):

```bash
docker run --privileged -p LOCAL_PORT:CONTAINER_PORT TARGET_IMAGE
```

Local testing of the base editor image: pass `-p 8080:80` and open `localhost:8080`, or pass `-p 2222:22` and run `ssh user@localhost -p 2222`.

After testing, push the image to Artifact Registry:

```bash
docker push TARGET_IMAGE
```

## Options / Props

| Item | Description |
|------|-------------|
| `CLOUD_WORKSTATIONS_CUSTOM_IMAGE` | Environment variable that can point at the repository. |
| `CLOUD_WORKSTATIONS_JETBRAINS_PERISTED_CONFIG_DIR` | Overrides where `$IDE.vmoptions` and `$IDE.properties` are persisted (spelled as in the source). |
| `config.container.args` | Workstation configuration field to specify a blocking process. |
| `-v` / `-d` / `-c` / `-f` | plugin-installer: version / destination directory (default: working directory) / SHA-256 checksum / overwrite an existing plugin. |
| `PLUGIN_ID` | Numeric JetBrains marketplace ID (for example `6351` Dart, `8079` Cloud Code for IntelliJ). |
| `IDE` | `cl`/`clion`, `go`/`goland`, `iiu`/`intellij`, `pcp`/`pycharm`, `ps`/`phpstorm`, `rd`/`rider`, `rm`/`rubymine`, `ws`/`webstorm`. Version arg `pinned` or `latest` (default `latest`). |

## Notes

- Bring your own image: Linux-based, running a blocking process at startup (for example `ENTRYPOINT` running `sleep infinity`, or `config.container.args`). Recommended: an SSH server and the default IDE or web server on port `80`. Base-image scripts are not required.
- Extend three ways: add static assets in the Dockerfile; add executables under `/etc/workstation-startup.d/`; override `ENTRYPOINT`. All user modifications must happen at runtime, not in the Dockerfile, because `/home` is mounted at startup. The base-image structure (startup scripts, `/home` caveats, APT keys, sudo, `customize_environment`, keep-alive) is in [preconfigured-base-images.md](./preconfigured-base-images.md).
- Host custom images in Artifact Registry (recommended and supported); other repositories (for example GitHub) may not work as expected. A private image requires a service account with pull permission in the workstation configuration.
- `docker run --privileged` is for local testing only; do not use it on shared hosts.
- Corrected from the official docs: the user customization script `groupadd $GROUP` / `usermod -a -G $GROUP $USERNAME` uses unquoted placeholders in a script that runs as root, so an empty, space-containing or `-`-prefixed value is split or parsed as an option. The rewrite sets `GROUP` / `USERNAME` explicitly, rejects empty values, values starting with `-` and characters outside `a-z0-9_-` (a conservative lower-case rule; widen the pattern if your names need other characters), quotes every expansion and ends options with `--` before the name operands.
- Adapted from the official docs: the emacs Dockerfile's two layers `RUN sudo apt update` / `RUN sudo apt install -y emacs` are written as one `RUN apt-get update && apt-get install -y emacs` after `USER root`, so packages are installed by the root build step instead of through `sudo`.
- Adapted from the official docs: the color-theme script `cat <<< $(jq '. += {"workbench.colorTheme": "Default Dark Modern"}' settings.json) > settings.json` empties `settings.json` when jq fails (missing file, or JSONC comments); it is rewritten to write a temp file and `mv` it on success. The command still uses the source's relative `settings.json`, and startup scripts run as root by default (the source says to use `runuser` to run as another user), so the script must change to `$HOME/.codeoss-cloudworkstations/data/Machine/` of the workstation user before running it; the source's Dockerfile for this script is not shown, so add a shebang and `chmod +x` as in the other startup-script examples.
- The X11 forwarding Dockerfile uses a heredoc in `RUN` (`RUN cat >> /etc/ssh/sshd_config <<-EOF`), which needs a builder that supports Dockerfile heredocs (BuildKit); the legacy builder parses the following lines as instructions. See the `docker` skill.
- Source inconsistency: the startup-script examples on this page use `011_`, `120_` and `150_` prefixes (running before or among the built-in `110_start-$IDE.sh`); https://docs.cloud.google.com/workstations/docs/preconfigured-base-images recommends prefixing your scripts with a three-digit number greater than 200.
- Source inconsistency: the multi-stage example uses `predefined/jetbrains-intellij:latest`, while the image list uses `intellij-ultimate`.
- Omitted: the Java-extensions Dockerfile (`wget` of `.vsix` files into `/opt/code-oss/extensions/`, ending in `chmod a+rwx -R`); the alternative is a startup script `/etc/workstation-startup.d/120_install_extensions.sh` calling `/opt/code-oss/bin/codeoss-cloudworkstations --install-extension <id>@<version>`. Also omitted: the Cloud Code for IntelliJ Dockerfile snippet (its two `RUN` echo lines lack `&&` between them, so it is not valid as published); install plugins with `plugin-installer.sh` as above. Extensions pre-installed at build time are built-in (search `@builtin`) and cannot be updated.
- Recommended: scan custom images (Artifact Analysis) and rebuild weekly (https://docs.cloud.google.com/build/docs/schedule-builds, https://docs.cloud.google.com/workstations/docs/tutorial-automate-container-image-rebuild). Debug with container output logs. General image-build practice: see the `docker` skill.
- Source: https://docs.cloud.google.com/workstations/docs/customize-container-images (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [preconfigured-base-images.md](./preconfigured-base-images.md)
- [create-configuration.md](./create-configuration.md)
