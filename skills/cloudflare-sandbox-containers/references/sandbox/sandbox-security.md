---
source: https://developers.cloudflare.com/sandbox/concepts/security/
---

# Sandbox security

Isolation protects your Worker and other sandboxes from the sandbox; it does not limit what code does inside its own sandbox. Treat everything placed in a sandbox as readable by the code there.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/sandbox/get-started/ (a deny-by-default container start):

```ts
// Runs inside the disposable sandbox container, never on the host.
container.start({
	image: "cloudflare/debian-trixie",
	entrypoint: ["sleep", "infinity"],
	// Block commands in the sandbox from reaching the Internet
	enableInternet: false,
});
```

## Notes

- Everything in one sandbox is shared: all processes read the same files, see each other, and reach the same `localhost` ports. In a deployed sandbox every process has the capabilities of `root`, so a separate Linux user does not protect files. The sandbox is the smallest unit of trust: use one sandbox per user or per job.
- Code can read what you put in its sandbox: tokens in clone URLs (saved in `.git/config`), environment variables, command arguments, and written files can all be read and sent anywhere the sandbox can reach.
- Keep credentials outside: a Container sends its request without the credential and an outbound handler in your Worker adds it, to HTTPS requests only (a credential added to plain HTTP crosses the Internet unencrypted). A Dynamic Worker can receive a method that uses the credential and returns only the result.
- The sandbox name decides which sandbox, and which saved files, a request reaches; it does not prove who sent the request. Authenticate the caller in your Worker and derive the name from that identity. Reusing a name or snapshot for someone else exposes the earlier user's files. How-to pages read the name from the URL only to keep examples short.
- Every opening is a way out: a Container starts with `enableInternet: false` by default; only requests an outbound handler intercepts leave it. A Dynamic Worker has your Worker's network access unless loaded with `globalOutbound: null`. Turning on Internet access for `npm install` also lets a dependency send a token to any server; an outbound handler can allow the registry and block the rest. Keep Internet access off when using an outbound handler, otherwise connections outside the intercept go out directly.
- Output carries the same risk: results, files, and HTTP responses are untrusted input. Web previews run in the visitor's browser under the serving hostname; on your application hostname the page could use your cookies and APIs. Serve previews on a separate domain.
- Containers outbound handling (`interceptOutboundHttps()` etc.) is in the `containers` category of this skill.

## Related

- [Sandbox lifetime](./sandbox-lifetime.md)
- [Call an authenticated API from a sandbox](./call-an-authenticated-api.md)
- [Serve previews on their own hostnames](./serve-previews-on-their-own-hostnames.md)
- [Choose a sandbox environment](./choose-a-sandbox-environment.md)
