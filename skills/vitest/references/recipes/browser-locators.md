# Domain Locators (Extending Browser Locators)

`locators.extend` (since 3.2.0) adds domain-specific locator methods while keeping auto-retry, strict-mode protection, and chaining of the locator API. Browser mode only.

## Signature / Usage

Return a Playwright locator string; it runs as a child query of the locator the method was called on (the whole page when called on `page`):

```ts
import { locators } from 'vitest/browser'

locators.extend({
  getByCommentsCount(count: number) {
    return `.comments :text("${count} comments")`
  },
})
```

```ts
import { expect, test } from 'vitest'
import { page } from 'vitest/browser'

test('article shows comment count', async () => {
  await expect.element(page.getByCommentsCount(1)).toBeVisible()
  await expect.element(
    page.getByRole('article', { name: 'Hello World' })
      .getByCommentsCount(1)
  ).toBeVisible()
})
```

Compose existing locators (`this` is bound to the locator the method was called on, or `page`):

```ts
import { locators } from 'vitest/browser'
import type { Locator } from 'vitest/browser'

locators.extend({
  getRowWithAction(this: Locator, action: string) {
    return this.getByRole('row').filter({
      has: this.getByRole('button', { name: action }),
    })
  },
})
```

```ts
await page.getRowWithAction('Delete').first().click()
```

Custom interactions, guarded against being called on `page`:

```ts
import { locators, page } from 'vitest/browser'
import type { BrowserPage, Locator } from 'vitest/browser'

locators.extend({
  async clickAndFill(this: BrowserPage | Locator, text: string) {
    if (this === page) {
      throw new TypeError(
        'clickAndFill must be called on a locator, like page.getByRole(\'textbox\').clickAndFill(...)',
      )
    }
    await this.click()
    await this.fill(text)
  },
})

await page.getByRole('textbox').clickAndFill('Hello World')
```

Augment the types (usually in a shared `.d.ts`):

```ts
import 'vitest/browser'

declare module 'vitest/browser' {
  interface LocatorSelectors {
    getByCommentsCount: (count: number) => Locator
    getRowWithAction: (action: string) => Locator
    clickAndFill: (text: string) => Promise<void>
  }
}
```

## Notes

- Prefer returning composed built-in locators over the raw-string form when both can express the query; use the string form only when no chain of built-ins covers it (it bypasses the locator mechanism).
- `locators.extend` types `this` as `BrowserPage | Locator`. `page` has no `click` / `fill`, so interaction helpers need the `this === page` guard.
- `locators.extend` is runtime registration only; TypeScript does not know the new methods until `LocatorSelectors` is augmented. `LocatorSelectors` is extended by both `Locator` and `BrowserPage`.
- Interaction methods do not compose into selectors; use them for action helpers, not query helpers.

## Related

- [Testing types](../guide/testing-types.md)
