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

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `upload(entries)` | `{ path, destination }[]` | Push local files into the box. Multiple files upload in parallel in a single call |
| `write({ path, content })` | `string`, `string` | Create/overwrite a file directly from a string, without a local file |
| `read(path)` | `string` | Read a file's contents as a string |
| `list(path)` | `string` | List directory entries; each includes path, size, type, and last-modified timestamp |
| `download({ folder })` | `string` (optional) | Download files back to the local machine. No argument downloads the whole workspace |

## Notes

- Filesystem operations are the counterpart to `box.exec` (shell) and `box.git` — together they cover most agent workflows
- Common patterns: upload input files then run an agent with a `responseSchema`; write config before a test run; fan out work across multiple boxes and `download()` each result locally

## Related

- [Quickstart](./quickstart.md)
- [Agent](./agent.md)
- [Git](./git.md)
