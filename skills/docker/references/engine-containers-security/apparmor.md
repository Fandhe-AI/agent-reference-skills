---
source: https://docs.docker.com/engine/security/apparmor/
---

# AppArmor security profiles for Docker

AppArmor is a Linux security module that associates a security profile with each program. Docker automatically generates and loads a default profile named `docker-default` for containers (generated in `tmpfs` and loaded into the kernel).

## Signature / Usage

Explicitly use the default policy:

```console
$ docker run --rm -it --security-opt apparmor=docker-default hello-world
```

Load, use and unload a custom profile:

```console
$ apparmor_parser -r -W /path/to/your_profile
$ docker run --rm -it --security-opt apparmor=your_profile hello-world
$ apparmor_parser -R /path/to/profile
```

Customize the generated `docker-default` from a template (Docker Engine 29.8+), in `/etc/docker/daemon.json`:

```json
{
  "apparmor-profile": "/etc/docker/apparmor/docker-default"
}
```

Nginx example profile (excerpt):

```c
#include <tunables/global>

profile docker-nginx flags=(attach_disconnected,mediate_deleted) {
  #include <abstractions/base>

  network inet tcp,
  network inet udp,
  network inet icmp,

  deny network raw,
  deny network packet,

  file,
  umount,

  deny /bin/** wl,
  deny /etc/** wl,
  deny /usr/** wl,

  /usr/sbin/nginx ix,

  deny /bin/dash mrwklx,
  deny /bin/sh mrwklx,
  deny /usr/bin/top mrwklx,

  capability chown,
  capability net_bind_service,

  deny mount,
}
```

```console
$ sudo apparmor_parser -r -W /etc/apparmor.d/containers/docker-nginx
$ docker run --security-opt "apparmor=docker-nginx" -p 80:80 -d --name apparmor-nginx nginx
```

## Options / Props

Template data available in a custom `docker-default` template:

| Field | Description |
| --- | --- |
| `.Abi` | `abi/3.0` when the host provides that AppArmor ABI, or an empty string. |
| `.Name` | The profile name, `docker-default`. |
| `.DaemonProfile` | The daemon's AppArmor profile, or `unconfined`. |
| `.Imports` | Host-specific declarations and includes for the global scope. |
| `.InnerImports` | Host-specific includes for the profile scope. |

## Notes

- `docker-default` applies to containers, not to the Docker daemon. A daemon profile exists in `contrib/apparmor` of the Docker Engine source repository but isn't installed with the `deb` packages. The container profile is generated from the `baseTemplate` in `moby/profiles` (`apparmor/template.go`).
- Custom template (Engine 29.8+): the template uses Go `text/template` syntax and is rendered when the daemon starts. Start from the built-in `baseTemplate`, save the contents between its backticks as `/etc/docker/apparmor/docker-default`, and keep the `.Abi`, `.Name`, `.Imports` and `.InnerImports` substitutions. Use `.DaemonProfile` in rules permitting signals from the daemon.
- Store the template outside `/etc/apparmor.d` because the host AppArmor service may try to parse it before Docker renders it. Privileged containers without an explicit profile use `unconfined`; containers with another profile keep that setting.
- Adapted: the official daemon.json / `--apparmor-profile` examples use `/etc/apparmor.d/containers/my-custom-docker-profile.tpl`, which contradicts its own advice to store the template outside `/etc/apparmor.d`; the path is unified to `/etc/docker/apparmor/docker-default` here.
- A custom template can reduce container isolation; review and test every change.
- Set the template path either with `dockerd --apparmor-profile=<path>` or in `daemon.json`, not both. Restart the daemon and check logs for `Failed to load default apparmor profile`. If `apparmor_parser` rejects the rendered profile, the daemon keeps running with the previously loaded profile. Verify with `docker info --format '{{json .SecurityOptions}}'` (output includes `name=apparmor,profile=<path>`).
- Debug with `dmesg` (AppArmor audit lines such as `apparmor="DENIED" operation="ptrace" profile="docker-default"`) and `aa-status` (shows profiles in enforce / complain mode).

## Related

- [Seccomp security profiles](./seccomp.md)
- [Docker Engine security](./security-overview.md)
