---
source: https://v2.tauri.app/security/lifecycle/
---

# Application Lifecycle Threats

Classical threats at each stage of the Tauri application lifecycle and what you should do about them.

## Signature / Usage

The page links these audit tools (npm and cargo dependency audits):

```sh
npm audit
cargo audit
```

## Notes

- `cargo audit` is provided by the separate `cargo-audit` crate (https://crates.io/crates/cargo-audit); install it first (`cargo install cargo-audit --locked`) — the original page links to that crate.
- The weakest link in your lifecycle defines your security; each step can compromise the assumptions of all subsequent steps.
- **Upstream threats**: keep Tauri, `rustc` and `nodejs` up to date so patched vulnerabilities cannot be exploited. Evaluate dependencies; use `npm audit` and `cargo audit`; `cargo-vet`, `cargo crev` and `cargo supply chain` help reduce supply chain risk. Consume critical dependencies from git using hash revisions at best, named tags second best (Rust and Node).
- **Development threats**: the built-in Tauri development server (like most framework dev servers) exposes the frontend over an open port, typically neither encrypted nor authenticated, so attackers on the same network could push their own frontend code. Develop on trusted networks, or MUST use mutual authentication and encryption (e.g. mTLS); the built-in dev server does not support this at the moment. Harden dev machines: no administrative accounts for daily work, no production secrets, keep secrets out of version control, hardware tokens, keep system up to date, minimize installed apps. Require signed commits and correct access control on source control.
- **Buildtime threats**: CI/CD systems have access to source, secrets and can modify builds; trust a reputable provider or self-host. Pin versions of third-party actions. Sign binaries for the shipping platform; hardware-token-stored keys cannot be leaked by a compromised build system but can still sign malicious releases.
- **Reproducible builds**: Rust does not reliably produce reproducible builds and many frontend bundlers do not either, so you cannot fully rely on them by default.
- **Distribution threats**: all bets are off if you lose control of the manifest server, build server or binary hosting service. CrabNebula Cloud is mentioned as a trusted distribution partner.
- **Runtime threats**: the webview is assumed insecure. CSP locks down WebView communication types; capabilities prevent untrusted content or scripts from accessing the API in the WebView. Set up an easy and secure vulnerability reporting process.

## Related

- [Content Security Policy (CSP)](./csp.md)
- [Capabilities](./capabilities.md)
- [Tauri Ecosystem Security](./ecosystem.md)
- [Security](./overview.md)
