# Sandboxes features

Index of Sandbox features. Use a Sandbox when generated code needs its own Linux environment; Inngest records Sandbox operations with your durable function steps. Pause and resume continue the same Sandbox; snapshot and clone start a new one from saved state.

## Signature / Usage

Adapted (not in the official docs): feature-to-API pointers assembled only from names that appear on the Sandbox feature pages.

```typescript
import { image } from "inngest/experimental";

const sandbox = await step.sandbox.create("create-sandbox", {
  name: "demo",
  vcpu: 1,
  memoryMb: 1024,
  from: image.inngest("base"),
});
const paused = await sandbox.pause("pause-sandbox", { timeout: "5m" });
const running = await paused.resume("resume-sandbox", { timeout: "5m" });
const snapshot = await running.snapshot("snapshot", {}, { timeout: "5m" });
const clone = await snapshot.clone("clone", { name: "demo-clone" });
```

## Options / Props

### Feature list

| Feature | Description |
|---------|-------------|
| Base images | Choose the environment a sandbox starts in, including your own published image |
| Custom images | Build with Docker, upload the saved image, launch a Sandbox with your code |
| Pause and resume | Pause sandbox work and continue it later |
| Snapshots and restore | Capture a Sandbox state and clone a new one from it |
| Cloning | Create another sandbox from an existing state |
| Durable filesystems | Keep files through pause, snapshot, restore, clone; S3-backed persistent mounts share filesystems |
| SSH | Interactive access; planned for the initial launch |
| Secrets | Select existing workspace secrets when creating a fresh sandbox; supported in the beta |
| Managed lifecycle | Let the durable run coordinate sandbox start, stop, and retries |
| Commands | Run commands with `$` as durable steps, read output and failures |
| Tools | Let code in a Sandbox call functions in your app as durable steps |
| Isolation and security | The microVM isolation boundary |
| Traces | See sandbox activity alongside the rest of a durable run |

## Notes

- Sandboxes are experimental (imported from `inngest/experimental`; TypeScript SDK 4.25.0+).
- Pages for Secrets, Managed lifecycle, Commands, Tools, Isolation and security, and Traces are listed in the official index but are not part of this reference set.
- For deployment previews, see Inngest branch deploys (a different concept).
- Source: https://www.inngest.com/docs-markdown/sandboxes/features (retrieved 2026-11-14)

## Related

- [Sandboxes overview](./overview.md)
- [Base images](./base-images.md)
- [Custom images](./custom-images.md)
- [Pause and resume](./pause-and-resume.md)
- [Snapshots and restore](./snapshots-and-restore.md)
- [Cloning](./cloning.md)
- [Durable filesystems](./durable-filesystems.md)
- [SSH](./ssh.md)
