---
source: https://developers.cloudflare.com/workers/reference/security-model/
---

# Security model

Workers security architecture: V8 isolate sandboxing, process and cordon isolation, capability-style API design, V8 patch gap, and Spectre mitigations.

## Signature / Usage

Timers are frozen: `Date.now()` returns the time of the last I/O, so Spectre timing loops cannot measure themselves.

```js
let start = Date.now();
for (let i = 0; i < 1e6; i++) {
  doSpectreAttack();
}
let end = Date.now();
```

`start` and `end` are always exactly equal.

## Notes

- Applies to hosted Workers; local `workerd` does not include every defense-in-depth protection (see https://developers.cloudflare.com/workers/local-development/#security-considerations).
- Isolation layers: V8 isolates (memory isolation); cordons separate low-trust Workers (e.g. Free plan) from higher-trust ones; some Workers (e.g. under the devtools inspector) run in their own process; a second sandbox layer uses Linux namespaces and `seccomp` with an empty filesystem and no network, communicating over local UNIX domain sockets with a supervisor (which serves only the Worker code and config the sandbox has keys for).
- API design: the official sentence says no filesystem API is exposed ("No API means no access"), which is outdated. Workers have no access to the host filesystem, but since 2025-09-11 `node:fs` and Web File System APIs expose an in-memory virtual filesystem (see nodejs-compat/fs.md and changelog.md); outbound HTTP goes through a proxy that verifies the destination is public or the zone's own origin and tags requests with the Worker identity; inbound TLS terminates outside the runtime.
- V8 bugs: Cloudflare automatically builds and ships V8 patches, with a patch gap under 24 hours.
- Spectre: no native code allowed (only JavaScript and WebAssembly); no timers and no multi-threading or shared memory; dynamic process isolation for Workers with suspicious performance counters or high CPU use; periodic whole-memory shuffling and rescheduling. Process isolation for every Worker is not used because it can cost about 10x the CPU.
- Docs inconsistency: the page says Workers can talk to the world "only via HTTP", while the Protocols table (see how-workers-works.md) lists outbound TCP via `connect()`.
- Source artifacts omitted: the architecture diagram text residue ("[Not supported by viewer]").

## Related

- [how-workers-works.md](./how-workers-works.md)
- [limits.md](./limits.md)
