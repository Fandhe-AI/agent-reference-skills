# Codegen

Record browser interactions to auto-generate test code.

```bash
# Record interactions on a URL and generate test code
npx playwright codegen demo.playwright.dev/todomvc

# Record with specific viewport size
npx playwright codegen --viewport-size="800,600" playwright.dev

# Record with device emulation
npx playwright codegen --device="iPhone 13" playwright.dev

# Record with dark mode
npx playwright codegen --color-scheme=dark playwright.dev

# Record with locale and geolocation
npx playwright codegen \
  --timezone="Europe/Rome" \
  --geolocation="41.890221,12.492348" \
  --lang="it-IT" \
  bing.com/maps

# Save and reuse authenticated session
npx playwright codegen github.com --save-storage=auth.json
npx playwright codegen --load-storage=auth.json github.com
```

```typescript
// Use page.pause() to open the Recorder inside a running test
import { test } from '@playwright/test';

test('debug with recorder', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
  await page.pause(); // Opens Playwright Inspector with recording controls
});
```

## Notes

- Codegen prioritises `getByRole`, `getByText`, and `getByTestId` locators for robustness
- The generated code is a starting point; review and refine selectors and assertions before committing
- `--save-storage` / `--load-storage` preserves cookies and localStorage for authenticated recording sessions
- The VS Code Playwright extension provides an integrated "Record new" button as an alternative to the CLI
