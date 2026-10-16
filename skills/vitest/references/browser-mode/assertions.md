# Assertion API (expect.element)

DOM assertions forked from `@testing-library/jest-dom`, with locator support and built-in retry via `expect.element`.

## Signature / Usage

```ts
import { expect, test } from 'vitest'
import { page } from 'vitest/browser'

test('error banner is rendered', async () => {
  triggerError()
  const banner = page.getByRole('alert', { name: /error/i })

  // retries until the element exists and its textContent contains "Error!"
  await expect.element(banner).toMatchTextContent('Error!')
})
```

```ts
interface ExpectPollOptions {
  // The interval to retry the assertion for in milliseconds
  // Defaults to "expect.poll.interval" config option
  interval?: number
  // Time to retry the assertion for in milliseconds
  // Defaults to "expect.poll.timeout" config option
  timeout?: number
  // The message printed when the assertion fails
  message?: string
}
```

TypeScript types: add `/// <reference types="vitest/browser" />` in a file covered by `tsconfig.json` if you never import from `vitest/browser`.

## Options / Props

Matchers (all return `Promise<void>` and are used as `await expect.element(locator).matcher()`; `.not` supported):

| Matcher | Signature |
|---------|-----------|
| toBeDisabled / toBeEnabled | `()` |
| toBeEmptyDOMElement | `()` |
| toBeInTheDocument | `()` (does not find detached elements; use `toContainElement`) |
| toBeInvalid / toBeValid | `()` |
| toBeRequired | `()` |
| toBeVisible | `()` |
| toBeInViewport (4.0.0+) | `(options: { ratio?: number })` |
| toBeChecked / toBePartiallyChecked | `()` |
| toContainElement | `(element: HTMLElement \| SVGElement \| Locator \| null)` |
| toContainHTML | `(htmlText: string)` |
| toHaveAccessibleDescription | `(description?: string \| RegExp)` |
| toHaveAccessibleErrorMessage | `(message?: string \| RegExp)` |
| toHaveAccessibleName | `(name?: string \| RegExp)` |
| toHaveAttribute | `(attribute: string, value?: unknown)` |
| toHaveClass | `(...classNames: string[], options?: { exact: boolean })` or `(...classNames: (string \| RegExp)[])` |
| toHaveFocus | `()` |
| toHaveFormValues | `(expectedValues: Record<string, unknown>)` (form / fieldset only) |
| toHaveStyle | `(css: string \| Partial<CSSStyleDeclaration>)` |
| toHaveTextContent | `(text?: string \| number, options?: { normalizeWhitespace: boolean })` (exact match) |
| toMatchTextContent | `(text: string \| number \| RegExp, options?: { normalizeWhitespace: boolean })` (partial, case-sensitive) |
| toHaveValue | `(value: string \| string[] \| number \| null)` |
| toHaveDisplayValue | `(value: string \| RegExp \| (string \| RegExp)[])` |
| toHaveRole | `(role: ARIARole)` |
| toHaveSelection | `(selection?: string)` |
| toMatchScreenshot (experimental) | `(options?: ScreenshotMatcherOptions)` or `(name?: string, options?: ScreenshotMatcherOptions)` |

`toMatchScreenshot` options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| comparatorName | `"pixelmatch"` | `"pixelmatch"` | Comparison algorithm; always set it explicitly for typed `comparatorOptions` |
| comparatorOptions | object | | Comparator-specific options |
| screenshotOptions | object | | Same as `locator.screenshot()` except `base64`, `path`, `save`, `type` |
| timeout | number | `5_000` | Time to wait for a stable screenshot; `0` disables the timeout |

`pixelmatch` comparator options (uses `@blazediff/core`):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| allowedMismatchedPixelRatio | number | undefined | Max ratio (0-1) of differing pixels |
| allowedMismatchedPixels | number | undefined | Max count of differing pixels |
| threshold | number | 0.1 | Perceived color difference (0 strict - 1 lenient, YIQ) |
| includeAA | boolean | false | If true, disables anti-aliasing detection |
| alpha | number | 0.1 | Blending of unchanged pixels in the diff image |
| aaColor | [r, g, b] | [255, 255, 0] | Anti-aliased pixel color in diff |
| diffColor | [r, g, b] | [255, 0, 0] | Differing pixel color in diff |
| diffColorAlt | [r, g, b] | undefined | Alternate color for dark-on-light differences |
| diffMask | boolean | false | Show only the diff mask on a transparent background |

## Notes

- Always prefer `expect.element` with `page.getBy*` locators to reduce flakiness. A locator is resolved with `locator.findElement()` before each assertion run; `timeout` applies to the whole retry, `interval` to failed-assertion retries. Plain `expect(...)` has no retry.
- `toBeVisible`: zero-size and `display:none` elements are not visible; `opacity:0` is visible. For lists use `locator.first()`.
- `toHaveRole` matches by string equality without role hierarchy and uses only the first valid role of a multi-role attribute.
- `toHaveClass`: RegExp matches individual classes, and `exact: true` cannot be used with only RegExp arguments.
- `toHaveSelection` expects a string, not range indices.
- When both `allowedMismatchedPixels` and `allowedMismatchedPixelRatio` are set the stricter limit applies. `toMatchScreenshot` retries until two consecutive captures match; update references with `u` in watch mode or `-u` / `--update`. Global defaults: config `browser.expect.toMatchScreenshot`.
- ARIA snapshot matchers (`toMatchAriaSnapshot`) are documented in the ARIA Snapshots guide.
- Source: https://vitest.dev/api/browser/assertions (Vitest v5.0.5)

## Related

- [Locators](./locators.md)
- [Visual Regression Testing](./visual-regression-testing.md)
- [ARIA Snapshots](./aria-snapshots.md)
- [Browser Config](./browser-config.md)
