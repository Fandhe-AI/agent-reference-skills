---
source: https://opencode.ai/docs/build/plugins/gui/#app-components
---

# App components (ctx.ui)

A plugin bundle cannot import `@opencode/ui`, so `ctx.ui` gives it the app's own components.

## Signature / Usage

### App components

A plugin bundle cannot import `@opencode/ui`, so `ctx.ui` gives it the app's own components. They render in the
user's theme, fonts, and language, so your plugin's UI looks and behaves like the app's.

```tsx
import { Show } from "solid-js"
import { createLatest, Panel } from "@opencode/plugin/gui"

const ui = ctx.ui
const summary = createLatest(
  () => ctx.sessions.current()?.directory,
  (directory, signal) => fetchSummary(directory, signal),
)

ctx.add(Panel, {
  id: "summary",
  region: "side",
  list: () => [summaryTab],
  render: () => (
    <div>
      <ui.Tooltip value={ctx.t("copy")}>
        <ui.IconButton icon="copy" label={ctx.t("copy")} onClick={() => void ctx.system.copy(summary.latest ?? "")} />
      </ui.Tooltip>
      <Show when={summary.latest} fallback={<ui.Loader size="large" />}>
        {(text) => <ui.Markdown text={text()} />}
      </Show>
    </div>
  ),
})
```

- `Icon`, `Button`, and `IconButton` take any `IconName`, as every `icon` field of the SDK does. An `IconButton`'s
  `label` is its accessible name; wrap it in `Tooltip` to show it on hover.
- `busy` on a button replaces its icon with the loading indicator and disables it until it is `false` again.
- Use `Loader` for every loading state that is not the AI working, such as a pane, a search, or a connection that
  loads.
- `Menu` opens a list of `items`: actions, `{ type: "separator" }`, and `{ type: "group", label, items }`.
- `Switch` and `TextInput` keep no state: pass the value from `onChange` or `onInput` back to `checked` or `value`.
- `Keybind` shows keys as chips, such as `ctx.keybinds.keybind(command)`.
- `Markdown` renders as the timeline renders a message, and `Code` shows a highlighted, read-only code block. Both fill
  in shortly after they mount.

`Dialog` is the app's dialog frame: a title, content, and buttons. Render it from `ctx.dialogs.open`; elsewhere it
renders nothing useful.

```tsx
const ui = ctx.ui

ctx.dialogs.open((dialog) => (
  <ui.Dialog
    title={ctx.t("rename.title")}
    footer={
      <ui.Button variant="contrast" onClick={dialog.close}>
        {ctx.t("done")}
      </ui.Button>
    }
  >
    <ui.TextInput label={ctx.t("rename.label")} value={name()} onInput={setName} onSubmit={dialog.close} autofocus />
  </ui.Dialog>
))
```

- `size` is `"fit"` by default: 480px wide and as tall as its content. `"normal"`, `"large"`, and `"x-large"` are fixed
  sizes.
- Escape and a click outside close the dialog. `closable: false` hides the header's close button.

#### Menu rows

`MenuItem`, `MenuSub`, `MenuGroup`, and `MenuSeparator` are rows for a menu the host renders, such as the
`session.location.menu` slot. They navigate with the keyboard, show the host's muted icons and shortcut chips, and close
the menu on a pick.

```tsx
import { For } from "solid-js"

const ui = ctx.ui

ctx.add(Slot, {
  at: "session.location.menu",
  render: (input) => (
    <>
      <ui.MenuItem
        label={ctx.t("usage")}
        icon="status"
        keys={["Ctrl", "U"]}
        onSelect={() => openUsage(input.session)}
      />
      <ui.MenuSub label={ctx.t("openIn")} icon="outline-share">
        <For each={apps()}>{(app) => <ui.MenuItem label={app.name} onSelect={() => launch(app, input.session)} />}</For>
      </ui.MenuSub>
    </>
  ),
})
```

- `MenuItem` takes the same fields as an entry of `Menu`'s `items`.
- `MenuSub` opens its children in a submenu beside the row. `onOpenChange` tells you when, so you can load its rows
  only while it is open.
- `MenuGroup` puts rows under a heading, and `MenuSeparator` draws a line between rows.
- `MenuItem`, `MenuSub`, and `MenuGroup` throw outside a menu: the host records the error and renders nothing of that
  contribution.

#### Selects

`Select` picks one of a list of choices, as the app's settings rows pick a language. Its value is a string; the type of
`options` narrows it.

```tsx
const [period, setPeriod] = createSignal<"day" | "month">("day")

<ui.Select
  label={ctx.t("period")}
  options={[
    { value: "day", label: ctx.t("period.day") },
    { value: "month", label: ctx.t("period.month") },
  ]}
  value={period()}
  onChange={setPeriod}
/>
```

- `label` is the select's accessible name; the selected option's `label` is what it shows.
- A `value` that no option has shows `placeholder`. Picking the selected choice again does not call `onChange`.

#### Settings components

`SettingsLayout`, `SettingsSection`, and `SettingsRow` render a [settings page](./settings-page.md) the way the app renders
its own: the page header, sections with headings over bordered lists, and rows with a title, a description, and a
control at the end.

```tsx
<ui.SettingsLayout title={ctx.t("title")} description={ctx.t("description")} actions={<HelpButton />}>
  <ui.SettingsSection title={ctx.t("section.display")} footer={<Show when={error()}>{ctx.t("error")}</Show>}>
    <ui.SettingsRow id="acme-period" title={ctx.t("period")} description={ctx.t("period.description")}>
      <ui.Select label={ctx.t("period")} options={periods()} value={period()} onChange={setPeriod} />
    </ui.SettingsRow>
  </ui.SettingsSection>
</ui.SettingsLayout>
```

