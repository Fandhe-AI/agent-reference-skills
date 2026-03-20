# Actions

Playwright provides methods to interact with page elements. All actions auto-wait for the element to be actionable before performing the action (visible, stable, enabled, etc.). Actions automatically scroll the element into view.

## Text Input

### fill

Sets the value of `<input>`, `<textarea>`, and `[contenteditable]` elements. Clears existing content first. Triggers `input` and `change` events.

```typescript
import { test } from "@playwright/test";

test("fill text inputs", async ({ page }) => {
  // Text input
  await page.getByRole("textbox").fill("Peter");

  // Date input
  await page.getByLabel("Birth date").fill("2020-02-02");

  // Time input
  await page.getByLabel("Appointment time").fill("13:15");

  // Datetime-local input
  await page.getByLabel("Local time").fill("2020-03-02T05:15");
});
```

### clear

Clears the input field.

```typescript
test("clear input", async ({ page }) => {
  await page.getByRole("textbox").clear();
});
```

## Checkboxes and Radio Buttons

### check, uncheck, setChecked

Works with `input[type=checkbox]`, `input[type=radio]`, and `[role=checkbox]`.

```typescript
test("checkboxes and radios", async ({ page }) => {
  // Check
  await page.getByLabel("I agree to the terms above").check();

  // Verify checked state
  await expect(page.getByLabel("Subscribe to newsletter")).toBeChecked();

  // Uncheck
  await page.getByLabel("Subscribe to newsletter").uncheck();

  // Set to specific state
  await page.getByLabel("Remember me").setChecked(true);
  await page.getByLabel("Remember me").setChecked(false);

  // Radio buttons
  await page.getByLabel("XL").check();
});
```

## Select Options

### selectOption

Selects options in `<select>` elements. Supports matching by value, label, or element handle.

```typescript
test("select options", async ({ page }) => {
  // By value
  await page.getByLabel("Choose a color").selectOption("blue");

  // By label
  await page.getByLabel("Choose a color").selectOption({ label: "Blue" });

  // Multiple selections
  await page
    .getByLabel("Choose multiple colors")
    .selectOption(["red", "green", "blue"]);
});
```

## Mouse Click

### click

Performs a click action. Auto-waits for the element to be visible, stable, receiving events, and enabled.

```typescript
test("click variants", async ({ page }) => {
  // Basic click
  await page.getByRole("button").click();

  // Double click
  await page.getByText("Item").dblclick();

  // Right click (context menu)
  await page.getByText("Item").click({ button: "right" });
});
```

### Click with Modifiers

```typescript
test("click with modifiers", async ({ page }) => {
  // Shift+click
  await page.getByText("Item").click({ modifiers: ["Shift"] });

  // Ctrl/Cmd+click (cross-platform)
  await page.getByText("Item").click({ modifiers: ["ControlOrMeta"] });

  // Multiple modifiers
  await page.getByText("Item").click({ modifiers: ["Shift", "Alt"] });
});
```

### Click at Position

```typescript
test("click at position", async ({ page }) => {
  // Click relative to top-left corner of element
  await page.getByText("Item").click({ position: { x: 0, y: 0 } });

  // Click at center offset
  await page.getByText("Item").click({ position: { x: 10, y: 20 } });
});
```

### Force Click

Bypasses actionability checks. Use when you know the element is ready but Playwright's checks fail.

```typescript
test("force click", async ({ page }) => {
  await page.getByRole("button").click({ force: true });
});
```

### Programmatic Click

Dispatches a click event directly via JavaScript, bypassing all actionability checks.

```typescript
test("programmatic click", async ({ page }) => {
  await page.getByRole("button").dispatchEvent("click");
});
```

## Hover

```typescript
test("hover", async ({ page }) => {
  await page.getByText("Item").hover();
});
```

## Type Characters

### pressSequentially

