---
source: https://react.dev/blog/2025/12/11/denial-of-service-and-source-code-exposure-in-react-server-components
---

# Denial of Service and Source Code Exposure in React Server Components

Follow-up advisory (December 11, 2025; updated January 26, 2026): two further vulnerability classes in React Server Components, found while attempting to exploit the patches for CVE-2025-55182. They do not allow Remote Code Execution; the earlier RCE patch remains effective.

## Signature / Usage

The source code exposure requires a Server Function that explicitly or implicitly exposes a stringified argument:

```javascript
'use server';

export async function serverFunction(name) {
  const conn = db.createConnection('SECRET KEY');
  const user = await conn.createUser(name); // implicitly stringified, leaked in db

  return {
   id: user.id,
   message: `Hello, ${name}!` // explicitly stringified, leaked in reply
  }}
```

Upgrade as described in the previous advisory (install the fixed versions of the affected packages):

```bash
npm install react@latest react-dom@latest react-server-dom-webpack@latest
```

## Options / Props

| Vulnerability | CVE(s) | Severity / score | Summary |
| --- | --- | --- | --- |
| Denial of Service | CVE-2025-55184, CVE-2025-67779 | High, CVSS 7.5 | A malicious HTTP request to any Server Functions endpoint can cause an infinite loop on deserialization that hangs the server process and consumes CPU |
| Multiple Denial of Service (January 26, 2026) | CVE-2026-23864 | High, CVSS 7.5 | Crafted HTTP requests to Server Function endpoints can lead to server crashes, out-of-memory exceptions or excessive CPU usage, depending on code path, configuration and application code |
| Source Code Exposure | CVE-2025-55183 | Medium, CVSS 5.3 | A malicious request to a vulnerable Server Function may unsafely return the source code of any Server Function |

| Package | Affected versions | Fixed versions |
| --- | --- | --- |
| `react-server-dom-webpack`, `react-server-dom-parcel`, `react-server-dom-turbopack` | 19.0.0, 19.0.1, 19.0.2, 19.0.3, 19.1.0, 19.1.1, 19.1.2, 19.1.3, 19.2.0, 19.2.1, 19.2.2, 19.2.3 | 19.0.4, 19.1.5, 19.2.4 |

Affected frameworks and bundlers: next, react-router, waku, @parcel/rsc, @vite/rsc-plugin (`@vitejs/plugin-rsc`), rwsdk.

## Notes

- The patches published earlier are vulnerable: 19.0.3, 19.1.4 and 19.2.3 are incomplete (the original fix for CVE-2025-55184 was incomplete); if you already updated, update again. Versions 19.0.4, 19.1.5, 19.2.4 are safe.
- Upgrade steps are in the previous advisory (Critical Security Vulnerability in React Server Components, update instructions).
- Only secrets hardcoded in source code may be exposed; runtime secrets such as `process.env.SECRET` are not affected. The exposed scope is the code inside the Server Function, which may include other functions depending on bundler inlining. Always verify against production bundles. The patches prevent stringifying the Server Function source code.
- As before, apps whose React code does not use a server, or that do not use a framework, bundler or bundler plugin supporting React Server Components, are not affected. Hosting provider mitigations should not be relied upon.
- React Native: without a monorepo or `react-dom`, `react` should be pinned and no extra steps are needed; in a monorepo update only `react-server-dom-webpack`, `react-server-dom-parcel`, `react-server-dom-turbopack` if installed.
- Timeline: Dec 3 leak reported (Andrew MacPherson); Dec 4 initial DoS reported (RyotaK); Dec 6 both confirmed; Dec 7 initial fixes; Dec 8 hosting providers and projects notified; Dec 10 mitigations in place and patches verified; Dec 11 additional DoS reported (Shinsaku Nomura), patches published and disclosed as CVE-2025-55183 and CVE-2025-55184, missing DoS case patched and disclosed as CVE-2025-67779; Jan 26 additional DoS cases found, patched and disclosed as CVE-2026-23864.
- Server Functions are marked with the `'use server'` directive; see the server-components pages for the React-level behavior, and nextjs-app, tanstack-start, react-router for framework handling.

## Related

- [Critical Security Vulnerability in React Server Components](./rsc-critical-security-vulnerability.md)
- [Server Functions](../server-components/server-functions.md)
- [use server](../server-components/use-server.md)
