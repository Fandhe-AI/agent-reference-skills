# Context API

The `vitest/browser` entry point exports `userEvent`, `commands`, `page`, `cdp`, `server` and `utils` for use in browser tests.

## Signature / Usage

```ts
import { page, userEvent, commands, server, utils } from 'vitest/browser'

export const page: {
  viewport(width: number, height: number): Promise<void>
  screenshot(options: Omit<ScreenshotOptions, 'base64'> & { base64: true }): Promise<{ path: string; base64: string }>
  screenshot(options?: ScreenshotOptions): Promise<string>
  mark(name: string, options?: { stack?: string; kind?: BrowserTraceEntryKind }): Promise<void>
  mark<T>(name: string, body: () => T | Promise<T>, options?: { stack?: string; kind?: BrowserTraceEntryKind }): Promise<T>
  extend(methods: Partial<BrowserPage>): BrowserPage
  elementLocator(element: Element): Locator
  frameLocator(iframeElement: Locator): FrameLocator
  getByRole(role: ARIARole | string, options?: LocatorByRoleOptions): Locator
  getByLabelText(text: string | RegExp, options?: LocatorOptions): Locator
  getByTestId(text: string | RegExp): Locator
  getByAltText(text: string | RegExp, options?: LocatorOptions): Locator
  getByPlaceholder(text: string | RegExp, options?: LocatorOptions): Locator
  getByText(text: string | RegExp, options?: LocatorOptions): Locator
  getByTitle(text: string | RegExp, options?: LocatorOptions): Locator
}

export const commands: BrowserCommands // shortcut to `server.commands`
export const cdp: () => CDPSession
```

```ts
export const server: {
  platform: Platform   // process.platform on the server
  version: string      // process.version on the server
  provider: string     // name of the browser provider
  browser: string      // name of the current browser
  commands: BrowserCommands
  config: SerializedConfig
}

export const utils: {
  getElementLocatorSelectors(element: Element): LocatorSelectors
  debug(el?: Element | Locator | null | (Element | Locator)[], maxLength?: number, options?: PrettyDOMOptions): void
  prettyDOM(dom?: Element | Locator | undefined | null, maxLength?: number, prettyFormatOptions?: PrettyDOMOptions): string
  configurePrettyDOM(options: StringifyOptions): void
  getElementError(selector: string, container?: Element): Error
  aria: { // @experimental
    generateAriaTree(rootElement: Element): AriaNode
    renderAriaTree(root: AriaNode): string
    renderAriaTemplate(template: AriaTemplateNode): string
    parseAriaTemplate(text: string): AriaTemplateNode
    matchAriaTree(root: AriaNode, template: AriaTemplateNode): { pass: boolean; resolved: string }
  }
}
```

```ts
import { page } from 'vitest/browser'

await page.mark('submit flow', async () => {
  await page.getByRole('textbox', { name: 'Email' }).fill('john@example.com')
  await page.getByRole('button', { name: 'Submit' }).click()
}, { kind: 'action' })

const frame = page.frameLocator(page.getByTestId('iframe'))
await frame.getByText('Hello World').click() // frame.click() is not available
```

```ts
utils.configurePrettyDOM({
  maxDepth: 3,
  filterNode: 'script, style, [data-test-hide]'
})
```

## Options / Props

`utils.configurePrettyDOM` options (Vitest 4.0.0+; CSS-selector `filterNode` since 4.1.0):

| Name | Type | Description |
|------|------|-------------|
| maxDepth | number | Maximum depth to print nested elements (default `Infinity`) |
| maxLength | number | Maximum output length (default `7000`) |
| filterNode | string \| function | CSS selector (matching elements excluded) or function returning `false` to exclude a node |
| highlight | boolean | Syntax highlighting (default `true`) |

## Notes

- `page` is not Playwright's `page`; the test runs in the browser, so use the Commands API for Playwright's server-side `page`.
- `screenshot` always returns a base64 string if `save` is `false` (Vitest 3.2.0+); `path` is ignored then.
- `page.mark` is useful only when browser tracing (`browser.trace` / `browser.traceView`) is enabled; `options.stack` overrides the callsite, `options.kind` categorizes the marker.
- `frameLocator` is supported only by the `playwright` provider. Interactive methods work in iframes, but `expect.element()` needs same-origin; for cross-origin pass `args: ["--disable-web-security"]` in `launchOptions` or use a custom browser command.
- `cdp()` works only with `playwright` + `chromium`, and only when `api.allowWrite` and `api.allowExec` are enabled.
- `utils.aria` is experimental (5.0.0). The source's usage example calls `utils.aria.renderAriaNode(tree)` while the signature block lists `renderAriaTree`; the signature block is reproduced above.
- Source: https://vitest.dev/api/browser/context (Vitest v5.0.5)

## Related

- [Interactivity API](./interactivity-api.md)
- [Locators](./locators.md)
- [Commands](./commands.md)
- [ARIA Snapshots](./aria-snapshots.md)
