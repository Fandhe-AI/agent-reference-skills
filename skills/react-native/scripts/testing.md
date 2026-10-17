---
source: https://reactnative.dev/docs/0.87/testing-overview
---

# Testing

The testing overview page states that the default template ships with Jest and a React Native preset. It gives no full runner command; check the `scripts` in your project's `package.json`. The only Jest CLI option the page names is `--updateSnapshot`.

## Update Jest snapshots

> **警告**: Updating snapshots overwrites the stored expectations. The page cautions against updating a failing snapshot without investigating whether the change is expected.

```sh
jest --updateSnapshot
```

Option name taken from the page's snapshot-testing section; run it through your project's Jest setup (for example via `npx`).

## Unit test written with Jest

```js
it('given a date in the past, colorForDueDate() returns red', () => {
  expect(colorForDueDate('2000-10-20')).toBe('red');
});
```

Verbatim example from the page. See `references/debugging-performance/testing-overview.md` for the full guide.
