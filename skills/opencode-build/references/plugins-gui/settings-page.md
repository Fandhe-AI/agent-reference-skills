---
source: https://opencode.ai/docs/build/plugins/gui/#settings-pages
---

# Settings pages

`SettingsPage` contributes a page to **Settings**, a section on a host page, or rows in the host's General section.

## Signature / Usage

`SettingsPage` contributes a page to **Settings**, a section on a host page (`page: "general"` or `page: "servers"`), or
rows in the host's General section (`page: "general", section: "general"`).

```tsx
import { SettingsPage } from "@opencode/plugin/gui"
import { AcmeSettings } from "./settings"

ctx.add(SettingsPage, {
  id: "acme",
  icon: "server",
  get title() {
    return ctx.t("title")
  },
  get entries() {
    return [{ id: "sync", title: ctx.t("settings.sync"), keywords: "sync remote" }]
  },
  render: (input) => <AcmeSettings highlight={input.target} />,
})
```

- `id` is the page's settings tab value (`/settings?tab=<id>`) and the argument to `ctx.layout.settings`.
- `page` adds a section to a host page instead of a page. With `section: "general"`, it adds rows to that page's General
  section.
- `title` and `icon` are a page's navigation label and icon.
- `entries` is search metadata, indexed without mounting the page. When search reveals an entry, `render` receives its
  id as `target`.
- A settings page has a `render`, so the host keeps it stable. Read its labels and entries from getters.

Render the page with the app's settings components, so it looks like the app's own pages and search can reveal its
rows:

```tsx
const ui = ctx.ui

const AcmeSettings = () => (
  <ui.SettingsLayout title={ctx.t("title")} description={ctx.t("description")}>
    <ui.SettingsSection title={ctx.t("settings.section")}>
      <ui.SettingsRow id="sync" title={ctx.t("settings.sync")} description={ctx.t("settings.sync.description")}>
        <ui.Switch label={ctx.t("settings.sync")} hideLabel checked={sync()} onChange={setSync} />
      </ui.SettingsRow>
    </ui.SettingsSection>
  </ui.SettingsLayout>
)
```

- A page of your own renders `SettingsLayout`, a section on a host page (`page`) renders `SettingsSection`, and rows
  in a host section (`section`) render `SettingsRow`s.
- A row's `id` is the `SettingEntry.id` that reveals it: search scrolls to the row and highlights it.
- See [Settings components](./ui-components.md) for their props.

#### Reference

```ts
interface SettingsPage {
  id: string
  page?: "general" | "servers"
  section?: "general"
  title: string
  icon?: IconName
  entries?: SettingEntry[]
  render(input: { target?: string }): JSX.Element
}

interface SettingEntry {
  id: string
  title: string
  description?: string
  keywords?: string
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| id | string | — | Settings tab value (`/settings?tab=<id>`) and argument to `ctx.layout.settings`. |
| page | "general" \| "servers" | — | Adds a section to a host page instead of a page. |
| section | "general" | — | With `page: "general"`, adds rows to the General section. |
| title | string | — | Navigation label. |
| icon | IconName | — | Navigation icon. |
| entries | SettingEntry[] | — | Search metadata, indexed without mounting the page. |

## Notes

- OpenCode GUI plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [App components](./ui-components.md)
- [Layout](./layout.md)
