# SSH

Planned SSH access to inspect files or debug processes inside a running Sandbox. SSH is planned for launch; the current beta does not provide a supported public connection path.

## Signature / Usage

Adapted (not in the official docs): the page shows only the expected address shape, planned and not yet supported in the beta.

```sh
ssh <workload-id>@ssh.inngest.com
```

## Notes

- Sandboxes are experimental (imported from `inngest/experimental`; TypeScript SDK 4.25.0+).
- Planned session flow: upload your SSH public key to Inngest; create a Sandbox and wait for `RUNNING`; connect with the matching private key and the SSH address Inngest provides (expected shape above); close the session when done (the Sandbox remains until paused or destroyed); reconnect after pause and resume because pause is a cold checkpoint that can interrupt external sessions.
- SSH acts on the same live environment as commands and managed processes; edits persist while the filesystem exists. Pause/resume preserve the Sandbox; a snapshot captures state and a clone creates a new Sandbox.
- Only give SSH access to people and systems allowed to change the Sandbox. The microVM isolates it from other Sandboxes.
- Use the Sandboxes SDK for repeatable application work and SSH for a person to inspect or debug. Interactive SSH commands are outside durable steps unless the product explicitly records them.
- Source: https://www.inngest.com/docs-markdown/sandboxes/features/ssh (retrieved 2026-11-14)

## Related

- [Pause and resume](./pause-and-resume.md)
- [Snapshots and restore](./snapshots-and-restore.md)
- [Cloning](./cloning.md)
- [Sandboxes quick start](./quick-start.md)
