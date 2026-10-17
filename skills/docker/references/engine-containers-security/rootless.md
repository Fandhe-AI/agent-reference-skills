---
source: https://docs.docker.com/engine/security/rootless/
---

# Rootless mode

Rootless mode runs the Docker daemon and containers as a non-root user inside a user namespace, to mitigate potential vulnerabilities in the daemon and the container runtime. No root privileges are needed even to install the daemon, as long as the prerequisites are met.

## Signature / Usage

Install with packages (Docker 20.10+ RPM/DEB), as a non-root user:

```console
$ dockerd-rootless-setuptool.sh install
...
[INFO] Creating CLI context "rootless"
Successfully created context "rootless"
...
export DOCKER_HOST=unix:///run/user/1000/docker.sock
```

Install without packages (binaries go to `~/bin`):

```console
$ curl -fsSL https://get.docker.com/rootless -o get-docker-rootless.sh
$ less get-docker-rootless.sh   # review the script contents first
$ sh get-docker-rootless.sh
```

Confirm the client talks to the rootless daemon (`Context: rootless`, Security Options include `rootless`):

```console
$ docker info
```

## Options / Props

Prerequisites (verify with `id -u`, `whoami`, `grep ^$(whoami): /etc/subuid`):

| Requirement | Detail |
| --- | --- |
| `newuidmap` / `newgidmap` | Must be installed on the host; provided by the `uidmap` package on most distributions. |
| `/etc/subuid` and `/etc/subgid` | Must contain at least 65,536 subordinate UIDs/GIDs for the user, e.g. `testuser:231072:65536`. |

## Notes

- Rootless mode is similar to `userns-remap`, except that with `userns-remap` the daemon runs as root, while in rootless mode both daemon and container run without root. The two modes also differ in how container UIDs/GIDs map to the host (the official docs have a separate UID/GID mapping page).
- Rootless mode uses no binaries with `SETUID` bits or file capabilities except `newuidmap` and `newgidmap`.
- The setup script automatically shows help when prerequisites aren't satisfied. If `dockerd-rootless-setuptool.sh` is missing, install the `docker-ce-rootless-extras` package (e.g. `sudo apt-get install -y docker-ce-rootless-extras`).
- If the system-wide daemon is running, disable it: `sudo systemctl disable --now docker.service docker.socket` and `sudo rm /var/run/docker.sock`. Otherwise pass `--force` to the setup script; until you shut it down you're still running rootful Docker.
- Adapted (not in the official docs): the official docs pipe the downloaded `https://get.docker.com/rootless` script directly into `sh`; here it is downloaded, reviewed, then run.
- The install script is not supported on `s390x` (no static packages).
- Control the service with `systemctl --user (start|stop|restart) docker.service`; to start on system startup run `sudo loginctl enable-linger <user>`.
- Add `export PATH=...` shown by the installer (e.g. `/usr/bin` or `/home/<user>/bin`) to `~/.bashrc`. Some applications need `DOCKER_HOST=unix:///run/user/<uid>/docker.sock`.
- The official docs also have a rootless troubleshooting page (not covered here).

## Related

- [Isolate containers with a user namespace](./userns-remap.md)
- [Docker Engine security](./security-overview.md)
- [Docker contexts](./contexts.md)
