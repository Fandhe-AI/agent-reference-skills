# Package Repositories & System Updates

Proxmox VE uses APT. Repositories are configured in `/etc/apt/sources.list` (legacy single-line) or `.sources` files in `/etc/apt/sources.list.d/` (deb822). The Debian base repositories are always required in addition to a Proxmox VE repository.

## Signature / Usage

File `/etc/apt/sources.list.d/proxmox.sources`:

```
Types: deb
URIs: http://download.proxmox.com/debian/pve
Suites: trixie
Components: pve-no-subscription
Signed-By: /usr/share/keyrings/proxmox-archive-keyring.gpg
```

```
# apt update
# apt full-upgrade
```

## Options / Props

### Proxmox VE repositories

| Component | URI | Description |
|-----------|-----|-------------|
| `pve-enterprise` | `https://enterprise.proxmox.com/debian/pve` | Recommended for production; needs a valid subscription key; enabled by default (`/etc/apt/sources.list.d/pve-enterprise.sources`) |
| `pve-no-subscription` | `http://download.proxmox.com/debian/pve` | No subscription needed; for testing / non-production (`/etc/apt/sources.list.d/proxmox.sources`) |
| `pve-test` | `http://download.proxmox.com/debian/pve` | Latest packages, mainly used by developers to test new features |
| `pve-dbgsym` | `https://dbgsym.proxmox.com/debian/pve` | `<package>-dbgsym` debug symbol packages for gdb, systemd-coredump, crash (`/etc/apt/sources.list.d/pve-dbgsym.sources`) |

### Repository formats

| Format | Description |
|--------|-------------|
| single line | Legacy `sources.list`; one repository per line, `#` starts a comment. Since Debian 13 Trixie apt complains about it; migrate with `apt modernize-sources` |
| deb822 | Modern multi-line `*.sources` key-value entries; blank line separates entries |

### Debian base repository (Proxmox VE 9 / Trixie)

File `/etc/apt/sources.list.d/debian.sources`:

```
Types: deb deb-src
URIs: http://deb.debian.org/debian/
Suites: trixie trixie-updates
Components: main non-free-firmware
Signed-By: /usr/share/keyrings/debian-archive-keyring.gpg

Types: deb deb-src
URIs: http://security.debian.org/debian-security/
Suites: trixie-security
Components: main non-free-firmware
Signed-By: /usr/share/keyrings/debian-archive-keyring.gpg
```

### Ceph releases available in Proxmox VE 9

| Release | Estimated End-of-Life | enterprise | no-subscription | test |
|---------|-----------------------|------------|-----------------|------|
| `ceph-tentacle` | 2027-11 (v20.2) | recommended | available | available |
| `ceph-squid` | 2026-09 (v19.2) | available | available | available |

File `/etc/apt/sources.list.d/ceph.sources`:

```
Types: deb
URIs: https://enterprise.proxmox.com/debian/ceph-tentacle
Suites: trixie
Components: enterprise
Signed-By: /usr/share/keyrings/proxmox-archive-keyring.gpg
```

For no-subscription / test use `URIs: http://download.proxmox.com/debian/ceph-tentacle` with `Components: no-subscription` / `test`.

### SecureApt keyring (only when installing on top of Debian)

```
# wget https://enterprise.proxmox.com/debian/proxmox-archive-keyring-trixie.gpg -O /usr/share/keyrings/proxmox-archive-keyring.gpg
```

## Notes

- Proxmox VE checks for package updates daily and notifies `root@pam` by email; the GUI Changelog button shows details. Since Proxmox VE 7 the node Repository panel shows repository state and allows enabling/disabling repositories (Node -> Updates for installing).
- Subscription keys are bound to the host architecture (an arm64 host needs an arm64 key; an x86 key is not valid on it, and vice versa).
- Add `Enabled: no` to the `pve-enterprise` entry to avoid errors on hosts without a subscription key, then configure `pve-no-subscription`.
- `pve-no-subscription` is not recommended on production servers; `pve-test` should only be used to test new features or bug fixes (same for the Ceph `test` repository).
- The debug symbol repository is provided for the Debian Bookworm and Trixie based Proxmox VE releases (and newer).
- Since Proxmox VE 9 the `non-free-firmware` component is enabled by default for new installations (needed for early microcode updates). On upgraded installs with deb822 sources, add `non-free-firmware` to the `Components:` lines of `/etc/apt/sources.list.d/debian.sources`; otherwise append it to each `.debian.org` line of `/etc/apt/sources.list` and run `apt update`.
- Prior to Proxmox VE 9 the Ceph file was `ceph.list`; it is now `ceph.sources`.
- Once the `proxmox-archive-keyring` package is installed it manages the keyring file; modifying it is discouraged and the `Signed-By:` path must match the key location. The ISO install already contains the key.
- Always use `apt full-upgrade` (or the GUI), not `apt upgrade`: Proxmox VE is a rolling release and `apt upgrade` cannot remove packages to satisfy dependencies, which may leave a partially upgraded or broken state.
- Upgrading Ceph to its next major release follows the Ceph upgrade guide; in an HCI each Proxmox VE major release requires a corresponding minimum Ceph major release. For an external Ceph cluster, add the chosen repository via the Repository panel, apply updates, verify with `ceph --version`, and disable the old Ceph repository.

## Related

- [ceph.md](./ceph.md)
- [firmware-updates.md](./firmware-updates.md)
- [installation.md](./installation.md)
- Official docs: https://pve.proxmox.com/pve-docs/chapter-sysadmin.html#sysadmin_package_repositories , https://pve.proxmox.com/pve-docs/chapter-sysadmin.html#system_software_updates
