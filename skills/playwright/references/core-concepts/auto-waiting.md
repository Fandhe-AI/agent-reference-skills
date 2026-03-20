# Auto-Waiting

Playwright automatically waits for elements to pass actionability checks before performing actions. If the checks do not pass within the configured `timeout`, the action fails with a `TimeoutError`.

## The Five Actionability Checks

### Visible

An element is visible when it has a non-empty bounding box and does not have `visibility: hidden` computed style. Elements with `display: none`, zero size, or otherwise not rendered are not visible. Elements with `opacity: 0` **are** considered visible.

### Stable

An element is stable when it has maintained the same bounding box for at least two consecutive animation frames. This ensures animations and transitions have completed.

### Receives Events

The element is the actual hit target at the action point. Another element (such as an overlay or modal backdrop) is not intercepting pointer events at the intended click location.

### Enabled

The element is not disabled. Applies to form elements (`<button>`, `<select>`, `<input>`, `<textarea>`, `<option>`, `<optgroup>`) with the `disabled` attribute, or elements that are descendants of an element with `aria-disabled="true"`.

### Editable

The element is both enabled and not read-only. Read-only elements have the `readonly` attribute or `aria-readonly="true"` on supported ARIA roles.

## Action-to-Check Matrix

Each action requires a different subset of actionability checks to pass before it executes:

| Action                     | Visible | Stable | Receives Events | Enabled | Editable |
| -------------------------- | :-----: | :----: | :-------------: | :-----: | :------: |
| `click()`                  |    +    |   +    |        +        |    +    |          |
| `dblclick()`               |    +    |   +    |        +        |    +    |          |
| `check()`                  |    +    |   +    |        +        |    +    |          |
| `uncheck()`                |    +    |   +    |        +        |    +    |          |
| `setChecked()`             |    +    |   +    |        +        |    +    |          |
| `tap()`                    |    +    |   +    |        +        |    +    |          |
| `hover()`                  |    +    |   +    |        +        |         |          |
| `dragTo()`                 |    +    |   +    |        +        |         |          |
| `screenshot()`             |    +    |   +    |                 |         |          |
| `fill()`                   |    +    |        |                 |    +    |    +     |
| `clear()`                  |    +    |        |                 |    +    |    +     |
| `selectOption()`           |    +    |        |                 |    +    |          |
| `selectText()`             |    +    |        |                 |         |          |
| `scrollIntoViewIfNeeded()` |         |   +    |                 |         |          |
| `blur()`                   |         |        |                 |         |          |
| `dispatchEvent()`          |         |        |                 |         |          |
| `focus()`                  |         |        |                 |         |          |
| `press()`                  |         |        |                 |         |          |
| `pressSequentially()`      |         |        |                 |         |          |
| `setInputFiles()`          |         |        |                 |         |          |

## Key Observations

- **Click-family actions** (`click`, `dblclick`, `check`, `uncheck`, `setChecked`, `tap`) require all checks except Editable.
- **hover** and **dragTo** skip the Enabled check (you can hover over disabled elements).
- **fill** and **clear** require Visible, Enabled, and Editable, but skip Stable and Receives Events.
- **selectOption** requires Visible and Enabled only.
- **Keyboard actions** (`press`, `pressSequentially`) and **dispatchEvent** have no actionability checks at all.
- **focus** and **blur** also have no actionability checks.
- **setInputFiles** has no actionability checks.

## Forcing Actions

Some actions support a `force` option that disables non-essential actionability checks:

```typescript
import { test } from "@playwright/test";

test("force click bypasses checks", async ({ page }) => {
  // Skips Stable and Receives Events checks
  // Still requires the element to be attached to the DOM
  await page.getByRole("button").click({ force: true });
});
```

Use `force: true` when you are confident the element is ready but Playwright's checks fail due to overlays, animations, or other DOM conditions. Prefer fixing the root cause over using `force` when possible.

## Auto-Retrying Assertions

Playwright assertions also auto-retry until the condition is met:

```typescript
import { test, expect } from "@playwright/test";

test("assertions auto-retry", async ({ page }) => {
  // Retries until element is visible or timeout
  await expect(page.locator("#status")).toBeVisible();

  // Retries until text matches
  await expect(page.locator("#status")).toContainText("Complete");

  // Retries until enabled
  await expect(page.getByRole("button")).toBeEnabled();

  // Retries until URL matches
  await expect(page).toHaveURL(/dashboard/);
});
```
