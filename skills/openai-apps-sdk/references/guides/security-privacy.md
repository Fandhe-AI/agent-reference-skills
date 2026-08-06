# Security & Privacy

Security and privacy principles for plugin tools that access user data, third-party APIs, and write actions.

## Notes

- Principles: treat every MCP server and UI component as production software.
  - **Least privilege**: only request the scopes, storage access, and network permissions needed.
  - **Explicit user consent**: make sure users understand when they are linking accounts or granting write access; use the host's confirmation prompts for destructive actions.
  - **Defense in depth**: assume prompt injection and malicious inputs will reach the server. Check every input and keep audit logs.
- Data handling:
  - **Structured content**: include only the data required for the current prompt; avoid embedding secrets or tokens in component props.
  - **Storage**: decide how long user data is kept, publish a retention policy, and respect deletion requests.
  - **Logging**: redact PII before writing to logs; store correlation IDs for debugging but avoid storing raw prompt text unless necessary.
- Prompt injection and write actions: Developer mode enables full MCP access, including write tools. Mitigate risk by reviewing tool descriptions regularly to discourage misuse (e.g. "Do not use to delete records"), validating all inputs server-side even if the model provided them, and requiring human confirmation for irreversible operations. Share testing prompts for injections with QA to probe weak spots early.
- Network access: widgets run inside an isolated iframe with a strict Content Security Policy. They cannot access privileged browser APIs such as `window.alert`, `window.prompt`, `window.confirm`, or `navigator.clipboard`. The CSP controls standard `fetch` requests. Nested frames are unavailable by default; enable specific origins via resource CSP metadata such as `_meta.ui.csp.frameDomains`. Work with your OpenAI partner to add a specific domain to the allowlist.
- Server-side code has no network restrictions beyond what the hosting environment enforces; follow normal best practices for outbound calls (TLS verification, retries, timeouts).
- Authentication & authorization:
  - Use OAuth 2.1 authorization-code flows when integrating external accounts. Prefer Client ID Metadata Documents (CIMD) when the authorization server supports it and the plugin builder chooses it. Use `none` for public-client token exchange or `private_key_jwt` when the authorization server requires client authentication. Support DCR when the plugin builder chooses it or CIMD is not available.
  - Verify and enforce scopes on every tool call. Return a `401` response for expired or malformed tokens.
  - For built-in identity, avoid storing long-lived secrets; use the provided auth context instead.
- Operational readiness: run security reviews before launch (especially for regulated data), monitor for anomalous traffic patterns and set up alerts for repeated errors or failed auth attempts, and keep third-party dependencies, libraries, and build tooling patched to mitigate supply chain risks.

## Related

- [Optimize Metadata](./optimize-metadata.md)
