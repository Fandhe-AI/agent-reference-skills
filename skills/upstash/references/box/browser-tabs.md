# Browser: Tabs & Navigation

Tabs are the unit of work in the box browser. `box.browser` opens and lists them; every page operation (navigation, screenshots, AI actions) runs on a specific `Tab` handle.

## Signature / Usage

```typescript
const tab = await box.browser.tab.create("https://upstash.com", {
  waitUntil: "domcontentloaded",
  timeout: 30_000,
})
console.log(tab.id, tab.url, tab.title)

const page = await tab.goto("https://upstash.com/docs")
console.log(page.title, page.url)

const tabs = await box.browser.listTabs()
const same = box.browser.getTab(tab.id) // no network call
await same.goto("https://news.ycombinator.com")

await tab.close()
```

```python
tab = box.browser.tab.create("https://upstash.com", wait_until="domcontentloaded", timeout=30_000)

page = tab.goto("https://upstash.com/docs")

tabs = box.browser.list_tabs()
same = box.browser.get_tab(tab.id)
same.goto("https://news.ycombinator.com")

tab.close()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `waitUntil` | `"load" \| "domcontentloaded" \| "networkidle"` (default `"load"`) | When `tab.create` navigation counts as done |
| `timeout` | `number` (default `30000`) | Navigation timeout in ms for `tab.create`; pass `0` to disable |

## Notes

- `tab.create` boots Chromium on its first call if not already running
- `goto` has no `waitUntil`/`timeout` options — it waits for load with a fixed 60-second deadline
- Tab handles are addressed by a stable CDP target id, so an id can be stored and re-attached later, even from a different process, via `getTab`
- A handle's `url`/`title` are last-known values from `create`/`listTabs`, not live — use `tab.content()` for current page state
- Multiple tabs can be open independently at once, useful for side-by-side comparisons or sequential AI tasks

## Related

- [Browser Overview](./browser-overview.md)
- [Reading Pages](./browser-reading-pages.md)
- [AI Actions](./browser-ai-actions.md)
