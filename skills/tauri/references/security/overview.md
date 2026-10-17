---
source: https://v2.tauri.app/security/
---

# Security

High-level concepts and security features at the core of Tauri's design: trust boundaries, WebView policy, ecosystem practices and coordinated disclosure.

## Signature / Usage

Access to core application commands from the WebView is configured and restricted by capabilities defined in the application configuration (`tauri.conf.json`):

```json
{
  "app": {
    "security": {
      "capabilities": ["my-capability", "main-capability"]
    }
  }
}
```

### Trust Boundaries

- Tauri's security model differentiates between Rust code written for the application's core and frontend code written in any framework or language understood by the system WebView.
- The IPC layer is the bridge for communication between these two trust groups and ensures that boundaries are not broken.
- Any code executed by the plugins or the application core has full access to all available system resources and is not constrained.
- Any code executed in the WebView has only access to exposed system resources via the well-defined IPC layer. Access to core application commands is configured and restricted by capabilities; individual command implementations enforce the optional fine-grained access levels (scopes) also defined in the capabilities configuration.
- Components: Permissions, Scopes, Capabilities, Runtime Authority. Generic attack-surface controls: Content Security Policy (CSP), Isolation Pattern.

### (Not) Bundling WebViews

- Tauri relies on the operating system WebView and does not bundle it into the application binary.
- Main security reason: the average time from publication of a security-patched WebView version to rollout to the end user is shorter when the OS / WebView package maintainers ship it than when application developers bundle the WebView.
- Bundling is not considered inherently insecure; the current design is a trade-off that significantly reduces known vulnerabilities in the wild.

### Coordinated Disclosure

- Do not publicly comment on findings; contact the security team directly.
- Preferred method: GitHub Vulnerability Disclosure on the affected repository (if in doubt, the Tauri repository: `https://github.com/tauri-apps/tauri/security/advisories/new`).
- Alternative: `security@tauri.app`.
- No budget for security bounties; coordinated disclosure may be rewarded in some cases.

## Notes

- The security of a Tauri application is the sum of Tauri itself, all Rust and npm dependencies, your code, and the devices that run the final application.
- Tauri cannot provide a hardening guide for every frontend stack; it provides generic features (CSP, Isolation Pattern) to control and contain the attack surface.

## Related

- [Capabilities](./capabilities.md)
- [Permissions](./permissions.md)
- [Command Scopes](./scope.md)
- [Runtime Authority](./runtime-authority.md)
- [Content Security Policy (CSP)](./csp.md)
- [Tauri Ecosystem Security](./ecosystem.md)
- [Application Lifecycle Threats](./lifecycle.md)
- [Future Work](./future-work.md)