- Use `SettingsLayout` for a page of your own, `SettingsSection` for a section on a host page, and `SettingsRow` alone
  for rows in a host section. Rows line up with the host's rows in every case.
- `id` on a row is the `SettingEntry.id` that reveals it. Search that reveals the page's own id highlights the header.
- `actions` sits at the end of the title row. A section's `footer` sits under its list, outside the border.
- They take their look from the Settings screen's styles, so render them from a `SettingsPage`.

#### Reference

```ts
interface Ui {
  Icon(props: UiIconProps): JSX.Element
  Button(props: UiButtonProps): JSX.Element
  IconButton(props: UiIconButtonProps): JSX.Element
  Tooltip(props: UiTooltipProps): JSX.Element
  Menu(props: UiMenuProps): JSX.Element
  MenuItem(props: UiMenuItem): JSX.Element
  MenuSeparator(): JSX.Element
  MenuGroup(props: UiMenuGroupProps): JSX.Element
  MenuSub(props: UiMenuSubProps): JSX.Element
  Loader(props: UiLoaderProps): JSX.Element
  Dialog(props: UiDialogProps): JSX.Element
  Switch(props: UiSwitchProps): JSX.Element
  TextInput(props: UiTextInputProps): JSX.Element
  Select<T extends string>(props: UiSelectProps<T>): JSX.Element
  Keybind(props: UiKeybindProps): JSX.Element
  Markdown(props: UiMarkdownProps): JSX.Element
  Code(props: UiCodeProps): JSX.Element
  SettingsLayout(props: UiSettingsLayoutProps): JSX.Element
  SettingsSection(props: UiSettingsSectionProps): JSX.Element
  SettingsRow(props: UiSettingsRowProps): JSX.Element
}

interface UiIconProps {
  name: IconName
  size?: "small" | "normal" | "large"
  class?: string
}

interface UiButtonProps {
  children: JSX.Element
  onClick?: (event: MouseEvent) => void
  variant?: "neutral" | "contrast" | "ghost" | "ghost-muted" | "danger"
  size?: "small" | "normal" | "large"
  icon?: IconName
  disabled?: boolean
  busy?: boolean
  type?: "button" | "submit"
  autofocus?: boolean
  class?: string
}

interface UiIconButtonProps {
  icon: IconName
  label: string
  onClick?: (event: MouseEvent) => void
  variant?: "neutral" | "ghost" | "ghost-muted"
  size?: "small" | "normal" | "large"
  disabled?: boolean
  pressed?: boolean
  busy?: boolean
  class?: string
}

interface UiTooltipProps {
  value: JSX.Element
  keys?: string[]
  placement?: "top" | "bottom" | "left" | "right"
  children: JSX.Element
}

interface UiMenuProps {
  label: string
  items: UiMenuEntry[]
  trigger?: "icon" | "button"
  icon?: IconName
  placement?: "bottom-start" | "bottom-end" | "top-start" | "top-end"
  disabled?: boolean
}

type UiMenuEntry = UiMenuItem | UiMenuSeparator | UiMenuGroup

interface UiMenuItem {
  type?: "item"
  label: string
  icon?: IconName
  keys?: string[]
  disabled?: boolean
  onSelect(): void
}

interface UiMenuSeparator {
  type: "separator"
}

interface UiMenuGroup {
  type: "group"
  label: string
  items: UiMenuItem[]
}

interface UiMenuGroupProps {
  label: string
  children: JSX.Element
}

interface UiMenuSubProps {
  label: string
  icon?: IconName
  disabled?: boolean
  onOpenChange?: (open: boolean) => void
  children: JSX.Element
}

interface UiLoaderProps {
  size?: "small" | "normal" | "large"
  class?: string
}

interface UiDialogProps {
  title: string
  description?: string
  children?: JSX.Element
  footer?: JSX.Element
  size?: "fit" | "normal" | "large" | "x-large"
  closable?: boolean
}

interface UiSwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  hideLabel?: boolean
  description?: string
  disabled?: boolean
}

interface UiTextInputProps {
  value: string
  onInput: (value: string) => void
  label: string
  placeholder?: string
  onSubmit?: (value: string) => void
  type?: "text" | "password" | "search" | "url"
  size?: "normal" | "large"
  disabled?: boolean
  invalid?: boolean
  autofocus?: boolean
  class?: string
}

interface UiKeybindProps {
  keys: string[]
  class?: string
}

interface UiMarkdownProps {
  text: string
  class?: string
}

interface UiCodeProps {
  content: string
  language?: string
  class?: string
}

interface UiSelectProps<T extends string> {
  options: UiSelectOption<T>[]
  value: T | undefined
  onChange: (value: T) => void
  label: string
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  placement?: "bottom-start" | "bottom-end" | "top-start" | "top-end"
  class?: string
}

interface UiSelectOption<T extends string> {
  value: T
  label: string
}

interface UiSettingsLayoutProps {
  title: string
  description?: string
  actions?: JSX.Element
  children: JSX.Element
}

interface UiSettingsSectionProps {
  title?: string
  children: JSX.Element
  footer?: JSX.Element
}

interface UiSettingsRowProps {
  title: JSX.Element
  description?: JSX.Element
  id?: string
  children?: JSX.Element
}
```

## Notes

- OpenCode GUI plugins are distinct from Claude Code plugins (anthropic-claude-code-extend). These are Solid components provided by the desktop app, not React components.

## Related

- [Dialogs](./dialogs.md)
- [Settings pages](./settings-page.md)
- [Slot](./slot.md)
