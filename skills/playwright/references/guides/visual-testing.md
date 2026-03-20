# Visual Testing

Playwright Test provides visual comparison capabilities through screenshot assertions (`toHaveScreenshot`) and generic snapshot matching (`toMatchSnapshot`). It also supports capturing screenshots programmatically.

## toHaveScreenshot

Compares a page or element screenshot against a reference (golden) file stored in a `{testfile}-snapshots` directory.

### Basic Usage

```typescript
import { test, expect } from "@playwright/test";

test("homepage visual", async ({ page }) => {
  await page.goto("https://example.com");
  await expect(page).toHaveScreenshot();
});
```

On first run, Playwright generates the reference screenshot. Subsequent runs compare against it. The test fails if differences exceed thresholds.

### Custom Snapshot Name

```typescript
// Single filename
await expect(page).toHaveScreenshot("landing.png");

// Path segments
await expect(page).toHaveScreenshot(["screens", "landing.png"]);
```

### Default Naming Convention

Generated filenames follow: `{testName}-{index}-{browserName}-{platform}.png`

Example: `homepage-visual-1-chromium-darwin.png`

## Updating Snapshots

When the page design changes, regenerate reference screenshots:

```bash
npx playwright test --update-snapshots
```

## Comparison Options

### maxDiffPixels

Maximum number of pixels that can differ:

```typescript
await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });
```

### maxDiffPixelRatio

Maximum ratio of different pixels (0 to 1):

```typescript
await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.02 });
```

### threshold

Per-pixel color difference threshold (0 to 1, powered by pixelmatch):

```typescript
await expect(page).toHaveScreenshot({ threshold: 0.2 });
```

### Global Configuration

Set defaults for all `toHaveScreenshot` calls in `playwright.config.ts`:

```typescript
import { defineConfig } from "@playwright/test";

export default defineConfig({
  expect: {
    toHaveScreenshot: {
      maxDiffPixels: 100,
      threshold: 0.2,
    },
  },
});
```

## stylePath (Masking Dynamic Content)

Inject CSS during screenshot capture to hide animations, ads, or dynamic elements:

```typescript
await expect(page).toHaveScreenshot({
  stylePath: path.join(__dirname, "screenshot.css"),
});
```

Example `screenshot.css`:

```css
/* Hide iframes and animated elements */
iframe {
  visibility: hidden;
}
.animated-banner {
  visibility: hidden;
}
```

Global configuration:

```typescript
export default defineConfig({
  expect: {
    toHaveScreenshot: {
      stylePath: "./screenshot.css",
    },
  },
});
```

## toMatchSnapshot (Non-Image Snapshots)

Compare text or arbitrary data against stored snapshots:

```typescript
// Text snapshot
expect(await page.textContent(".hero__title")).toMatchSnapshot("hero.txt");

// Arbitrary data
const data = await page.evaluate(() =>
  JSON.stringify(window.__APP_STATE__),
);
expect(data).toMatchSnapshot("app-state.json");
```

Playwright auto-detects content types and applies appropriate comparison algorithms.

## Screenshots API

### Full Page Screenshot

Capture the entire scrollable page:

```typescript
await page.screenshot({ path: "full-page.png", fullPage: true });
```

### Element Screenshot

Capture a specific element:

```typescript
await page.locator(".header").screenshot({ path: "header.png" });
```

### Capture into Buffer

Get the screenshot as a `Buffer` instead of saving to disk:

```typescript
const buffer = await page.screenshot();
console.log(buffer.toString("base64"));
```

### Clip (Region Capture)

Capture a specific rectangular area:

```typescript
await page.screenshot({
  path: "region.png",
  clip: { x: 0, y: 0, width: 800, height: 400 },
});
```

### Mask Elements

Hide specific elements with a colored overlay:

```typescript
await page.screenshot({
  path: "masked.png",
  mask: [page.locator(".dynamic-ad"), page.locator(".live-clock")],
  maskColor: "#FF00FF",
});
```

### Disable Animations

Freeze CSS animations and transitions:

```typescript
await page.screenshot({
  path: "static.png",
  animations: "disabled",
});
```

### Hide Caret

Remove the blinking text cursor:

```typescript
await page.screenshot({
  path: "no-caret.png",
  caret: "hide",
});
```

### Transparent Background

Remove the default white background (useful for compositing):

```typescript
await page.screenshot({
  path: "transparent.png",
  omitBackground: true,
});
```

### Inject CSS During Capture

Apply temporary styles for the screenshot:

```typescript
await page.screenshot({
  path: "styled.png",
  style: `
    .ad-banner { display: none; }
    .skeleton-loader { visibility: hidden; }
  `,
});
```

### Image Format and Quality

```typescript
// JPEG with quality setting
await page.screenshot({
  path: "photo.jpeg",
  type: "jpeg",
  quality: 80,
});

// PNG (default)
await page.screenshot({
  path: "screenshot.png",
  type: "png",
});
```

### Scale

Control DPI scaling:

```typescript
await page.screenshot({
  path: "screenshot.png",
  scale: "css", // or "device" (default)
});
```

## Cross-Environment Considerations

Browser rendering varies across operating systems, GPU hardware, and headless vs headed modes. For consistent visual tests:

- Run screenshot tests in the same environment where baselines were created
- Use CI with a fixed OS and browser version for generating and comparing
- Use `stylePath` or `mask` to exclude inherently dynamic content
