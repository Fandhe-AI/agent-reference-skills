---
source: https://opencode.ai/docs/build/plugins/gui/#code-blocks
---

# CodeBlock and CodeBlockAction

`CodeBlock` renders fenced code blocks of chosen languages as your own UI; `CodeBlockAction` adds a button beside Copy.

## Signature / Usage

### Code blocks

`CodeBlock` renders the fenced code blocks of the languages you list as your own UI, in place of the highlighted code.
Use it for content that reads better drawn than as source, such as a ` ```csv ` table or a ` ```latex `
formula:

```tsx
import { For } from "solid-js"
import { CodeBlock } from "@opencode/plugin/gui"

ctx.add(CodeBlock, {
  languages: ["csv"],
  render: (props) => {
    const rows = props.code.split("\n").map((line) => line.split(","))

    if (rows.length < 2) return undefined

    return (
      <table>
        <tbody>
          <For each={rows}>
            {(row) => (
              <tr>
                <For each={row}>{(cell) => <td>{cell}</td>}</For>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    )
  },
})
```

- `languages` are compared with the first word of the fence's info string, lowercased: ` ```CSV title="Q3" `
  matches `csv`. The host resolves no aliases, so list each name you accept.
- `render` receives the block's `code`, its `language` and the `session` that shows it. Return `undefined` or `null` to
  keep the highlighted code, for example when the source does not parse.
- A render that throws records the error under your plugin, and the block shows its code. Your other contributions
  keep working.
- When several plugins list a language, the first contributed renders it. Your renderer also replaces the app's own
  Mermaid diagram when you list `mermaid`.

#### Streaming

The host renders a block only once its closing fence arrives. While the block streams, and in a message that stopped
mid-block, the user sees the highlighted code; then your UI replaces it in place. Your render never sees half a block.

#### Where it applies

| Surface                                                        | Code block content |
| -------------------------------------------------------------- | ------------------ |
| Timeline: assistant text and tool output                       | Yes                |
| Side panels on the session screen, e.g. the Markdown preview   | Yes                |
| `ctx.ui.Markdown` rendered on the session screen               | Yes                |
| `ctx.ui.Code`, and Markdown inside your own `CodeBlock` render | No                 |
| Settings pages, dialogs and other surfaces off the screen      | No                 |

#### Layout and performance

- Blocks of languages no plugin lists cost nothing; only a block of a listed language renders your UI, and only while
  its timeline row is on screen.
- The block grows and shrinks with your UI. Give asynchronous content a minimum height, so the timeline shifts less
  when it arrives.
- The block keeps its Copy button, which copies the source, and your `CodeBlockAction` buttons over its top end corner.

### Code block actions

`CodeBlockAction` adds a button beside the Copy button of the code blocks of the languages you list. `run` receives the
same block a `CodeBlock` render receives:

```ts
import { CodeBlockAction } from "@opencode/plugin/gui"

ctx.add(CodeBlockAction, {
  id: "run",
  languages: ["sh", "bash", "shell", "zsh"],
  icon: "terminal",
  get title() {
    return ctx.t("run")
  },
  run: (input) => runInTerminal(input.code, input.session),
})
```

- The button shows once the block's closing fence arrives, so it never acts on half a command.
- Buttons reveal with Copy on hover or keyboard focus, before it, in ascending `order`.
- Read `title` from a getter so it follows the locale.
- A `run` that throws or rejects is logged under your plugin and changes nothing else.

#### Reference

```ts
interface CodeBlock {
  languages: string[]
  render(props: CodeBlockProps): JSX.Element | undefined
}

interface CodeBlockAction {
  id: string
  languages: string[]
  icon: IconName
  title: string
  order?: number
  run(input: CodeBlockProps): void | Promise<void>
}

interface CodeBlockProps {
  code: string
  language: string
  session?: MountedSession
}
```

## Notes

- `run` in a `CodeBlockAction` example runs shell code the user chose; use a disposable environment and confirm before running untrusted blocks.
- OpenCode GUI plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [App components](./ui-components.md)
- [Link handlers](./link-handler.md)
