# Snapshot Testing

## Signature / Usage

```ts
expect(result).toMatchSnapshot()
expect(result).toMatchSnapshot('optional hint')
```

## Notes

- `toMatchSnapshot()`: saves the value to a snapshot file (in the `__snapshots__/` directory) and compares against it on subsequent runs.
- `toMatchInlineSnapshot()`: stores the snapshot inline in the test file. Vitest automatically updates the test file on the first run.

```ts
expect({ a: 1, b: 2 }).toMatchInlineSnapshot(`
  {
    "a": 1,
    "b": 2,
  }
`)
```

- `toMatchFileSnapshot()`: compares against a snapshot at the given file path (async). Useful for HTML, JSON, etc. where syntax highlighting is helpful.

```ts
await expect(htmlOutput).toMatchFileSnapshot('./snapshots/output.html')
```

- Updating snapshots:

```bash
# update via CLI flag
vitest run -u

# in watch mode, press 'u'
```

- CI behavior: when `process.env.CI` is truthy, snapshot writing is disabled. Mismatches, missing snapshots, and obsolete snapshots all fail the test.
- Custom serializers:

```ts
expect.addSnapshotSerializer({
  serialize(val, config, indentation, depth, refs, printer) {
    return `Pretty: ${printer(val.foo, config, indentation, depth, refs)}`
  },
  test(val) {
    return val && Object.prototype.hasOwnProperty.call(val, 'foo')
  },
})
```

Or configure via `snapshotSerializers` in `vitest.config.ts`:

```ts
export default defineConfig({
  test: {
    snapshotSerializers: ['./my-serializer.ts'],
  },
})
```

- Error snapshots:

```ts
expect(() => throwingFn()).toThrowErrorMatchingSnapshot()
expect(() => throwingFn()).toThrowErrorMatchingInlineSnapshot(`"error message"`)
```

- ARIA snapshots (browser mode, v4.1.4+): available only in browser mode. Captures and compares the accessibility tree of a DOM element.

```ts
await expect.element(page.getByRole('navigation')).toMatchAriaInlineSnapshot(`
  - navigation "Main":
    - link "Home":
      - /url: /
`)
```

Based on Playwright's ARIA snapshot spec. Browser mode only; not available in regular tests.

## Related

- [Expect Matchers](../api/expect.md)
- [CLI](./cli.md)
