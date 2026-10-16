# Why Browser Mode

Motivation and drawbacks of running Vitest tests in a real browser instead of a simulated one (jsdom / happy-dom).

## Signature / Usage

```ts
// vitest.config.ts - opt a project into a real browser
import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'

export default defineConfig({
  test: {
    browser: { enabled: true, provider: playwright(), instances: [{ browser: 'chromium' }] },
  },
})
```

## Notes

- jsdom / happy-dom only simulate a browser environment, which may cause discrepancies with the real one and so false positives or negatives. Browser mode runs tests natively for higher confidence.
- Drawback, not a drop-in replacement: it does not fully replace standalone end-to-end runners; augment it with WebdriverIO, Cypress or Playwright.
- Drawback, longer initialization: the provider and browser must be started.
- Source: https://vitest.dev/guide/browser/why (Vitest v5.0.5)

## Related

- [Browser Mode (Getting Started)](./overview.md)
