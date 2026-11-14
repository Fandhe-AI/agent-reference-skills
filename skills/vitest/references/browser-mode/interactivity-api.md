# Interactivity API

`userEvent` from `vitest/browser` implements a subset of `@testing-library/user-event` using Chrome DevTools Protocol or WebDriver instead of faking events. Most methods inherit provider options.

## Signature / Usage

```ts
import { userEvent } from 'vitest/browser'

function setup(): UserEvent
function click(element: Element | Locator, options?: UserEventClickOptions): Promise<void>
function dblClick(element: Element | Locator, options?: UserEventDoubleClickOptions): Promise<void>
function tripleClick(element: Element | Locator, options?: UserEventTripleClickOptions): Promise<void>
function wheel(element: Element | Locator, options: UserEventWheelOptions): Promise<void> // 4.1.0+
function fill(element: Element | Locator, text: string): Promise<void>
function keyboard(text: string): Promise<void>
function tab(options?: UserEventTabOptions): Promise<void>
function type(element: Element | Locator, text: string, options?: UserEventTypeOptions): Promise<void>
function clear(element: Element | Locator, options?: UserEventClearOptions): Promise<void>
function selectOptions(
  element: Element | Locator,
  values: HTMLElement | HTMLElement[] | Locator | Locator[] | string | string[],
  options?: UserEventSelectOptions,
): Promise<void>
function hover(element: Element | Locator, options?: UserEventHoverOptions): Promise<void>
function unhover(element: Element | Locator, options?: UserEventHoverOptions): Promise<void>
function upload(element: Element | Locator, files: string[] | string | File[] | File, options?: UserEventUploadOptions): Promise<void>
function dragAndDrop(source: Element | Locator, target: Element | Locator, options?: UserEventDragAndDropOptions): Promise<void>
function copy(): Promise<void>
function cut(): Promise<void>
function paste(): Promise<void>
function pointer(options: UserEventPointerInput): Promise<void> // 5.1.0+, experimental
```

```ts
import { page, userEvent } from 'vitest/browser'

test('clicks on an element', async () => {
  const logo = page.getByRole('img', { name: /logo/ })

  await userEvent.click(logo)
  // or you can access it directly on the locator
  await logo.click()
})
```

```ts
// scroll using wheel events
await userEvent.wheel(tablist, { delta: { x: 50, y: 100 }, times: 2 })
await userEvent.wheel(tablist, { direction: 'right', times: 5 })
```

```ts
import { page, userEvent } from 'vitest/browser'

test('drags an element with pointer actions', async () => {
  const source = page.getByTestId('source')
  const target = page.getByTestId('target')

  await userEvent.pointer([
    { target: source, keys: '[MouseLeft>]' },
    { target, coords: { x: 10, y: 10 }, keys: '[/MouseLeft]' },
  ])
})
```

```ts
// reset hover state between tests
beforeEach(async () => {
  await userEvent.unhover(document.body)
})
```

## Notes

- The default `userEvent` instance from `vitest/browser` is created once (unlike `@testing-library/user-event`), so `keyboard('{Shift}')` / `keyboard('{/Shift}')` keep state across calls.
- With `playwright` / `webdriverio`, pressed keys and pointer position / hover state persist between tests in a file. Vitest resets unreleased keyboard state before each test but not pointer position or hover; this also applies to locator shortcuts (`locator.click()`).
- `click` with a modifier: `userEvent.click(element, { modifiers: ['Shift'] })` (Playwright), or `keyboard('{Shift>}')` + `click(element, {})` + `keyboard('{/Shift}')` (both providers; `{}` forces the WebdriverIO actions chain).
- `tripleClick` fires three clicks; filter with `evt.detail === 3`.
- `wheel` is for UI that listens to `wheel` events; use `delta` (pixels) or `direction` (`up` / `down` / `left` / `right`) and prefer `times` over repeated calls.
- `pointer` (5.1.0, experimental) performs one or more pointer actions: a key string, an action object (`keys`, `target`, `coords`; an object without `keys` only moves the pointer), or an array of both. Key strings use user-event `pointer` syntax: `[MouseLeft]` presses and releases the left button, `[MouseLeft>]` keeps it pressed, `[/MouseLeft]` releases it. The position persists between calls on the same `userEvent` instance; an action without `target` and `coords` uses the previous position. It is a low-level API: prefer the dedicated method (for example `userEvent.click`) for one-off actions.
  - Provider support: `playwright` does not support touch pointer keys such as `TouchA`; `webdriverio` does not support the method; `preview` simulates events with `@testing-library/user-event`. Vitest does not support the `node` and `offset` fields and accepts only `x` and `y` in `coords`. Without `target`, `coords` are relative to the viewport; with `target`, they are offsets from its top-left corner (unlike user-event, where coordinates paired with a target are the final position). An omitted axis defaults to `0`.
  - With the browser UI enabled the test iframe can be scaled, so event coordinates may differ by several iframe pixels; avoid relying on exact coordinates in this mode.
- Fake timers (5.1.0): locator and `userEvent` methods that take an element advance fake timers while they run; `keyboard` and `tab` do not (see Mocking timers).
- `fill` is faster than `type` / `keyboard` but does not support user-event keyboard syntax. Locators do not expose `.type`; use `.fill`.
- `keyboard` supports `{Shift}`, `{Control}`, `{Alt}`, `{Meta}`, arrows, `{Home}`, `{End}`, `{PageUp}`, `{PageDown}`, `{Backspace}`, `{Delete}`, `{Insert}`, `{Tab}`, `{Enter}`, `{Escape}`, `{F1}`-`{F12}`; the supported set may vary by provider. `{a>5}` presses without release, `{a>5/}` presses then releases.
- `selectOptions`: without `multiple` only the first value is selected; `listbox` is unsupported; `webdriverio` cannot select multiple.
- `hover`: `webdriverio` moves to the element center, `playwright` to "some" visible point. `unhover` moves to `document.body` and has no effect if already there.
- `upload`: `webdriverio` supports it only in `chrome` / `edge` and only with string paths. `dragAndDrop`: source needs `draggable="true"`; not supported by the `preview` provider.
- With `preview`, `userEvent` falls back to simulated events via `@testing-library/user-event`.
- Source: https://vitest.dev/api/browser/interactivity and https://vitest.dev/guide/mocking/timers (Vitest v5.1.0)

## Related

- [Context API](./context-api.md)
- [Locators](./locators.md)
