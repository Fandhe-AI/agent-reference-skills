---
source: https://docs.docker.com/engine/security/seccomp/
---

# Seccomp security profiles for Docker

Secure computing mode (`seccomp`) is a Linux kernel feature that restricts the system calls available within a container. Available only if Docker was built with `seccomp` and the kernel has `CONFIG_SECCOMP` enabled.

## Signature / Usage

Check kernel support:

```console
$ grep CONFIG_SECCOMP= /boot/config-$(uname -r)
CONFIG_SECCOMP=y
```

Pass a custom profile:

```console
$ docker run --rm -it --security-opt seccomp=/path/to/seccomp/profile.json hello-world
```

Run without the default profile:

```console
$ docker run --rm -it --security-opt seccomp=unconfined debian:latest \
    unshare --map-root-user --user sh -c whoami
```

## Options / Props

Significant syscalls blocked by the default profile (not all; blocked because they aren't on the allowlist):

| Syscall | Reason |
| --- | --- |
| `acct` | Could let containers disable their own resource limits or process accounting. Also gated by `CAP_SYS_PACCT`. |
| `add_key`, `keyctl`, `request_key` | Kernel keyring is not namespaced. |
| `bpf` | Deny loading persistent BPF programs; gated by `CAP_SYS_ADMIN`. |
| `clock_adjtime`, `clock_settime`, `settimeofday`, `stime` | Time/date is not namespaced. Also gated by `CAP_SYS_TIME`. |
| `clone`, `unshare`, `setns` | Deny cloning new namespaces / associating a thread with one. Gated by `CAP_SYS_ADMIN` (exceptions: `CLONE_NEWUSER`, `unshare --user`). |
| `create_module`, `delete_module`, `finit_module`, `init_module`, `query_module`, `get_kernel_syms` | Kernel module manipulation. Gated by `CAP_SYS_MODULE`; some are obsolete. |
| `get_mempolicy`, `mbind`, `move_pages`, `set_mempolicy` | Modify kernel memory and NUMA settings. |
| `ioperm`, `iopl` | Modify kernel I/O privilege levels. Gated by `CAP_SYS_RAWIO`. |
| `io_uring_enter`, `io_uring_register`, `io_uring_setup` | Blocked due to security vulnerabilities exploitable to break out of containers (moby/moby#46762). |
| `kcmp`, `process_vm_readv`, `process_vm_writev`, `ptrace` | Restrict process inspection (`CAP_SYS_PTRACE` dropped). `ptrace` is blocked in kernels before 4.8. |
| `kexec_file_load`, `kexec_load` | Deny loading a new kernel. `CAP_SYS_BOOT`. |
| `lookup_dcookie`, `perf_event_open` | Tracing/profiling that could leak host information. |
| `mount`, `umount`, `umount2`, `pivot_root` | Privileged operations (`CAP_SYS_ADMIN`). |
| `nfsservctl` | Obsolete since Linux 3.1. |
| `open_by_handle_at` | Cause of an old container breakout. `CAP_DAC_READ_SEARCH`. |
| `personality` | Prevent enabling BSD emulation; poorly tested. |
| `quotactl` | Could let containers disable their own resource limits. |
| `reboot` | Don't let containers reboot the host. `CAP_SYS_BOOT`. |
| `socket` | Blocked for `AF_ALG` (in-container privilege escalation via the kernel cryptographic API, CVE-2026-31431) and `AF_VSOCK`. Seccomp argument filtering doesn't cover `socketcall(2)`; the default AppArmor profile and SELinux policy deny both families through `socket(2)` and `socketcall(2)`. |
| `swapon`, `swapoff` | Deny start/stop swapping. `CAP_SYS_ADMIN`. |
| `sysfs`, `_sysctl`, `uselib`, `ustat` | Obsolete. |
| `userfaultfd` | Userspace page fault handling, largely needed for process migration. |
| `vm86`, `vm86old` | In-kernel x86 real mode virtual machine. |

## Notes

- The default profile is an allowlist: `defaultAction` is `SCMP_ACT_ERRNO` (Permission Denied), with specific syscalls overridden to `SCMP_ACT_ALLOW`, plus argument-specific rules (e.g. `personality`). It disables around 44 of 300+ system calls. Changing the default profile is not recommended.
- A container uses the default profile unless overridden with `--security-opt`.
- The Docker CLI resolves a relative profile path from the working directory where `docker` is invoked, reads the profile and sends its contents to the daemon, so the file must exist on the client host.
- The SELinux rule that blocks `AF_VSOCK` requires SELinux userspace 3.6+, the `container-selinux` policy, and SELinux enabled for the daemon. RHEL 8 ships an older userspace; on affected hosts use AppArmor or a custom seccomp profile denying `socketcall` (which can break networking for 32-bit programs).

## Related

- [AppArmor security profiles](./apparmor.md)
- [Docker Engine security](./security-overview.md)
- [Running containers](./running-containers.md)
