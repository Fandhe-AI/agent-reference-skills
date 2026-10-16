---
source: https://docs.astral.sh/uv/reference/policies/platforms/
---

# Platform support

Support tiers for platforms, plus Linux, Windows, and macOS version requirements.

## Signature / Usage

Official glibc-based Linux targets and their wheel tags:

```text
x86_64-unknown-linux-gnu         (manylinux_2_17_x86_64)
aarch64-unknown-linux-gnu        (manylinux_2_28_aarch64)
armv7-unknown-linux-gnueabihf    (manylinux_2_17_armv7l)
i686-unknown-linux-gnu           (manylinux_2_17_i686)
powerpc64le-unknown-linux-gnu    (manylinux_2_17_ppc64le)
riscv64gc-unknown-linux-gnu      (manylinux_2_31_riscv64)
s390x-unknown-linux-gnu          (manylinux_2_17_s390x)
```

## Support tiers

| Tier | Meaning | Platforms |
| --- | --- | --- |
| Tier 1 | "guaranteed to work"; continuously built, tested, and developed against | macOS (Apple Silicon), macOS (x86_64), Linux (x86_64), Windows (x86_64) |
| Tier 2 | "guaranteed to build" | Linux (PPC64LE), Linux (RISC-V64), Linux (aarch64), Linux (armv7), Linux (i686), Linux (s390x), Windows (arm64) |
| Tier 3 | "best effort" | FreeBSD (x86_64), Windows (i686) |

## Linux versions

Compatibility is determined by libc version. In a manylinux wheel tag, the version encodes the minimum glibc version (e.g., `manylinux_2_17_x86_64` requires glibc 2.17+).

musl-based wheels and fully statically linked binaries:

```text
x86_64-unknown-linux-musl        (musllinux_1_1_x86_64)
aarch64-unknown-linux-musl       (musllinux_1_1_aarch64)
armv7-unknown-linux-musleabihf   (musllinux_1_1_armv7l)
i686-unknown-linux-musl          (musllinux_1_1_i686)
riscv64gc-unknown-linux-musl     (musllinux_1_1_riscv64)
arm-unknown-linux-musleabihf     (linux_armv6l)
```

## Notes

- uv provides official binaries on GitHub and pre-built wheels on PyPI for Tier 1 and Tier 2 platforms.
- Tier 2 platforms are continuously built, but the uv test suite is not run on them and stability may vary. Tier 3 platforms may not be built or tested, but patches to fix bugs are accepted.
- musl wheels use musllinux-compatible tags, but the embedded `uv` binaries are fully statically linked and do not require musl libc on the host. The official Docker images include these statically linked musl binaries for amd64 and arm64.
- Windows: the minimum supported versions are Windows 10 and Windows Server 2016.
- macOS: uv supports macOS 13+ (Ventura). It is known to work on macOS 12 but requires installation of a `realpath` executable.

## Related

- [Installing uv](./installation.md)
