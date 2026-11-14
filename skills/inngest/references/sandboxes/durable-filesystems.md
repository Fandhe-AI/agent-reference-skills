# Durable filesystems

A Sandbox keeps its local files through pause and resume, and a snapshot copies them into clones. Use an S3-backed persistent filesystem mount when different Sandboxes need the same backing files.

## Signature / Usage

Adapted (not in the official docs): the source page has no code; this snippet only chains the lifecycle operations it describes (files survive pause/resume; a snapshot captures them for a clone), using the API shapes from the Pause and resume and Snapshots pages.

```typescript
const paused = await sandbox.pause("pause-sandbox", { timeout: "5m" });
const running = await paused.resume("resume-sandbox", { timeout: "5m" });

const snapshot = await running.snapshot("snapshot", {}, { timeout: "5m" });
const clone = await snapshot.clone("clone", { name: "clone-with-files" });
```

## Options / Props

| Need | Use | What it gives you |
|------|-----|-------------------|
| Keep a sandbox's own files as its work continues | The sandbox filesystem | Pause and resume keep the same files. A snapshot captures disk state, and a clone starts with that captured state. |
| Let different sandboxes use the same files | An S3-backed persistent filesystem mount | A filesystem that spans sandbox boundaries. |

## Notes

- Sandboxes are experimental (imported from `inngest/experimental`; TypeScript SDK 4.25.0+).
- Use the sandbox filesystem for work belonging to one sandbox (generated code, installed dependencies, a working directory). Use an S3-backed persistent mount for shared inputs or artifacts across sandboxes; for example one sandbox prepares a dataset and others use it in separate tasks.
- Pause and resume: files remain available when the sandbox resumes. Snapshot and clone: a user snapshot captures the filesystem and the original sandbox keeps running. Later writes to the original do not change the snapshot.
- Source: https://www.inngest.com/docs-markdown/sandboxes/features/durable-filesystems (retrieved 2026-11-14)

## Related

- [Pause and resume](./pause-and-resume.md)
- [Snapshots and restore](./snapshots-and-restore.md)
- [Cloning](./cloning.md)
