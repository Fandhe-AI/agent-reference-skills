# Network Concurrency Management

React Router automates network concurrency handling, mirroring browser behavior for navigations and extending it for concurrent fetcher requests.

**Availability**: Framework Mode and Data Mode. Not available in Declarative Mode.

## 詳細説明

### Link Navigation and Form Submission

React Router mirrors the browser: clicking a new link (or submitting a new form) before the previous request completes **cancels the in-flight request** and immediately processes the new one.

### Concurrent Fetchers (`useFetcher`)

Unlike navigations, multiple `useFetcher` instances can run simultaneously. React Router:
- Updates the UI immediately when any data arrives
- Cancels a fetcher's own in-flight request when a newer one is issued for the same fetcher
- During revalidation, cancels stale responses — only the freshest revalidation is committed

**Timeline example** (submission 2 resolves before submission 1):
```
submission 1: |----✓---------❌  (canceled, stale)
submission 2:    |-----✓-----✅  (committed)
submission 3:             |-----✓-----✅
```

## コード例

```tsx
export async function loader({ request }) {
  const { searchParams } = new URL(request.url);
  const cities = await searchCities(searchParams.get("q"));
  return cities;
}

export function CitySearchCombobox() {
  const fetcher = useFetcher<typeof loader>();

  return (
    <fetcher.Form action="/city-search">
      <Combobox aria-label="Cities">
        <ComboboxInput
          name="q"
          onChange={(event) => fetcher.submit(event.target.form)}
        />
        {fetcher.data ? (
          <ComboboxList>
            {fetcher.data.map((city) => (
              <ComboboxOption key={city.id} value={city.name} />
            ))}
          </ComboboxList>
        ) : null}
      </Combobox>
    </fetcher.Form>
  );
}
```

## 注意点

- **Rare stale-data edge case**: A canceled client request may still reach the server after a newer revalidation completes. Mitigate by sending timestamps with submissions and ignoring stale ones on the server
- The server still processes all requests even when the client cancels them — backend race conditions are out of scope

## 関連

- [Race Conditions](./race-conditions.md)
- [Form vs. Fetcher](./form-vs-fetcher.md)
