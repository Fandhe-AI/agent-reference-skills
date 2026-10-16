# Navigations

Playwright can navigate to URLs and handle navigations caused by page interactions.

## Signature / Usage

```js
// Navigate the page
await page.goto('https://example.com');
```

Wait for a specific URL when a click may trigger multiple navigations:

```js
await page.getByText('Click me').click();
await page.waitForURL('**/login');
```

Interact immediately after navigation; actions auto-wait for actionability:

```js
// Click will auto-wait for the element
await page.goto('https://example.com');
await page.getByText('Example Domain').click();
```

## Navigation events

Playwright splits showing a new document into **navigation** and **loading**.

- **Navigation starts** by changing the page URL or interacting with the page (e.g. clicking a link). The intent may be canceled (e.g. unresolved DNS) or transformed into a file download.
- **Navigation is committed** when the response headers have been parsed and session history is updated. Only then does the page start loading the document.
- **Loading** covers: `page.url()` is set to the new URL, document is loaded and parsed, `Page.DOMContentLoaded` fires, stylesheets and images load, `Page.load` fires, then dynamically loaded scripts run.

## Notes

- `page.goto()` waits for the `load` event (all dependent resources: stylesheets, scripts, iframes, images). If the page does a client-side redirect before `load`, it waits for the redirected page's `load`.
- There is no way to tell that a modern page is fully "loaded"; Playwright can interact at any moment and auto-waits for target elements to become actionable.
- Hydration: if an action seemingly does nothing or typed text disappears, the page likely has poor hydration (controls enabled before listeners are attached). To verify, use Chrome DevTools "Slow 3G" network emulation and reload. The recommended fix is to keep interactive controls disabled until hydration completes.
- Back/Forward Cache (BFCache): Playwright disables BFCache in all browsers by default. Even if explicitly enabled, testing BFCache restorations is not supported: a restore skips the network fetch phase, so `commit`, `domcontentloaded` and `load` do not fire, `Page` state desynchronizes (e.g. after `page.goBack()`), and subsequent interactions time out or fail.
- Source: https://playwright.dev/docs/navigations (microsoft/playwright v1.64.1 `docs/src/navigations.md`)

## Related

- [Events](./events.md)
- [Network](./network.md)
