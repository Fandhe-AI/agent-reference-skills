# Screenshots

Capture screenshots of a page or element, into a file or an in-memory buffer.

## Signature / Usage

```js
await page.screenshot({ path: 'screenshot.png' });
```

Full page (the whole scrollable page):

```js
await page.screenshot({ path: 'screenshot.png', fullPage: true });
```

Capture into a buffer (to post-process or pass to a third-party pixel diff tool):

```js
const buffer = await page.screenshot();
console.log(buffer.toString('base64'));
```

Element screenshot:

```js
await page.locator('.header').screenshot({ path: 'screenshot.png' });
```

## Notes

- The Screenshots API (`page.screenshot`) accepts many more parameters for image format, clip area, quality, etc.; see the Page API reference.
- For assertion-based screenshot comparison, see the visual testing guide.
- Source: https://playwright.dev/docs/screenshots (microsoft/playwright v1.64.1 `docs/src/screenshots.md`)

## Related

- [Visual Testing](./visual-testing.md)
- [Videos](./videos.md)
