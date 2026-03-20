# Race Conditions

React Router automatically handles the most common UI race conditions by mirroring browser network concurrency behavior.

**Availability**: Framework Mode and Data Mode. Not available in Declarative Mode.

## 詳細説明

### Navigation and Forms

When a new navigation or form submission interrupts a pending one, React Router cancels the in-flight requests and immediately processes the new event — identical to how browsers handle document navigations.

### Fetchers

Fetchers have nuanced behavior compared to navigations:
- **Cannot interrupt other fetcher instances** — each `useFetcher()` call is independent
- **Can interrupt themselves** — a new request on the same fetcher cancels its own previous request
- **Interact during revalidation** — after a fetcher action returns, React Router triggers revalidation for all page data; stale revalidation responses are canceled automatically

React Router commits only the "freshest" revalidation: any request that started earlier than one that has already returned is canceled.

## コード例

**Type-ahead combobox — no manual debouncing or cancellation needed:**
```tsx
export async function loader({ request }) {
  const { searchParams } = new URL(request.url);
  return searchCities(searchParams.get("q"));
}

export function CitySearchCombobox() {
  const fetcher = useFetcher();

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

Each `onChange` keystroke cancels the previous fetcher request automatically, so users never see results for a stale query.

## 注意点

- React Router only handles **client-side** race conditions. Your server still receives and may process all requests — backend data integrity is your responsibility
- This risk is considered low and mirrors the behavior of plain HTML `<form>` elements in browsers
- For high-stakes mutations, send timestamps with submissions and reject stale ones server-side

## 関連

- [Concurrency](./concurrency.md)
- [Form vs. Fetcher](./form-vs-fetcher.md)