Types text character by character, triggering all keyboard events (`keydown`, `keypress`, `keyup`) for each character. Use when the page has special keyboard handling. For normal form input, prefer `fill()`.

```typescript
test("press sequentially", async ({ page }) => {
  // Type character by character
  await page.locator("#area").pressSequentially("Hello World!");

  // With delay between keystrokes (simulates real typing)
  await page
    .locator("#area")
    .pressSequentially("Hello World!", { delay: 100 });
});
```

## Keys and Shortcuts

### press

Produces a single keystroke or key combination. Supports named keys, modifiers, and shortcuts.

```typescript
test("keyboard shortcuts", async ({ page }) => {
  // Named keys
  await page.getByText("Submit").press("Enter");
  await page.getByRole("textbox").press("Tab");
  await page.getByRole("textbox").press("Backspace");

  // Key combinations
  await page.getByRole("textbox").press("Control+ArrowRight");
  await page.locator("#name").press("Shift+A");
  await page.locator("#name").press("Shift+ArrowLeft");

  // Character keys
  await page.getByRole("textbox").press("$");
  await page.getByRole("textbox").press("a");

  // Function keys
  await page.press("body", "F1");
});
```

Supported key names: `F1`-`F12`, `Digit0`-`Digit9`, `KeyA`-`KeyZ`, `Backquote`, `Minus`, `Equal`, `Backslash`, `Backspace`, `Tab`, `Delete`, `Escape`, `ArrowDown`, `ArrowUp`, `ArrowLeft`, `ArrowRight`, `End`, `Home`, `Insert`, `PageDown`, `PageUp`, `Enter`, `Space`, `Shift`, `Control`, `Alt`, `Meta`.

## Upload Files

### setInputFiles

Sets files on `<input type="file">` elements. Supports single files, multiple files, directories, buffers, and clearing.

```typescript
import path from "node:path";

test("file uploads", async ({ page }) => {
  // Single file
  await page
    .getByLabel("Upload file")
    .setInputFiles(path.join(__dirname, "myfile.pdf"));

  // Multiple files
  await page.getByLabel("Upload files").setInputFiles([
    path.join(__dirname, "file1.txt"),
    path.join(__dirname, "file2.txt"),
  ]);

  // Directory upload
  await page
    .getByLabel("Upload directory")
    .setInputFiles(path.join(__dirname, "mydir"));

  // Clear files
  await page.getByLabel("Upload file").setInputFiles([]);

  // From buffer (no actual file on disk)
  await page.getByLabel("Upload file").setInputFiles({
    name: "file.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("this is test"),
  });
});
```

Handle dynamically created file inputs:

```typescript
test("file chooser dialog", async ({ page }) => {
  const fileChooserPromise = page.waitForEvent("filechooser");
  await page.getByLabel("Upload").click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.join(__dirname, "myfile.pdf"));
});
```

## Focus

```typescript
test("focus element", async ({ page }) => {
  await page.getByLabel("Password").focus();
});
```

## Drag and Drop

### dragTo

```typescript
test("drag and drop", async ({ page }) => {
  // High-level API
  await page.locator("#item-to-be-dragged").dragTo(page.locator("#drop-zone"));
});
```

Manual drag for precise control:

```typescript
test("manual drag and drop", async ({ page }) => {
  await page.locator("#item-to-be-dragged").hover();
  await page.mouse.down();
  await page.locator("#drop-zone").hover();
  await page.mouse.up();
});
```

## Scrolling

Playwright auto-scrolls elements into view before actions. For manual scrolling:

```typescript
test("scrolling", async ({ page }) => {
  // Scroll element into view
  await page.getByText("Footer text").scrollIntoViewIfNeeded();

  // Mouse wheel scroll
  await page.getByTestId("scrolling-container").hover();
  await page.mouse.wheel(0, 10);

  // Programmatic scroll via evaluate
  await page
    .getByTestId("scrolling-container")
    .evaluate((e) => (e.scrollTop += 100));
});
```
