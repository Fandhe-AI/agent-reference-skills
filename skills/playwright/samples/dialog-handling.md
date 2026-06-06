# Dialog Handling

Accept or dismiss browser dialogs such as alert, confirm, and prompt.

```typescript
import { test, expect } from '@playwright/test';

test('accept alert dialog', async ({ page }) => {
  // Register handler before triggering the dialog
  page.on('dialog', dialog => dialog.accept());
  await page.getByRole('button', { name: 'Show alert' }).click();
});

test('dismiss confirm dialog', async ({ page }) => {
  page.on('dialog', dialog => dialog.dismiss());
  await page.getByRole('button', { name: 'Confirm action' }).click();
});

test('fill prompt dialog', async ({ page }) => {
  page.on('dialog', async dialog => {
    expect(dialog.type()).toBe('prompt');
    await dialog.accept('my-input-value');
  });
  await page.getByRole('button', { name: 'Ask name' }).click();
});

test('handle beforeunload dialog', async ({ page }) => {
  await page.goto('/editor');
  page.on('dialog', async dialog => {
    expect(dialog.type()).toBe('beforeunload');
    await dialog.dismiss();
  });
  await page.close({ runBeforeUnload: true });
});
```

## Notes

- Register the `dialog` event listener before the action that triggers the dialog; dialogs are modal and block execution until handled
- Playwright automatically dismisses unhandled dialogs — add the listener only when you need to inspect or accept
- `dialog.accept(promptText)` works for prompt dialogs; `dialog.accept()` clicks OK on alert/confirm
- `dialog.message()` returns the dialog's displayed text for assertion purposes
