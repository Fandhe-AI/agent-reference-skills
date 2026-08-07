# Git

Clone a repository, inspect changes, commit work, push a branch, or open a pull request from inside a box via `box.git`.

## Signature / Usage

```typescript
import { Box } from "@upstash/box"

const box = await Box.create({
  runtime: "node",
  git: { token: process.env.GITHUB_TOKEN },
})

await box.git.clone({ repo: "https://github.com/acme/web-app", branch: "main" })
await box.cd("web-app")
await box.git.exec({ args: ["checkout", "-b", "fix/empty-state"] })

const status = await box.git.status()
const diff = await box.git.diff()

const commit = await box.git.commit({ message: "fix: handle empty state" })
await box.git.push({ branch: "fix/empty-state" })

const pr = await box.git.createPR({
  title: "fix: handle empty state",
  body: "Fixes the dashboard empty state.",
  base: "main",
})
```

```python
box = Box.create(runtime="node", git={"token": os.environ["GITHUB_TOKEN"]})

box.git.clone(repo="https://github.com/acme/web-app", branch="main")
box.cd("web-app")
box.git.exec(args=["checkout", "-b", "fix/empty-state"])

status = box.git.status()
diff = box.git.diff()

commit = box.git.commit(message="fix: handle empty state")
box.git.push(branch="fix/empty-state")

pr = box.git.create_pr(title="fix: handle empty state", body="Fixes the dashboard empty state.", base="main")
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `git.token` | `string` | GitHub token for private repos and push. Fine-grained token needs **Contents: Read/write** and **Pull requests: Read/write** |
| `git.userName` | `string` (default `"Upstash Box"`) | Value for `git config user.name` |
| `git.userEmail` | `string` (default `"box@upstash.com"`) | Value for `git config user.email` |
| `clone({ repo, branch })` | — | Clones a repo into the box's current working directory |
| `status()` | — | Returns Git status (changed/untracked files) |
| `diff()` | — | Returns uncommitted changes as a patch string |
| `commit({ message, authorName?, authorEmail? })` | — | Creates a commit; per-commit author overrides omit the box's configured identity |
| `push({ branch? })` | — | Pushes the current or a specified branch |
| `createPR({ title, body, base })` | — | Opens a pull request; returns `{ url, ... }` |
| `checkout({ branch })` | — | Switches branches |
| `exec({ args })` | `string[]` | Runs a raw git command, returns output |
| `updateConfig({ userName?, userEmail? })` | — | Updates git identity on a running/idle box; returns `{ git_user_name, git_user_email }` |

## Notes

- Omitting `token` is fine for public repositories where push access is not required
- `updateConfig()` applies immediately in Running/Idle boxes (equivalent to `git config --global`); at least one field must be provided, the other retains its current value
- A configured `agent` also has full git access, useful when the exact git steps (branch name, commit message, push flow) aren't known ahead of time — the agent can inspect, decide, and drive the whole flow itself

## Related

- [Quickstart](./quickstart.md)
- [Agent](./agent.md)
- [Filesystem](./filesystem.md)
