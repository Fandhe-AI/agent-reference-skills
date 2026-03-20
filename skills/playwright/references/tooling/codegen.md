# Playwright Code Generation

Playwright's test generator (`codegen`) records browser interactions and produces Playwright Test code automatically. It analyzes the rendered page and selects resilient locators, prioritizing role, text, and test ID attributes.

## Starting Codegen

### From the Command Line

```bash
# Open codegen with a URL
npx playwright codegen https://example.com

# Open codegen without a URL (navigate manually in the browser)
npx playwright codegen
```

This opens two windows:

1. **Browser window** -- interact with the application here.
2. **Playwright Inspector** -- displays the generated test code in real time.

### From the VS Code Extension

The Playwright VS Code extension provides integrated codegen:

1. **Record new test** -- creates a new file (e.g., `test-1.spec.ts`) and opens a browser window for recording.
2. **Record at cursor** -- inserts recorded actions at the current cursor position in an existing test file.

Install the extension from the VS Code marketplace by searching for "Playwright Test for VS Code."

## Generated Code

As you interact with the page, Playwright generates corresponding test actions:

```typescript
import { test, expect } from "@playwright/test";

test("example test", async ({ page }) => {
  await page.goto("https://example.com");
  await page.getByRole("link", { name: "Get started" }).click();
  await page.getByRole("textbox", { name: "Email" }).fill("user@example.com");
  await page.getByRole("button", { name: "Submit" }).click();
});
```

Codegen selects locators in this priority order:

1. Role-based (`getByRole`)
2. Text-based (`getByText`)
3. Test ID-based (`getByTestId`)
4. CSS/XPath as a fallback

Use the **Copy** button in the Inspector to transfer code to your editor. Use the **Clear** button to reset and start a new recording.

## Locator Picking

After stopping the recording, click the **Pick Locator** button in the Inspector toolbar:

1. Hover over any element in the browser window to preview its locator.
2. Click an element to select it and generate a locator expression.
3. Fine-tune the locator in the locator playground with live highlighting.
4. Copy the locator to your clipboard.

Press **Escape** to cancel locator picking.

In the VS Code extension, the **Pick Locator** button is available in the testing sidebar. It highlights elements and copies the locator to the clipboard when you press Enter.

## Generating Assertions

The Inspector toolbar includes assertion buttons. Click them, then select an element on the page to generate an assertion:

### Visibility Assertion

Checks that an element is visible on the page.

```typescript
await expect(page.getByRole("heading", { name: "Welcome" })).toBeVisible();
```

### Text Content Assertion

Checks that an element contains specific text.

```typescript
await expect(page.getByRole("status")).toContainText("Success");
```

### Value Assertion

Checks that an input element has a specific value.

```typescript
await expect(page.getByRole("textbox", { name: "Email" })).toHaveValue(
  "user@example.com"
);
```

## Emulation Options

Codegen supports emulation flags to simulate different device and environment conditions.

### Viewport Size

```bash
npx playwright codegen --viewport-size="800,600" https://example.com
```

### Device Emulation

Emulates a mobile device with its preset viewport, user agent, and touch support.

```bash
npx playwright codegen --device="iPhone 13" https://example.com
```

### Color Scheme

Records tests under a specific color scheme.

```bash
npx playwright codegen --color-scheme=dark https://example.com
```

### Geolocation

Emulates a specific geographic location.

```bash
npx playwright codegen --geolocation="41.890221,12.492348" https://example.com
```

### Timezone

Emulates a specific timezone.

```bash
npx playwright codegen --timezone="Europe/Rome" https://example.com
```

### Language

Sets the browser language and locale.

```bash
npx playwright codegen --lang="it-IT" https://example.com
```

### Combined Emulation

Multiple flags can be combined in a single command.

```bash
npx playwright codegen \
  --device="iPhone 13" \
  --color-scheme=dark \
  --timezone="Asia/Tokyo" \
  --lang="ja-JP" \
  https://example.com
```

## Language Targeting

Codegen can generate tests for multiple languages and test runners.

```bash
# Generate TypeScript code (default)
npx playwright codegen --target javascript https://example.com

# Generate Python code
npx playwright codegen --target python-pytest https://example.com

# Generate Java code
npx playwright codegen --target java https://example.com

# Generate C# code
npx playwright codegen --target csharp-mstest https://example.com
```

## Authenticated State

Codegen can save and restore authentication state (cookies, localStorage, IndexedDB) to avoid repeating login flows.

### Save Authentication State

After completing the login flow during recording, the storage state is saved to a JSON file.

```bash
npx playwright codegen --save-storage=auth.json https://example.com
```

### Load Authentication State

Start codegen with a previously saved authentication state.

```bash
npx playwright codegen --load-storage=auth.json https://example.com
```

### Custom User Data Directory

Use an existing browser profile with pre-existing authentication. This is useful when the site uses advanced authentication that does not persist via cookies or storage alone.

```bash
npx playwright codegen --user-data-dir=/path/to/browser/data/ https://example.com
```

## Recording in Custom Context

For advanced setups (e.g., custom fixtures, route interception), use `page.pause()` inside your test to open the codegen controls within a non-standard browser context.

```typescript
import { test } from "@playwright/test";

test("record in custom context", async ({ page }) => {
  // Custom setup (routes, storage, etc.)
  await page.route("**/api/**", (route) => route.fulfill({ body: "{}" }));

  await page.goto("https://example.com");

  // Opens the Playwright Inspector with codegen controls
  await page.pause();
});
```

## All Codegen Flags

| Flag | Description |
| --- | --- |
| `-b, --browser <name>` | Browser to use: `chromium`, `firefox`, `webkit` |
| `-o, --output <file>` | Save generated code to a file |
| `--target <language>` | Target language for code generation |
| `--test-id-attribute <attr>` | Custom test ID attribute name |
| `--viewport-size="W,H"` | Set viewport dimensions |
| `--device="<name>"` | Emulate a device |
| `--color-scheme=<scheme>` | Set color scheme (`light`, `dark`) |
| `--geolocation="lat,lng"` | Set geolocation coordinates |
| `--timezone="<tz>"` | Set timezone |
| `--lang="<locale>"` | Set browser language/locale |
| `--save-storage=<file>` | Save auth state after session |
| `--load-storage=<file>` | Load auth state before session |
| `--user-data-dir=<path>` | Use existing browser profile |
