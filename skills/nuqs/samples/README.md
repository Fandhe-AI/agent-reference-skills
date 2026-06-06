# samples

| Name | Description | Path |
|------|-------------|------|
| Adapter Setup | Wrap the app with a framework-specific `NuqsAdapter` to enable query state hooks. | [adapter-setup.md](./adapter-setup.md) |
| Array Params | Store arrays in URL query parameters using `parseAsArrayOf` or `parseAsNativeArrayOf`. | [array-params.md](./array-params.md) |
| Basic Query State | Single URL query parameter synced with React state using `useQueryState`. | [basic-query-state.md](./basic-query-state.md) |
| Custom Parser | Create a type-safe parser for a custom data format using `createParser`. | [custom-parser.md](./custom-parser.md) |
| Multiple Params Batch Update | Manage multiple query parameters atomically with `useQueryStates`; updates within the same event loop tick are batched into a single URL change. | [multiple-params-batch-update.md](./multiple-params-batch-update.md) |
| Search Filter with Debounce | Debounce URL updates for search input so the URL only changes after the user stops typing. | [search-filter-debounce.md](./search-filter-debounce.md) |
| Search Params Cache | Avoid prop drilling in deeply nested Next.js App Router server components using `createSearchParamsCache`. | [search-params-cache.md](./search-params-cache.md) |
| Server-Side Parsing | Parse URL search params on the server using `createLoader` (shared parsers between client and server). | [server-side-parsing.md](./server-side-parsing.md) |
| Testing | Unit-test components that use `useQueryState` with `withNuqsTestingAdapter`. | [testing.md](./testing.md) |
| Typed State with Parsers | Use built-in parsers to get typed values (number, boolean, etc.) from URL query parameters. | [typed-state-with-parsers.md](./typed-state-with-parsers.md) |
| URL Key Remapping | Use descriptive variable names in code while keeping URL keys short with the `urlKeys` option. | [url-key-remapping.md](./url-key-remapping.md) |
