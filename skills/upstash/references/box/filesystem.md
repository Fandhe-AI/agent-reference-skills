# Filesystem

Every box has its own isolated filesystem. Upload, write, read, list, and download files inside the box via `box.files`.

## Signature / Usage

```typescript
await box.files.upload([
  { path: "./data/report.csv", destination: "/work/report.csv" },
])

await box.files.write({ path: "/work/script.js", content: `console.log("hi")` })

const content = await box.files.read("/work/output.json")

const files = await box.files.list("/work")

await box.files.download({ folder: "/work/output" })
```

```python
box.files.upload([
    {"path": "./data/report.csv", "destination": "/work/report.csv"},
])

box.files.write(path="/work/script.js", content='console.log("hi")')

content = box.files.read("/work/output.json")

files = box.files.list("/work")

box.files.download(folder="/work/output")
```

```typescript
// Ranged read: first 512 bytes, then 1 KB from byte 4096
const head = await box.files.read("train.csv", { length: 512 })
const chunk = await box.files.read("train.csv", { offset: 4096, length: 1024 })

// Stat, mkdir, rename, remove
const info = await box.files.stat("report.csv")
const target = await box.files.stat("latest", { follow: true })
await box.files.mkdir("output/reports", { parents: true })
await box.files.rename("draft.md", "final.md")
await box.files.remove("build", { recursive: true })
```

```python
head = box.files.read("train.csv", length=512)
chunk = box.files.read("train.csv", offset=4096, length=1024)
info = box.files.stat("report.csv")
target = box.files.stat("latest", follow=True)
box.files.mkdir("output/reports", parents=True)
box.files.rename("draft.md", "final.md")
box.files.remove("build", recursive=True)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `upload(entries)` | `{ path, destination }[]` | Push local files into the box. Multiple files upload in parallel in a single call |
| `write({ path, content })` | `string`, `string` | Create/overwrite a file directly from a string, without a local file |
| `read(path, { length, offset })` | `string`, `{ length?: number, offset?: number }` | Read a file's contents as a string. `length` reads a bounded byte range starting at `offset` (default `0`); the server rejects a length above 8 MiB |
| `stat(path, { follow })` | `string`, `{ follow?: boolean }` | Metadata for one path without reading it: type (`"file"` / `"directory"` / `"symlink"` / `"other"`), size, last modified time, inode, and an opaque `version` token. A symlink is reported as `"symlink"` unless `follow` is set |
| `mkdir(path, { parents })` | `string`, `{ parents?: boolean }` | Create a directory; `parents` creates missing parents like `mkdir -p` and succeeds if it already exists |
| `rename(from, to)` | `string`, `string` | Move or rename a path |
| `remove(path, { recursive })` | `string`, `{ recursive?: boolean }` | Remove a file; removing a directory requires `recursive` |
| `list(path)` | `string` | List directory entries; each includes path, size, type, and last-modified timestamp |
| `download({ folder })` | `string` (optional) | Download files back to the local machine. No argument downloads the whole workspace |

## Notes

- Filesystem operations are the counterpart to `box.exec` (shell) and `box.git` — together they cover most agent workflows
- Use the `stat` `version` token for optimistic concurrency: read it before a slow operation and compare for equality afterwards; do not parse it
- Common patterns: upload input files then run an agent with a `responseSchema`; write config before a test run; fan out work across multiple boxes and `download()` each result locally

## Related

- [Quickstart](./quickstart.md)
- [Agent](./agent.md)
- [Git](./git.md)
