---
source: https://docs.docker.com/engine/security/
---

# Docker Engine security

Overview of the four areas to consider when reviewing Docker security: kernel namespaces and cgroups, the Docker daemon attack surface, container configuration profile loopholes, and kernel hardening features.

## Signature / Usage

Reach a remote daemon over SSH instead of TLS (or tunnel the socket with `ssh -L`):

```console
$ export DOCKER_HOST=ssh://USER@HOST
$ ssh -nNT -L /tmp/docker.sock:/var/run/docker.sock USER@HOST
$ export DOCKER_HOST=unix:///tmp/docker.sock
```

## Notes

- The four areas: intrinsic kernel security (namespaces and cgroups), the attack surface of the Docker daemon, loopholes in the container configuration profile (default or customized), and kernel "hardening" features and how they interact with containers.
- Namespaces provide the first form of isolation: processes in a container cannot see or affect processes in another container or the host. Each container has its own network stack; all containers on a host sit on bridge interfaces.
- Control groups implement resource accounting and limiting. They don't prevent one container accessing another's data but defend against some denial-of-service attacks.
- The daemon requires `root` unless you opt in to Rootless mode. Only trusted users should control the daemon: a container can bind-mount the host `/` and alter the host filesystem without restriction. Check parameters carefully when provisioning containers through an API.
- The REST API endpoint uses a Unix socket (changed in Docker 0.5.2) instead of a TCP socket on 127.0.0.1. Exposing the API over HTTP is possible, but securing endpoints with HTTPS and certificates is mandatory; exposing the daemon API over HTTP without TLS is not permitted and the daemon fails early on startup. Even with a firewall the endpoint can still be reachable from containers. Prefer a trusted network or VPN. `DOCKER_HOST=ssh://USER@HOST` or `ssh -nNT -L /tmp/docker.sock:/var/run/docker.sock USER@HOST` is an alternative to TLS. Adapted: the official text omits the SSH destination.
- Images: since Docker 1.3.2 images are extracted in a chrooted subprocess on Linux/Unix; since 1.10.0 all images are stored and accessed by the cryptographic checksums of their contents.
- If you run Docker on a server, run exclusively Docker there and move other services into containers (admin tools such as an SSH server and monitoring processes are fine).
- Capabilities: by default Docker starts containers with a restricted set (allowlist, not denylist) and drops all others. Containers usually don't need real root: this allows denying all `mount` operations, raw sockets, device node creation / chown / attribute changes, and module loading. Best practice is to remove all capabilities except those explicitly required.
- The security overview page states that Docker Content Trust signature verification is built into `dockerd` and configured with trustpinning in `daemon.json`; no such key appears in the `dockerd` reference's daemon.json options, so do not add it to daemon.json based on this page. See the official Content trust in Docker page.
- Other kernel security features: TOMOYO, AppArmor, SELinux, GRSEC. Docker only enables capabilities itself and doesn't interfere with the others. User namespaces are supported by the daemon since Docker 1.10 (available but not enabled by default).
- Conclusion: containers are quite secure by default, especially when processes run as non-privileged users; add AppArmor, SELinux, GRSEC or another hardening system for an extra layer.

## Related

- [Rootless mode](./rootless.md)
- [Isolate containers with a user namespace](./userns-remap.md)
- [Seccomp security profiles](./seccomp.md)
- [AppArmor security profiles](./apparmor.md)
- [Protect the Docker daemon socket](./protect-access.md)
