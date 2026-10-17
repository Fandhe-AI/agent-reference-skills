---
source: https://docs.docker.com/engine/install/
---

# Install Engine

Guide to installing Docker Engine on Linux (apt / dnf repositories, docker group, systemd enablement). Source: `https://docs.docker.com/engine/install/{ubuntu,debian,fedora,rhel,centos,raspberry-pi-os,binaries,linux-postinstall}/` (retrieved 2026-10-16 JST). Installing Docker Desktop is not covered.

Adapted: steps that need `sudo` (package install, repository setup, systemd, uninstall) are described in prose with links to the official pages instead of copy-paste commands.

> **Warning**: The installation steps change packages, repositories, and systemd configuration with root privileges. Do not reuse them on production hosts; run them in a disposable verification environment (such as a VM) before applying.

## Prerequisites

Root privileges (or sudo privileges granted by an administrator) are required. Follow the official pages below for the requirements of each distribution.

| Target | Official page |
| --- | --- |
| Ubuntu | https://docs.docker.com/engine/install/ubuntu/ |
| Debian | https://docs.docker.com/engine/install/debian/ |
| Fedora | https://docs.docker.com/engine/install/fedora/ |
| RHEL | https://docs.docker.com/engine/install/rhel/ |
| CentOS | https://docs.docker.com/engine/install/centos/ |
| Raspberry Pi OS (32-bit) | https://docs.docker.com/engine/install/raspberry-pi-os/ |
| Static binaries | https://docs.docker.com/engine/install/binaries/ |
| Post-installation setup | https://docs.docker.com/engine/install/linux-postinstall/ |

## Remove conflicting packages and set up the repository

On Ubuntu / Debian / Raspberry Pi OS use apt, and on Fedora / RHEL / CentOS use dnf, to set up the official Docker repository and install `docker-ce` `docker-ce-cli` `containerd.io` `docker-buildx-plugin` `docker-compose-plugin`. For the steps (registering the GPG key, defining the repository, removing conflicting packages), see the Install section of each official page in the table above.

> **Warning**: Removing conflicting packages removes existing Docker-related packages. Data in `/var/lib/docker/` is not deleted automatically.

On Fedora, when prompted to verify the GPG key, confirm that the fingerprint matches `060A 61C5 1B55 8A7F 742B 77AA C52F EB6B 621E 9F35` and accept it (from the original). Installation alone does not start Docker; the `docker` group is created but no users are added to it.

## List available versions

To install a specific version, check the list beforehand.

```sh
apt list --all-versions docker-ce
```

```sh
dnf list docker-ce --showduplicates | sort -r
```

On Raspberry Pi OS use `apt-cache madison docker-ce | awk '{ print $3 }'` (from the original). Pass the chosen value to the install steps in a form such as `docker-ce=<VERSION_STRING>`.

## Verify the installation

```sh
systemctl status docker
```

```sh
docker version
```

```sh
docker run hello-world
```

A user who is not in the `docker` group must run `docker run hello-world` with root privileges. To start Docker when it is not running, use `systemctl start docker` on Ubuntu / Debian-based systems and `systemctl enable --now docker` on dnf-based systems (both need root privileges). For the fix when `journalctl -u docker` shows `failed to find iptables` on Fedora, see the official Fedora page.

## Install with the convenience script

> **Warning**: The original states it is "for development and testing environments and not recommended for production". The script runs with root privileges, may install many dependency packages without confirmation, and is not meant for upgrading an existing installation. Always review a script downloaded from the internet before running it, and run it only in a disposable verification environment.

First download the script and review its contents (do not run it yet).

```sh
curl -fsSL https://get.docker.com -o get-docker.sh
```

```sh
less get-docker.sh
```

After reviewing the contents, run it with root privileges and `--dry-run` to preview the steps, then run it for real if there is no problem (steps from the original). On Debian-based systems the docker service starts automatically, and on RPM-based systems (CentOS / Fedora / RHEL) it must be started manually. Pre-release versions (test channel, including beta / RC) use the similar script at `https://test.docker.com`, only in disposable environments for evaluation.

## Install static binaries

> **Warning**: The original states it is "mainly for testing and not recommended for production (statically linked binaries with no automatic security updates)". Run it only in a disposable verification environment.

Get the `.tgz` from `https://download.docker.com/linux/static/stable/`. Extract it with the following command.

```sh
tar xzvf /path/to/<FILE>.tar.gz
```

Placing the extracted binaries (such as in `/usr/bin/`) and starting `dockerd` require root privileges, so refer to https://docs.docker.com/engine/install/binaries/. Startup options can also be specified in `/etc/docker/daemon.json`.

## Add a user to the docker group

> **Warning**: The `docker` group grants the user root-equivalent privileges (warning from the original). Do this only in environments where granting that privilege is acceptable. To run without root privileges, use rootless mode.

Creating the group and adding a user require root privileges, so refer to the Manage Docker as a non-root user section of https://docs.docker.com/engine/install/linux-postinstall/. Logging out and back in is required for it to take effect (a reboot may be needed on virtual machines). After that, verify with the following.

```sh
docker run hello-world
```

## Start on boot (systemd)

Enabling and disabling `docker.service` and `containerd.service` is done with `systemctl enable` / `systemctl disable` with root privileges. For details, see the Configure Docker to start on boot section of linux-postinstall. On Debian / Ubuntu they start on boot by default.

## Uninstall Docker Engine

> **Warning**: Irreversible. Images, containers, and volumes remain in `/var/lib/docker` and `/var/lib/containerd`, and deleting them loses everything. Do not run this outside disposable environments.

For removing packages (`apt purge` on Ubuntu / Debian, `dnf remove` on Fedora / RHEL / CentOS) and deleting data, see the Uninstall Docker Engine section of each official page. On Raspberry Pi OS use `apt-get purge` (from the original). Delete edited configuration files manually.
