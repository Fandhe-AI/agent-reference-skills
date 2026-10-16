---
source: https://ui.shadcn.com/docs/components/base/trace
---

# Trace

The building block for reasoning, tool calls, sources and more. A list of lines, each with an icon, a title, and an optional description and status; a line can expand, link to a page, or open a dialog or sheet.

## Signature / Usage

```bash
npx shadcn@latest add trace
```

Manual install: first `npx shadcn@latest add collapsible`, then copy the component source into `components/ui/trace.tsx` and update the import paths.

```tsx
import { Trace, TraceIcon, TraceLine, TraceTitle } from "@/components/ui/trace"
```

```tsx
<Trace>
  <TraceLine>
    <TraceIcon>
      <SearchIcon />
    </TraceIcon>
    <TraceTitle>Searched for minimumReleaseAge</TraceTitle>
  </TraceLine>
</Trace>
```

Wrap the line in a `TraceCollapsible` to show more detail when it expands:

```tsx
<Trace>
  <TraceCollapsible>
    <TraceCollapsibleTrigger>
      <TraceLine>
        <TraceIcon>
          <TerminalIcon />
        </TraceIcon>
        <TraceTitle>Ran node --version</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>v24.18.0</TraceCollapsibleContent>
  </TraceCollapsible>
</Trace>
```

Composition:

```text
Trace
└── TraceLine
    ├── TraceIcon
    ├── TraceTitle
    ├── TraceDescription
    └── TraceIcon
```

```text
Trace
└── TraceCollapsible
    ├── TraceCollapsibleTrigger
    │   └── TraceLine
    └── TraceCollapsibleContent
```

`TraceLine` is always the line. To make a line do something, wrap it in that thing's trigger (a link, `DialogTrigger`, `SheetTrigger`, or `TraceCollapsibleTrigger`).

## Options / Props

### Trace

A list of rows. It also styles any trigger or link that wraps a `TraceLine`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | - | Additional classes to apply to the list. |

### TraceLine

One line: an icon and a title. It is a span, so it is not a button or a tab stop.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `status` | `"running" \| "error" \| "pending"` | - | The state of the work the line reports. |
| `className` | `string` | - | Additional classes to apply to the line. |

### TraceCollapsible

A row that expands. It accepts the props of `Collapsible`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | - | The controlled open state. Pass it with `onOpenChange`. |
| `defaultOpen` | `boolean` | `false` | Whether the row starts open. |
| `onOpenChange` | `(open: boolean) => void` | - | Called when the open state changes. |
| `className` | `string` | - | Additional classes to apply to the row. |

### TraceCollapsibleContent

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `keepMounted` | `boolean` | `false` | Keep the detail mounted while closed, so nested rows keep their open state. |
| `className` | `string` | - | Additional classes to apply to the content. |

### TraceIcon, TraceTitle, TraceDescription, TraceCollapsibleTrigger

Each accepts only `className` (`string`). `TraceIcon` is a decorative slot hidden from assistive tech (before the title it names the action; after it, it is the indicator). `TraceTitle` is one sentence on one line, truncates and shimmers while running. `TraceDescription` is secondary text such as a count or duration and does not truncate. `TraceCollapsibleTrigger` is the button that opens and closes the row; put a `TraceLine` inside it. It adds a chevron after the line.

### Status

| Status | Use for |
| --- | --- |
| none | Work that is done: "Ran pnpm install". |
| `"error"` | Work that failed. Say so in the title: "Failed to run pnpm lint". |
| `"running"` | Work in progress. Write the title in the present tense: "Running pnpm build". |
| `"pending"` | Work that has not started, such as a plan step: "Run pnpm test". |

## Notes

- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).
- Trace is a UI pattern for rendering agent steps (reasoning, tool calls, sources); it is not an agent runtime (see skills openai-agents / anthropic-agent-sdk). The examples render AI SDK message parts (`reasoning`, tool, `source-url`) via `useChat`.
- Rows start closed. Use `defaultOpen` to start open, or `open` with `onOpenChange` to control a row. To open a row while it streams and let the reader's click win, pass `open ?? running` with `const [open, setOpen] = React.useState<boolean>()`.
- Patterns built from Trace parts live in the AI Elements pages: Chain of Thought, Plan, Queue, Reasoning, Sources, Stack Trace, Subagent, Task, Terminal, Test Results, Tool.
- Put a `CodeBlock` with `size="sm"` (plus `wrap` and `max-h-64` on `CodeBlockContent`) in `TraceCollapsibleContent` for tool and terminal output; the block sets its own text color, while `TraceCollapsibleContent` mutes its text (give other muted-background blocks `text-foreground`).
- Accessibility: Trace adds no roles of its own; a line takes its semantics from the wrapping element. `TraceIcon` is hidden from assistive tech, so write `TraceTitle` as a sentence ("Edited trace.tsx"). When a link opens a new tab add `<span className="sr-only"> (opens in a new tab)</span>`. Put status in the title too, since status is shown with color and motion. The running shimmer stops under reduced motion. Inside a Message Scroller each line is announced once when added.
- Radix and React Aria variants exist at https://ui.shadcn.com/docs/components/radix/trace and https://ui.shadcn.com/docs/components/aria/trace.

## Related

- [code-block.md](./code-block.md)
- [message.md](./message.md)
- [marker.md](./marker.md)
