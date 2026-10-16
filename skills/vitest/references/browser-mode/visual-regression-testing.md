# Visual Regression Testing

Capture screenshots of components or pages and compare them with reference images using the `toMatchScreenshot` assertion.

## Signature / Usage

```ts
import { expect, test } from 'vitest'
import { page } from 'vitest/browser'

test('button renders in default state', async () => {
  // render your component

  // capture and compare screenshot
  await expect(page.getByRole('button')).toMatchScreenshot()
})
```

Recommended project split (headless, fixed viewport, `.vrt.test` naming):

```ts
import { defaultExclude, defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'

const vrtPattern = '**/*.vrt.test.[tj]s?(x)'

export default defineConfig({
  test: {
    projects: [
      { test: { name: 'unit', exclude: [vrtPattern, ...defaultExclude] } },
      {
        test: {
          name: 'vrt',
          browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            instances: [{ browser: '[browser-name]', viewport: { width: 1280, height: 720 } }],
          },
          include: [vrtPattern],
          // ...other configurations
        },
      },
    ],
  },
})
```

```bash
vitest --project vrt --update
```

Global and per-test configuration:

```ts
export default defineConfig({
  test: {
    browser: {
      expect: {
        toMatchScreenshot: {
          comparatorName: 'pixelmatch',
          comparatorOptions: {
            threshold: 0.2,                    // 0-1, how different can colors be?
            allowedMismatchedPixelRatio: 0.01, // 1% of pixels can differ
          },
        },
      },
    },
  },
})
```

```ts
await expect(element).toMatchScreenshot('button', {
  comparatorName: 'pixelmatch',
  comparatorOptions: { allowedMismatchedPixelRatio: 0.1 },
})
```

## Options / Props

| Name | Description |
|------|-------------|
| `comparatorName` | Built-in `pixelmatch`, or a registered custom comparator name |
| `comparatorOptions.threshold` | 0-1 color difference tolerance (pixelmatch) |
| `comparatorOptions.allowedMismatchedPixelRatio` | Fraction of pixels allowed to differ (recommended; scales with screenshot size) |
| `comparatorOptions.allowedMismatchedPixels` | Absolute pixel count; if both are set, the stricter limit applies |
| `comparators` (config) | Map of custom comparators `(reference, actual, { createDiff, ...options }) => { pass, diff, message }`; typed via `ScreenshotComparatorRegistry` in `vitest/browser` |
| `screenshotOptions` | Provider screenshot options, e.g. Playwright `mask` |

## Notes

- First run creates a reference and fails with "No existing reference screenshot found"; review it and rerun. References live in `__screenshots__` next to tests (name: test name + browser + platform, e.g. `test-name-chromium-darwin.png`); commit them. Screenshots of deleted / renamed tests are not removed automatically.
- Failures produce reference, actual and diff images (diff only when dimensions match), stored under `.vitest/attachments/`. Red = differing pixels, yellow = anti-aliasing differences.
- Rendering depends on GPU, OS, fonts, browser version and headless / headed mode; run in a standardized environment (Docker, CI-generated references, or cloud services such as Azure App Testing / Chromatic). Generate references in CI, not locally with `--update`.
- Not a replacement for behavior tests. Prefer capturing specific elements over the whole page. Mask dynamic content; with the Playwright provider animations are disabled by default (`animations: "disabled"`).
- Vitest has no default mismatch tolerance. Stable Screenshot Detection retries screenshots until two consecutive ones match or timeout; comparators are called with `createDiff: false` during detection.
- Chromatic plugin (`@chromatic-com/vitest`, `chromaticPlugin`, `takeSnapshot`, `configure`) requires Vitest 4.0.0+ and `@vitest/browser-playwright`; run `npx chromatic --vitest -t=<YOUR_PROJECT_TOKEN>` after tests. Never commit `PLAYWRIGHT_SERVICE_ACCESS_TOKEN`.
- The official project-split snippet leaves out `enabled` and `provider` (it is a partial config); they are added above and required for Browser Mode, see browser-config.md.
- Playwright CI browser install step: `npx --no playwright install --with-deps --only-shell`.
- Source: https://vitest.dev/guide/browser/visual-regression-testing (Vitest v5.0.5)

## Related

- [Assertion API (expect.element)](./assertions.md)
- [Browser Config](./browser-config.md)
- [Multiple Setups](./multiple-setups.md)
