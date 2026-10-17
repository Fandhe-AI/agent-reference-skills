---
source: https://v2.tauri.app/security/future/
---

# Future Work

Security topics Tauri has started or would like to tackle to make Tauri apps more secure.

## Signature / Usage

The page contains no code examples; it names these tools and topics:

```text
Binary analysis : cargo-auditable (SBOM for Rust binaries), npm audit (extracted frontend assets)
Pentest proxies : Burpsuite, Zap, Caido (no inbuilt webview traffic interception yet)
WebView hardening: sandboxing / isolation of webview processes (under research)
Fuzzing         : mock runtimes, libAFL-based Tauri fuzzing frameworks
```

## Notes

- **Binary analysis**: `cargo-auditable` creates SBOMs and provides exact crate versions and dependencies of a binary without breaking reproducible builds. For the frontend stack no equivalent is known, so extracting frontend assets from the binary should be straightforward and then tools like `npm audit` can be used. Tauri plans tooling (or easier asset extraction with certain features). Pentesting tools need webview traffic intercepted through a proxy; Tauri has no inbuilt method yet, work is ongoing.
- **WebView hardening**: the WebView is the biggest memory-unsafe part of the stack; Tauri plans to research further sandboxing and isolation of webview processes, and to enforce the IPC bridge for system access.
- **Fuzzing**: Tauri aims to extend its mock runtimes and tooling to make fuzzing Tauri apps easier, and to support libraries like libAFL to build fuzzing frameworks.

## Related

- [Application Lifecycle Threats](./lifecycle.md)
- [Security](./overview.md)
