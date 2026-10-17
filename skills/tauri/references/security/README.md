# security

| Name | Description | Path |
|------|-------------|------|
| Capability (ACL reference) | A grouping and boundary mechanism to isolate access to the IPC layer. | [acl-capability-schema.md](./acl-capability-schema.md) |
| Permission (ACL reference) | Descriptions of explicit privileges of commands. | [acl-permission-schema.md](./acl-permission-schema.md) |
| Scope (ACL reference) | `Scopes`: an argument for fine grained behavior control of Tauri commands. | [acl-scope-schema.md](./acl-scope-schema.md) |
| Asset Protocol | Configure `app.security.assetProtocol` so the WebView can load local files through the `asset` custom protocol (for example via `convertFileSrc` in the frontend). | [asset-protocol.md](./asset-protocol.md) |
| Capabilities | Tauri capabilities (ACL) granularly enable and constrain the core exposure to the application frontend running in the system WebView. | [capabilities.md](./capabilities.md) |
| Core Permissions | All permissions that can be used with the core of the Tauri framework (plugin permissions are documented with each plugin). | [core-permissions.md](./core-permissions.md) |
| Content Security Policy (CSP) | Tauri restricts the Content Security Policy of your HTML pages to reduce or prevent the impact of common web vulnerabilities such as cross-site scripting (XSS). | [csp.md](./csp.md) |
| Tauri Ecosystem Security | Measures the Tauri organization on GitHub uses to make its repositories more resilient against adversaries targeting source code and releases. | [ecosystem.md](./ecosystem.md) |
| Future Work | Security topics Tauri has started or would like to tackle to make Tauri apps more secure. | [future-work.md](./future-work.md) |
| HTTP Headers | Headers defined in the configuration (`app.security.headers`) are sent along with responses to the webview. | [http-headers.md](./http-headers.md) |
| Application Lifecycle Threats | Classical threats at each stage of the Tauri application lifecycle and what you should do about them. | [lifecycle.md](./lifecycle.md) |
| Security | High-level concepts and security features at the core of Tauri's design: trust boundaries, WebView policy, ecosystem practices and coordinated disclosure. | [overview.md](./overview.md) |
| Permissions | Tauri permissions (ACL) are descriptions of explicit privileges of commands. | [permissions.md](./permissions.md) |
| Runtime Authority | The runtime authority is part of the Tauri Core. It holds all permissions, capabilities and scopes at runtime. | [runtime-authority.md](./runtime-authority.md) |
| Command Scopes | A scope is a granular way to define (dis)allowed behavior of a Tauri command. | [scope.md](./scope.md) |
