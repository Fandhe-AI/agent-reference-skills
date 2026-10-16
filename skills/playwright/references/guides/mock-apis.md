# Mock APIs

Mock and modify HTTP/HTTPS network traffic (XHR, fetch), replay from HAR files, and mock WebSockets.

## Signature / Usage

Mock an API request (no request reaches the API):

```js
test("mocks a fruit and doesn't call api", async ({ page }) => {
  // Mock the api call before navigating
  await page.route('*/**/api/v1/fruits', async route => {
    const json = [{ name: 'Strawberry', id: 21 }];
    await route.fulfill({ json });
  });
  await page.goto('https://demo.playwright.dev/api-mocking');

  await expect(page.getByText('Strawberry')).toBeVisible();
});
```

## Modify API responses

Perform the request, then fulfill with a patched response:

```js
await page.route('*/**/api/v1/fruits', async route => {
  const response = await route.fetch();
  const json = await response.json();
  json.push({ name: 'Loquat', id: 100 });
  // Fulfill using the original response, while patching the response body
  await route.fulfill({ response, json });
});
```

## Mocking with HAR files

Workflow: record a HAR file, commit it alongside the tests, route requests using the saved HAR.

Record or update (`update: true` populates the HAR with real network data):

```js
await page.routeFromHAR('./hars/fruit.har', {
  url: '*/**/api/v1/fruits',
  update: true,
});
```

Replay (turn off or remove `update`):

```js
// Either use a matching response from the HAR, or abort the request if nothing matches.
await page.routeFromHAR('./hars/fruit.har', {
  url: '*/**/api/v1/fruits',
  update: false,
});
```

Record with the CLI:

```bash
# Save API requests from example.com as "example.har" archive.
npx playwright open --save-har=example.har --save-har-glob="**/api/**" https://example.com
```

Alternatively, record via `recordHar` (JS) / `recordHarPath` (Python, Java, .NET) in `browser.newContext()` to capture all traffic for the context until it is closed.

## Mock WebSockets

```js
await page.routeWebSocket('wss://example.com/ws', ws => {
  ws.onMessage(message => {
    if (message === 'request')
      ws.send('response');
  });
});
```

Connect to the real server and intercept messages in between:

```js
await page.routeWebSocket('wss://example.com/ws', ws => {
  const server = ws.connectToServer();
  ws.onMessage(message => {
    if (message === 'request')
      server.send('request2');
    else
      server.send(message);
  });
});
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `url` | glob | Only requests matching the glob are served from the HAR file. If omitted, all requests are served from the HAR. |
| `update` | boolean | If `true`, create or update the HAR file with actual network data instead of serving from it. |

## Notes

- `page.routeFromHAR()` and `browserContext.routeFromHAR()` both exist.
- To modify a recorded HAR, edit the hashed `.txt` file inside the `hars` folder (JSON) and commit it. Any run with `update: true` updates the HAR from the API again.
- HAR replay matches URL and HTTP method strictly; for POST it also matches the payload strictly. If multiple recordings match, the one with the most matching headers is picked. Redirect entries are followed automatically.
- If the HAR file name ends with `.zip`, it is an archive containing the HAR plus network payloads as separate entries; you may extract it, edit payloads manually and point to the extracted HAR (payloads resolve relative to it).
- The `update` option is the recommended way to record a HAR; with the CLI, `--save-har-glob` limits which requests are saved, and a `.zip` name compresses artifacts into a single zip.
- Mock before navigating so the route is in place when the page requests the API.
- See `WebSocketRoute` in the API reference for more WebSocket details.
- Source: https://playwright.dev/docs/mock (microsoft/playwright v1.64.1 `docs/src/mock.md`)

## Related

- [Network](./network.md)
- [Mock Browser APIs](./mock-browser-apis.md)
- [API Testing](./api-testing.md)
