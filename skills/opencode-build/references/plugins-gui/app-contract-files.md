---
source: https://opencode.ai/docs/build/plugins/gui/#files
---

# App contracts: Files

`@opencode/plugin/gui/file` exports the app's file tree and **Open in** button, and the `FileViewer` registry.

## Signature / Usage

The app provides these contracts to every plugin. Follow one with `ctx.use(token)`, and handle it while it is not
`active`, as for any other plugin's contract. For example, `Browser` is `inactive` on the web.

`@opencode/plugin/gui/file` exports the app's file tree and **Open in** button, and the `FileViewer` registry.

```tsx
import { bindPlugin } from "@opencode/plugin/gui"
import { FileViewer, type FileViewerProps } from "@opencode/plugin/gui/file"

// A viewer for a kind of file the file view does not render itself.
ctx.add(FileViewer, {
  kinds: ["document"],
  View: bindPlugin((props: FileViewerProps) => <AcmeDoc bytes={props.bytes} onError={props.onError} />),
})
```

- **`FileTree`** is a contract. `Tree` and `List` render a virtualized tree or list of workspace files with change
  markers. Read it with `ctx.use(FileTree)`. A tree's `labels` adds text after a folder's name, such as how many
  entries it has.
- **`OpenInApp`** is a contract. `Button` is the desktop **Open in** button for a session's workspace.
- **`FileViewer`** is a registry. A viewer lists the `kinds` it renders, can reject bytes with `problem`, and renders a
  `View` that reports `onDetails` and `onError`.

#### Reference

```ts
interface FileTree {
  Tree(props: FileTreeProps): JSX.Element
  List(props: FileListProps): JSX.Element
}

interface FileTreeProps {
  screen: SessionScreen
  session: MountedSession
  allowed: string[]
  kinds?: Map<string, ChangeKind>
  labels?: Map<string, string>
  active?: string
  onFileClick(path: string): void
}

interface FileListProps {
  screen: SessionScreen
  session: MountedSession
  files: string[]
  kinds?: Map<string, ChangeKind>
  active?: string
  highlighted?: string
  onFileClick(path: string): void
}

interface OpenInApp {
  Button(props: { screen: SessionScreen; session: MountedSession }): JSX.Element
}

interface FileViewer {
  kinds: ArtifactKind[]
  problem?(bytes: Uint8Array): string | undefined
  View: Component<FileViewerProps>
}

interface FileViewerProps {
  bytes: Uint8Array
  onDetails(details: string[]): void
  onError(reason?: string): void
}
```

## Notes

- OpenCode GUI plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [Review changes](./review-changes.md)
- [Browser](./browser.md)
- [Contracts and tokens](./contracts-and-tokens.md)
