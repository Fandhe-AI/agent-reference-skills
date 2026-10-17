---
source: https://docs.docker.com/engine/security/userns-remap/
---

# Isolate containers with a user namespace

Re-map the `root` user inside containers to a less-privileged user on the Docker host using the daemon's `userns-remap` feature. The mapped user gets a UID range that works like UIDs 0 to 65536 inside the namespace but has no privileges on the host.

## Signature / Usage

`/etc/docker/daemon.json` (recommended):

```json
{
  "userns-remap": "testuser"
}
```

Or with the daemon flag:

```console
$ dockerd --userns-remap="testuser:testuser"
```

Subordinate ID entry in `/etc/subuid` and `/etc/subgid` (user:start:count):

```text
testuser:231072:65536
```

Disable remapping for a single container:

```console
$ docker run --userns=host ...
```

## Options / Props

Accepted `userns-remap` values (assuming UID and GID `1001`): `testuser`, `testuser:testuser`, `1001`, `1001:1001`, `testuser:1001`, `1001:testuser`. `default` makes Docker create and use a `dockremap` user and group.

## Notes

- With `userns-remap` the Docker daemon still runs as root; for both daemon and containers without root use Rootless mode.
- Ranges in `/etc/subuid` and `/etc/subgid` must not overlap. Multiple ranges per user are possible but Docker uses only the first five mappings (kernel limit of five entries in `/proc/self/uid_map` and `gid_map`). Some distributions don't add the `dockremap` group automatically; add non-overlapping ranges manually.
- Prerequisites: the subordinate ranges must be tied to an existing user (it owns the namespaced storage directories under `/var/lib/docker/`); adjust permissions of host locations the unprivileged user needs to write; check the known limitations.
- Enabling `userns-remap` masks existing images, containers and other objects in `/var/lib/docker/` (stored in a subdirectory such as `/var/lib/docker/231072.231072/`); best enabled on a new installation. Disabling it makes resources created while enabled inaccessible.
- `--userns=host` works with `docker container create`, `run` and `exec`. Side effect: read-only image layers are shared, so ownership of the container filesystem is still remapped (whole filesystem owned by the remapped user), which can break programs such as `sudo` or `setuid` binaries.
- Known limitations: sharing PID or NET namespaces with the host (`--pid=host`, `--network=host`); external volume or storage drivers that can't use daemon user mappings; `--privileged` without `--userns=host`; `mknod` is denied even for the namespaced root. Volumes mounted from the host need file ownership pre-arranged.

## Related

- [Rootless mode](./rootless.md)
- [Docker Engine security](./security-overview.md)
